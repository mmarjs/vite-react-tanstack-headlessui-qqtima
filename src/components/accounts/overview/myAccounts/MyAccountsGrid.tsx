import { memo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Options } from '~/components/accounts/overview/myAccounts/options/Options';
import { accountStatuses } from '~/config/accounts/overview';
import type { TAccount } from '~/services/accounts';

const MyAccount = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const tradingStatus = accountStatuses[account.tradingStatus];

	return (
		<section className="flex w-[315px] flex-col overflow-hidden rounded-[5px] pb-4 shadow-10">
			<header className="flex items-center justify-between bg-primary px-4 py-1 font-bold uppercase text-light">
				<h3>{account.login}</h3>
				<span>{account.type.platform}</span>
				<Options account={account} className="text-dark" />
			</header>

			<div className="flex flex-col px-4 py-2 text-xs">
				<DataLine label={t('overview.myAccounts.details.type')}>{account.type.title}</DataLine>
				<DataLine label={t('overview.myAccounts.details.server')}>{account.type.server}</DataLine>
				<DataLine label={t('overview.myAccounts.details.number')}>{account.login}</DataLine>
				<DataLine label={t('overview.myAccounts.details.freeMargin')}>
					{account.currency} {account.marginFree}
				</DataLine>
				<DataLine label={t('overview.myAccounts.details.actualLeverage')}>
					1:{account.leverage}
				</DataLine>
				<DataLine label={t('overview.myAccounts.details.maxLeverage')}>
					1:{account.type.leverages.at(-1)}
				</DataLine>
				<DataLine label={t('overview.myAccounts.details.type')}>{account.type.title}</DataLine>
				<DataLine label={t('overview.myAccounts.details.status')}>
					<span className={`uppercase text-[${tradingStatus.color}]`}>
						{t(tradingStatus.label)}
					</span>
				</DataLine>
			</div>
		</section>
	);
};

const MemoizedMyAccount = memo(MyAccount);

export const MyAccountsGrid = ({ accounts }: { accounts: TAccount[] }) => {
	return (
		<div className="flex flex-wrap gap-5">
			{accounts.map((account) => (
				<MemoizedMyAccount account={account} key={account.loginSid} />
			))}
		</div>
	);
};

const DataLine = ({ label, children }: { label: string; children: ReactNode }) => {
	return (
		<div className="flex h-[34px] items-center justify-between border-b border-b-neutral-100 dark:border-b-neutral-700">
			<label className="font-bold uppercase">{label}</label>
			{children}
		</div>
	);
};
