import toast from 'react-hot-toast';
import { normalizeError } from './error';

const options = {
	duration: 5000,
	className: 'text-sm text-dark bg-light dark:text-light dark:bg-dark',
	style: {
		borderRadius: '4px',
	},
};

export const toastSuccess = (message: string) => toast.success(message, options);

export const toastError = (error: unknown) => toast.error(normalizeError(error).message, options);
