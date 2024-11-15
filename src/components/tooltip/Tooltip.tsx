import { Transition } from '@headlessui/react';
import type { Placement } from '@popperjs/core';
import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import './styles.css';

export const Tooltip = ({
	children,
	label,
	enterDelay = 250,
	leaveDelay = 150,
	placement = 'top',
}: {
	children?: ReactNode;
	label?: ReactNode;
	enterDelay?: number;
	leaveDelay?: number;
	placement?: Placement;
}) => {
	const root = document.getElementById('root') as HTMLElement;
	const [isOpen, setIsOpen] = useState(false);

	const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
	const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement,
		modifiers: [
			{ name: 'offset', options: { offset: [0, 4] } },
			{ name: 'arrow', options: { element: arrowElement } },
		],
	});

	const enterTimeout = useRef<NodeJS.Timeout>();
	const leaveTimeout = useRef<NodeJS.Timeout>();

	const handleMouseEnter = useCallback(() => {
		leaveTimeout.current && clearTimeout(leaveTimeout.current);
		enterTimeout.current = setTimeout(() => setIsOpen(true), enterDelay);
	}, [enterDelay]);

	const handleMouseLeave = useCallback(() => {
		enterTimeout.current && clearTimeout(enterTimeout.current);
		leaveTimeout.current = setTimeout(() => setIsOpen(false), leaveDelay);
	}, [leaveDelay]);

	return (
		<div>
			<div
				ref={setReferenceElement}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}
				className="relative"
			>
				{children}
			</div>

			{createPortal(
				<Transition
					as="div"
					show={isOpen}
					enter="transition-opacity duration-100"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-75"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					role="tooltip"
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
					className="min-w-[140px] max-w-[360px] rounded-[5px] bg-background-elevated-dark py-[7px] px-[10px] text-xs font-bold text-zinc-400 shadow-10"
				>
					<div
						ref={setArrowElement}
						style={styles.arrow}
						className={`tooltip-arrow ${placement}`}
					/>
					{label}
				</Transition>,
				root,
			)}
		</div>
	);
};
