import { useTranslation } from 'react-i18next';
import { More } from '~/components/icons/More';
import { Tooltip } from '~/components/tooltip/Tooltip';
import { useDialog } from '~/providers/DialogProvider';
import { ShowDetailsDialog } from './ShowDetailsDialog';
import type { TRow } from './types';

export const ShowDetails = ({ row }: { row: TRow }) => {
	const { t } = useTranslation();
	const dialog = useDialog();

	return (
		<button
			className="flex content-center rounded-none p-1 text-primary transition-colors hover:text-primary-dark"
			onClick={() => dialog.open(<ShowDetailsDialog row={row} />)}
		>
			<Tooltip label={t('table.showDetails')} placement="left">
				<More width={22} />
			</Tooltip>
		</button>
	);
};
