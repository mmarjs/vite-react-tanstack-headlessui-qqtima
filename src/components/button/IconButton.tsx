import type { ReactNode, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = {
	children: ReactNode;
	icon: ReactNode;
	className?: string;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const IconButton = ({ className = '', icon, children, ...restProps }: IconButtonProps) => {
	return (
		<button
			className={twMerge('flex items-center gap-2 rounded-none bg-transparent p-2', className)}
			{...restProps}
		>
			{icon}
			<span className="flex-1">{children}</span>
		</button>
	);
};
