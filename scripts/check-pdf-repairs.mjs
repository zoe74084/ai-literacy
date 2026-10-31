import assert from 'node:assert/strict';
import fs from 'node:fs';
import { marked } from 'marked';
const root = new URL('../src/content/docs/library/', import.meta.url);
const read = (slug) => fs.readFileSync(new URL(`${slug}.md`, root), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
const senior = read('handbooks/senior/07');
for (const passage of ['AI 的大腦進化得非常快！', '近年科技界熱門的 Agentic AI', '如果你把一般的 AI 當成圖書館員', '- 責任歸屬模糊：']) assert(senior.includes(passage), passage);
assert(!senior.includes('- 安風險中。'));
const outline = marked.lexer(senior).filter((t) => t.type === 'heading');
assert.equal(outline.filter((h) => /^[123]\. (檢視使用|選對工具|留意模型)/.test(h.text) && h.depth === 3).length, 3);
assert(outline.some((h) => /^七、延伸學習/.test(h.text) && h.depth === 2));
assert.equal(outline.filter((h) => /^\([一二三四五]\)/.test(h.text) && h.depth === 3).length, 5);
assert(senior.includes('/source-figures/handbook-senior-peer-example.png'));
const citizen = read('handbooks/senior/08');
for (const phrase of ['數位時代的公民，面對的是', 'AI 世代下的數位公民，面對的環境根本不同', 'A teacher-student scene with a friendly AI robot', 'no text in image.']) assert(citizen.includes(phrase), phrase);
const junior = read('handbooks/junior/03');
assert(marked.lexer(junior).some((t) => t.type === 'heading' && t.depth === 3 && t.text.startsWith('（二）依主要功能分類')));
assert(junior.includes('學生將 AI 視為蘇格拉底式的提問夥伴'));
assert(!junior.includes('AI 直油站'));
const screener = marked.lexer(read('guides/parent/05')).find((t) => t.type === 'table' && t.header[0].text === '題號');
assert.equal(screener.header.length, 6);
assert.equal(screener.rows.length, 4);
assert.equal(screener.rows[0][1].text, '想上網而無法上網的時候，我就會感到坐立不安。');
assert(read('guides/parent/05').includes('國小3年級至大學之學生（10歲至25歲）'));
assert(read('guides/parent/05').includes('總分超過11分者'));
const record = marked.lexer(read('lessons/jh-02')).find((t) => t.type === 'table' && t.header[0].text === '次數');
assert.equal(record.header.length, 12);
assert.deepEqual(record.rows.map((r) => r[0].text), ['A轉盤數字', 'B轉盤數字', '乘積', '甲或乙勝']);
assert(read('lessons/jh-02').includes('提醒學生可以將所有可能發生的情形以樹狀圖表示'));
let examples = 0, parseable = 0;
for (let n = 1; n <= 10; n++) {
  const text = read(`admin/bigdata/xapi/${String(n).padStart(2, '0')}`);
  // No JSON literals should remain ordinary paragraphs after Markdown parsing.
  const tokens = marked.lexer(text);
  assert(!tokens.some((t) => t.type === 'paragraph' && /^\{/.test(t.text)));
  for (const token of tokens.filter((t) => t.type === 'code' && t.lang === 'json')) {
    examples++;
    assert(!/[“”]/.test(token.text));
    try { JSON.parse(token.text); parseable++; } catch (e) { if (!(e instanceof SyntaxError)) throw e; }
  }
}
assert.equal(parseable, 26);
assert.equal(examples, 35);
const first = marked.lexer(read('admin/bigdata/xapi/05')).find((t) => t.type === 'code' && t.lang === 'json');
const expected = JSON.parse(fs.readFileSync(new URL('../src/data/pdf-repairs/xapi-login.json', import.meta.url)));
assert.deepEqual(JSON.parse(first.text), expected);
for (const slug of ['ark', 'ark/ja', 'ark/ko']) {
  const text = read(slug);
  assert(!text.includes('此處是圖片，內容請見原文 PDF 第 13 頁'));
  assert.equal((text.match(/!\[[^\n]*\]\([^\n]*ark-outcomes/g) ?? []).length, 2);
}
console.log(`PDF repair checks passed: F01–F14, D01; ${examples} fenced examples (${parseable} valid JSON, 9 original malformed/pseudo examples preserved).`);
