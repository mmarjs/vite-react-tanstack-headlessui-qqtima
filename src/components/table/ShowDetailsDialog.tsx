import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { useDialog } from '~/providers/DialogProvider';
import { TableCell } from './TableCell';
import type { TRow } from './types';

export const ShowDetailsDialog = ({ row }: { row: TRow }) => {
	const { t } = useTranslation(['funds']);
	const dialog = useDialog();

	return (
		<div
			aria-label="Table row details dialog"
			className="flex w-[300px] flex-col gap-6 sm:w-[460px]"
		>
			<Header>{t('transactions.details.title', { id: row.key })}</Header>

			<div className="flex flex-col rounded-[5px] px-4 pt-2 pb-6 text-xs shadow-10">
				{row.data.map(({ type, content }) => (
					<div
						key={type}
						className="flex h-[34px] items-center justify-between border-b-neutral-100 dark:border-b-neutral-700 [&:not(:last-child)]:border-b"
					>
						<label className="font-bold">{t(`transactions.columns.${type}`)}</label>
						<TableCell content={content} />
					</div>
				))}
			</div>

			<PrimaryButton className="h-10" onClick={dialog.close}>
				{t('transactions.details.action')}
			</PrimaryButton>
		</div>
	);
};
