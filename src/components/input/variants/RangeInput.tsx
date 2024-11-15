import { InputLabel } from './elements/InputLabel';
import { Datalist } from './elements/Datalist';
import type { InputProps } from '../types';
import { twMerge } from 'tailwind-merge';

export const RangeInput = ({
	label,
	error,
	inputRef,
	steps,
	className = '',
	...props
}: InputProps) => {
	const list = steps ? `${props.name}List` : undefined;

	return (
		<div className="relative flex flex-col gap-1 text-[13px]" aria-label="Input container">
			<div className="flex items-center justify-between">
				<InputLabel>{label}</InputLabel>
				{error && <span className="text-[10px] text-error">{error}</span>}
			</div>

			<input
				ref={inputRef}
				type="range"
				className={twMerge(
					'mt-4 flex h-[3px] cursor-pointer appearance-none items-center bg-dark accent-primary dark:bg-light',
					className,
				)}
				list={list}
				{...props}
			/>

			{steps && <Datalist id={list || ''} steps={steps} />}
		</div>
	);
};
