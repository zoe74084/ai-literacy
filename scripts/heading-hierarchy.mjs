// Repairs verified PDF heading errors after pagination, so existing page URLs stay stable.
// Deliberately scoped: a short numbered sentence is not necessarily a section heading.
import GithubSlugger from 'github-slugger';
import { marked } from 'marked';
const cn = '[一二三四五六七八九十]+';
const chineseItem = new RegExp(`^${cn}、`);
const parenItem = new RegExp(`^[（(]${cn}[）)]`);
const section = /^[壹貳參肆伍陸柒捌玖拾]、/;
const numericItem = /^\d{1,2}[、.．]\s*\D/;
const topic = /^\d+-\d+\.\s*\S/;
const plain = (line) => line.trim().replace(/^#{1,6}\s*/, '').replace(/^[-*+]\s+/, '').replace(/\*\*/g, '').replace(/\u2063/g, '').trim();
const heading = (level, text) => `${'#'.repeat(level)} ${text}`;

export function repairHeadingHierarchy(lines, slug) {
  if (slug === 'guides/parent/01') {
    lines = [...lines];
    const at = lines.findIndex((line) => plain(line) === '部長');
    const next = lines.findIndex((line, i) => i > at && line.trim());
    if (at >= 0 && next >= 0 && plain(lines[next]) === '序') {
      lines[at] = '## 部長序';
      lines[next] = '';
    }
  }
  let inAppendix = false;
  let inCases = false;
  let inQA = false;
  let inCode = false;
  let topicSeen = false;
  const out = [];
  for (const line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode || /^\s*(?:\||<|>)/.test(line)) { out.push(line); continue; }
    const text = plain(line);
    const h = /^#{1,6}\s/.test(line);
    let level = null;
    let paragraph = false;
    // Empty Markdown headings can survive cleaning when their text was only bold markers.
    if (/^#{1,6}(?:\s|$)/.test(line) && !text) continue;
    // Figure/table captions describe an object; they do not define a document section.
    if (h && /^[圖表]\s*\d+(?:[-－]\d+)?(?:\s|[：:])/.test(text)) paragraph = true;

    if (slug.startsWith('framework/full/')) {
      if (chineseItem.test(text) && text.length < 45) level = 2;
      if (/framework\/full\/0[45]$/.test(slug)) {
        if (parenItem.test(text) && /^(?:（[一二三]）)(?:取得理解|應用深化|深化應用|創造轉型|創新轉型)[：:]/.test(text)) level = 3;
        if (numericItem.test(text) && text.length < 65) level = 4;
        if (/^(教師|學生)\s*AI\s*素養結語$/.test(text)) level = 2;
      }
    }
    if (slug === 'notices/adults' && chineseItem.test(text) && text.length < 90) level = 2;
    if (slug.startsWith('handbooks/')) {
      if (chineseItem.test(text) && text.length < 90 && !/[。；]/.test(text)) level = 2;
      if (parenItem.test(text) && text.length < 70 && (h || /^\*\*.*\*\*$/.test(line.trim()))) level = 3;
    }
    if (slug === 'guides/teacher/08' && text === '（七）情感依附錯位') level = 4;
    if (slug.startsWith('guides/parent/')) {
      if (/^附錄/.test(text) && h) { inAppendix = true; inQA = false; level = 2; }
      if (inAppendix && parenItem.test(text) && text.length < 65) level = 3;
      if (inAppendix && numericItem.test(text) && h) level = 4;
      if (/^家長\s*Q&A$/.test(text)) { inQA = true; level = 2; }
      if (section.test(text)) inQA = false;
      if (inQA && /^問題\s*\d+[：:]/.test(text) && h) level = 3;
      if (inQA && /^建議[：:]$/.test(text)) paragraph = true;
    }
    if (slug === 'guides/parent/01') {
      // Cover labels and salutations were mistaken for separate document sections.
      if (h && /^(?:115\s*年|Minister|Note|Editor's|部長|序|親愛的家長您好：|中小學家長數位學習知能指引推廣)/.test(text)) paragraph = true;
      if (/^(部長序|主編 序|指引簡介)$/.test(text)) { level = 2; paragraph = false; }
    }
    if (slug === 'guides/principal/04') {
      if (text === '校長數位行政領導快速檢核表' || text === '學校情境案例') {
        level = 2; inCases = text === '學校情境案例';
      }
      if (inCases && /^【(?:國小|國中|高中)案例】/.test(text)) level = 3;
      if (inCases && parenItem.test(text) && text.length < 30) level = 4;
    }
    if (slug.startsWith('lessons/')) {
      if (/^附件[一二三四五六七八九十\d]/.test(text) && text.length < 95) level = 2;
      if (text === '遵守 AI 素養燈號規範') level = 3;
      if (/^[綠黃紅]燈[：:]/.test(text) && text.length < 35) level = 4;
    }
    if (slug === 'guides/teacher/07') {
      // This page continues the school-stage examples from page 06, before section 三.
      if (!out.length) out.push('## 二、國中與高中教育階段（續）', '', '### 教學示例（續）', '');
      if (/^三、應用其他生成式AI$/.test(text)) level = 2;
      else if (/^●?範例[一二三四五六七八九十]+[：:]/.test(text) && /\*\*/.test(line)) {
        // Some example names share a line with the designer credit; retain that credit as prose.
        const m = text.match(/^(.*?)(\s*設計者[：:].*)?$/);
        out.push(heading(3, m[1]), '');
        if (m[2]) out.push(m[2].trim(), '');
        continue;
      } else if (h || (numericItem.test(text) && /^\*\*[^*]+\*\*$/.test(line.trim()))) level = 4;
      if (/^(問思與討論|啟思小語)$/.test(text)) level = 2;
    }
    if (slug.startsWith('admin/bigdata/xapi/') && /\/(?:05|06|07|08|09|10)$/.test(slug)) {
      if (chineseItem.test(text) && text.length < 25) level = 2;
      if (topic.test(text) && text.length < 65) { level = 3; topicSeen = true; }
      if (h && /^(?:xAPI 欄位規格與平臺提供情形|JSON 範例)$/.test(text)) {
        if (!topicSeen) {
          // A table split across pages is a continuation, not an unparented top-level section.
          out.push('## 學習資料欄位表與規格範例（續）', '', '### 前頁項目（續）', '');
          topicSeen = true;
        }
        level = 4;
      }
      if (h && /^學習資料類別/.test(text)) paragraph = true;
      if (level === 3 && !out.some((l) => /^## /.test(l))) out.push('## 學習資料欄位表與規格範例', '');
    }
    if (slug === 'guides/parent/chapter-01' && /^第一章/.test(text)) {
      // The complete chapter name is already the page H1.
      continue;
    }
    if (paragraph) out.push(`**${text}**`);
    else if (level !== null) out.push(heading(level, text));
    else out.push(line);
  }
  // Demoting a caption may expose an orphan heading. Keep the remaining outline contiguous.
  let previous = 1;
  return out.map((line) => {
    const match = line.match(/^(#{2,6}) (.+)$/);
    if (!match) return line;
    const level = Math.min(match[1].length, previous + 1);
    previous = level;
    return heading(level, match[2]);
  });
}

// Insert a stable new URL for chapter 1 rather than renumbering existing chapter 2–5 URLs.
export function separateParentChapter(chunks, slug) {
  if (slug !== 'guides/parent' || !chunks.length) return chunks;
  const first = chunks[0];
  const at = first.body.findIndex((line) => /^第一章掌握數位學習趨勢與願景$/.test(plain(line)));
  if (at < 0) throw new Error('家長指引第一章分頁標題不存在，請核對來源');
  const before = first.body.slice(0, at);
  // Keep the chapter cover label with the chapter, not with the preface.
  const cover = before.findLastIndex((line) => /CHAPTER\s*1\s*$/.test(line));
  const cut = cover >= 0 ? cover : at;
  return [
    { ...first, body: first.body.slice(0, cut), pageId: '01' },
    { heading: '第一章 掌握數位學習趨勢與願景', body: first.body.slice(cut), pageId: 'chapter-01' },
    ...chunks.slice(1).map((chunk, i) => ({ ...chunk, pageId: String(i + 2).padStart(2, '0') })),
  ];
}

function headingIds(lines) {
  const slugger = new GithubSlugger();
  return marked.lexer(lines.join('\n')).filter((token) => token.type === 'heading').map((token) => {
    const text = marked.parseInline(token.text).replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return { text, id: slugger.slug(text) };
  });
}

// Keep existing deep links to captions/demoted headings. Headings whose content moved
// to the new parent chapter point to the visible chapter link at the end of the preface.
export function preserveHeadingAnchors(before, after, movedTarget = null) {
  const current = new Set(headingIds(after).map((h) => h.id));
  const out = [...after];
  const moved = [];
  for (const { text, id } of headingIds(before)) {
    if (!text.trim() || !id || current.has(id)) continue;
    const anchor = `<span id="${id.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></span>`;
    const at = out.findIndex((line) => plain(line) === text);
    if (at >= 0) out.splice(at, 0, anchor, '');
    else if (movedTarget) moved.push(anchor);
    else out.push('', anchor);
    current.add(id);
  }
  if (movedTarget) out.push('', ...moved, '', `> [第一章已獨立成頁：掌握數位學習趨勢與願景](${movedTarget})`, '');
  return out;
}
