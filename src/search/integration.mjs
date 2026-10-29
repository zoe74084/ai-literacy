// Astro 整合：在 Starlight 建完 Pagefind 索引之後，用「漢字之間加空白」的 HTML 重建索引。
// 頁面本身不變，只有 dist/pagefind/ 的索引內容不同。
import { readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';
import { spaceHanInHtml } from './cjk.js';

async function* htmlFiles(dir) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) {
			if (e.name !== 'pagefind' && e.name !== '_astro') yield* htmlFiles(p);
		} else if (e.name.endsWith('.html')) yield p;
	}
}

function check(res, what) {
	if (res.errors?.length) throw new Error(`Pagefind ${what} 失敗：${res.errors.join('; ')}`);
	return res;
}

export default function cjkSearch() {
	return {
		name: 'cjk-search-index',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const out = path.join(root, 'pagefind');
				const start = performance.now();
				try {
					const { index } = check(await pagefind.createIndex(), '建立索引');
					let n = 0;
					for await (const file of htmlFiles(root)) {
						const html = await readFile(file, 'utf8');
						if (!html.includes('data-pagefind-body')) continue;
						check(
							await index.addHTMLFile({
								sourcePath: path.relative(root, file).split(path.sep).join('/'),
								content: spaceHanInHtml(html),
							}),
							file,
						);
						n++;
					}
					await rm(out, { recursive: true, force: true });
					check(await index.writeFiles({ outputPath: out }), '寫入索引');
					logger.info(`中文搜尋索引：${n} 頁，${Math.round(performance.now() - start)}ms`);
				} finally {
					await pagefind.close();
				}
			},
		},
	};
}
