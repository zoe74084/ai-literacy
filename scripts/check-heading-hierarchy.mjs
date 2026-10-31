import assert from 'node:assert/strict';
import fs from 'node:fs';
import { marked } from 'marked';
import { repairHeadingHierarchy } from './heading-hierarchy.mjs';

const root = new URL('../src/content/docs/library/', import.meta.url);
const body = (slug) => fs.readFileSync(new URL(`${slug}.md`, root), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
const headings = (slug) => marked.lexer(body(slug)).filter((t) => t.type === 'heading');
const has = (slug, text, depth) => assert(headings(slug).some((h) => h.text === text && h.depth === depth), `${slug}: H${depth} ${text}`);

let pages = 0;
for (const file of fs.readdirSync(root, { recursive: true }).filter((f) => f.endsWith('.md'))) {
  const hs = headings(file.slice(0, -3));
  let previous = 1;
  for (const h of hs) {
    assert(h.text.replace(/\*/g, '').trim(), `${file}: empty heading`);
    assert(h.depth >= 2 && h.depth <= previous + 1, `${file}: H${previous} → H${h.depth} ${h.text}`);
    previous = h.depth;
  }
  pages++;
}
for (const n of ['04', '05']) {
  const hs = headings(`framework/full/${n}`);
  assert.equal(hs.filter((h) => h.depth === 3).length, 12);
  assert.equal(hs.filter((h) => h.depth === 4).length, 36);
  assert.equal(hs.filter((h) => h.depth === 2).length, n === '04' ? 5 : 6);
}
has('framework/full/02', '二、學生 AI 素養發展趨勢', 2);
assert(!headings('framework/full/03').some((h) => /^圖 1/.test(h.text)));
has('guides/teacher/08', '（七）情感依附錯位', 4);
for (const [color, label] of [['綠', '鼓勵使用'], ['黃', '可使用但需查核'], ['紅', '不可使用']]) {
  has('lessons/sh-03', `${color}燈：${label}`, 4);
}
for (const n of ['一', '二', '三']) assert(headings('lessons/sh-03').some((h) => h.depth === 2 && h.text.startsWith(`附件${n}`)));
has('guides/principal/04', '學校情境案例', 2);
assert(headings('guides/principal/04').filter((h) => /^【.+案例】/.test(h.text)).every((h) => h.depth === 3));
assert(!body('guides/parent/01').includes('## 壹、攤開地圖'));
has('guides/parent/chapter-01', '壹、攤開地圖：數位學習趨勢如何改變教育？', 2);
const catalog = JSON.parse(fs.readFileSync(new URL('../src/generated/catalog.json', import.meta.url)));
const parent = catalog.find((doc) => doc.slug === 'guides/parent');
assert.deepEqual(parent.chapters.map((c) => c.slug), ['guides/parent/01', 'guides/parent/chapter-01', 'guides/parent/02', 'guides/parent/03', 'guides/parent/04', 'guides/parent/05']);
assert(headings('guides/parent/05').filter((h) => /（能力[ABCD]）/.test(h.text)).every((h) => h.depth === 3));
assert(headings('admin/bigdata/xapi/07').filter((h) => /^(JSON 範例|xAPI 欄位規格與平臺提供情形)$/.test(h.text)).every((h) => h.depth === 4));
// Numbered prose and code must not be promoted by the scoped rules.
const prose = ['一、這是一個完整的列點句子，並不是章節標題。', '```md', '## 表 1 只是程式碼', '```'];
assert.deepEqual(repairHeadingHierarchy(prose, 'unrelated/document'), prose);
console.log(`Heading hierarchy checks passed: ${pages} generated pages and verified regression cases.`);
