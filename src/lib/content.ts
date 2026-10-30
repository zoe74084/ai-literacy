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
	return out.length ? out : null;
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
		if ((level === 2 || level === 3) && !skip && t && [...t].length <= 40) byLevel[level].push({ text: t, slug: s });
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
