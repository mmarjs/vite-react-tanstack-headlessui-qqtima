import type { ReactNode } from 'react';
import { Paper } from '~/components/paper/Paper';

export const RadioBox = ({
	label,
	description,
	features,
	isCurrent,
	onClick,
	children,
}: {
	label: string;
	description: string;
	features?: string[];
	isCurrent: boolean;
	onClick: VoidFunction;
	children: ReactNode;
}) => {
	return (
		<Paper
			aria-label="Radio input box"
			className="relative flex cursor-pointer items-start gap-5 border border-transparent p-[14px] pb-5 transition aria-current:border-primary"
			aria-current={isCurrent}
			onClick={onClick}
		>
			{children}

			<div className="flex flex-col gap-2">
				<span className="text-[15px] font-bold">{label}</span>
				<span className="text-xs">{description}</span>

				{features && (
					<ul className="right-4 top-[15px] flex gap-[10px] text-[8px] font-bold xl:absolute">
						{features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}
					</ul>
				)}
			</div>
		</Paper>
	);
};
