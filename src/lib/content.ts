// 導讀頁用的內容工具：從 scripts/convert.mjs 產生的頁面裡取出原文段落。
// 只做擷取與重新排版，不改寫文字。
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
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
