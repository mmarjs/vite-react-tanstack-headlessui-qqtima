import { forwardRef } from 'react';
import type { TextAreaProps } from './types';
import { InputContainer } from './variants/elements/InputContainer';
import { twMerge } from 'tailwind-merge';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, error, className = '', ...props }, ref) => {
		return (
			<InputContainer label={label} error={error}>
				<textarea
					className={twMerge(
						'h-[100px] w-full resize-none border-b border-b-primary px-[10px] py-1 transition placeholder:absolute placeholder:bottom-0',
						error ? 'bg-error-background' : '',
						className,
					)}
					ref={ref}
					{...props}
				/>
			</InputContainer>
		);
	},
);

TextArea.displayName = 'TextArea';
