import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Settings } from '~/components/icons/Settings';
import { useDialog } from '~/providers/DialogProvider';
import { FiltersDialog } from './FiltersDialog';
import type { TFilter } from '~/services/transactions';

export const Filters = ({ setFilters }: { setFilters: (filters: TFilter[]) => void }) => {
	const { t } = useTranslation(['funds']);
	const dialog = useDialog();

	const handleClick = () => dialog.open(<FiltersDialog setFilters={setFilters} />);

	return (
		<PrimaryButton className="flex h-[30px] w-full gap-2 sm:w-auto" onClick={handleClick}>
			<Settings width={17} />
			{t('transactions.history.filters.label')}
		</PrimaryButton>
	);
};
