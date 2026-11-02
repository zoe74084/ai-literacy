// Additive reading aids: stripping these figures must recover the original page exactly.
import { slug as headingSlug } from 'github-slugger';

const figure = (id, title, body, note = '') => `<figure class="tv" data-teacher-visual="${id}" aria-labelledby="tv-${id}"><figcaption id="tv-${id}"><span class="tv-kicker">閱讀圖解・依原文整理</span><strong>${title}</strong></figcaption>${body}${note ? `<p class="tv-note">${note}</p>` : ''}</figure>`;
const link = (heading, text) => `<a href="#${headingSlug(heading)}">${text}</a>`;
const step = (n, title, text) => `<li><span class="tv-num" aria-hidden="true">${n}</span><strong>${title}</strong><span>${text}</span></li>`;

const rows = [
  ['AI 倫理', ['掌握 AI 技術與倫理', '內化 AI 倫理教學責任', '形塑以 AI 促進創新的倫理'], ['（一）取得理解：掌握 AI 技術與倫理', '（二）應用深化：內化 AI 倫理教學責任', '（三）創造轉型：形塑以 AI 促進創新的倫理']],
  ['AI 基礎與技術', ['培養 AI 的基礎知識', '應用 AI 的技能', '使用 AI 創新'], ['（一）取得理解：培養 AI 的基礎知識', '（二）深化應用：應用 AI 的技能', '（三）創新轉型：使用 AI 創新']],
  ['AI 賦能教學', ['善用 AI 輔助學科教學', '整合 AI 與教學法', '促進 AI 教學轉型創新'], ['（一）取得理解：善用 AI 輔助學科教學', '（二）深化應用：整合 AI 與教學法', '（三）創造轉型：促進 AI 教學轉型創新']],
  ['AI 促進教師專業發展', ['覺知專業角色・實踐終身學習', '應用 AI 與數據分析驅動專業發展', '結合 AI 共創教師專業發展'], ['（一）取得理解：覺知 AI 時代的專業角色實踐終身學習', '（二）深化應用：應用 AI 與數據分析驅動專業發展', '（三）創造轉型：結合 AI 共創教師專業發展']],
];
const levels = ['取得理解', '深化應用', '創造轉型'];
const matrix = figure('matrix', '四個向度，三種發展層級',
  '<div class="tv-principle"><span>貫穿所有向度與層級</span><strong>以人為中心</strong><span>教師保有專業判斷與決策權</span></div>' +
  '<div class="tv-matrix"><div class="tv-columns" aria-hidden="true"><span>發展向度</span>' + levels.map(x => `<strong>${x}</strong>`).join('') + '</div>' +
  rows.map(([name, goals, headings]) => `<div class="tv-row"><strong class="tv-facet">${name}</strong>${goals.map((goal, i) => `<div class="tv-cell tv-level-${i}"><span class="tv-mobile-level">${levels[i]}</span>${link(headings[i], goal)}</div>`).join('')}</div>`).join('') + '</div>',
  '各向度的發展層級可以不同；並非每位教師都需要達到創造轉型。點選各格可閱讀對應原文；下方保留完整原表。');

const workflow = figure('workflow', '從教學需求到教師判斷的人機協作',
  '<div class="tv-principle tv-compact"><strong>教師主導使用時機、策略與最終決策</strong></div><ol class="tv-flow">' +
  step('01', '界定教學需求', '先釐清目標、學生需求與使用情境') +
  step('02', '選用適切工具', '評估教育目的、隱私與資訊安全') +
  step('03', '提示與多輪對話', '提供脈絡及標準，迭代探索與反思') +
  step('04', '檢核 AI 初稿', '進行事實查核與倫理審查') +
  '</ol><div class="tv-decisions"><strong>教師專業判斷</strong><span>接受</span><span>修訂</span><span>拒絕</span></div><div class="tv-return">回饋線：檢核後回到「提示與多輪對話」修正；必要時重新選用工具</div>',
  '綜合本節與「AI 賦能教學」的相關內容整理為閱讀流程；AI 產出作為初稿，使用者須對最終結果負責。');

const cycle = figure('cycle', '設計 → 實施 → 反思，再回到設計',
  '<div class="tv-cycle"><div class="tv-cycle-core"><span>每一輪都要守住</span><strong>以人為中心</strong><span>教師專業決定權<br>學生自主與包容</span></div><ol class="tv-orbit">' +
  step('01', '設計', '依學習目標，選用與整合 AI 工具') +
  step('02', '實施', '觀察學習過程、師生互動與學生需求') +
  step('03', '反思', '依學習數據與回饋，檢視效益及風險') +
  '</ol></div><div class="tv-return">回饋線：將「反思」帶回「設計」，持續調整工具與教學策略</div>',
  '原文提出的教學改善循環；循環代表持續檢視與調整，不代表導入 AI 必然提升學習成效。');

export function addTeacherVisuals(text, slug) {
  if (slug !== 'framework/full/04') return text;
  const insertions = [
    ['表 1 教師 AI 素養框架', matrix],
    ['### （二）深化應用：應用 AI 的技能', workflow],
    ['### （二）深化應用：整合 AI 與教學法', cycle],
  ];
  for (const [anchor, visual] of insertions) {
    if (text.split(anchor).length !== 2) throw new Error(`Teacher visual: expected one anchor: ${anchor}`);
    // Insert above the source table, and after the source heading for section diagrams.
    text = text.replace(anchor, anchor.startsWith('#') ? `${anchor}\n\n${visual}` : `${visual}\n\n${anchor}`);
  }
  return text;
}
