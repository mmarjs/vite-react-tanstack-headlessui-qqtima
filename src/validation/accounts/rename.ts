import { z } from 'zod';

export const renameSchema = z.object({
	name: z
		.string()
		.min(1, 'accounts:rename.errors.required')
		.max(50, 'accounts:rename.errors.tooLong'),
});

export type TRenameSchema = z.infer<typeof renameSchema>;
