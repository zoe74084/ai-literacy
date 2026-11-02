// Scoped presentation repairs, verified against PDF physical pages 38, 45–46, 61.
// Original prose and table cells remain; editorial reading aids are labelled separately.
import { marked } from 'marked';
import { slug as headingSlug } from 'github-slugger';

const once = (text, from, to) => {
  if (text.split(from).length !== 2) throw new Error(`Teacher guide repair: expected one match for ${from.slice(0, 65)}`);
  return text.replace(from, to);
};
const framework = '<figure class="tg-framework" aria-labelledby="tg-framework-title"><figcaption id="tg-framework-title">圖 3-1 閱讀圖解・依原圖重繪</figcaption><div class="tg-framework-pair">' + [
  ['教師', 'AI 賦能教學', 'AI 促進教師專業發展'],
  ['學生', 'AI 賦能學習', 'AI 系統設計'],
].map(([who, third, fourth]) => `<div class="tg-framework-person"><strong class="tg-who">${who}</strong><div class="tg-framework-ring"><span>AI 倫理</span><span>AI 基礎與技術</span><strong class="tg-human">以人為中心的思維</strong><span>${third}</span><span>${fourth}</span></div></div>`).join('') + '</div><p class="tg-editor-note">本站閱讀圖解：以人為中心的思維貫穿四個面向；下方保留文字對照。</p></figure>';

function renderTable(block, index) {
  const isUsage = block.includes('3-1：教師教學');
  if (isUsage) {
    const lines = block.trim().split('\n');
    block = [lines[2], lines[1], ...lines.slice(3)].join('\n');
  }
  const token = marked.lexer(block).find(t => t.type === 'table');
  if (!token) throw new Error('Teacher guide table was not parsed');
  const names = ['人工智慧代理人使用檢核表', '教師與學生 AI 素養架構文字對照', '表 3-1：教師教學使用 AI 判斷原則參考表', '教師選擇 AI 使用方式的自我檢核表'];
  const id = `tg-table-${index}`;
  // Keep meaningful separators between numbered questions; remove PDF line wraps.
  const cell = (s) => marked.parseInline(s.replace(/<br\s*\/?\s*>(?![⑴⑵⑶⑷])/gi, ''))
    .replace(/人機協作|專業發展|學習目標|教師|學生|分析|基礎|核心|知識|技能|規劃|查證|修改|回饋|倫理|隱私|範圍|生成|原則|思考|評量|提示|反思/g, '<span class="tg-term">$&</span>');
  const rows = token.rows.map(row => '<tr>' + row.map((c, i) => {
    const tag = i === 0 ? 'th scope="row"' : 'td';
    let content = cell(c.text);
    if (isUsage && i === 1) {
      const color = c.text.includes('紅') ? 'red' : c.text.includes('黃') ? 'yellow' : 'green';
      content = `<span class="tg-light tg-light-${color}" aria-hidden="true"></span>${content.replace('●', '')}`;
    }
    return `<${tag}>${content}</${i === 0 ? 'th' : 'td'}>`;
  }).join('') + '</tr>').join('');
  const tableClass = index === 0 ? ' tg-checkpoints' : isUsage ? ' tg-usage' : '';
  const region = `<div class="tg-scroll" role="region" tabindex="0" aria-labelledby="${id}"><table class="tg-table${tableClass}"><caption id="${id}">${names[index]}</caption><thead><tr>${token.header.map(c => `<th scope="col">${cell(c.text)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  return `${index === 1 ? `${framework}\n\n` : ''}<p class="tg-scroll-hint">表格可左右捲動；鍵盤可先聚焦表格，再用左右方向鍵閱讀。</p>${region}\n`;
}

export function repairTeacherGuide(text, slug) {
  if (slug !== 'guides/teacher/04') return text;
  text = once(text,
    '**1. 認識人工智慧的定義與類別**\n\n**2. 在人與AI 協作中，理解「以人為中心」的意涵 3. 認識人工智慧代理人的意涵與教育應用**\n\n**4. 理解與轉化教師與學生AI 素養內涵與教育場景應用**',
    '1. 認識人工智慧的定義與類別\n2. 在人與AI 協作中，理解「以人為中心」的意涵\n3. 認識人工智慧代理人的意涵與教育應用\n4. 理解與轉化教師與學生AI 素養內涵與教育場景應用');
  text = once(text, '- ➊——取得理解：建立基礎認知與批判審慎此階段', '➊——取得理解：建立基礎認知與批判審慎\n\n此階段');
  text = once(text, '教師需掌握原則與風\n\n- 險，', '教師需掌握原則與風險，');

  let inLevel = false;
  let levels = 0;
  let group = [];
  const groups = [];
  text = text.split('\n').map(line => {
    const match = line.match(/^(?:#{1,6} |[-*] )?([➊➋➌]——.+)$/);
    if (match) {
      levels++;
      inLevel = true;
      if (match[1].startsWith('➊')) { group = []; groups.push(group); }
      group.push(match[1]);
      return `##### ${match[1]}`;
    }
    if (/^#{2,4} /.test(line) || line.startsWith('|')) inLevel = false;
    if (inLevel && /^##### /.test(line)) return '#' + line;
    return line;
  }).join('\n');
  if (levels !== 15 || groups.length !== 5 || groups.some(g => g.length !== 3)) throw new Error('Expected five groups of three teacher guide levels');
  for (const headings of groups) {
    const links = headings.map(h => `<a href="#${headingSlug(h)}">${h.match(/——([^：]+)/)[1]}</a>`).join('');
    text = once(text, `##### ${headings[0]}`, `<nav class="tg-level-nav" aria-label="本面向三層級"><span>本面向三層級</span>${links}</nav>\n\n##### ${headings[0]}`);
  }

  // Promote standalone practical tools out of the final student-level section.
  const tools = [
    ['##### 教師選擇AI 使用方式的判斷面向與自我檢核', '### 教師選擇AI 使用方式的判斷面向與自我檢核'],
    ['##### 應用AI 輔助學習「人機協作」班級公約（舉例）', '### 應用AI 輔助學習「人機協作」班級公約（舉例）'],
  ];
  for (const [from, to] of tools) text = once(text, from, to);
  text = once(text, '##### 參考示例', '**參考示例**');
  for (const title of ['我們承諾', '綠燈區：鼓勵自主探索', '黃燈區：需經過核准 / 查核並標示', '紅燈區：嚴格禁止行為', '學習承諾']) {
    text = once(text, `##### ${title}`, `#### ${title}`);
  }

  let tableIndex = 0;
  text = text.replace(/^\|[^\n]*\n(?:\|[^\n]*(?:\n|$))+/gm, block => renderTable(block, tableIndex++));
  if (tableIndex !== 4) throw new Error('Expected four teacher guide tables');

  const riskStart = '<figure class="dg dg-cards" aria-label="應用 AI 輔助學習需留意的三個風險">';
  const risk = text.match(/<figure class="dg dg-cards" aria-label="應用 AI 輔助學習需留意的三個風險">.*?<\/figure>/)?.[0];
  if (!risk) throw new Error('Teacher guide risk diagram missing');
  const correctedRisk = risk.replace(riskStart, riskStart.replace('aria-label=', 'data-guide-risk="true" aria-label='))
    .replace('需留意的三個風險</figcaption>', '需留意的三個風險（依原文整理）</figcaption>')
    .replace('把思考交給 AI，弱化分析、統整與表達', '學生可能習慣將思考交由 AI 代勞，弱化自身的分析、統整與表達能力')
    .replace('依賴 AI 給答案，降低主動探究與獨立論證', '過度依賴 AI 提供答案，可能降低主動探究與獨立論證的意願')
    .replace('影響面對不確定情境時的自我調節', '長期倚賴 AI 回饋，可能影響面對不確定情境時的自我調節能力');
  text = text.replace(risk, correctedRisk);

  const quick = '<nav class="tg-quick" aria-label="本章實用內容快速定位"><strong>快速定位</strong><a href="#tg-framework-title">師生素養架構</a><a href="#tg-table-0">代理人使用檢核</a><a href="#tg-table-2">AI 使用判斷原則</a><a href="#tg-table-3">教師自我檢核</a><a href="#' + headingSlug('應用AI 輔助學習「人機協作」班級公約（舉例）') + '">班級公約</a></nav>';
  text = once(text, '**重點先看**', `${quick}\n\n**重點先看**`);
  text = once(text, '<p class="tg-scroll-hint">表格可左右捲動；鍵盤可先聚焦表格，再用左右方向鍵閱讀。</p><div class="tg-scroll" role="region" tabindex="0" aria-labelledby="tg-table-2">',
    '<p class="tg-editor-note">本站閱讀提示：表 3-1 說明教學任務中 AI 的使用方式；後文班級公約提供情境示例。實際允許範圍與揭露方式，請依教師針對該任務明訂的規範判斷。</p>\n\n### 教師教學使用 AI 判斷原則\n\n<p class="tg-scroll-hint">表格可左右捲動；鍵盤可先聚焦表格，再用左右方向鍵閱讀。</p><div class="tg-scroll" role="region" tabindex="0" aria-labelledby="tg-table-2">');
  return text;
}
