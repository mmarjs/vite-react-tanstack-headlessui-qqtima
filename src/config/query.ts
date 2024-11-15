import { QueryClient } from '@tanstack/react-query';

export const client = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 30, // 30 minutes
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

export const keys = {
	accounts: 'accounts',
	transactionsHistory: 'transactionsHistory',
	pendingTransactions: 'pendingTransactions',
	profile: 'profile',
	notificationOptions: 'notificationOptions',
	uploadedDocuments: 'uploadedDocuments',
	documentConfigs: 'documentConfigs',
	sumsubToken: 'sumsubToken',
};
