import { twMerge } from 'tailwind-merge';
import type { InputProps } from '../types';

export const RadioInput = ({ inputRef, error, className = '', ...props }: InputProps) => {
	return (
		<input
			ref={inputRef}
			type="radio"
			className={twMerge(
				'scale-[1.077] cursor-pointer accent-primary',
				error ? 'bg-error-background' : 'bg-transparent',
				className,
			)}
			{...props}
		/>
	);
};
