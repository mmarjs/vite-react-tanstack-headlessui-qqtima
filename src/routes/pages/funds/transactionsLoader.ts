import { transactionsFieldsMap } from '~/config/funds/transactions';
import { client, keys } from '~/config/query';
import { TABLE_SIZE_LIMIT } from '~/config/requests';
import {
	transactionsService,
	type TFilter,
	type TSegment,
	type TSorting,
} from '~/services/transactions';
import { toastError } from '~/utils/toast';

export const createPendingTransactionsQuery = () => {
	const filters: TFilter[] = [
		{
			field: transactionsFieldsMap.status,
			modificator: 'Equals',
			value: 'pending',
		},
	];
	const segment: TSegment = { limit: TABLE_SIZE_LIMIT, offset: 0 };
	const sorting: TSorting = { field: 'Created At', direction: 'DESC' };

	return {
		queryKey: [keys.pendingTransactions],
		queryFn: () => transactionsService.list(filters, segment, sorting),
		keepPreviousData: true,
		onError: toastError,
	};
};

export const createTransactionsHistoryQuery = (outerFilters: TFilter[]) => {
	const filters: TFilter[] = [
		{
			field: transactionsFieldsMap.status,
			modificator: 'Not Contains',
			value: 'pending',
		},
		...outerFilters,
	];
	const segment: TSegment = { limit: TABLE_SIZE_LIMIT, offset: 0 };
	const sorting: TSorting = { field: 'Created At', direction: 'DESC' };
	const criteria = JSON.stringify({ filters, segment, sorting });

	return {
		queryKey: [keys.transactionsHistory, criteria],
		queryFn: () => transactionsService.list(filters, segment, sorting),
		keepPreviousData: true,
		onError: toastError,
	};
};

export const transactionsLoader = () => {
	const pendingTransactions = client.prefetchQuery(createPendingTransactionsQuery());
	const transactionsHistory = client.prefetchQuery(createTransactionsHistoryQuery([]));
	return Promise.all([pendingTransactions, transactionsHistory]);
};

export type TTransactionsLoaderData = Awaited<ReturnType<typeof transactionsLoader>>;
