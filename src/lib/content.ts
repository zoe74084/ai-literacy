// 導讀頁用的內容工具：從 scripts/convert.mjs 產生的頁面裡取出原文段落。
// 只做擷取與重新排版，不改寫文字。
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import GithubSlugger from 'github-slugger';
import catalogData from '../generated/catalog.json';

export interface CatalogDoc {
	slug: string;
	title: string;
	label: string;
	group: string;
	order: number;
	audience: string[];
	file: string;
	lesson: null | {
		number: number;
		stage: string;
		stageOrder: number;
		domain: string;
		rawDomain: string;
		author: string;
	};
	chapters: null | { slug: string; title: string }[];
}

export const catalog = catalogData as CatalogDoc[];
export const bySlug = (slug: string) => catalog.find((d) => d.slug === slug);
export const byGroup = (group: string) => catalog.filter((d) => d.group === group).sort((a, b) => a.order - b.order);

const LIB_DIR = path.join(process.cwd(), 'src/content/docs/library');

/** 讀出某頁的 Markdown 內文（不含 frontmatter） */
export function readBody(slug: string): string {
	const file = path.join(LIB_DIR, `${slug}.md`);
	const raw = fs.readFileSync(file, 'utf8');
	return raw.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

/** Markdown → HTML（行內與區塊） */
export function md(text: string): string {
	return marked.parse(text, { async: false, gfm: true }) as string;
}
export function mdInline(text: string): string {
	return marked.parseInline(text, { async: false, gfm: true }) as string;
}

/** 去掉粗體記號、<br> 等，給標題或短句用 */
export function plain(text: string): string {
	return text
		.replace(/<br\s*\/?>/gi, '')
		.replace(/<\/?sup>/gi, '')
		.replace(/<\/?strong>/gi, '')
		.replace(/\*\*/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/** 以 ## 標題切段：回傳 { intro, sections: [{ title, body }] } */
export function sections(body: string) {
	const parts = body.split(/^## (.+)$/m);
	const intro = parts[0].trim();
	const out: { title: string; body: string }[] = [];
	for (let i = 1; i < parts.length; i += 2) out.push({ title: parts[i].trim(), body: (parts[i + 1] ?? '').trim() });
	return { intro, sections: out };
}

/**
 * 指引每章開頭的「重點先看」：從該行之後取到第一個標題，
 * 或第一段超過 140 字的一般內文（那通常是正文開始）為止。
 */
export function keyPoints(body: string): string[] | null {
	const lines = body.split('\n');
	const start = lines.findIndex((l) => /^\*\*重點先看\*\*$/.test(l.trim()));
	if (start < 0) return null;
	const out: string[] = [];
	for (const l of lines.slice(start + 1)) {
		const t = l.trim();
		if (!t) continue;
		if (/^#{1,6} /.test(t)) {
			// 「學習目標」這類小標題屬於重點先看本身
			if (/^#{1,6} (學習目標|學習摘要|凸顯的重點|數位與AI|我國數位)/.test(t) && out.length < 12) {
				out.push(`**${t.replace(/^#+ /, '')}**`);
				continue;
			}
			break;
		}
		const isPlainPara = !/^(\*\*|[-*] |\d+\.\s)/.test(t);
		if (isPlainPara && [...t].length > 140) break;
		out.push(t);
		if (out.length >= 14) break;
	}
	return out.length ? out.flatMap(splitNumbered) : null;
}

/**
 * 「學習目標 1. 甲 2. 乙 3. 丙」擠在同一行時拆成清單；
 * 句中的列舉（「1.AI 倫理、2. AI 基礎……」）不拆。
 */
function splitNumbered(line: string): string[] {
	const t = line.replace(/\*\*/g, '');
	if ((t.match(/(^|\s)\d+\.\s/g) ?? []).length < 2 || /、\s*\d+\.\s/.test(t)) return [line];
	const bold = /^\*\*.*\*\*$/.test(line.trim());
	const parts = t.split(/\s+(?=\d+\.\s)/).map((p) => p.trim()).filter(Boolean);
	const head = /^\d+\.\s/.test(parts[0]) ? [] : [bold ? `**${parts.shift()}**` : parts.shift()!];
	return [...head, parts.join('\n')];
}

/** 解析 Markdown 表格（第一列為表頭） */
export function parseTable(lines: string[]) {
	const rows = lines
		.filter((l) => l.trim().startsWith('|'))
		.map((l) =>
			l
				.trim()
				.replace(/^\||\|$/g, '')
				.split(/(?<!\\)\|/)
				.map((c) => c.trim()),
		)
		.filter((r) => !r.every((c) => /^:?-{3,}:?$/.test(c)));
	return rows;
}

/** 取出某個標題（## 文字）底下、到下一個 ## 為止的內文 */
export function sectionByTitle(body: string, re: RegExp): string | null {
	const { sections: secs } = sections(body);
	const s = secs.find((x) => re.test(x.title));
	return s ? s.body : null;
}

/** 表格儲存格：把 PDF 斷行的 <br> 接回 */
export function cell(text: string): string {
	return plain(text.replace(/<br\s*\/?>/gi, ''));
}

// ---------------------------------------------------------------------------
// 學習應用手冊：每章的「我學會了嗎」、重點回顧、挑戰任務
// ---------------------------------------------------------------------------

export interface HandbookCheck {
	id: string;
	text: string;
	subs: string[];
}
export interface HandbookChapter {
	slug: string;
	title: string;
	sections: { text: string; slug: string }[];
	checks: HandbookCheck[];
	checkPrompt: string;
	recap: string[];
	quote: string;
	nextUp: string[];
	challenges: { title: string; html: string }[];
}

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}▊]/gu;
const stripEmoji = (s: string) => s.replace(EMOJI, '').replace(/\s+/g, ' ').trim();
const cleanItem = (s: string) =>
	plain(s)
		.replace(/_{2,}/g, '')
		.replace(/[☐✓✅🔄]/gu, '')
		.replace(/\s{2,}/g, ' ')
		.replace(/([。！？」）])\s*\d{1,3}$/, '$1') // 句尾黏到的 PDF 頁碼
		.trim();

/** 把「我學會了嗎」表格攤平成一行一行，PDF 斷行的半句接回上一行 */
function tableLines(rows: string[]) {
	const out: string[] = [];
	for (const r of parseTable(rows)) {
		const parts = r
			.join('<br>')
			.split(/<br\s*\/?>/i)
			.map((p) => p.replace(/\*\*/g, '').trim())
			.filter((p) => p && !/^[_\s☐✓✅🔄]*$/u.test(p));
		parts.forEach((p, k) => {
			// 每一列的第一段一定是新的一行；同一格裡 PDF 斷開的半句才接回上一行
			const isStart = k === 0 || /^(\d+\.|●|[📖📝📌🏆📊]|本章|最重要|掃描|完成本章|學習目標|做到了|能做到|還需練習|再練習)/u.test(p);
			if (!isStart && out.length) out[out.length - 1] += p;
			else out.push(p);
		});
	}
	return out;
}

export function handbookChapter(slug: string, title: string): HandbookChapter {
	const body = readBody(slug);
	const lines = body.split('\n');

	// 段落（給「本章內容」清單用），slug 與閱讀版的錨點一致
	const slugger = new GithubSlugger();
	const byLevel: Record<number, { text: string; slug: string }[]> = { 2: [], 3: [] };
	for (const l of lines) {
		const m = l.match(/^(#{2,6}) (.+)$/);
		if (!m) continue;
		const text = m[2].trim();
		const s = slugger.slug(plain(text));
		const level = m[1].length;
		const skip = /我學到了嗎|我學會了|學習檢核|挑戰任務|下一章預告|本章重點|本章核心|最重要的一句話|提示詞|小叮嚀|隨堂練習/.test(text);
		const t = stripEmoji(plain(text));
		// 只有角色名字（吱吱、可可）的小標不算章節內容
		if ((level === 2 || level === 3) && !skip && t && [...t].length > 2 && [...t].length <= 40) byLevel[level].push({ text: t, slug: s });
	}
	const sections = (byLevel[2].length >= 3 ? byLevel[2] : [...byLevel[2], ...byLevel[3]]).slice(0, 12);

	// 我學會了嗎
	const checks: HandbookCheck[] = [];
	let checkPrompt = '';
	const recap: string[] = [];
	const nextUp: string[] = [];
	let quote = '';
	const ci = lines.findIndex((l) => /^#{2,6} .*(我學到了嗎|我學會了|學習檢核)/.test(l));
	if (ci >= 0) {
		let j = ci + 1;
		const intro: string[] = [];
		while (j < lines.length && !lines[j].trim().startsWith('|') && !/^#/.test(lines[j]) && j - ci < 8) {
			if (lines[j].trim()) intro.push(plain(lines[j]));
			j++;
		}
		checkPrompt = intro.join('');
		const rows: string[] = [];
		while (j < lines.length && (lines[j].trim().startsWith('|') || !lines[j].trim())) {
			if (lines[j].trim()) rows.push(lines[j]);
			j++;
		}
		let mode: 'check' | 'recap' | 'quote' | 'next' | 'skip' = 'check';
		for (const raw of tableLines(rows)) {
			const t = raw.trim();
			if (/本章(核心觀念回顧|重點)/.test(t)) { mode = 'recap'; continue; }
			if (/最重要的一句話/.test(t)) { mode = 'quote'; continue; }
			if (/下一章預告/.test(t)) { mode = 'next'; continue; }
			if (/^掃描|^(完成本章|學習目標|做到了|能做到|還需練習|再練習)/.test(t) || /挑戰任務/.test(t)) { if (/掃描/.test(t)) mode = 'skip'; continue; }
			if (mode === 'skip') continue;
			const num = t.match(/^\d+\.\s*(.+)$/);
			if (mode === 'check') {
				if (num) checks.push({ id: `${slug}#${checks.length + 1}`, text: cleanItem(num[1]), subs: [] });
				else if (/^●/.test(t) && checks.length) checks[checks.length - 1].subs.push(cleanItem(t.replace(/^●\s*/, '')));
			} else if (mode === 'recap') {
				recap.push(cleanItem(num ? num[1] : t.replace(/^●\s*/, '')));
			} else if (mode === 'quote') {
				quote += cleanItem(t);
			} else if (mode === 'next') {
				nextUp.push(cleanItem(t.replace(/^●\s*/, '')));
			}
		}
	}

	// 國小手冊的「我學到了嗎」是條列或一般段落，不是表格
	if (ci >= 0 && !checks.length) {
		for (const l of lines.slice(ci + 1)) {
			if (/^#{1,6} /.test(l)) break;
			const t = l.trim();
			if (!t || /^掃描/.test(t)) continue;
			const m = t.match(/^[-*]\s+(.+)$/);
			// 「我能……。我能……」寫在同一段時拆成多項
			const parts = m ? [m[1]] : t.split(/(?<=。)(?=我)/);
			for (const part of parts) {
				const text = cleanItem(part);
				if (text) checks.push({ id: `${slug}#${checks.length + 1}`, text, subs: [] });
			}
		}
	}
	// 標題底下的條列（下一章預告、本章重點）
	const listUnder = (re: RegExp) => {
		const i = lines.findIndex((l) => re.test(l));
		const out: string[] = [];
		if (i < 0) return out;
		const rest = lines.slice(i + 1);
		for (let k = 0; k < rest.length; k++) {
			const l = rest[k];
			if (/^#{1,6} /.test(l)) break;
			if (/最重要的一句話/.test(l)) {
				const next = rest.slice(k + 1).find((x) => x.trim());
				if (next && !quote && !/^#/.test(next)) quote = cleanItem(next.replace(/^[-*]\s+/, ''));
				break;
			}
			const m = l.trim().match(/^(?:[-*]\s+)?(?:\d+\.\s*)?(.+)$/);
			const isItem = /^([-*]\s+|\d+\.\s*)/.test(l.trim());
			if (m && isItem) out.push(cleanItem(m[1].replace(/^[●①-⑳]\s*/, '')));
		}
		return out;
	};
	if (!nextUp.length) nextUp.push(...listUnder(/^#{2,6} .*下一章預告/));
	if (!recap.length) recap.push(...listUnder(/^#{2,6} .*本章(重點|核心觀念)/));
	// 「最重要的一句話」：標題下一行（可能也是標題或粗體）
	if (!quote) {
		const qi = lines.findIndex((l) => /^#{2,6} .*最重要的一句話/.test(l));
		if (qi >= 0) {
			const next = lines.slice(qi + 1).find((l) => l.trim());
			if (next && !/^\|/.test(next.trim())) quote = cleanItem(next.replace(/^#+\s*/, ''));
		}
	}

	// 挑戰任務（表格外、有內文的）
	const challenges: { title: string; html: string }[] = [];
	lines.forEach((l, i) => {
		const m = l.match(/^(#{2,6}) (.*挑戰任務.*)$/);
		if (!m) return;
		const level = m[1].length;
		const bodyLines: string[] = [];
		for (const x of lines.slice(i + 1)) {
			const h = x.match(/^(#{1,6}) /);
			if (h && h[1].length <= level) break;
			bodyLines.push(x);
		}
		const text = bodyLines.join('\n').trim();
		if (text.replace(/[\s|\-]/g, '').length > 10) challenges.push({ title: stripEmoji(plain(m[2])), html: md(text) });
	});

	return { slug, title, sections, checks, checkPrompt, recap, quote, nextUp, challenges };
}

// ---------------------------------------------------------------------------
// 教師指引互動版：章節重點、選工具五問、七個風險口訣、AI 素養自我檢視
// ---------------------------------------------------------------------------

/** PDF 斷行的段落接回：上一行沒有句末標點就接下一行 */
function joinParas(lines: string[]) {
	const out: string[] = [];
	for (const raw of lines) {
		const t = raw.trim().replace(/^[-*]\s+/, '');
		if (!t) continue;
		if (out.length && !/[。！？」：）]$/.test(out[out.length - 1])) out[out.length - 1] += t;
		else out.push(t);
	}
	return out;
}

/** 從某行之後讀到下一個標題（或符合 stop 的行）為止 */
function linesAfter(lines: string[], i: number, stop = /^#{1,6} /) {
	const out: string[] = [];
	for (const l of lines.slice(i + 1)) {
		if (stop.test(l.trim())) break;
		out.push(l);
	}
	return out;
}

/** 表格列（不含表頭、分隔列）：從 i 起讀，空行可跳過，遇到一般文字就停 */
function tableRowsFrom(lines: string[], i: number) {
	const rows: string[] = [];
	for (const l of lines.slice(i)) {
		const t = l.trim();
		if (!t) continue;
		if (!t.startsWith('|')) {
			if (rows.length) break;
			continue;
		}
		rows.push(t);
	}
	return parseTable(rows).filter((r) => !/^\*\*(層級|教師專業發展路徑|STEP|THINK|FACT|OPEN|SAFE|HUMAN|CARE)\*\*$/.test(r[0]));
}

export interface GuideChapter {
	n: number;
	title: string;
	slugs: string[];
	kp: string;
	question: string;
	quote: { text: string; cite: string } | null;
}

function guideChapterExtras(body: string) {
	const lines = body.split('\n');
	const qi = lines.findIndex((l) => /問思與討論/.test(l));
	const question = qi >= 0 ? plain(lines.slice(qi + 1).find((l) => l.trim()) ?? '') : '';
	let quote: GuideChapter['quote'] = null;
	const si = lines.findIndex((l) => /啟思小語/.test(l));
	if (si >= 0) {
		const text: string[] = [];
		let cite = '';
		for (const l of lines.slice(si + 1)) {
			const t = l.trim().replace(/^>\s*/, '').replace(/^[-*]\s+/, '');
			if (/^#{1,6} /.test(l.trim())) break;
			if (!t || /圖片內文字/.test(t) || /^—+$/.test(t)) continue;
			if (/^——/.test(t)) {
				cite = plain(t.replace(/^——\s*/, '').replace(/_/g, ''));
				break;
			}
			text.push(plain(t));
		}
		if (text.length) quote = { text: text.join(''), cite };
	}
	return { question, quote };
}

export function teacherGuide() {
	const doc = bySlug('guides/teacher')!;
	const chs = (doc.chapters ?? []).slice(1);

	// 章節：第五章分成兩頁（｜續），合成一站
	const chapters: GuideChapter[] = [];
	for (const c of chs) {
		const title = c.title.replace(/｜續$/, '');
		const body = readBody(c.slug);
		const last = chapters[chapters.length - 1];
		const extra = guideChapterExtras(body);
		if (last && last.title === title) {
			last.slugs.push(c.slug);
			if (!last.question) last.question = extra.question;
			if (!last.quote) last.quote = extra.quote;
			continue;
		}
		// 圖片轉出的文字區塊只留內容，不留「（圖片內文字…）」說明
		const kp = keyPoints(body)
			?.map((l) => l.replace(/^>\s*/, ''))
			.filter((l) => l && !/圖片內文字/.test(l));
		chapters.push({ n: chapters.length + 1, title, slugs: [c.slug], kp: kp?.length ? md(kp.join('\n\n')) : '', ...extra });
	}

	// 第四章：教師選用數位學習平臺與 AI 工具的五個核心問題
	const ch4 = chs.find((c) => /第四章/.test(c.title))!;
	const l4 = readBody(ch4.slug).split('\n');
	const toolQuestions = l4
		.map((l, i) => ({ m: l.match(/^#{2,6} （[一二三四五]）(這個工具.+？)$/), i }))
		.filter((x) => x.m)
		.map(({ m, i }) => ({ q: plain(m![1]), html: joinParas(linesAfter(l4, i)).map((p) => md(p)).join('') }));
	const ti = l4.findIndex((l) => /教師選用數位學習平臺與AI 工具的參考原則/.test(l));
	const toolIntro = ti >= 0 ? plain(linesAfter(l4, ti).find((l) => l.trim()) ?? '') : '';
	const ai = l4.findIndex((l) => /^#{2,6} 優先選用教育部建置/.test(l));
	const toolA2 = ai >= 0 ? { title: plain(l4[ai].replace(/^#+ /, '')), text: joinParas(linesAfter(l4, ai)).join('') } : null;

	// 第六章：七個風險與口訣
	const ch6 = chs.find((c) => /第六章/.test(c.title))!;
	const l6 = readBody(ch6.slug).split('\n');
	const wise = plain(l6.find((l) => /WISE 原則，引導/.test(l)) ?? '');
	const acrIdx = l6
		.map((l, i) => ({ m: l.match(/^(?:#{2,6} |[-*] \*\*)（1）.*?(STEP|THINK|FACT|OPEN|SAFE|HUMAN|CARE)/), i }))
		.filter((x) => x.m);
	const risks = l6
		.map((l, i) => (/➊——風險說明/.test(l) ? i : -1))
		.filter((i) => i >= 0)
		.map((ri) => {
			let name = '';
			for (let j = ri - 1; j >= 0 && !name; j--) {
				const m = l6[j].match(/^(?:#{2,6} |\*\*)（[一二三四五六七]）(.{2,16}?)(?:\*\*)?$/);
				if (m) name = plain(m[1]);
			}
			const desc = plain(l6.slice(ri + 1).find((l) => l.trim() && !/^#/.test(l)) ?? '');
			const a = acrIdx.find((x) => x.i > ri)!;
			const steps: { letter: string; en: string; zh: string; desc: string; ask: string }[] = [];
			for (const r of tableRowsFrom(l6, a.i + 1)) {
				const parts = r[0].split(/<br\s*\/?>/i).map((p) => plain(p)).filter(Boolean);
				const head = parts[0]?.match(/^([A-Z])\s*｜\s*(.*)$/);
				if (head) {
					const rest = [head[2], ...parts.slice(1)];
					steps.push({
						letter: head[1],
						en: rest.filter((p) => /^[A-Za-z\s]+$/.test(p)).join(' '),
						zh: rest.filter((p) => !/^[A-Za-z\s]+$/.test(p)).join(''),
						desc: cell(r[1] ?? ''),
						ask: cell(r[2] ?? ''),
					});
				} else if (steps.length) {
					const s = steps[steps.length - 1];
					s.zh += parts.join('');
					s.desc += cell(r[1] ?? '');
					s.ask += cell(r[2] ?? '');
				}
			}
			return { name, desc, acronym: a.m![1], steps };
		});

	// 第七章：教師 AI 素養自我檢視（四個面向 × 三層級 × 三項）
	const ch7 = chs.find((c) => /第七章/.test(c.title))!;
	const l7 = readBody(ch7.slug).split('\n');
	const LEVELS = ['取得理解', '深化應用', '創造轉型'];
	const selfCheck = l7
		.map((l, i) => ({ m: l.match(/^## [一二三四] (AI .+)$/), i }))
		.filter((x) => x.m)
		.map(({ m, i }, d) => {
			const goals = ['', '', ''];
			const items: { id: string; level: number; text: string }[] = [];
			let lv = 0;
			for (const r of tableRowsFrom(l7, i + 1)) {
				const code = r[0].match(/\d-(\d)/);
				if (code) lv = Number(code[1]) - 1;
				goals[lv] += cell(r[1] ?? '');
				const it = cell(r[2] ?? '').match(/^(\d-\d-\d)\s*(.+)$/);
				if (it) items.push({ id: it[1], level: Number(it[1].split('-')[1]) - 1, text: it[2] });
			}
			// 表格後的反思提問（到下一個面向為止）
			const reflections: string[] = [];
			let past = false;
			for (const l of l7.slice(i + 1)) {
				const t = l.trim();
				if (t.startsWith('|')) { past = true; continue; }
				if (!past) continue;
				if (/^## /.test(t) && !/自我反思/.test(t)) break;
				const q = t.match(/^\*\*\d\.\s*(.+?)\*\*$/);
				if (q) reflections.push(plain(q[1]).replace(/下一步行動：$/, ''));
			}
			return { n: d + 1, name: plain(m![1]), goals, items, reflections };
		});

	// 第七章：AI 促進教師專業發展策略建議（三層級）
	const strategies = [/^## 取得理解$/, /^## 二深化應用$/, /^## 三創造轉型$/].map((re, k) => {
		const i = l7.findIndex((l) => re.test(l.trim()));
		const goalLine = l7.slice(i + 1).find((l) => /專業發展目標：/.test(l)) ?? '';
		const rows: { path: string; how: string; where: string }[] = [];
		const end = l7.findIndex((l, j) => j > i && /^## (二深化應用|三創造轉型|我\/)/.test(l.trim()));
		const tableRows = parseTable(l7.slice(i + 1, end).filter((l) => l.trim().startsWith('|'))).filter((r) => !/教師專業發展路徑/.test(r[0]));
		for (const r of tableRows) {
			const row = { path: cell(r[0]), how: cell(r[1] ?? ''), where: cell(r[2] ?? '') };
			const last = rows[rows.length - 1];
			if (last && !/。$/.test(last.how)) {
				last.path += row.path;
				last.how += row.how;
				last.where += row.where;
			} else rows.push(row);
		}
		return { level: LEVELS[k], goal: plain(goalLine.replace(/^.*專業發展目標：\**/, '')), rows };
	});

	return { doc, chapters, toolIntro, toolQuestions, toolA2, wise, risks, selfCheck, strategies, levels: LEVELS };
}
