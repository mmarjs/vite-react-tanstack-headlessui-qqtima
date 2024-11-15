import { fxbo } from '~/api/fxbo';
import type { TLoginSchema } from '~/validation/auth/login';
import type { TRegisterSchema } from '~/validation/auth/register';
import type { TProfile } from '~/services/profile';

export type TLoginRes = {
	accessToken: string;
	client: TProfile;
	exp: number;
	expDate: string;
};

const register = (data: TRegisterSchema) => fxbo.post<TProfile>('registration', data);
const login = (data: TLoginSchema) => fxbo.post<TLoginRes>('login', data);
const logout = () => fxbo.post('logout');

export const authService = { register, login, logout };
