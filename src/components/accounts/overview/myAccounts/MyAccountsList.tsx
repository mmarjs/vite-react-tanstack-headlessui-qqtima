import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Options } from '~/components/accounts/overview/myAccounts/options/Options';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { SecondaryButton } from '~/components/button/SecondaryButton';
import { Balance } from '~/components/icons/Balance';
import { Deposit } from '~/components/icons/Deposit';
import { Panel } from '~/components/panel/Panel';
import { accountStatuses } from '~/config/accounts/overview';
import type { TAccount } from '~/services/accounts';
import { notImplemented } from '~/utils/functional';

const MyAccount = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const tradingStatus = accountStatuses[account.tradingStatus];

	return (
		<Panel className="flex max-w-[1410px] flex-col justify-between lg:flex-row">
			<div className="flex flex-col gap-2 pr-2">
				<div className="flex gap-3">
					<div className="flex h-[25px] w-[100px] items-center justify-center rounded bg-primary text-xs font-bold uppercase text-light">
						{account.type.platform}
					</div>

					<div
						className="flex h-[25px] w-[100px] items-center justify-center rounded text-xs font-bold uppercase text-light"
						style={{ backgroundColor: tradingStatus.color }}
					>
						{t(tradingStatus.label)}
					</div>
				</div>

				<div className="mt-5 flex gap-2 text-xs font-bold text-background-dark dark:text-background-light">
					<span>{account.type.title}</span>
					<span className="text-primary">{'/'}</span>
					<span>{account.login}</span>
				</div>

				<p className="text-4xl font-bold">
					{account.balance.toLocaleString()}{' '}
					<span className="text-primary">{account.currency}</span>
				</p>
			</div>

			<div className="flex flex-col items-end justify-end lg:border-l lg:border-l-neutral-200 lg:pl-4 lg:dark:border-l-neutral-600 xl:pl-10">
				<Options account={account} className="absolute top-4" />

				<hr className="mt-10 mb-6 w-full border-t-neutral-200 dark:border-t-neutral-600 lg:hidden" />

				<div className="flex flex-wrap content-center items-center justify-end gap-x-4 gap-y-2">
					<SecondaryButton
						onClick={notImplemented}
						className="flex h-[26px] w-[150px] gap-1 md:h-10 md:w-[200px]"
					>
						<Balance className="w-[18px] md:w-[23px]" />
						{t('overview.myAccounts.actions.setBalance')}
					</SecondaryButton>

					<PrimaryButton
						onClick={notImplemented}
						className="flex h-[26px] w-[150px] gap-1 md:h-10 md:w-[200px]"
					>
						<Deposit className="w-[18px] md:w-[23px]" />
						{t('overview.myAccounts.actions.deposit')}
					</PrimaryButton>
				</div>
			</div>
		</Panel>
	);
};

const MemoizedMyAccount = memo(MyAccount);

export const MyAccountsList = ({ accounts }: { accounts: TAccount[] }) => {
	return (
		<div className="flex flex-col gap-5">
			{accounts.map((account) => (
				<MemoizedMyAccount key={account.loginSid} account={account} />
			))}
		</div>
	);
};
