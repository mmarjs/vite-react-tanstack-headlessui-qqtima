import { z } from 'zod';
import { email } from '../common/email';
import { pin } from '../common/pin';

const changeEmailSchema = z.object({ email });
const changeEmailWithPinSchema = z.object({ email, pin });

export const getChangeEmailSchema = (withPin: boolean) =>
	withPin ? changeEmailWithPinSchema : changeEmailSchema;

export type TChangeEmailSchema = z.infer<typeof changeEmailWithPinSchema>;
