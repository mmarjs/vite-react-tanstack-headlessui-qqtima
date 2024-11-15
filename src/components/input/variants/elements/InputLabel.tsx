import type { ReactNode } from 'react';

export const InputLabel = ({ disabled, children }: { disabled?: boolean; children: ReactNode }) => {
	return (
		<label
			aria-disabled={disabled}
			className="text-xs font-bold aria-disabled:text-neutral-400 sm:text-[13px]"
		>
			{children}
		</label>
	);
};
