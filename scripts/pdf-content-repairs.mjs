// PDF-verified content repairs run after pagination to preserve public page URLs.
// Evidence and physical page numbers: src/data/pdf-repairs/README.md.
import fs from 'node:fs';
const data = (name) => fs.readFileSync(new URL(`../src/data/pdf-repairs/${name}`, import.meta.url), 'utf8').trimEnd();
const login = JSON.parse(data('xapi-login.json'));
const base = (process.env.BASE_PATH || '/ai-literacy').replace(/\/$/, '');
const figure = (name, alt) => `![${alt}](${base}/source-figures/${name}.png)`;
function once(text, from, to, label) {
  if (text.split(from).length !== 2) throw new Error(`PDF repair ${label}: expected exactly one matching passage`);
  return text.replace(from, to);
}
export function repairPageContent(lines, slug) {
  let text = lines.join('\n');
  if (slug === 'handbooks/junior/03') {
    text = once(text,
      'AI 此概念對應 AI 素養框架中「AI 賦能學習」的核心精神：學生將 AI 加視為蘇格拉底式的提問夥伴，透過人機互動深化理解，而非依賴 AI 直油站接產出答案。',
      '**AI 加油站**\n\n此概念對應 AI 素養框架中「AI 賦能學習」的核心精神：學生將 AI 視為蘇格拉底式的提問夥伴，透過人機互動深化理解，而非依賴 AI 直接產出答案。', 'F06');
  }
  if (slug === 'guides/parent/05') text = once(text, data('parent-screener-before.md'), data('parent-screener.md'), 'F07');
  if (slug === 'lessons/jh-02') text = once(text, data('spinner-record-before.md'), data('spinner-record.md'), 'F08');
  if (slug === 'handbooks/senior/07') {
    text = once(text, '- 安風險中。 ● 責任歸屬模糊：', '- 責任歸屬模糊：', 'F03');
    text = once(text, '如果你把一般的 AI 當成圖書館員', '\n\n如果你把一般的 AI 當成圖書館員', 'F02');
    text = once(text, '（AI Agent）在前面的內容中', '（AI Agent）\n\n在前面的內容中', 'F13');
    const caption = '下圖為樂學精靈成為組員，與其多輪式對話，協助整理提案優缺點及執行難度表格。';
    text = once(text, caption, `${caption}\n\n${figure('handbook-senior-peer-example', '樂學精靈協助比較租借環保杯、減塑集點抽獎與宣傳微電影三項提案的優缺點及執行難度（原文 PDF 第100頁）')}`, 'F14');
  }
  if (slug === 'handbooks/senior/08') {
    text = once(text, '  AI 世代下的數位公民，面對的環境根本不同', '\n\nAI 世代下的數位公民，面對的環境根本不同', 'F04');
    const label = '🎨 圖片生成提示詞參考：';
    const prompt = 'A teacher-student scene with a friendly AI robot sitting beside a high school student at a desk with open Chinese textbooks. The robot is pointing at a text passage while the student takes notes. Flat illustration, educational, blue and orange tones, no real faces, no text in image.';
    text = once(text, label, `${label}\n\n${prompt}`, 'F11');
  }
  if (['ark', 'ark/ja', 'ark/ko'].includes(slug)) {
    const note = '> 此處是圖片，內容請見原文 PDF 第 13 頁。';
    if (text.split(note).length !== 3) throw new Error(`PDF repair D01: ${slug} expected two charts`);
    const suffix = slug === 'ark' ? '' : `-${slug.split('/')[1]}`;
    text = text.replace(note, figure(`ark-outcomes-2022-2025${suffix}`, '2022–2025 學習成效折線圖（原文 PDF 第13頁）'))
      .replace(note, figure(`ark-outcomes-edue${suffix}`, '學習平臺使用時數與搭配 AI 學習夥伴的成效長條圖（原文 PDF 第13頁）'));
  }
  if (slug.startsWith('admin/bigdata/xapi/')) {
    // Keep original malformed/pseudo examples verbatim; formatting must not rewrite a specification.
    let fenced = false;
    text = text.split('\n').flatMap((line) => {
      if (/^\s*```/.test(line)) { fenced = !fenced; return [line]; }
      if (fenced || !/^\s*(?:\{|\[\s*(?:\{|$))/.test(line)) return [line];
      let code = line;
      try {
        let value = JSON.parse(line);
        if (value?.verb?.id === login.verb.id && value?.object?.id === login.object.id) {
          // Assert the PDF-to-web drift is limited to the five reviewed whitespace values.
          const normalized = JSON.parse(JSON.stringify(value));
          normalized.verb.display['zh-TW'] = normalized.verb.display['zh-TW'].trim();
          normalized.object.definition.name['zh-TW'] = normalized.object.definition.name['zh-TW'].trim();
          normalized.context.platform = normalized.context.platform.trim();
          for (const key of ['school', 'identity']) {
            const uri = `https://moebigdata.com/xapi/${key}`;
            normalized.context.extensions[uri] = normalized.context.extensions[uri].trim();
          }
          if (JSON.stringify(normalized) !== JSON.stringify(login)) throw new Error('Login example differs beyond verified whitespace');
          value = login;
        }
        code = JSON.stringify(value, null, 2);
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
      }
      return ['', '```json', code, '```', ''];
    }).join('\n');
  }
  return text.split('\n');
}
