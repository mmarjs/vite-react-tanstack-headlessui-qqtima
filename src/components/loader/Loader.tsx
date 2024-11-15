import { Logo } from '~/components/logo/Logo';

export const Loader = () => {
	return (
		<div
			aria-label="Loading screen"
			role="alertdialog"
			aria-modal="true"
			className="fixed inset-0 z-50 flex justify-center bg-white bg-opacity-50 dark:bg-neutral-900 dark:bg-opacity-50"
		>
			<Logo className="w-[208px] text-primary" />
		</div>
	);
};
