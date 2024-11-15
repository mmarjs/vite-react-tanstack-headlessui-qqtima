import { Disclosure } from '@headlessui/react';
import type { HTMLProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const Paper = ({
	children,
	className = '',
	...props
}: HTMLProps<HTMLDivElement> & {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<Disclosure defaultOpen>
			<div
				className={twMerge(
					'rounded-[5px] bg-background-elevated-light shadow-10 dark:bg-background-elevated-dark',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</Disclosure>
	);
};
