import type { ReactNode} from 'react';
import { createContext, useContext, useState } from 'react';
import { flushSync } from 'react-dom';
import { authService, type TLoginRes } from '~/services/auth';
import { authData } from '~/utils/auth';
import type { TLoginSchema } from '~/validation/auth/login';
import type { TRegisterSchema } from '~/validation/auth/register';
import type { TProfile } from '~/services/profile';

type TAuthContext = {
	user: TProfile | null;
	register: (data: TRegisterSchema, callback?: VoidFunction) => Promise<TProfile>;
	login: (data: TLoginSchema, callback?: VoidFunction) => Promise<TLoginRes>;
	logout: (callback?: VoidFunction) => Promise<true>;
};

const AuthContext = createContext<TAuthContext>({
	user: null,
	register: () =>
		console.error('Register: called before context initialization') as unknown as Promise<TProfile>,
	login: () =>
		console.error('Signin: called before context initialization') as unknown as Promise<TLoginRes>,
	logout: () =>
		console.error('Signout: called before context initialization') as unknown as Promise<true>,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const storedClient = authData.get()?.client ?? null;
	const [user, setUser] = useState<TAuthContext['user']>(storedClient);

	const register: TAuthContext['register'] = async (data, callback) =>
		authService.register(data).then((client) => {
			callback?.();
			return client;
		});

	const login: TAuthContext['login'] = async (data, callback) =>
		authService.login(data).then((loginRes) => {
			authData.store(loginRes);

			flushSync(() => {
				setUser(loginRes.client);
				callback?.();
			});

			return loginRes;
		});

	const logout: TAuthContext['logout'] = async (callback) =>
		authService.logout().then(() => {
			authData.remove();
			flushSync(() => {
				setUser(null);
				callback?.();
			});

			return true;
		});

	const value = { user, register, login, logout };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
