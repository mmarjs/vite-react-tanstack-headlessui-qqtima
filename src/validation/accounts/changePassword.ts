import { z } from 'zod';
import { password } from '../common/password';

export const changePasswordSchema = z.object({
	password,
});

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
