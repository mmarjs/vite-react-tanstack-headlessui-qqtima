import { useTranslation } from 'react-i18next';
import { Paper, PaperContent, PaperHeader } from '~/components/paper';
import { Tabcontent, Tablist, Tabs } from '~/components/tabs/Tabs';
import { PendingTransactions } from './tabs/PendingTransactions';
import { PendingTransfers } from './tabs/PendingTransfers';

export const Pending = () => {
	const { t } = useTranslation(['funds']);

	const tabs = [
		t('transactions.pending.tabs.pendingTransactions'),
		t('transactions.pending.tabs.pendingTransfers'),
	];

	return (
		<Paper aria-label="Pending" className="flex flex-col gap-4 pb-4 sm:px-6 sm:pt-5 sm:pb-7">
			<PaperHeader className="p-[10px]">{t('transactions.pending.title')}</PaperHeader>

			<PaperContent>
				<Tabs>
					<Tablist labels={tabs} className="gap-3 text-base lg:gap-5 lg:text-xl" />

					<Tabcontent>
						<PendingTransactions />
						<PendingTransfers />
					</Tabcontent>
				</Tabs>
			</PaperContent>
		</Paper>
	);
};
