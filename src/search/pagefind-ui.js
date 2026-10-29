// 包裝 Pagefind 預設搜尋介面，加上中文查詢與結果的處理（見 cjk.js）。
// astro.config.mjs 把 '@pagefind/default-ui' 指向這個檔案。
import { PagefindUI as BaseUI } from '@pagefind/default-ui/npm_dist/mjs/ui-core.mjs';
import { processQuery, unspaceHan } from './cjk.js';

function cleanResult(result) {
	result.excerpt = unspaceHan(result.excerpt);
	if (result.meta) {
		for (const key of Object.keys(result.meta)) result.meta[key] = unspaceHan(result.meta[key]);
	}
	for (const sub of result.sub_results ?? []) {
		sub.title = unspaceHan(sub.title);
		sub.excerpt = unspaceHan(sub.excerpt);
	}
	return result;
}

export class PagefindUI extends BaseUI {
	constructor(opts = {}) {
		super({
			// 索引以「字」為單位，預設 30 個字的摘要太短
			excerptLength: 60,
			...opts,
			processTerm: (term) => processQuery(opts.processTerm ? opts.processTerm(term) : term),
			processResult: (result) => {
				const r = opts.processResult?.(result) ?? result;
				return cleanResult(r ?? result);
			},
		});
	}
}
