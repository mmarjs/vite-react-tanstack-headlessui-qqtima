import type { MouseEvent } from 'react';
import { Checkmark } from '~/components/icons/Checkmark';

type Option = { value: string; label: string };

type OptionProps = {
	option: Option;
	isSelected: boolean;
	handleChange: (e: MouseEvent<HTMLDivElement>, option: Option) => void;
};
export const Option = ({ option, isSelected, handleChange }: OptionProps) => {
	return (
		<div
			role="option"
			className="flex cursor-pointer items-center gap-[6px] px-5 py-1 focus:bg-primary focus:text-light"
			onClick={(e) => handleChange(e, option)}
			onMouseEnter={(e) => e.currentTarget.focus()}
			data-value={option.value}
			data-label={option.label}
			tabIndex={0}
			aria-selected={isSelected}
		>
			{isSelected && (
				<div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary text-light">
					<Checkmark width={9} height={9} />
				</div>
			)}

			<div className="ml-5 aria-selected:ml-0 aria-selected:font-bold" aria-selected={isSelected}>
				{option.label}
			</div>
		</div>
	);
};
