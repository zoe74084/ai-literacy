// 中文全文搜尋的斷詞處理（建站時與瀏覽器端共用）。
//
// Pagefind 對繁體中文的斷詞不一致：同一個詞有時被切成單字、有時被當成一個詞，
// 搜尋時瀏覽器又用另一套規則斷詞，結果像「人工智慧」只找得到少數頁面。
// 解法是兩邊都改成「以字為單位」：
//   - 建索引時，在相鄰的漢字之間插入空白（只影響索引，不影響頁面）
//   - 搜尋時，對查詢字串做同樣處理；沒有空白的中文查詢用精確比對（字要相連）
//   - 顯示搜尋結果時，把漢字之間的空白拿掉
const HAN = '\\u3400-\\u9FFF\\uF900-\\uFAFF';
const BETWEEN_HAN = new RegExp(`([${HAN}])(?=[${HAN}])`, 'g');
const SPACED_HAN = new RegExp(`([${HAN}])((?:</?mark>)*)[ \\t]+((?:</?mark>)*)(?=[${HAN}])`, 'g');
const HAS_HAN = new RegExp(`[${HAN}]`);

/** 「人工智慧」→「人 工 智 慧」 */
export function spaceHan(text) {
	return text.replace(BETWEEN_HAN, '$1 ');
}

/** 把 spaceHan 加入的空白拿掉（可跨過 <mark> 標籤） */
export function unspaceHan(text) {
	if (typeof text !== 'string') return text;
	let prev;
	do {
		prev = text;
		text = text.replace(SPACED_HAN, '$1$2$3');
	} while (text !== prev);
	return text;
}

/** 搜尋字串前處理 */
export function processQuery(term) {
	const t = term.trim();
	if (!HAS_HAN.test(t) || /^".*"$/.test(t)) return t.startsWith('"') ? spaceHan(t) : t;
	// 單一個中文詞（沒有空白）→ 精確比對，避免字分散在不同地方也算符合
	if (!/\s/.test(t)) return `"${spaceHan(t)}"`;
	return spaceHan(t);
}

/** 只在 HTML 的文字節點裡插入空白，不動標籤與屬性 */
export function spaceHanInHtml(html) {
	return html.replace(/>([^<]+)</g, (m, text) => `>${spaceHan(text)}<`);
}
