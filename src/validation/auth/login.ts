import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'auth:login.errors.email.required')
		.max(255, 'auth:login.errors.email.tooLong')
		.email('auth:login.errors.email.invalid'),
	password: z
		.string()
		.min(1, 'auth:login.errors.password.required')
		.min(8, 'auth:login.errors.password.tooShort')
		.max(255, 'auth:login.errors.password.tooLong'),
	rememberMe: z.boolean().default(true), // not rendered on UI
});

export type TLoginSchema = z.infer<typeof loginSchema>;
