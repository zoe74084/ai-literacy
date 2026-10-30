// Astro 整合：建置結束時，以獨立程序重建中文搜尋索引（見 build-index.mjs）。
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export default function cjkSearch() {
	return {
		name: 'cjk-search-index',
		hooks: {
			'astro:build:done': ({ dir, logger }) => {
				const script = fileURLToPath(new URL('./build-index.mjs', import.meta.url));
				const out = execFileSync(process.execPath, [script, fileURLToPath(dir)], { encoding: 'utf8' });
				logger.info(out.trim());
			},
		},
	};
}
