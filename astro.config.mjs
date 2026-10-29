// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import cjkSearch from './src/search/integration.mjs';

// 網站網址與子路徑：之後要掛到個人網站的子路徑或子網域時，改這兩個環境變數（或直接改預設值）即可。
//   SITE_URL  例：https://zoe74084.github.io 或 https://ai.example.com
//   BASE_PATH 例：/ai-literacy；掛在子網域根目錄時設成 /
const site = process.env.SITE_URL || 'https://zoe74084.github.io';
const base = process.env.BASE_PATH || '/ai-literacy';

// 側邊欄由 scripts/convert.mjs 依來源檔產生；直接跑 astro 指令時若還沒轉換，先轉一次
const sidebarFile = new URL('./src/generated/sidebar.json', import.meta.url);
if (!existsSync(sidebarFile)) {
	execFileSync(process.execPath, ['scripts/convert.mjs'], { stdio: 'inherit' });
}
const sidebar = JSON.parse(readFileSync(sidebarFile, 'utf8'));

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'AI 素養資源站',
			description: '教育部數位學習推動辦公室 AI 素養相關文件的全文網站：AI 素養框架、教學指引、教案示例、學習應用手冊與行政文件。',
			defaultLocale: 'root',
			locales: {
				root: { label: '繁體中文', lang: 'zh-TW' },
			},
			sidebar: [{ label: '首頁', link: '/' }, ...sidebar],
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			lastUpdated: false,
			pagination: true,
		}),
		// 必須放在 starlight() 之後：重建中文搜尋索引
		cjkSearch(),
	],
	vite: {
		resolve: {
			alias: [
				{
					find: /^@pagefind\/default-ui$/,
					replacement: fileURLToPath(new URL('./src/search/pagefind-ui.js', import.meta.url)),
				},
			],
		},
	},
});
