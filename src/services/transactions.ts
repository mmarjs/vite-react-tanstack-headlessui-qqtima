import { fxbo } from '~/api/fxbo';

export type TTransactions = {
	columns: {
		key: string;
		value: string;
	}[];
	rows: {
		data: {
			key: string;
			value: string;
		}[];
	}[];
	totals: {
		field: string;
		total: string;
	}[];
	canExportToCsv: boolean;
	canFilter: boolean;
};

export type TModificator =
	| 'Starts With'
	| 'Ends With'
	| 'Contains'
	| 'Not Contains'
	| 'Equals'
	| 'Blank'
	| 'Not Blank'
	| 'In';

export type TFilter = {
	field: string;
	modificator: TModificator;
	value: string;
};

export type TSegment = {
	limit: number;
	offset: number;
};

export type TSorting = {
	field: string;
	direction: 'DESC' | 'ASC';
};

type TTransaction = {
	id: number;
	status: string;
	type: string;
	amount: number;
	currency: string;
	createdAt: string;
	processedAt: string;
	paymentSystem: TPaymentSystem;
	reason: string;
	canCancel: boolean;
};

type TPaymentSystem = {
	id: number;
	logo: string;
	displayName: string;
	displayOrder: number;
	paymentDetailsRequired: boolean;
	description: string;
	currencies: string[];
};

const list = (filters: TFilter[], segment: TSegment, sorting: TSorting) => {
	if (!fxbo.isAuthorized()) return Promise.resolve({} as TTransactions);
	const tableConfig = { filters, segment, sorting, csv: false, withTotals: true };
	return fxbo.post<TTransactions>('transactions', { tableConfig });
};

const cancel = (id: string) => {
	return fxbo.patch<TTransaction>(`transactions/cancel/${id}`);
};

export const transactionsService = { list, cancel };
