import { z } from 'zod';
import { password } from '../common/password';

export const changePasswordSchema = z.object({
	oldPassword: password,
	newPassword: password,
});

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
