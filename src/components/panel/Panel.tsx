import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type PanelProps = {
	children: ReactNode;
	className?: string;
};

export const Panel = ({ children, className = '' }: PanelProps) => {
	return (
		<section
			className={twMerge(
				'transform overflow-hidden rounded-[5px] bg-light py-5 px-4 text-left align-middle shadow-10 before:absolute before:top-0 before:left-0 before:right-0 before:h-[7px] before:bg-primary dark:bg-background-elevated-dark',
				className,
			)}
		>
			{children}
		</section>
	);
};
