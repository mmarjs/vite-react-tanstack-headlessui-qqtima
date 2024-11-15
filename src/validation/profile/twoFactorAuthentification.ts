import { z } from 'zod';

export const twoFactorAuthentificationSchema = z.object({
	code: z
		.string()
		.trim()
		.min(1, 'profile:account.setTwoFactorAuthentication.errors.required')
		.max(255, 'common:account.setTwoFactorAuthentication.errors.tooLong'),
});

export type TTwoFactorAuthentificationSchema = z.infer<typeof twoFactorAuthentificationSchema>;
