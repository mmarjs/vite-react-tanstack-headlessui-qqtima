import type { ReactNode} from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Dialog } from '~/components/dialog/Dialog';

type TDialogContext = {
	open: (component: ReactNode) => void;
	close: () => void;
};

const DialogContext = createContext<TDialogContext>({
	open: () => console.error('Open dialog: called before context initialization'),
	close: () => console.error('Closre dialog: called before context initialization'),
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
	const [component, setComponent] = useState<ReactNode>(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback((component: ReactNode) => {
		setComponent(component);
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const value = useMemo(() => ({ open, close }), [open, close]);

	return (
		<DialogContext.Provider value={value}>
			{children}

			<Dialog isOpen={isOpen} onClose={close}>
				{component}
			</Dialog>
		</DialogContext.Provider>
	);
};

export const useDialog = () => useContext(DialogContext);
