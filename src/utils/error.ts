const DEFAULT_MESSAGE = 'Something went wrong';

export const createError = (error: Error) =>
	new Error(error?.message || DEFAULT_MESSAGE, { cause: error });

interface CustomError {
	message: string;
	name: string;
	stack?: string;
}

export const normalizeError = (error: unknown): CustomError => {
	if (typeof error === 'string') return { name: 'Error', message: error };
	if (error instanceof Error) return error;
	return { name: 'UnknownError', message: 'An unknown error occurred' };
};
