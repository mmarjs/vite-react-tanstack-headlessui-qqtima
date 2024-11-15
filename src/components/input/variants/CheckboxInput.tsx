import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { Checkmark } from '~/components/icons/Checkmark';
import type { InputProps } from '../types';
import { twMerge } from 'tailwind-merge';

const Checkbox = ({ checked }: { checked: boolean }) => {
	return (
		<div
			className={`relative mt-[1px] h-[14px] w-[14px] cursor-pointer rounded-[3px] border transition-colors duration-300 ${
				checked ? 'border-primary-dark bg-primary' : 'border-primary'
			}`}
			tabIndex={0}
			role="checkbox"
			aria-checked={checked}
		>
			{checked && (
				<Checkmark
					width={8}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform fill-current text-light"
				/>
			)}
		</div>
	);
};

export const CheckboxInput = ({
	label,
	inputRef,
	className,
	error,
	onChange,
	defaultChecked,
	...props
}: InputProps) => {
	const [checked, setChecked] = useState(Boolean(defaultChecked));

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		onChange?.(e);
	};

	const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.code === 'Space') {
			e.preventDefault();
			setChecked((checked) => !checked);

			// trigger form change and validation
			const pseudoEvent = {
				target: {
					target: e.target,
					type: '', // keep empty
					name: props.name || '',
					value: !checked,
				},
			} as unknown as ChangeEvent<HTMLInputElement>;
			onChange?.(pseudoEvent);
		}
	};

	return (
		<div
			aria-label="Checkbox container"
			className={twMerge('relative flex flex-col', className)}
			onKeyDown={handleKeydown}
		>
			<label
				className={`flex items-center gap-[10px] ${
					error ? 'bg-error-background' : 'bg-transparent'
				}`}
			>
				<Checkbox checked={checked} />
				<div className="flex-1">{label}</div>

				<input
					ref={inputRef}
					type="checkbox"
					className="hidden"
					{...props}
					checked={checked}
					onChange={handleChange}
				/>
			</label>
			{error && (
				<span className="absolute bottom-[-13px] right-0 text-[10px] text-error">{error}</span>
			)}
		</div>
	);
};
