import { z } from 'zod';
import { phone } from '../common/phone';
import { pin } from '../common/pin';

const changePhoneSchema = z.object({ phone });
const changePhoneWithPinSchema = z.object({ phone, pin });

export const getChangePhoneSchema = (withPin: boolean) =>
	withPin ? changePhoneWithPinSchema : changePhoneSchema;

export type TChangePhoneSchema = z.infer<typeof changePhoneWithPinSchema>;
