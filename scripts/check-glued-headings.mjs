import assert from 'node:assert/strict';
import fs from 'node:fs';
import { marked } from 'marked';
const root = new URL('../src/content/docs/library/', import.meta.url);
const read = (slug) => fs.readFileSync(new URL(`${slug}.md`, root), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
const headings = (slug) => marked.lexer(read(slug)).filter((t) => t.type === 'heading');
const has = (slug, title, depth) => assert(headings(slug).some((h) => h.text === title && h.depth === depth), `${slug}: H${depth} ${title}`);
const skills = read('handbooks/elementary/04');
assert.equal((skills.match(/class="dg-item"/g) ?? []).length, 3);
for (const title of ['溝通的技巧', '合作的技巧', '保護自己的技巧']) assert(skills.includes(`<strong class="dg-head">${title}</strong>`));
for (const id of ['一溝通的技巧', '二合作的技巧', '三保護自己的技巧']) assert(skills.includes(`id="${id}"`));
assert(!read('handbooks/elementary/04').includes('回答得更好。二、'));
has('handbooks/junior/03', '（一）AI 怎麼學習？', 3);
has('handbooks/junior/05', '一、AI 也會一本正經胡說八道：認識「幻覺」（AI Hallucination）', 2);
for (const title of ['四、學生常見迷思或困難與因應設計：', '五、教師使用 AI 工具或平臺：', '六、使用 AI 的紅綠黃燈情境：', '七、學習評量的方法與工具：']) has('lessons/sh-01', title, 2);
for (const title of ['2-2 教學階段', '3-2 選擇策略', '3-3 評量與回饋']) has('lessons/es-03', title, 4);
for (const title of ['三、AI 使用紅黃綠燈情境：', '三、組間互學（20 分鐘）：', '四、教師導學（5 分鐘）：', '五、教師導學：(5 分鐘)']) has('lessons/es-03', title, 3);
for (const title of ['6.教師使用AI 工具平臺與AI 紅綠黃燈情境：', '7.學習評量的方法與工具：']) has('lessons/jh-06', title, 2);
has('lessons/sh-02', '四、AI 使用紅黃綠燈情境與學生使用原則', 2);
has('lessons/sh-02', '【教師導學 1：概念釐清與思辨引導】(後半節)', 3);
has('admin/bigdata/application', '一、基本資料', 4);
const principal = read('guides/principal/06');
assert(principal.includes('data-enhancement="D03"'));
for (const label of ['「學習優先」', '「專業把關」', '「治理先行」']) assert(principal.includes(`<strong class="dg-head">${label}</strong>`));
// Preserve the source's repeated/skipped numbering, while keeping columns separate.
const math = read('lessons/es-03');
assert(math.includes('<li value="3">報告組別'));
assert(math.includes('<li value="4">請學生進行課程包'));
for (const sentence of ['教師適時補充與提問，讓學生進行反思。', '組間互學時，各組聆聽並隨時提出疑問。', '10. 檢視卷一後測卷，了解學生補救結果與成效。', '11. 如沒有達到精熟', '12. 回家作業']) assert(math.includes(sentence), sentence);
const fraud = read('lessons/es-06');
assert.equal((fraud.match(/^- 第[一二三四五]組：/gm) ?? []).length, 5);
assert(fraud.indexOf('**共學任務：**') < fraud.indexOf('**學習證據／備註：**'));
assert(fraud.includes('2. 小組成員角色分工與組內共學自評表。'));
// A layout repair may add grouping labels, but must not silently drop Chinese source text.
const repairs = JSON.parse(fs.readFileSync(new URL('../src/data/pdf-repairs/glued-headings.json', import.meta.url)));
for (const repair of repairs) {
  const available = new Map();
  for (const char of repair.replace.match(/[\u4e00-\u9fff]/g) ?? []) available.set(char, (available.get(char) ?? 0) + 1);
  for (const char of repair.find.match(/[\u4e00-\u9fff]/g) ?? []) {
    assert((available.get(char) ?? 0) > 0, `${repair.id}: dropped source character ${char}`);
    available.set(char, available.get(char) - 1);
  }
}
console.log('Glued heading checks passed: H01–H11 and R01–R03, including source numbering and column ownership.');
