import { authData } from '~/utils/auth';
import { createError } from '~/utils/error';

const FXBO_CLIENT_API = import.meta.env.VITE_FXBO_CLIENT_API;

const getHeaders = () => {
	const token = authData.get()?.accessToken;
	if (token) return { Authorization: `Bearer ${token}` };
	return;
};

const isAuthorized = () => Boolean(authData.get());

const request = async <T extends object>(endpoint: string, options: RequestInit) => {
	const response = await fetch(`${FXBO_CLIENT_API}/${endpoint}`, options);
	const json = await response.json();

	if (response.status === 401 || (response.status === 403 && options.method !== 'PATCH')) {
		authData.remove();
		const isLoginPage = window.location.pathname === '/login';
		if (!isLoginPage) window.location.href = '/login';
	}

	if (!response.ok) throw createError(json as Error);
	return json as T;
};

const get = async <T extends object>(endpoint: string) => {
	const options: RequestInit = { method: 'GET', headers: getHeaders() };
	return request<T>(endpoint, options);
};

const post = async <T extends object>(endpoint: string, data?: object) => {
	const options: RequestInit = { method: 'POST', headers: getHeaders() };
	if (data) options.body = JSON.stringify(data);
	return request<T>(endpoint, options);
};

const put = async <T extends object>(endpoint: string, data?: object) => {
	const options: RequestInit = { method: 'PUT', headers: getHeaders() };
	if (data) options.body = JSON.stringify(data);
	return request<T>(endpoint, options);
};

const patch = async <T extends object>(endpoint: string, data?: object) => {
	const options: RequestInit = { method: 'PATCH', headers: getHeaders() };
	if (data) options.body = JSON.stringify(data);
	return request<T>(endpoint, options);
};

const deleteMethod = async <T extends object>(endpoint: string) => {
	const options: RequestInit = { method: 'DELETE', headers: getHeaders() };
	return request<T>(endpoint, options);
};

export const fxbo = { isAuthorized, get, post, put, patch, delete: deleteMethod };
