import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { SecondaryButton } from '~/components/button/SecondaryButton';
import { Wallet as WalletIcon } from '~/components/icons/Wallet';
import { Panel } from '~/components/panel/Panel';
import { Paper, PaperHeader, PaperContent } from '~/components/paper';
import { DEFAULT_PAGE_SIZE } from '~/config/accounts/overview';
import { notImplemented } from '~/utils/functional';
import type { TAccount } from '~/services/accounts';
import { ShowMoreButton } from './ShowMoreButton';

const Wallet = ({ wallet }: { wallet: TAccount }) => {
	const { t } = useTranslation(['accounts']);

	return (
		<Panel className="flex w-[320px] flex-col">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-[5px]">
					<h3 className="text-xs font-bold text-background-dark dark:text-background-light">
						{wallet.type.title}
					</h3>
					<p className="text-3xl font-bold">
						{wallet.currency} {wallet.balance.toLocaleString()}
					</p>
				</div>
				<WalletIcon width={28} className="text-primary" />
			</div>

			<hr className="mt-6 flex-1 border-t-neutral-200 dark:border-t-neutral-600" />

			<div className="mt-5 flex content-center items-center gap-4 sm:gap-6">
				<SecondaryButton onClick={notImplemented} className="h-[26px]">
					{t('overview.wallets.actions.history')}
				</SecondaryButton>

				<PrimaryButton onClick={notImplemented} className="h-[26px]">
					{t('overview.wallets.actions.deposit')}
				</PrimaryButton>
			</div>
		</Panel>
	);
};

export const Wallets = ({ wallets }: { wallets: TAccount[] }) => {
	const { t } = useTranslation(['accounts']);

	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const showMore = () => setPageSize((prev) => prev + DEFAULT_PAGE_SIZE);
	const displayedWallets = useMemo(() => wallets.slice(0, pageSize), [wallets, pageSize]);

	return (
		<Paper aria-label="Wallets" className="pb-4 sm:py-5 sm:px-6">
			<PaperHeader className="p-[10px]">{t('overview.wallets.title')}</PaperHeader>

			<PaperContent className="flex flex-col flex-wrap gap-5 p-[10px] sm:flex-row sm:gap-8">
				{displayedWallets.map((wallet) => (
					<Wallet key={wallet.loginSid} wallet={wallet} />
				))}
			</PaperContent>

			{wallets.length > pageSize && <ShowMoreButton onClick={showMore} />}
		</Paper>
	);
};
