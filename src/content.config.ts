import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const audiences = ['teacher', 'student', 'parent', 'admin'] as const;

export const collections = {
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// 讀者標籤
				audience: z.array(z.enum(audiences)).default([]),
				// 來源檔（source-md/ 內的檔名與原始 PDF 檔名、頁數）
				source: z
					.object({
						file: z.string(),
						original: z.string().optional(),
						pages: z.number().optional(),
					})
					.optional(),
				// 教案示例的分類資訊
				lesson: z
					.object({
						number: z.number(),
						stage: z.enum(['國小', '國中', '普高', '技高']),
						stageOrder: z.number(),
						domain: z.string(),
						rawDomain: z.string(),
						author: z.string(),
					})
					.optional(),
				// 長文件拆頁資訊
				part: z
					.object({
						of: z.string(),
						index: z.number(),
						total: z.number(),
						parent: z.string(),
					})
					.optional(),
			}),
		}),
	}),
};
