import { Disclosure, Transition } from '@headlessui/react';
import { useCallback, type ReactNode } from 'react';
import { useRef } from 'react';

export const PaperContent = ({
	children,
	className = '',
}: {
	children: ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const setPaperHeight = useCallback(() => {
		if (!ref.current) return;
		const maxHeight = ref.current?.scrollHeight;
		ref.current.style.setProperty('--max-height', `${maxHeight}px`);
	}, []);

	const resetPaperHeight = useCallback(() => {
		if (!ref.current) return;
		ref.current.style.setProperty('--max-height', 'fit-content');
	}, []);

	return (
		<Transition
			ref={ref}
			unmount={false}
			enter="transition-all overflow-hidden duration-300 ease-in"
			enterFrom="opacity-50 max-h-0"
			enterTo="opacity-100 max-h-[var(--max-height)]"
			leave="transition-all overflow-hidden duration-300 ease-out"
			leaveFrom="opacity-100 max-h-[var(--max-height)]"
			leaveTo="opacity-0 max-h-0"
			beforeLeave={setPaperHeight}
			afterEnter={resetPaperHeight}
		>
			<Disclosure.Panel className={className}>{children}</Disclosure.Panel>
		</Transition>
	);
};
