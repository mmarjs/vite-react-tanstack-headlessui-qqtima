import { useQuery } from '@tanstack/react-query';
import { StatusCell } from '~/components/table/StatusCell';
import { Table } from '~/components/table/Table';
import type { TRow } from '~/components/table/types';
import { Tab } from '~/components/tabs/Tabs';
import { createPendingTransactionsQuery } from '~/routes/pages/funds/transactionsLoader';
import type { TTransactions } from '~/services/transactions';
import { formatPrice } from '~/utils/price';
import { formatTimestamp } from '~/utils/time';
import { Cancel } from './Cancel';

export const PendingTransactions = () => {
	const { data } = useQuery(createPendingTransactionsQuery());
	if (!data) return null;

	const rows = data.rows.map(formatRowData);

	return (
		<Tab>
			<Table name="pendingTransactions" rows={rows} />
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
		canBeCanceled,
		_approveReason,
		_declineReason,
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
				label: 'transactions.columns.account',
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
				type: 'action',
				label: 'funds:transactions.columns.action',
				content: () => <Cancel id={id.value} canBeCanceled={canBeCanceled.value === '1'} />,
				priority: 8,
			},
		],
	};
}
