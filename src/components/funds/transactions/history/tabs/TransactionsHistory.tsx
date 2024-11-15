import { useQuery } from '@tanstack/react-query';
import { useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Trans } from 'react-i18next';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { StatusCell } from '~/components/table/StatusCell';
import { Table } from '~/components/table/Table';
import type { TRow } from '~/components/table/types';
import { Tab } from '~/components/tabs/Tabs';
import { createTransactionsHistoryQuery } from '~/routes/pages/funds/transactionsLoader';
import type { TFilter, TTransactions } from '~/services/transactions';
import { formatPrice } from '~/utils/price';
import { formatTimestamp } from '~/utils/time';
import { Filters } from '../filters/Filters';

export const TransactionsHistory = ({ tablistRef }: { tablistRef: RefObject<HTMLDivElement> }) => {
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const [filters, setFilters] = useState<TFilter[]>([]);
	const [displayed, setDisplayed] = useState({ current: 0, total: 0 });

	const query = createTransactionsHistoryQuery(filters);
	const { data } = useQuery({
		...query,
		queryFn: () => {
			globalLoading.start();
			return query.queryFn();
		},
		onSettled: globalLoading.end,
	});

	if (!data) return null;
	const rows = data.rows.map(formatRowData);

	return (
		<Tab>
			<Table name="transactionsHistory" rows={rows} setDisplayed={setDisplayed} />

			{tablistRef.current &&
				createPortal(
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:mr-5">
						<Filters setFilters={setFilters} />

						<div className="text-base font-bold">
							<Trans i18nKey="transactions.history.showingXfromY" ns="funds" values={displayed}>
								Showing <span className="text-primary">current</span> records from{' '}
								<span className="text-primary">total</span>
							</Trans>
						</div>
					</div>,
					tablistRef.current,
				)}
		</Tab>
	);
};

function formatRowData(row: TTransactions['rows'][0]): TRow {
	const [
		id,
		type,
		status,
		paymentSystem,
		account,
		createdAt,
		_processedAt,
		amount,
		currency,
		_canBeCanceled,
		_approveReason,
		declineReason,
	] = row.data;

	return {
		key: id.value,
		data: [
			{ type: 'id', label: 'funds:transactions.columns.id', content: id.value, priority: 5 },
			{ type: 'type', label: 'funds:transactions.columns.type', content: type.value, priority: 1 },
			{
				type: 'status',
				label: 'funds:transactions.columns.status',
				content: () => <StatusCell value={status.value} />,
				priority: 4,
			},
			{
				type: 'paymentSystem',
				label: 'funds:transactions.columns.paymentSystem',
				content: paymentSystem.value,
				priority: 6,
			},
			{
				type: 'account',
				label: 'funds:transactions.columns.account',
				content: account.value,
				priority: 7,
			},
			{
				type: 'amount',
				label: 'funds:transactions.columns.amount',
				content: formatPrice(amount.value, currency.value),
				priority: 2,
			},
			{
				type: 'createdAt',
				label: 'funds:transactions.columns.createdAt',
				content: formatTimestamp(createdAt.value),
				priority: 3,
			},
			{
				type: 'declineReason',
				label: 'funds:transactions.columns.declineReason',
				content: declineReason.value,
				priority: 8,
			},
		],
	};
}
