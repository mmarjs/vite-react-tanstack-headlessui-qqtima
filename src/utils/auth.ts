import type { TLoginRes } from '~/services/auth';

export const authData = {
	store: (loginRes: TLoginRes) => {
		localStorage.setItem('loginRes', JSON.stringify(loginRes));
	},
	remove: () => {
		localStorage.removeItem('loginRes');
	},
	get: () => {
		const loginRes = localStorage.getItem('loginRes');
		if (!loginRes) return null;

		const { expDate, client, accessToken } = JSON.parse(loginRes) as TLoginRes;
		if (!expDate || !client || !accessToken) return null;
		if (Date.parse(expDate) < Date.now()) return null;

		return { client, accessToken };
	},
};
