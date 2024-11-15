import type { ReactNode } from 'react';
import { useDrawerStore } from './drawerStore';

export const Drawer = ({ children }: { children: ReactNode }) => {
	const isOpen = useDrawerStore((state) => state.isOpen);
	const close = useDrawerStore((state) => state.close);

	return (
		<div aria-label="Drawer" role="alertdialog" aria-modal="true" className="z-30">
			<div
				aria-label="Overlay"
				aria-hidden={!isOpen}
				className="fixed inset-0 aria-hidden:hidden"
				onClick={close}
			/>

			<div
				aria-label="Drawer content"
				className={`absolute shadow-lg transition duration-200 ease-in-out ${
					isOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
			>
				{children}
			</div>
		</div>
	);
};
