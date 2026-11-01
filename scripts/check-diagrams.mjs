import assert from 'node:assert/strict';
import fs from 'node:fs';
import { marked } from 'marked';
const items = JSON.parse(fs.readFileSync(new URL('../src/data/diagram-enhancements.json', import.meta.url)));
const read = (slug) => fs.readFileSync(new URL(`../src/content/docs/library/${slug}.md`, import.meta.url), 'utf8');
const plain = (text) => marked.parse(text).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const count = (text) => {
  const out = new Map();
  for (const char of plain(text).match(/[\u4e00-\u9fffA-Za-z0-9]/g) ?? []) out.set(char, (out.get(char) ?? 0) + 1);
  return out;
};
for (const item of items) {
  const page = read(item.slug);
  assert.equal(page.split(`data-enhancement="${item.id}"`).length, 2, `${item.id}: figure missing or duplicated`);
  assert(page.includes(item.replace), `${item.id}: rendered content drift`);
  assert.equal((item.replace.match(/<li\b/g) ?? []).length, item.count);
  assert(!item.title.includes('圖解'), `${item.id}: redundant caption prefix`);
  const available = count(item.replace);
  for (const [char, n] of count(item.find)) assert((available.get(char) ?? 0) >= n, `${item.id}: source content dropped: ${char}`);
  for (const match of item.replace.matchAll(/\bid="([^"]+)"/g)) assert.equal(page.split(`id="${match[1]}"`).length, 2, `${item.id}: duplicate/missing old anchor`);
}
assert.equal(items.length, 11);
assert.equal(new Set(items.map((item) => item.slug)).size, 7);
console.log('Diagram checks passed: 11 regroupings in 7 pages; original text, item counts, and retained anchors verified.');
