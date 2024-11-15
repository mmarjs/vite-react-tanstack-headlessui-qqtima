import { fxbo } from '~/api/fxbo';
import type { TSuccesfulResponse } from './types';

type TPinAction =
	| 'changePassword'
	| 'changeEmail'
	| 'changePhone'
	| 'changeAccountLeverage'
	| 'changeAccountPassword'
	| 'changeAccountPhonePassword'
	| 'userRegistrationEmail'
	| 'userRegistrationPhone'
	| 'userRegistration'
	| 'verifyPhone'
	| 'withdrawal'
	| 'general'
	| 'forgot_password';

export type TPinMethod = 'email' | 'phone';

const send = (action: TPinAction, method: TPinMethod) => {
	return fxbo.post<TSuccesfulResponse>('pin/send', { action, method });
};

export const pinService = {
	send,
};
