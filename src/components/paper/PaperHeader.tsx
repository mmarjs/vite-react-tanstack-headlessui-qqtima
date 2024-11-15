import { Disclosure } from '@headlessui/react';
import type { HTMLProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArrowDown } from '~/components/icons/ArrowDown';

export const PaperHeader = ({
	children,
	className = '',
	collapsible = true,
	...props
}: HTMLProps<HTMLDivElement> & {
	children: ReactNode;
	className?: string;
	collapsible?: boolean;
}) => {
	return (
		<header className={twMerge('flex items-center gap-5', className)} {...props}>
			<h3 className="font-bold leading-none sm:text-[16px]">{children}</h3>

			<hr aria-hidden className="flex-1 border-t-primary" />

			{collapsible && (
				<Disclosure.Button
					aria-label="Collapse"
					className="rounded-full bg-primary p-1 text-light transition duration-400 hover:border-primary hover:bg-transparent hover:text-primary"
				>
					<ArrowDown
						width="8"
						height="8"
						strokeWidth="0.5"
						viewBox="-0.5 0 8.3 3"
						className="transition-transform duration-300 ui-open:rotate-180"
					/>
				</Disclosure.Button>
			)}
		</header>
	);
};
