import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Link } from '~/components/link/Link';

type TextLinkProps = {
	children: ReactNode;
	to?: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

export const TextLink = ({ children, to, onClick, disabled, className = '' }: TextLinkProps) => {
	if (to)
		return (
			<Link
				to={to}
				disabled={disabled}
				className={twMerge(
					'inline items-center text-xs font-bold text-primary underline transition duration-400 hover:text-primary-dark',
					className,
				)}
			>
				{children}
			</Link>
		);

	return (
		<button
			onClick={onClick}
			type="button"
			disabled={disabled}
			className={twMerge(
				'inline items-center p-0 text-xs font-bold text-primary underline transition duration-400 hover:text-primary-dark disabled:text-neutral-400',
				className,
			)}
		>
			{children}
		</button>
	);
};
