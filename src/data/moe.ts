// 教育部數位學習推動辦公室的原文下載位置。
// 網站不另存 PDF，原文一律連回教育部。
// 目前每一類都先連到下載專區首頁，並標示要找的分類名稱；
// 之後若要改成各分類或各檔案的直接連結，改這裡的 url 即可。
export const MOE_NAME = '教育部數位學習推動辦公室';
export const MOE_DOWNLOAD = 'https://pads.moe.edu.tw/download.php';

export const MOE_CATEGORIES: Record<string, { name: string; url: string }> = {
	'01': { name: 'AI 人才方舟計畫', url: MOE_DOWNLOAD },
	'02': { name: '臺灣教師與學生 AI 素養框架', url: MOE_DOWNLOAD },
	'03': { name: '中小學使用生成式 AI 注意事項 2.1', url: MOE_DOWNLOAD },
	'04': { name: '數位與 AI 教學指引、教案示例', url: MOE_DOWNLOAD },
	'05': { name: '115 年 AI 之學習應用手冊', url: MOE_DOWNLOAD },
	'06': { name: '數位學習家長宣導', url: MOE_DOWNLOAD },
	'07': { name: '115 年度中小學數位學習實施計畫', url: MOE_DOWNLOAD },
	'08': { name: '教育大數據分析計畫', url: MOE_DOWNLOAD },
};

/** 依 source-md 檔名（01_…）找到原文所在分類 */
export function moeFor(file?: string) {
	const cat = file ? MOE_CATEGORIES[file.slice(0, 2)] : undefined;
	return cat ?? { name: '下載專區', url: MOE_DOWNLOAD };
}

/** 原始 PDF 檔名：source-md 檔名去掉分類前綴、副檔名改成 .pdf */
export function pdfName(file?: string, original?: string) {
	if (original) return original;
	if (!file) return '';
	return file.replace(/^\d\d_[^_]+_/, '').replace(/\.md$/, '.pdf');
}
