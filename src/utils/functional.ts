import { toastError } from './toast';

export const noop = () => {
	// noop
};

export const notImplemented = () => {
	toastError('Not yet implemented');
};
