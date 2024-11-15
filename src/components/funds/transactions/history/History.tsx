import { useTranslation } from 'react-i18next';
import { Paper, PaperContent, PaperHeader } from '~/components/paper';
import { Tabcontent, Tablist, Tabs } from '~/components/tabs/Tabs';
import { TransactionsHistory } from './tabs/TransactionsHistory';
import { TransfersHistory } from './tabs/TransfersHistory';
import { useRef } from 'react';

export const History = () => {
	const { t } = useTranslation(['funds']);
	const tablist = useRef<HTMLDivElement>(null);

	const tabs = [
		t('transactions.history.tabs.transactionsHistory'),
		t('transactions.history.tabs.transfersHistory'),
	];

	return (
		<Paper aria-label="History" className="mt-4 flex flex-col gap-4 pb-4 sm:px-6 sm:pt-5 sm:pb-7">
			<PaperHeader className="p-[10px]">{t('transactions.history.title')}</PaperHeader>

			<PaperContent>
				<Tabs>
					<div
						ref={tablist}
						className="flex flex-wrap items-center justify-between gap-y-5 p-[10px] lg:p-0"
					>
						<Tablist labels={tabs} className="gap-3 text-base sm:text-xl lg:gap-5" />
					</div>

					<Tabcontent>
						<TransactionsHistory tablistRef={tablist} />
						<TransfersHistory />
					</Tabcontent>
				</Tabs>
			</PaperContent>
		</Paper>
	);
};
