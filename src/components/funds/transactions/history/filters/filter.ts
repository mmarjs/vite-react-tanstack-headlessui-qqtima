import { transactionsFieldsMap } from '~/config/funds/transactions';
import type { TFilter } from '~/services/transactions';
import type { TFilterTransactionsSchema } from '~/validation/funds/filterTransactions';

const modificatorsMap: Record<string, Partial<TFilter> | null> = {
	any: null,
	specific: {
		modificator: 'In',
	},
	contains: {
		modificator: 'Contains',
	},
	doesnotContain: {
		modificator: 'Not Contains',
	},
	today: {
		modificator: 'Starts With',
		value: /* 2023-04-10 */ new Date().toISOString().split('T')[0],
	},
	yesterday: {
		modificator: 'Starts With',
		value: /* 2023-04-09 */ new Date(new Date().setDate(new Date().getDate() - 1))
			.toISOString()
			.split('T')[0],
	},
	thisMonth: {
		modificator: 'Starts With',
		value: /* 2023-04 */ new Date().toISOString().split('T')[0].split('-').slice(0, 2).join('-'),
	},
	lastMonth: {
		modificator: 'Starts With',
		value: /* 2023-03 */ new Date(new Date().setMonth(new Date().getMonth() - 1))
			.toISOString()
			.split('T')[0]
			.split('-')
			.slice(0, 2)
			.join('-'),
	},
};

const composeFilter = (field: string, modificator: string, inputValue?: string) => {
	const baseFilter = modificatorsMap[modificator];
	if (!baseFilter || !baseFilter.modificator) return null;

	const filter: TFilter = {
		field: transactionsFieldsMap[field],
		modificator: baseFilter.modificator,
		value: baseFilter.value || inputValue || '',
	};

	if (!filter.value) return null;

	return filter;
};

export const composeFilters = (data: TFilterTransactionsSchema) => {
	const id = composeFilter('id', data.id_modificator, data.id);
	const type = composeFilter('type', data.type_modificator, data.type);
	const status = composeFilter('status', data.status_modificator, JSON.stringify(data.status));
	const paymentSystem = composeFilter(
		'paymentSystem',
		data.paymentSystem_modificator,
		data.paymentSystem,
	);
	const account = composeFilter('account', data.account_modificator, data.account);
	const createdAt = composeFilter('createdAt', data.createdAt_modificator, data.createdAt);
	const amount = composeFilter('amount', data.amount_modificator, data.amount);
	const currency = composeFilter('currency', data.currency_modificator, data.currency);

	const filters = [id, type, status, paymentSystem, account, createdAt, amount, currency].filter(
		Boolean,
	) as TFilter[];
	return filters;
};
