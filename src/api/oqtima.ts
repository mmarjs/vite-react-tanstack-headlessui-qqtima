import { createError } from '~/utils/error';

const OQTIMA_API = import.meta.env.VITE_OQTIMA_API;

const request = async <T extends object>(endpoint: string, options: RequestInit) => {
	const response = await fetch(`${OQTIMA_API}/${endpoint}`, options);
	const json = await response.json();

	if (!response.ok) throw createError(json as Error);
	return json as T;
};

const get = async <T extends object>(endpoint: string) => {
	const options: RequestInit = { method: 'GET' };
	return request<T>(endpoint, options);
};

export const oqtima = { get };
