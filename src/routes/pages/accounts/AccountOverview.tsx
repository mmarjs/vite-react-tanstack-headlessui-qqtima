import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MyAccounts } from '~/components/accounts/overview/myAccounts/MyAccounts';
import { Wallets } from '~/components/accounts/overview/Wallets';
import { WALLET_TYPE } from '~/config/accounts/overview';
import { client, keys } from '~/config/query';
import { accountsService, type TAccount } from '~/services/accounts';
import { toastError } from '~/utils/toast';

const query = {
	queryKey: [keys.accounts],
	queryFn: accountsService.list,
	onError: toastError,
};

export const accountsLoader = async () => {
	return client.getQueryData(query.queryKey) ?? client.fetchQuery(query);
};

const AccountOverview = () => {
	const initialData = useLoaderData() as Awaited<ReturnType<typeof query.queryFn>>;
	const { data } = useQuery({ ...query, initialData });

	const [wallets, myAccounts] = useMemo(() => {
		const wallets: TAccount[] = [];
		const myAccounts: TAccount[] = [];

		data.forEach((account) => {
			if (account.type.category === WALLET_TYPE) wallets.push(account);
			else myAccounts.push(account);
		}, []);

		return [wallets, myAccounts];
	}, [data]);

	return (
		<>
			<Wallets wallets={wallets} />
			<MyAccounts myAccounts={myAccounts} />
		</>
	);
};

export default AccountOverview;
