import type { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { useDialog } from '~/providers/DialogProvider';
import { Cross } from '~/components/icons/Cross';

export const Header = ({ children }: { children: ReactNode }) => {
	const dialog = useDialog();

	return (
		<header className="mt-2 flex items-center gap-7">
			<Dialog.Title as="h3" className="text-[18px] font-bold leading-none sm:text-[20px]">
				{children}
			</Dialog.Title>

			<hr className="flex-1 border-t-primary" />

			<button
				aria-label="Close"
				type="button"
				onClick={dialog.close}
				className="rounded-full bg-primary p-1 text-light transition duration-400 hover:border-primary hover:bg-transparent hover:text-primary"
			>
				<Cross width={8} height={8} />
			</button>
		</header>
	);
};
