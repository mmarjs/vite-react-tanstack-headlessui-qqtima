import { z } from 'zod';

export const openAccountSchema = z.object({
	type: z.string().min(1),
	category: z.string().min(1),
	platform: z.string().min(1),
	leverage: z
		.number({ errorMap: () => ({ message: 'accounts:open.errors.leverage.invalid' }) })
		.min(1, 'accounts:open.errors.leverage.tooSmall')
		.max(10000, 'accounts:open.errors.leverage.tooLarge'),
	initialBalance: z
		.number({ errorMap: () => ({ message: 'accounts:open.errors.initialBalance.required' }) })
		.min(0, 'accounts:open.errors.initialBalance.tooSmall')
		.max(1000000000, 'accounts:open.errors.initialBalance.tooLarge')
		.optional(),
	currency: z.string().min(1, 'accounts:open.errors.currency.required'),
});

export type TOpenAccountSchema = z.infer<typeof openAccountSchema>;
