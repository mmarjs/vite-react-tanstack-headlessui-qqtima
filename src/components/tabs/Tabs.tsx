import { Tab as T } from '@headlessui/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({
	onChange,
	children,
}: {
	onChange?: (index: number) => void;
	children: ReactNode;
}) => {
	return <T.Group onChange={onChange}>{children}</T.Group>;
};

export const Tablist = ({ labels, className = '' }: { labels: string[]; className?: string }) => {
	return (
		<T.List className={twMerge('ml-2 flex gap-5 text-xl sm:ml-5', className)}>
			{labels.map((label) => (
				<T
					key={label}
					className="relative rounded-none px-0 py-1 font-bold transition ui-selected:text-primary ui-selected:after:absolute ui-selected:after:left-0 ui-selected:after:top-full ui-selected:after:h-[2px] ui-selected:after:w-full ui-selected:after:bg-current ui-selected:after:content-['']"
				>
					{label}
				</T>
			))}
		</T.List>
	);
};

export const Tabcontent = ({
	children,
	className = '',
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<T.Panels
			className={twMerge(
				'border-t border-neutral-200 py-4 px-[10px] dark:border-neutral-600 sm:border sm:px-5',
				className,
			)}
		>
			{children}
		</T.Panels>
	);
};

export const Tab = ({ children }: { children: ReactNode }) => {
	return <T.Panel>{children}</T.Panel>;
};
