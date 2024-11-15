import { Popover as P, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import type { Placement } from '@popperjs/core';
import { twMerge } from 'tailwind-merge';

export const Popover = ({
	className = '',
	button,
	children,
	placement = 'bottom-end',
}: {
	className?: string;
	button: ReactNode;
	children: ReactNode;
	placement?: Placement;
}) => {
	const root = document.getElementById('root') as HTMLElement;
	const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement });

	return (
		<P as="div" className={twMerge('border-none', className)}>
			<P.Button as="div" className="group" ref={setReferenceElement}>
				{button}
			</P.Button>

			{createPortal(
				<Transition
					as="div"
					aria-hidden="true"
					className="fixed"
					enter="transition ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition ease-in duration-75"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<P.Panel
						aria-label="Popover"
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
						className="rounded-lg bg-background-elevated-light px-3 shadow-10 dark:bg-background-elevated-dark"
					>
						{children}
					</P.Panel>
				</Transition>,
				root,
			)}
		</P>
	);
};
