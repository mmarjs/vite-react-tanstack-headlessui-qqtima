import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { WalletPlus } from '~/components/icons/WalletPlus';
import { Select } from '~/components/input/Select';
import { Paper, PaperHeader, PaperContent } from '~/components/paper';
import { DisplayMode } from '~/components/paper/DisplayMode';
import { Tabcontent, Tablist, Tabs } from '~/components/tabs/Tabs';
import { DEFAULT_PAGE_SIZE } from '~/config/accounts/overview';
import type { TAccount } from '~/services/accounts';
import { MyAccountsGrid } from './MyAccountsGrid';
import { MyAccountsList } from './MyAccountsList';
import { ShowMoreButton } from '../ShowMoreButton';

const categories = ['live', 'demo', 'archived'] as const;
type TCategory = (typeof categories)[number];

const sortTypes = ['newest', 'oldest', 'freeMargin', 'nickname'] as const;
type TSort = (typeof sortTypes)[number];
const sorting: {
	[key in TSort]: { label: string; sort: (a: TAccount, b: TAccount) => number };
} = {
	newest: { label: 'overview.myAccounts.sort.newest', sort: (a, b) => b.login - a.login },
	oldest: { label: 'overview.myAccounts.sort.oldest', sort: (a, b) => a.login - b.login },
	freeMargin: {
		label: 'overview.myAccounts.sort.freeMargin',
		sort: (a, b) => b.marginFree - a.marginFree,
	},
	nickname: {
		label: 'overview.myAccounts.sort.nickname',
		sort: (a, b) => a.type.title.localeCompare(b.type.title),
	},
};

export const MyAccounts = ({ myAccounts }: { myAccounts: TAccount[] }) => {
	const { t } = useTranslation(['accounts']);
	const navigate = useNavigate();

	const [category, setCategory] = useState<TCategory>('live');
	const [sort, setSort] = useState<TSort>('newest');
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const showMore = () => setPageSize((prev) => prev + DEFAULT_PAGE_SIZE);

	const accounts = useMemo(() => {
		const filtered = myAccounts.filter(({ type }) => type.category === category);
		const sorted = filtered.sort(sorting[sort].sort);
		return sorted.slice(0, pageSize);
	}, [myAccounts, sort, pageSize, category]);

	// translate sorting options
	const sortingOptions = useMemo(
		() => sortTypes.map((value) => ({ value, label: t(sorting[value].label) })),
		[t],
	);

	const [displayMode, setDisplayMode] = useState<'list' | 'grid'>('list');
	const Accounts = displayMode === 'list' ? MyAccountsList : MyAccountsGrid;

	return (
		<Paper aria-label="My Accounts" className="mt-8 mb-20 pb-4 sm:py-5 sm:px-6">
			<PaperHeader className="p-[10px]">{t('overview.myAccounts.title')}</PaperHeader>

			<PaperContent>
				<div className="mt-6 mb-6 flex items-center justify-center gap-8 sm:mb-1 sm:mt-4">
					<hr className="hidden flex-1 border-t-neutral-200 dark:border-t-neutral-600 sm:block" />

					<PrimaryButton onClick={() => navigate('/accounts/open')} className="h-10">
						<WalletPlus className="mr-2 h-5 w-5" />
						{t('overview.myAccounts.actions.openNew')}
					</PrimaryButton>
				</div>

				<Tabs onChange={(index) => setCategory(categories[index])}>
					<Tablist
						labels={[
							t('overview.myAccounts.categories.live'),
							t('overview.myAccounts.categories.demo'),
							t('overview.myAccounts.categories.archived'),
						]}
					/>

					<Tabcontent className="flex flex-col gap-8">
						<div className="flex items-center justify-between">
							<Select
								label={t('sort', { ns: 'common' })}
								options={sortingOptions}
								value={sort}
								onChange={(e) => setSort(e.target.value as TSort)}
								className="max-w-[320px]"
							/>

							<DisplayMode value={displayMode} setValue={setDisplayMode} />
						</div>

						{accounts.length ? (
							<>
								<Accounts accounts={accounts} />
								{myAccounts.length > pageSize && <ShowMoreButton onClick={showMore} />}
							</>
						) : (
							<div className="h-40 text-neutral-500 dark:text-neutral-400">
								{t('overview.myAccounts.noAccounts', { category })}
							</div>
						)}
					</Tabcontent>
				</Tabs>
			</PaperContent>
		</Paper>
	);
};
