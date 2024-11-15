import { z } from 'zod';

export const changeLanguageSchema = z.object({
	language: z.string(),
});

export type TChangeLanguageSchema = z.infer<typeof changeLanguageSchema>;
