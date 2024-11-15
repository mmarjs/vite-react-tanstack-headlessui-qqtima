import type { ReactNode, MouseEvent, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const SecondaryButton = ({ children, className = '', ...restProps }: ButtonProps) => {
	return (
		<button
			className={twMerge(
				'flex items-center justify-center whitespace-nowrap rounded-3xl border-primary bg-transparent px-4 text-xs font-bold uppercase text-primary transition duration-400 hover:bg-primary hover:text-light sm:px-8',
				className,
			)}
			tabIndex={0}
			{...restProps}
		>
			{children}
		</button>
	);
};
