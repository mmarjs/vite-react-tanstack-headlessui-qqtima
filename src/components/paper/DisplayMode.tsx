import type { ReactNode } from 'react';
import { Grid } from '~/components/icons/Grid';
import { List } from '~/components/icons/List';

export const DisplayMode = ({
	value,
	setValue,
}: {
	value: 'list' | 'grid';
	setValue: (value: 'list' | 'grid') => void;
}) => {
	return (
		<div
			aria-label="Display mode switch"
			className="flex items-center overflow-hidden rounded-sm border border-background-elevated-dark dark:border-background-elevated-light"
		>
			<DisplayModeButton isActive={value === 'list'} onClick={() => setValue('list')}>
				<List width={20} height={20} />
			</DisplayModeButton>

			<DisplayModeButton isActive={value === 'grid'} onClick={() => setValue('grid')}>
				<Grid width={20} height={20} />
			</DisplayModeButton>
		</div>
	);
};

const DisplayModeButton = ({
	isActive,
	onClick,
	children,
}: {
	isActive: boolean;
	onClick: () => void;
	children: ReactNode;
}) => {
	return (
		<button
			className="flex h-[42px] w-[42px] items-center justify-center rounded-none bg-background-elevated-dark p-0 text-primary hover:animate-pulse aria-current:bg-primary aria-current:text-light dark:bg-background-elevated-light"
			aria-current={isActive}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
