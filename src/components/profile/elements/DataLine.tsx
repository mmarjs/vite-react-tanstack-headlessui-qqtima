import type { ReactNode} from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cog } from '~/components/icons/Cog';
import { Edit } from '~/components/icons/Edit';

export type TDataLine = {
	label: string;
	value?: ReactNode;
	onEdit?: VoidFunction;
};

const DataLineComponent = ({
	label,
	onEdit,
	value,
	children,
}: TDataLine & { children: ReactNode }) => {
	const { t } = useTranslation(['profile']);
	const Icon = value ? Edit : Cog;

	return (
		<div className="relative flex items-start justify-between gap-2 border-b border-b-neutral-100 py-[10px] pl-3 pr-7 dark:border-b-neutral-700">
			<label className="font-bold">{t(label)}:</label>

			<span className="text-right">{children}</span>

			{onEdit && (
				<button
					className="absolute top-1/4 right-0 fill-primary p-0 transition hover:text-primary"
					onClick={onEdit}
				>
					<Icon width={16} />
				</button>
			)}
		</div>
	);
};

export const DataLine = memo(DataLineComponent);
