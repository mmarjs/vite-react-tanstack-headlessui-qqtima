import { z } from 'zod';

export const setLeverageSchema = z.object({
	leverage: z
		.number({ errorMap: () => ({ message: 'accounts:setLeverage.errors.invalid' }) })
		.min(1, 'accounts:open.errors.tooSmall')
		.max(10000, 'accounts:open.errors.tooLarge'),
});

export type TSetLeverageSchema = z.infer<typeof setLeverageSchema>;
