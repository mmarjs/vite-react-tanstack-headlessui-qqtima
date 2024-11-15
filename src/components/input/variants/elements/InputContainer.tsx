import type { ReactNode, RefObject } from 'react';
import { InputLabel } from './InputLabel';

export const InputContainer = ({
	label,
	error,
	disabled,
	children,
	containerRef,
}: {
	label: ReactNode;
	error?: string;
	disabled?: boolean;
	children: ReactNode;
	containerRef?: RefObject<HTMLDivElement>;
}) => {
	return (
		<div
			className="relative flex flex-col space-y-2 text-[13px]"
			aria-label="Input container"
			ref={containerRef}
		>
			<div className="flex items-center justify-between">
				<InputLabel disabled={disabled}>{label}</InputLabel>
				{error && <span className="text-[10px] text-error">{error}</span>}
			</div>
			{children}
		</div>
	);
};
