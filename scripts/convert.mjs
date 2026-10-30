#!/usr/bin/env node
// 把 source-md/ 轉成 Starlight 頁面（src/content/docs/**/*.md）。
// 可重跑：每次執行都會先刪掉 src/content/docs/ 底下所有 .md（手寫頁面一律用 .mdx，不會被動到），
// 再依下方 DOCS 對照表重新產生，同時輸出 src/generated/sidebar.json 與 src/generated/report.json。
// 只清理 PDF 轉檔雜訊，不改寫、不摘要原文。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'source-md');
// 查詢版（Starlight）放在 /library/ 底下；首頁與導讀頁是 src/pages/ 的自訂頁面
const OUT = path.join(ROOT, 'src/content/docs/library');
const LIB = '/library';
const GEN = path.join(ROOT, 'src/generated');

// 超過這個大小（bytes）的文件依章節拆頁
const SPLIT_THRESHOLD = 60_000;
// 拆完後單頁仍超過這個大小，就再往下一層拆
const RESPLIT_THRESHOLD = 90_000;
// 小於這個大小的章節併入下一章（避免只有一行字的頁面）
const MIN_CHUNK = 1_500;

export const AUDIENCES = {
  teacher: '教師',
  student: '學生',
  parent: '家長',
  admin: '校長・行政',
};
const ALL = Object.keys(AUDIENCES);

// ---------------------------------------------------------------------------
// 來源檔 → 網站頁面對照表
// ---------------------------------------------------------------------------

const STAGES = {
  國小: { code: 'es', order: 1 },
  國中: { code: 'jh', order: 2 },
  普高: { code: 'sh', order: 3 },
  技高: { code: 'vs', order: 4 },
};

// 教案檔名的「領域」欄位寫法不一，統一成領域名稱以便篩選
const DOMAIN_ALIASES = {
  國語文領域: '國語文',
  國語文領據: '國語文',
  英語文領域: '英語文',
  數學領域: '數學',
  自然科學領域: '自然科學',
  自然領域: '自然科學',
  社會領域: '社會',
  綜合活動領域: '綜合活動',
  綜合領域: '綜合活動',
  科技領域: '科技',
  多媒體動畫科: '多媒體動畫科',
  彈性學習課程: '彈性學習課程',
};

/** @type {Array<{file:string, slug:string, title?:string, label?:string, audience:string[], group:string, order:number, split?:boolean, lesson?:object}>} */
const DOCS = [
  // 01 AI 人才方舟計畫
  { file: '01_AI人才方舟_AI人才方舟計畫.md', slug: 'ark', title: 'AI 人才方舟計畫', label: '中文版', audience: ALL, group: 'ark', order: 1 },
  { file: '01_AI人才方舟_AI_Talents_Art_Project.md', slug: 'ark/en', title: 'AI Talents Ark Project（English）', label: 'English', audience: ALL, group: 'ark', order: 2 },
  { file: '01_AI人才方舟_AI人材アーク計画.md', slug: 'ark/ja', title: 'AI 人材アーク計画（日本語）', label: '日本語', audience: ALL, group: 'ark', order: 3 },
  { file: '01_AI人才方舟_AI_인재_아크_계획.md', slug: 'ark/ko', title: 'AI 인재 아크 계획（한국어）', label: '한국어', audience: ALL, group: 'ark', order: 4 },

  // 02 AI 素養框架
  { file: '02_AI素養框架_臺灣中小學教師與學生AI素養框架.md', slug: 'framework/full', title: '臺灣中小學教師與學生 AI 素養框架（全文）', label: '框架全文', audience: ['teacher', 'student', 'admin'], group: 'framework', order: 2, split: true },
  { file: '02_AI素養框架_臺灣中小學教師與學生AI素養框架公版簡報.md', slug: 'framework/slides', title: '附錄：AI 素養框架公版簡報', label: '附錄：公版簡報', audience: ['teacher', 'student', 'admin'], group: 'framework', order: 3 },

  // 03 注意事項
  { file: '03_生成式AI注意事項_中小學使用生成式人工智慧注意事項2.1_學生版.md', slug: 'notices/student', title: '中小學使用生成式人工智慧注意事項 2.1（學生版）', label: '學生版', audience: ['student'], group: 'notices', order: 1 },
  { file: '03_生成式AI注意事項_中小學使用生成式人工智慧注意事項2.1_教師_行政人員及家長版.md', slug: 'notices/adults', title: '中小學使用生成式人工智慧注意事項 2.1（教師、行政人員及家長版）', label: '教師、行政人員及家長版', audience: ['teacher', 'admin', 'parent'], group: 'notices', order: 2 },

  // 04 教學指引（115 年）
  { file: '04_教學指引_115年中小學教師數位與AI教學指引1150920.md', slug: 'guides/teacher', title: '115 年中小學教師數位與 AI 教學指引', label: '教師數位與 AI 教學指引', audience: ['teacher'], group: 'guides', order: 1, split: true },
  { file: '04_教學指引_115年中小學家長數位與AI學習知能指引v1150908.md', slug: 'guides/parent', title: '115 年中小學家長數位與 AI 學習知能指引', label: '家長數位與 AI 學習知能指引', audience: ['parent'], group: 'guides', order: 2, split: true },
  { file: '04_教學指引_115年中小學校長數位與AI學習領導指引1150920.md', slug: 'guides/principal', title: '115 年中小學校長數位與 AI 學習領導指引', label: '校長數位與 AI 學習領導指引', audience: ['admin'], group: 'guides', order: 3, split: true },
  // 04 教學指引（114 年，歷史版本）
  { file: '04_教學指引_教育部中小學數位教學指引3.0版1140113-.md', slug: 'guides/history/teaching-3', title: '教育部中小學數位教學指引 3.0 版（114 年）', label: '數位教學指引 3.0 版（114 年）', audience: ['teacher'], group: 'history', order: 1, split: true },
  { file: '04_教學指引_教育部中小學家長數位學習知能指引1140113-.md', slug: 'guides/history/parent', title: '教育部中小學家長數位學習知能指引（114 年）', label: '家長數位學習知能指引（114 年）', audience: ['parent'], group: 'history', order: 2, split: true },
  { file: '04_教學指引_教育部中小學校長數位學習領導指引1140113-.md', slug: 'guides/history/principal', title: '教育部中小學校長數位學習領導指引（114 年）', label: '校長數位學習領導指引（114 年）', audience: ['admin'], group: 'history', order: 3, split: true },

  // 05 學習應用手冊
  { file: '05_學習應用手冊_115年中小學AI之學習應用手冊-國小生聰明用AIv1150908.md', slug: 'handbooks/elementary', title: '國小生聰明用 AI', label: '國小：聰明用 AI', audience: ['student'], group: 'handbooks', order: 1, split: true },
  { file: '05_學習應用手冊_115年中小學AI之學習應用手冊-國中生靈活用AIv1150908.md', slug: 'handbooks/junior', title: '國中生靈活用 AI', label: '國中：靈活用 AI', audience: ['student'], group: 'handbooks', order: 2, split: true },
  { file: '05_學習應用手冊_115年中小學AI之學習應用手冊-高中生智慧駕馭AIv1150908.md', slug: 'handbooks/senior', title: '高中生智慧駕馭 AI', label: '高中：智慧駕馭 AI', audience: ['student'], group: 'handbooks', order: 3, split: true },

  // 06 家長宣導
  { file: '06_家長宣導_中小學數位學習發展趨勢與推動家長陪伴公版簡報0911.md', slug: 'parents/briefing', title: '中小學數位學習發展趨勢與推動家長陪伴（公版簡報）', label: '家長陪伴公版簡報', audience: ['parent'], group: 'parents', order: 1 },

  // 07 數位學習實施計畫
  { file: '07_數位學習實施計畫_115年度中小學數位學習實施計畫說明.md', slug: 'admin/plan', title: '115 年度中小學數位學習實施計畫說明', label: '實施計畫說明', audience: ['admin'], group: 'admin-plan', order: 1, split: true },
  { file: '07_數位學習實施計畫_115年度中小學數位學習實施計畫說明_函文附件.md', slug: 'admin/plan-attachment', title: '115 年度中小學數位學習實施計畫說明（函文附件）', label: '函文附件', audience: ['admin'], group: 'admin-plan', order: 2 },

  // 08 教育大數據
  { file: '08_教育大數據_學習資料xAPI規格_v1.6.md', slug: 'admin/bigdata/xapi', title: '學習資料 xAPI 規格 v1.6', label: '學習資料 xAPI 規格 v1.6', audience: ['admin'], group: 'admin-data', order: 1, split: true },
  { file: '08_教育大數據_教育部教育大數據介接申請規範1150821奉核.md', slug: 'admin/bigdata/rules', title: '教育部教育大數據介接申請規範', label: '介接申請規範', audience: ['admin'], group: 'admin-data', order: 2 },
  { file: '08_教育大數據_教育部教育大數據介接申請書1150821奉核.md', slug: 'admin/bigdata/application', title: '教育部教育大數據介接申請書', label: '介接申請書', audience: ['admin'], group: 'admin-data', order: 3 },
  { file: '08_教育大數據_教育部教育大數據介接合作協議書1150821奉核.md', slug: 'admin/bigdata/agreement', title: '教育部教育大數據介接合作協議書', label: '介接合作協議書', audience: ['admin'], group: 'admin-data', order: 4 },
];

// 04 的 01.–13. 課例：從檔案第一行標題解析出 編號／學段／領域／設計者／單元名稱
function lessonSpec(file, firstLine) {
  const m = firstLine.match(/^#\s*(\d+)\.\s*(國小|國中|普高|技高)\s+(\S+?)-(.+?)\s*-\s*(.+?)\s*$/);
  if (!m) throw new Error(`無法解析教案標題：${file} → ${firstLine}`);
  const [, num, stage, rawDomain, author, title] = m;
  const domain = DOMAIN_ALIASES[rawDomain];
  if (!domain) throw new Error(`未知的領域「${rawDomain}」：${file}`);
  const s = STAGES[stage];
  return {
    file,
    slug: `lessons/${s.code}-${num.padStart(2, '0')}`,
    title: title.replace(/\s+/g, ' ').trim(),
    label: title.replace(/\s+/g, ' ').trim(),
    audience: ['teacher'],
    group: `lessons-${s.code}`,
    order: Number(num),
    lesson: { number: Number(num), stage, stageOrder: s.order, domain, rawDomain, author: author.replace(/_/g, '').trim().split(/\s+/).join('、') },
  };
}

// ---------------------------------------------------------------------------
// 清理規則
// ---------------------------------------------------------------------------

const stats = {};
const bump = (k, n = 1) => (stats[k] = (stats[k] ?? 0) + n);

const PAGE_MARK = /^<!--\s*第\s*\d+\s*頁\s*-->$/;
const CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/;
const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
const DOT_LEADER = /(\.{5,}|…{3,}|·{5,}|‧{5,}|．{5,})/;
const TOC_HEADING = /^(目錄|目次|圖目錄|表目錄|圖表目錄|CONTENTS?|TableofContents|목차)$/i;
const ALLOWED_TAGS = /^<\/?(br|sup|sub)\s*\/?>/i;

// 康熙部首、相容表意字（PDF 字型常見）→ 一般漢字，否則搜尋「一」找不到「⼀」
function normalizeCompatChars(s) {
  return s.replace(/[⺀-⿟豈-﫿]/g, (ch) => {
    const n = ch.normalize('NFKC');
    if (n !== ch) bump('相容字元／康熙部首轉為一般漢字');
    return n;
  });
}

function cleanInline(s) {
  let out = s;
  // <u>、<mark> 等排版標籤：保留文字、移除標籤
  out = out.replace(/<\/?(u|mark|span|font|b|i|strong|em)(\s[^>]*)?>/gi, () => (bump('移除 <u>/<mark> 等排版標籤'), ''));
  // PDF 轉出的刪除線（大型裝飾首字常被誤判，且與後文斷開，例如「~~校~~ 長」）
  out = out.replace(/~~([^~]*[\u3400-\u9FFF])~~\s+(?=[\u3400-\u9FFF])/g, '~~$1~~');
  out = out.replace(/~~/g, () => (bump('移除誤判的刪除線 ~~'), ''));
  // 其他不是 HTML 的角括號（例如 <start_id>）轉成實體，避免被當成標籤吃掉
  out = out.replace(/<(?!\/?(br|sup|sub)\b)/gi, (m, _g, off, str) => {
    if (ALLOWED_TAGS.test(str.slice(off))) return m;
    bump('跳脫非 HTML 角括號');
    return '&lt;';
  });
  // 空的粗體 ****、粗體內只有空白
  out = out.replace(/\*\*\s*\*\*/g, '');
  // PDF 在英文前後補的空白：緊貼全形標點的空白拿掉，避免「）」被擠到行首
  out = out.replace(/[ \t]+(?=[，。、；：！？）」』》】〉])/g, () => (bump('移除全形標點旁多餘的空白'), ''));
  out = out.replace(/(?<=[（「『《【〈])[ \t]+/g, () => (bump('移除全形標點旁多餘的空白'), ''));
  return out;
}

function cleanHeadingText(s) {
  return cleanInline(s)
    .replace(/\*\*/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/[ \t　]+/g, ' ')
    .trim();
}

// 只有數字／國字編號的「標題」（例如 ###### **壹**）不是真的標題
const NUMERAL_ONLY = /^[\s\d一二三四五六七八九十壹貳參肆伍陸柒捌玖拾IVXivx.、()（）]+$/;

function isTableLine(line) {
  return /^\s*\|.*\|?\s*$/.test(line) && line.trim().startsWith('|');
}

function splitRow(line) {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|') && !t.endsWith('\\|')) t = t.slice(0, -1);
  return t.split('|').map((c) => c.trim());
}

const SEP_CELL = /^:?-{3,}:?$/;

function fixTable(lines) {
  // 目錄表：多數列帶點線引導 → 整張刪除
  const dotRows = lines.filter((l) => DOT_LEADER.test(l)).length;
  if (dotRows >= Math.max(2, lines.length * 0.4)) {
    bump('移除目錄（點線引導表格）');
    return [];
  }
  let rows = lines.map(splitRow);
  // 移除既有分隔列，稍後統一補上
  const hadSep = rows.findIndex((r) => r.every((c) => SEP_CELL.test(c)));
  rows = rows.filter((r) => !r.every((c) => SEP_CELL.test(c) || c === ''));
  if (hadSep !== 1) bump('補上表格分隔列');
  if (rows.length === 0) return [];
  const cols = Math.max(...rows.map((r) => r.length));
  let padded = 0;
  rows = rows.map((r) => {
    if (r.length < cols) padded++;
    return [...r, ...Array(cols - r.length).fill('')];
  });
  if (padded) bump('補齊表格欄數', padded);
  rows = rows.map((r) =>
    r.map((cell) => {
      let c = cleanInline(cell);
      // 直排文字「面<br>向」→「面向」
      const parts = c.split(/<br\s*\/?>/i);
      if (parts.length > 1 && parts.every((p) => p.replace(/\*\*/g, '').trim().length <= 1)) {
        bump('合併表格直排文字');
        c = parts.map((p) => p.trim()).join('');
      }
      return c.replace(/\|/g, '\\|').replace(/\\\\\|/g, '\\|');
    }),
  );
  const toLine = (r) => `| ${r.join(' | ')} |`;
  return [toLine(rows[0]), toLine(Array(cols).fill('---')), ...rows.slice(1).map(toLine)];
}

// 1. 去頭：檔案開頭的 # 標題與 > 來源 / 原始檔名 / 頁數
function parseHeader(text) {
  const lines = text.split('\n');
  const meta = { docTitle: '', originalFile: '', pages: null };
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  if (lines[i]?.startsWith('# ')) meta.docTitle = lines[i++].slice(2).trim();
  while (i < lines.length && (!lines[i].trim() || lines[i].startsWith('>'))) {
    const l = lines[i];
    let m;
    if ((m = l.match(/原始檔名：(.+)$/))) meta.originalFile = m[1].trim();
    else if ((m = l.match(/頁數：(\d+)/))) meta.pages = Number(m[1]);
    else if (l.startsWith('>') && !/來源：/.test(l)) break;
    i++;
  }
  return { meta, body: lines.slice(i).join('\n') };
}

// 2. 依頁碼註解切頁，處理頁首頁尾與單獨頁碼，再接回來
// 下一段可以接上去：開頭是中文，不是章節記號、小標、編號或沒有標點的短標籤
function continues(line) {
  const t = line.trim();
  if (!/^[\u3400-\u9fff\uf900-\ufaff（「]/.test(t)) return false;
  if (/^[壹貳參肆伍陸柒捌玖拾](\s|$|[^\u3400-\u9fff])/.test(t) || /^[壹貳參肆伍陸柒捌玖拾]$/.test(t)) return false;
  if (/^[（(][一二三四五六七八九十\d]+[）)]|^[一二三四五六七八九十]+[、．.]|^第.[章節課]/.test(t)) return false;
  if (/___/.test(t)) return false;
  const first = t.split(/(?<=[。！？])/)[0];
  if (!/[，。！？；：、」）]/.test(first) && [...first].length <= 20) return false;
  return true;
}

// 句子還沒結束：停在逗號、頓號，或停在一般中文字且最後一個子句夠長（不是標題、編號）
function midSentence(line) {
  if (/^\s*([-*+]\s+|\d+\.\s+)?\*\*[^*]+\*\*\s*$/.test(line)) return false; // 整行粗體是小標
  const t = line.replace(/\*\*/g, '').trim().replace(/^([-*+]|\d+\.)\s+/, '');
  if (/[，、]$/.test(t)) return true;
  if (!CJK.test(t.slice(-1))) return false;
  if (/[●⚫]/.test(t) || /^\p{Extended_Pictographic}/u.test(t) || /如下[圖表]?$/.test(t)) return false;
  if (/^[（(][一二三四五六七八九十]+[）)]/.test(t) && !/。/.test(t)) return false; // 「（三）……」小標
  const tail = t.split(/[。！？；：:]/).pop().trim().replace(/^([-*+]|\d+\.)\s*/, '');
  if (/^[（(]?[一二三四五六七八九十\d]+[）)、.．]/.test(tail) || /^[壹貳參肆伍陸柒捌玖拾]、/.test(tail)) return /，/.test(tail) && [...tail].length >= 20;
  return /[，。]/.test(t) && [...tail].length >= 8 && [...t].length >= 28;
}

function cleanPages(body) {
  const pages = [[]];
  for (const line of body.split('\n')) {
    if (PAGE_MARK.test(line.trim())) {
      pages.push([]);
      bump('移除頁碼註解 <!-- 第 N 頁 -->');
    } else pages[pages.length - 1].push(line);
  }

  const isPageNum = (l) => {
    const t = l.replace(/\*\*/g, '').replace(/#/g, '').trim();
    return (
      /^[-–—]?\s*\d{1,4}(\s+\d{1,4}){0,2}\s*[-–—]?$/.test(t) ||
      /^[-–—]?\s*[ivxlc]{1,5}\s*[-–—]?$/i.test(t) ||
      /^第\s*\d+\s*頁(\s*，?\s*共\s*\d+\s*頁)?$/.test(t) ||
      /^\d+\s*\/\s*\d+$/.test(t)
    );
  };

  // 找出在三頁以上頁緣重複出現的短行（頁首、頁尾）
  const edgeCount = new Map();
  const edges = (p) => {
    const idx = p.map((l, i) => (l.trim() ? i : -1)).filter((i) => i >= 0);
    return [...new Set([...idx.slice(0, 1), ...idx.slice(-1)])];
  };
  for (const p of pages) {
    const seen = new Set();
    for (const i of edges(p)) {
      if (/^\s*([|>\-*+（(]|\d+\.\s)/.test(p[i])) continue; // 表格、引言、清單不算頁首頁尾
      const key = p[i].replace(/[#*\s]/g, '');
      if (key.length === 0 || key.length > 40 || /[：:]$/.test(key) || seen.has(key)) continue;
      seen.add(key);
      edgeCount.set(key, (edgeCount.get(key) ?? 0) + 1);
    }
  }
  const repeated = new Set([...edgeCount].filter(([k, n]) => n >= 4 && n >= pages.length * 0.1 && !NUMERAL_ONLY.test(k)).map(([k]) => k));
  if (process.env.DEBUG_EDGES) console.error([...repeated].map((k) => `${k} ×${edgeCount.get(k)}`).join('\n'));

  for (const p of pages) {
    for (const i of edges(p).sort((a, b) => b - a)) {
      const l = p[i];
      if (isPageNum(l)) {
        p.splice(i, 1);
        bump('移除單獨一行的頁碼');
      } else if (repeated.has(l.replace(/[#*\s]/g, ''))) {
        p.splice(i, 1);
        bump('移除重複的頁首／頁尾');
      }
    }
  }

  // 接回：上一頁最後一段沒有句尾標點、下一頁第一段直接接續中文 → 合併成同一段
  const out = [];
  for (const p of pages) {
    while (p.length && !p[0].trim()) p.shift();
    while (p.length && !p[p.length - 1].trim()) p.pop();
    if (!p.length) continue;
    const prev = out[out.length - 1];
    const first = p[0];
    const plain = (l) => l && !/^\s*([#>|\-*+]|\d+\.\s|<)/.test(l);
    // 上一頁最後一行可以是清單項目或粗體開頭的段落，只要它停在句子中間
    const prose = (l) => l && !/^\s*([#>|]|<)/.test(l);
    if (
      prev !== undefined &&
      ((plain(prev) && CJK.test(prev.slice(-1)) && CJK.test(first.charAt(0))) || (prose(prev) && midSentence(prev) && continues(first))) &&
      plain(first)
    ) {
      out[out.length - 1] = prev + first;
      out.push(...p.slice(1));
      bump('接回跨頁斷開的段落');
    } else {
      if (out.length) out.push('');
      out.push(...p);
    }
  }
  return out;
}

// 3. 逐行清理
function cleanLines(lines) {
  const out = [];
  let inFence = false;
  for (let raw of lines) {
    if (/^\s*```/.test(raw)) {
      inFence = !inFence;
      out.push(raw);
      continue;
    }
    if (inFence) {
      out.push(raw);
      continue;
    }
    // 字型編碼錯誤造成的亂碼行（含控制字元，或大部分是替代字元）
    if (CTRL.test(raw)) {
      bump('移除亂碼行（控制字元）');
      continue;
    }
    const visible = raw.replace(/\s/g, '');
    const bad = (visible.match(/�/g) ?? []).length;
    if (visible.length && bad / visible.length >= 0.3) {
      bump('移除亂碼行（替代字元）');
      continue;
    }
    let line = normalizeCompatChars(raw.replace(/\s+$/, ''));
    if (!line.trim()) {
      out.push('');
      continue;
    }
    // 目錄行：點線引導 + 頁碼
    if (!isTableLine(line) && DOT_LEADER.test(line) && /[\divxlc]\**\s*$/i.test(line)) {
      bump('移除目錄行（點線引導）');
      continue;
    }
    if (isTableLine(line)) {
      out.push(line.trim());
      continue;
    }
    // PDF 縮排：4 格以上會被 Markdown 當成程式碼區塊 → 去掉行首縮排
    if (/^\s{4,}\S/.test(line)) {
      bump('移除造成程式碼區塊的行首縮排');
    }
    line = line.replace(/^\s+/, '');
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const text = cleanHeadingText(h[2]);
      if (!text || /^[\p{P}\p{S}\s]*$/u.test(text)) {
        bump('移除空標題');
        continue;
      }
      out.push(`${h[1]} ${text}`);
      continue;
    }
    out.push(cleanInline(line));
  }
  return out;
}

// 4. 區塊層級：目錄區塊、表格、重複標題、假標題
function cleanBlocks(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h = line.match(/^(#{1,6}) (.*)$/);
    // 「目錄」標題：連同其後到下一個標題之間的內容一起移除
    if (h && TOC_HEADING.test(h[2].replace(/\s/g, ''))) {
      bump('移除目錄區塊');
      i++;
      while (i < lines.length && !/^#{1,6} /.test(lines[i])) i++;
      i--;
      continue;
    }
    if (h) {
      const text = h[2];
      // 連續重複的同一個標題
      const prevHeading = [...out].reverse().find((l) => l.trim());
      if (prevHeading === line) {
        bump('移除連續重複的標題');
        continue;
      }
      // 只有編號的標題、或其實是一整句話的標題 → 改為一般段落
      if (NUMERAL_ONLY.test(text) || /[。；，]$/.test(text) || [...text].length > 60) {
        bump('把誤判為標題的段落還原');
        out.push(`**${text}**`);
        continue;
      }
      out.push(line);
      continue;
    }
    if (isTableLine(line)) {
      const block = [];
      while (i < lines.length && isTableLine(lines[i])) block.push(lines[i++]);
      i--;
      const fixed = fixTable(block);
      if (fixed.length) {
        if (out.length && out[out.length - 1].trim()) out.push('');
        out.push(...fixed, '');
      }
      continue;
    }
    // 引言區塊中的目錄字樣（OCR 圖片文字）
    out.push(line);
  }
  // 壓縮多餘空行
  const res = [];
  for (const l of out) {
    if (!l.trim() && (!res.length || !res[res.length - 1].trim())) continue;
    res.push(l);
  }
  while (res.length && !res[res.length - 1].trim()) res.pop();
  return res;
}

// 5. 標題層級：頁面內只用 h2 以下，且不跳級
function normalizeHeadings(lines) {
  const levels = lines.map((l) => l.match(/^(#{1,6}) /)?.[1].length).filter(Boolean);
  if (!levels.length) return lines;
  const shift = Math.min(...levels) - 2;
  let prev = 1;
  let fixed = 0;
  const out = lines.map((l) => {
    const m = l.match(/^(#{1,6}) (.*)$/);
    if (!m) return l;
    let lv = m[1].length - shift;
    if (lv > prev + 1) {
      lv = prev + 1;
      fixed++;
    }
    lv = Math.max(2, Math.min(6, lv));
    prev = lv;
    return `${'#'.repeat(lv)} ${m[2]}`;
  });
  if (shift !== 0 || fixed) bump('修正標題層級（h2 起算、不跳級）');
  return out;
}

// 6. AI 素養框架表：PDF 的合併儲存格（面向）被拆到每一列各放幾個字，
//    分頁又把一張表切成兩段。把同一面向的三個層級合回一格（rowspan），
//    兩段表格接回一張，夾在表格裡的表名移到表格上方。
const FACET_LEVELS = ['取得理解', '深化應用', '創造轉型'];
const FACET_NAMES = ['AI倫理', 'AI基礎與技術', 'AI賦能教學', 'AI促進教師專業發展', 'AI賦能學習', 'AI系統設計'];
const bare = (c) => c.replace(/<br\s*\/?>/gi, '').replace(/\*\*/g, '').replace(/\s+/g, '');
const cellHtml = (c) =>
  c
    .replace(/\\\|/g, '|')
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/<br\s*\/?>/gi, '<br>');

function facetTables(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!isTableLine(lines[i])) {
      out.push(lines[i]);
      continue;
    }
    // 連續的表格（中間只隔空行）視為同一組
    let j = i;
    const run = [];
    while (j < lines.length && (isTableLine(lines[j]) || (!lines[j].trim() && lines.slice(j).find((l) => l.trim()) && isTableLine(lines.slice(j).find((l) => l.trim()))))) {
      run.push(lines[j++]);
    }
    const rows = run.filter((l) => l.trim()).map(splitRow).filter((r) => !r.every((c) => SEP_CELL.test(c)));
    const isHeader = (r) => bare(r[0] ?? '') === '面向' && bare(r[1] ?? '') === '層級';
    const tables = run.join('\n').split(/\n\s*\n/).filter((t) => t.trim());
    const allFacet = tables.every((t) => t.split('\n').map(splitRow).some(isHeader));
    if (!allFacet || rows.length < 4 || rows.some((r) => r.length !== 4)) {
      out.push(...run);
      i = j - 1;
      continue;
    }
    let caption = '';
    const groups = [];
    for (const r of rows) {
      if (isHeader(r)) continue;
      const level = bare(r[1]);
      if (!FACET_LEVELS.includes(level)) {
        if (!bare(r[0]) && !bare(r[1]) && /表/.test(r.join(''))) caption = bare(r.join(''));
        continue;
      }
      if (level === FACET_LEVELS[0] || !groups.length) groups.push({ frags: [], rows: [] });
      const g = groups[groups.length - 1];
      g.frags.push(bare(r[0]));
      g.rows.push(r);
    }
    for (const g of groups) {
      let name = g.frags.join('');
      if (name.includes('�')) {
        const re = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/�/g, '.')}$`);
        const hit = FACET_NAMES.find((n) => re.test(n));
        if (hit) {
          bump('修復框架表格中的亂碼面向名稱');
          name = hit;
        }
      }
      g.name = name.replace(/^AI(?=\S)/, 'AI ');
    }
    bump('框架表格：合併面向儲存格');
    if (tables.length > 1) bump('框架表格：接回被分頁切開的表格', tables.length - 1);
    if (out.length && out[out.length - 1].trim()) out.push('');
    if (caption) out.push(`**${caption}**`, '');
    out.push('<div class="table-scroll"><table class="facet-table">');
    out.push('<thead><tr><th scope="col">面向</th><th scope="col">層級</th><th scope="col">目標</th><th scope="col">內涵</th></tr></thead>');
    out.push('<tbody>');
    for (const g of groups) {
      g.rows.forEach((r, k) => {
        const head = k === 0 ? `<th scope="rowgroup" rowspan="${g.rows.length}">${g.name}</th>` : '';
        out.push(`<tr${k === 0 ? ' class="facet-start"' : ''}>${head}<td>${bare(r[1])}</td><td>${cellHtml(r[2])}</td><td>${cellHtml(r[3])}</td></tr>`);
      });
    }
    out.push('</tbody></table></div>', '');
    i = j - 1;
  }
  return out;
}

// 8. 頁緣章節側標：單獨一行的「壹」「貳」……在同一份文件重複出現就是每頁的側標，移除
const SIDE_TAB = /^\s*(\*\*)?([壹貳參肆伍陸柒捌玖拾])(\*\*)?\s*$/;
function dropSideTabs(lines) {
  const n = new Map();
  for (const l of lines) {
    const m = l.match(SIDE_TAB);
    if (m) n.set(m[2], (n.get(m[2]) ?? 0) + 1);
  }
  const out = lines.filter((l) => {
    const m = l.match(SIDE_TAB);
    if (m && n.get(m[2]) >= 2) {
      bump('移除頁緣章節側標（壹、貳……）');
      return false;
    }
    return true;
  });
  // 移除後可能留下連續空行
  return out.filter((l, i) => l.trim() || (i > 0 && out[i - 1].trim()));
}

// 7. 同一頁內被 PDF 換行切成兩段的句子：上一段停在句子中間，下一段直接接續中文
function joinBrokenLines(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i];
    const b = lines[i + 2];
    if (
      b !== undefined &&
      !lines[i + 1].trim() &&
      /^\s*([-*+]\s|\d+\.\s|\*\*|[^#>|<\s])/.test(a) &&
      !/^\s*\*\*[^*]+\*\*\s*$/.test(a) &&
      midSentence(a)
    ) {
      // 下一段：一般段落；或上一項清單停在逗號、下一項其實是同一句的後半
      const listA = /^\s*([-*+]|\d+\.)\s/.test(a);
      const commaEnd = /[，、]$/.test(a.replace(/\*\*/g, '').trim());
      const listB = b.match(/^\s*[-*+]\s+(.*)$/);
      let rest = null;
      if (!/^\s*([-*+]|\d+\.)\s/.test(b) && (continues(b) || (commaEnd && /^[A-Za-z]/.test(b)))) rest = b;
      else if (listA && commaEnd && listB && continues(listB[1]) && !/^.{1,8}[：:]/.test(listB[1])) rest = listB[1];
      if (rest === null) {
        out.push(a);
        continue;
      }
      lines[i + 2] = a.replace(/\s+$/, '') + rest;
      bump('接回同頁內斷開的句子');
      i++; // 跳過中間的空行，合併後的行在下一輪處理
      continue;
    }
    out.push(a);
  }
  return out;
}

export function cleanDocument(text) {
  const raw = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const { meta, body } = parseHeader(raw);
  const lines = facetTables(joinBrokenLines(dropSideTabs(cleanBlocks(cleanLines(cleanPages(body))))));
  return { meta, lines };
}

// ---------------------------------------------------------------------------
// 拆頁
// ---------------------------------------------------------------------------

const WEAK_TITLE = /^(.*\bCHAPTER\b.*|Digital (and AI )?(Teaching|Learning).*|Note|序|[\d\s一二三四五六七八九十壹貳參肆伍陸柒捌玖拾.、]+)$/i;
const size = (ls) => Buffer.byteLength(ls.join('\n'));

function chunkTitle(heading, body, fallback) {
  if (heading && !WEAK_TITLE.test(heading)) return heading;
  // 章名常在「CHAPTER 2」之後的第一個中文標題或粗體行
  for (const l of body.slice(0, 40)) {
    const m = l.match(/^#{1,6} (.+)$/) || l.match(/^\*\*([^*]{2,40})\*\*$/);
    if (m && CJK.test(m[1]) && !WEAK_TITLE.test(m[1].trim()) && [...m[1]].length <= 40) {
      return m[1].replace(/\*\*/g, '').trim();
    }
  }
  return heading && !/^(Digital|Note)/i.test(heading) ? heading : fallback;
}

function splitAt(lines, level) {
  const re = new RegExp(`^#{${level}} (.*)$`);
  const chunks = [{ heading: null, raw: null, body: [] }];
  for (const l of lines) {
    const m = l.match(re);
    if (m) chunks.push({ heading: m[1].trim(), raw: l, body: [] });
    else chunks[chunks.length - 1].body.push(l);
  }
  return chunks.filter((c) => c.heading || c.body.some((l) => l.trim()));
}

function chooseLevel(lines) {
  for (let lv = 1; lv <= 6; lv++) {
    const n = lines.filter((l) => new RegExp(`^#{${lv}} `).test(l)).length;
    if (n >= 2) return lv;
  }
  return null;
}

// 把太小的章節併入下一章：頁面標題取合併後第一個標題，其餘標題留在內文
function mergeSmall(chunks) {
  const out = [];
  let group = [];
  const flush = () => {
    if (!group.length) return;
    const titled = group.find((c) => c.heading);
    const body = group.flatMap((c) => [...(c.raw && c !== titled ? [c.raw] : []), ...c.body, '']);
    out.push({ heading: titled?.heading ?? null, raw: titled?.raw ?? null, body });
    group = [];
  };
  chunks.forEach((c, i) => {
    group.push(c);
    const own = group.flatMap((g) => [...(g.raw ? [g.raw] : []), ...g.body]);
    if (size(own) >= MIN_CHUNK || i === chunks.length - 1) flush();
  });
  return out;
}

// 單一章節仍過大時，往下一層拆開，再把相鄰小節打包成約 PACK_TARGET 大小的頁面
const PACK_TARGET = 45_000;
function splitOversized(chunk, depth) {
  if (size(chunk.body) <= RESPLIT_THRESHOLD || depth > 3) return [chunk];
  const level = chooseLevel(chunk.body);
  if (!level) return [chunk];
  const subs = splitAt(chunk.body, level).flatMap((s) => splitOversized(s, depth + 1));
  if (subs.length <= 1) return [chunk];
  const packs = [];
  let cur = null;
  for (const s of subs) {
    const lines = [...(s.raw ? [s.raw] : []), ...s.body];
    if (cur && size(cur.lines) + size(lines) <= PACK_TARGET) {
      cur.lines.push('', ...lines);
      if (s.heading) cur.last = s.heading;
    } else {
      cur = { first: s.heading, last: null, lines: [...lines] };
      packs.push(cur);
    }
  }
  // 尾巴太小的一包併回前一包
  if (packs.length > 1 && size(packs[packs.length - 1].lines) < PACK_TARGET / 3) {
    const tail = packs.pop();
    packs[packs.length - 1].lines.push('', ...tail.lines);
  }
  if (packs.length <= 1) return [chunk];
  const parentTitle = chunkTitle(chunk.heading, chunk.body, chunk.heading ?? '');
  const numbered = (ls) =>
    ls.map((l) => l.replace(/^#+ /, '').trim()).filter((l) => /^\d+(-\d+)+\.\s*\S/.test(l) && [...l].length <= 40);
  return packs.map((p, j) => {
    const nums = numbered(p.lines);
    const range = nums.length
      ? nums.length > 1 ? `${nums[0]}～${nums[nums.length - 1]}` : nums[0]
      : null;
    // 第一包沿用章節標題；之後各包標示所屬章節＋小節範圍（沒有編號小節就標「續」）
    if (j === 0) return { heading: chunk.heading, raw: null, body: p.lines };
    return { heading: null, title: `${parentTitle}｜${range ?? (packs.length > 2 ? `續 ${j}` : '續')}`, body: p.lines };
  });
}

function splitDocument(lines) {
  const level = chooseLevel(lines);
  if (!level) return [{ heading: null, body: lines }];
  return mergeSmall(splitAt(lines, level)).flatMap((c) => splitOversized(c, 0));
}

// ---------------------------------------------------------------------------
// 輸出
// ---------------------------------------------------------------------------

const yaml = (v) => JSON.stringify(v);

function frontmatter(fm) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'object' && !Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const [k2, v2] of Object.entries(v)) if (v2 !== undefined) lines.push(`  ${k2}: ${yaml(v2)}`);
    } else lines.push(`${k}: ${yaml(v)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function rel(fromSlug, toSlug) {
  // 頁面網址都是 /slug/ 形式，算相對路徑才不受 base 設定影響
  const from = fromSlug === '' ? [] : fromSlug.split('/');
  const r = path.posix.relative('/' + from.join('/'), '/' + toSlug);
  return (r ? r : '.') + '/';
}

function describe(spec, meta, part) {
  const pages = meta.pages ? `，原文 ${meta.pages} 頁` : '';
  return part ? `${spec.title}：${part}` : `${spec.title}（教育部數位學習推動辦公室${pages}）`;
}

function write(slug, content) {
  const file = path.join(OUT, slug === '' ? 'index.md' : `${slug}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function rmGenerated(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      rmGenerated(p);
      if (!fs.readdirSync(p).length) fs.rmdirSync(p);
    } else if (e.name.endsWith('.md')) fs.unlinkSync(p);
  }
}

function main() {
  rmGenerated(OUT);
  fs.mkdirSync(GEN, { recursive: true });

  const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.md') && f !== 'INDEX.md').sort();
  const specs = [...DOCS];
  for (const f of files) {
    if (/^04_教學指引_\d+\._/.test(f)) {
      const first = fs.readFileSync(path.join(SRC, f), 'utf8').split('\n')[0];
      specs.push(lessonSpec(f, first));
    }
  }
  const mapped = new Set(specs.map((s) => s.file));
  const missing = files.filter((f) => !mapped.has(f));
  const extra = specs.filter((s) => !files.includes(s.file)).map((s) => s.file);
  if (missing.length || extra.length) {
    throw new Error(`來源檔與對照表不一致\n未對應：${missing.join(', ')}\n找不到：${extra.join(', ')}`);
  }

  const report = { generatedAt: new Date().toISOString(), docs: [], stats };
  const pagesOut = []; // {slug, title, label, spec, chapters?}

  for (const spec of specs) {
    const text = fs.readFileSync(path.join(SRC, spec.file), 'utf8');
    const { meta, lines } = cleanDocument(text);
    const base = {
      audience: spec.audience,
      source: { file: spec.file, original: meta.originalFile || undefined, pages: meta.pages ?? undefined },
      lesson: spec.lesson,
    };
    const shouldSplit = spec.split && Buffer.byteLength(text) > SPLIT_THRESHOLD;
    if (!shouldSplit) {
      const body = normalizeHeadings(lines);
      const fm = {
        title: spec.title,
        description: spec.lesson
          ? `${spec.lesson.stage}・${spec.lesson.domain}・設計者：${spec.lesson.author}（教育部數位學習教案示例）`
          : describe(spec, meta),
        sidebar: { label: spec.label, order: spec.order },
        ...base,
      };
      write(spec.slug, frontmatter(fm) + body.join('\n') + '\n');
      pagesOut.push({ slug: spec.slug, title: spec.title, label: spec.label, spec });
      report.docs.push({ file: spec.file, pages: [spec.slug] });
      continue;
    }

    const chunks = splitDocument(lines);
    const chapters = [];
    chunks.forEach((c, i) => {
      const n = String(i + 1).padStart(2, '0');
      let title =
        c.title ?? (!c.heading && i === 0 ? '封面與序言' : chunkTitle(c.heading, c.body, `第 ${i + 1} 部分`));
      // 「第一章數位與…」→「第一章 數位與…」（只調整頁面標題，不動內文）
      title = title.replace(/^(第[一二三四五六七八九十]+章)(?=[^\s，、：])/, '$1 ');
      const body = normalizeHeadings(c.body);
      const slug = `${spec.slug}/${n}`;
      const fm = {
        title,
        description: describe(spec, meta, title),
        sidebar: { label: title, order: i + 1 },
        ...base,
        part: { of: spec.title, index: i + 1, total: chunks.length, parent: spec.slug },
      };
      // 章節原本的大標題（例如 CHAPTER 2）若不是拿來當頁面標題，就保留在內文開頭
      const lead = c.heading && title !== c.heading ? [`**${c.heading}**`, ''] : [];
      write(slug, frontmatter(fm) + [...lead, ...body].join('\n') + '\n');
      chapters.push({ slug, title });
    });

    // 文件總覽頁
    const overview = [
      `本文件共拆成 ${chapters.length} 頁，依原文順序排列：`,
      '',
      ...chapters.map((c, i) => `${i + 1}. [${c.title}](${rel(spec.slug, c.slug)})`),
    ];
    write(
      spec.slug,
      frontmatter({
        title: spec.title,
        description: describe(spec, meta),
        sidebar: { label: '總覽', order: 0 },
        ...base,
      }) + overview.join('\n') + '\n',
    );
    pagesOut.push({ slug: spec.slug, title: spec.title, label: spec.label, spec, chapters });
    report.docs.push({ file: spec.file, pages: [spec.slug, ...chapters.map((c) => c.slug)] });
  }

  writeAudiencePages(pagesOut);
  const sidebar = buildSidebar(pagesOut);
  fs.writeFileSync(path.join(GEN, 'sidebar.json'), JSON.stringify(sidebar, null, 2));
  fs.writeFileSync(path.join(GEN, 'report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(GEN, 'catalog.json'), JSON.stringify(buildCatalog(pagesOut), null, 2));

  const total = report.docs.reduce((n, d) => n + d.pages.length, 0);
  console.log(`convert: ${specs.length} 份來源檔 → ${total} 頁（另有讀者入口 4 頁）`);
}

// ---------------------------------------------------------------------------
// 讀者入口頁與側邊欄
// ---------------------------------------------------------------------------

const SECTIONS = [
  { key: 'framework', label: 'AI 素養框架', groups: ['framework'], intro: 'framework' },
  { key: 'notices', label: '使用生成式 AI 注意事項', groups: ['notices'] },
  { key: 'guides', label: '數位與 AI 教學指引（115 年）', groups: ['guides'] },
  { key: 'lessons', label: '教案示例', groups: ['lessons-es', 'lessons-jh', 'lessons-sh', 'lessons-vs'], intro: 'lessons' },
  { key: 'handbooks', label: 'AI 學習應用手冊', groups: ['handbooks'] },
  { key: 'parents', label: '家長宣導', groups: ['parents'] },
  { key: 'admin', label: '行政', groups: ['admin-plan', 'admin-data'] },
  { key: 'ark', label: 'AI 人才方舟計畫', groups: ['ark'] },
  { key: 'history', label: '歷史版本（114 年指引）', groups: ['history'] },
];

const AUDIENCE_PAGES = {
  teacher: { slug: 'audience/teacher', intro: '給中小學教師：AI 素養框架、教學指引、教案示例與使用注意事項。' },
  student: { slug: 'audience/student', intro: '給中小學學生：學生 AI 素養、學習應用手冊與使用生成式 AI 的注意事項。' },
  parent: { slug: 'audience/parent', intro: '給家長：家長數位與 AI 學習知能指引、家長宣導簡報與使用注意事項。' },
  admin: { slug: 'audience/admin', intro: '給校長與學校行政：校長領導指引、數位學習實施計畫與教育大數據介接文件。' },
};

function writeAudiencePages(pages) {
  Object.entries(AUDIENCE_PAGES).forEach(([aud, info], idx) => {
    const lines = [info.intro, ''];
    for (const sec of SECTIONS) {
      const items = pages.filter((p) => sec.groups.includes(p.spec.group) && p.spec.audience.includes(aud));
      if (!items.length && !(sec.intro && aud === 'teacher')) continue;
      if (!items.length) continue;
      lines.push(`## ${sec.label}`, '');
      if (sec.intro === 'framework') lines.push(`- [AI 素養框架矩陣（4 面向 × 3 層級）](${rel(info.slug, 'framework')})`);
      if (sec.intro === 'lessons') lines.push(`- [教案示例總覽（可依學段、領域篩選）](${rel(info.slug, 'lessons')})`);
      if (sec.key === 'lessons') {
        lines.push(`- 共 ${items.length} 份教案：國小 ${items.filter((p) => p.spec.lesson.stage === '國小').length}、國中 ${items.filter((p) => p.spec.lesson.stage === '國中').length}、普高 ${items.filter((p) => p.spec.lesson.stage === '普高').length}、技高 ${items.filter((p) => p.spec.lesson.stage === '技高').length}`);
      } else {
        for (const p of items) lines.push(`- [${p.title}](${rel(info.slug, p.slug)})${p.chapters ? `（共 ${p.chapters.length} 頁）` : ''}`);
      }
      lines.push('');
    }
    write(
      info.slug,
      frontmatter({
        title: `我是${AUDIENCES[aud]}`,
        description: info.intro,
        sidebar: { label: `我是${AUDIENCES[aud]}`, order: idx + 1 },
        audience: [aud],
      }) + lines.join('\n'),
    );
  });
}

// 給首頁與導讀頁用的文件清單
function buildCatalog(pages) {
  return pages.map((p) => ({
    slug: p.slug,
    title: p.title,
    label: p.label,
    group: p.spec.group,
    order: p.spec.order,
    audience: p.spec.audience,
    file: p.spec.file,
    lesson: p.spec.lesson ?? null,
    chapters: p.chapters ?? null,
  }));
}

function link(p, label) {
  return { label: label ?? p.label, link: `${LIB}/${p.slug}/` };
}

function docItem(p) {
  if (!p.chapters) return link(p);
  return {
    label: p.label,
    collapsed: true,
    items: [link(p, '總覽'), ...p.chapters.map((c) => ({ label: c.title, link: `${LIB}/${c.slug}/` }))],
  };
}

function buildSidebar(pages) {
  const by = (g) => pages.filter((p) => p.spec.group === g).sort((a, b) => a.spec.order - b.spec.order);
  const stageGroup = (code, label) => ({ label, collapsed: true, items: by(`lessons-${code}`).map((p) => link(p, `${String(p.spec.lesson.number).padStart(2, '0')}. ${p.spec.lesson.domain}｜${p.title}`)) });
  return [
    {
      label: '讀者入口',
      items: Object.entries(AUDIENCE_PAGES).map(([aud, info]) => ({ label: `我是${AUDIENCES[aud]}`, link: `${LIB}/${info.slug}/` })),
    },
    { label: 'AI 素養框架', collapsed: true, items: [{ label: '框架矩陣（4 面向 × 3 層級）', link: `${LIB}/framework/` }, ...by('framework').map(docItem)] },
    { label: '使用生成式 AI 注意事項', collapsed: true, items: by('notices').map(docItem) },
    {
      label: '教學指引',
      collapsed: true,
      items: [...by('guides').map(docItem), { label: '歷史版本（114 年）', collapsed: true, items: by('history').map(docItem) }],
    },
    {
      label: '教案示例',
      collapsed: true,
      items: [{ label: '總覽與篩選', link: `${LIB}/lessons/` }, stageGroup('es', '國小'), stageGroup('jh', '國中'), stageGroup('sh', '普高'), stageGroup('vs', '技高')],
    },
    { label: 'AI 學習應用手冊', collapsed: true, items: by('handbooks').map(docItem) },
    { label: '家長宣導', collapsed: true, items: by('parents').map(docItem) },
    {
      label: '行政',
      collapsed: true,
      items: [
        { label: '數位學習實施計畫', collapsed: true, items: by('admin-plan').map(docItem) },
        { label: '教育大數據', collapsed: true, items: by('admin-data').map(docItem) },
      ],
    },
    { label: 'AI 人才方舟計畫', collapsed: true, items: by('ark').map(docItem) },
  ];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
