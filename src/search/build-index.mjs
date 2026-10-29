// 用「漢字之間加空白」的 HTML 建中文搜尋索引，輸出到 dist/pagefind-zh/。
// 由 integration.mjs 在 astro build 結束時以獨立程序執行：
// Starlight 也會用 Pagefind 建索引，兩者共用同一個 Pagefind 背景程序會互相干擾，
// 所以這裡另開程序、另放資料夾，兩個搜尋介面都改讀 pagefind-zh/。
import { readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import * as pagefind from 'pagefind';
import { spaceHanInHtml } from './cjk.js';

const root = path.resolve(process.argv[2] ?? 'dist');
const out = path.join(root, 'pagefind-zh');

async function* htmlFiles(dir) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) {
			if (!e.name.startsWith('pagefind') && e.name !== '_astro') yield* htmlFiles(p);
		} else if (e.name.endsWith('.html')) yield p;
	}
}

function check(res, what) {
	if (res.errors?.length) throw new Error(`Pagefind ${what} 失敗：${res.errors.join('; ')}`);
	return res;
}

const start = performance.now();
const { index } = check(await pagefind.createIndex(), '建立索引');
let n = 0;
for await (const file of htmlFiles(root)) {
	const html = await readFile(file, 'utf8');
	// 只索引資料庫（Starlight）頁面：導讀頁與資料庫是同一份內容，避免重複結果
	if (!html.includes('data-pagefind-body')) continue;
	check(
		await index.addHTMLFile({ sourcePath: path.relative(root, file).split(path.sep).join('/'), content: spaceHanInHtml(html) }),
		file,
	);
	n++;
}
await rm(out, { recursive: true, force: true });
check(await index.writeFiles({ outputPath: out }), '寫入索引');
await pagefind.close();
console.log(`中文搜尋索引：${n} 頁，${Math.round(performance.now() - start)}ms → ${path.relative(process.cwd(), out)}`);
