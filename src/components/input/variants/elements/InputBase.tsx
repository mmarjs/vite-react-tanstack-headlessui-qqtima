import { twMerge } from 'tailwind-merge';
import type { InputProps } from '../../types';

export const InputBase = ({
	placeholder,
	type,
	inputRef,
	error,
	className = '',
	...props
}: InputProps) => {
	return (
		<input
			ref={inputRef}
			type={type}
			aria-invalid={Boolean(error)}
			className={twMerge(
				'rounded-none border-0 border-b border-primary px-[10px] py-1 transition disabled:border-neutral-400 disabled:bg-transparent disabled:text-neutral-400 aria-invalid:bg-error-background',
				className,
			)}
			placeholder={placeholder}
			{...props}
		/>
	);
};
