import type { FC, SVGProps } from 'react';
import { Accounts } from '~/components/icons/Accounts';
import { Calculator } from '~/components/icons/Calculator';
import { Comissions } from '~/components/icons/Comissions';
import { Dashboard } from '~/components/icons/Dashboard';
import { Deposit } from '~/components/icons/Deposit';
import { HowTo } from '~/components/icons/HowTo';
import { Logout } from '~/components/icons/Logout';
import { MarketingTools } from '~/components/icons/MarketingTools';
import { OpenDemo } from '~/components/icons/OpenDemo';
import { OpenReal } from '~/components/icons/OpenReal';
import { PerformanceGraph } from '~/components/icons/PerformanceGraph';
import { Platforms } from '~/components/icons/Platforms';
import { Profile } from '~/components/icons/Profile';
import { Reports } from '~/components/icons/Reports';
import { Support } from '~/components/icons/Support';
import { Tools } from '~/components/icons/Tools';
import { Wallet } from '~/components/icons/Wallet';

type TMenuCategory = { key: string; children: TMenuElement[] };
export type TMenuElement = {
	key: string;
	to: string;
	Icon: FC<SVGProps<SVGSVGElement>>;
	canBeCurrent?: false;
	children?: TSubmenuElement[];
};
type TSubmenuElement = { key: string; to: string };

export const quickActionsMenu: TMenuCategory = {
	key: 'navigation.quickActions.title',
	children: [
		{
			key: 'navigation.tradersMenu.accounts.openDemoAccount',
			to: 'accounts/open/ecn-plus/demo',
			Icon: OpenDemo,
			canBeCurrent: false,
		},
		{
			key: 'navigation.tradersMenu.accounts.openAccount',
			to: 'accounts/open',
			Icon: OpenReal,
			canBeCurrent: false,
		},
		{
			key: 'navigation.tradersMenu.funds.deposit',
			to: 'funds',
			Icon: Deposit,
			canBeCurrent: false,
		},
	],
};

const tradersMenu: TMenuCategory = {
	key: 'navigation.tradersMenu.title',
	children: [
		{
			key: 'navigation.tradersMenu.accounts.title',
			to: 'accounts',
			Icon: Accounts,
			children: [
				{
					key: 'navigation.tradersMenu.accounts.openDemoAccount',
					to: 'accounts/open/ecn-plus/demo',
				},
				{ key: 'navigation.tradersMenu.accounts.openAccount', to: 'accounts/open' },
				{ key: 'navigation.tradersMenu.accounts.accountsOverview', to: 'accounts/overview' },
			],
		},
		{
			key: 'navigation.tradersMenu.funds.title',
			Icon: Wallet,
			to: 'funds',
			children: [
				{ key: 'navigation.tradersMenu.funds.deposit', to: 'funds/deposit' },
				{ key: 'navigation.tradersMenu.funds.withdraw', to: 'funds/withdraw' },
				{ key: 'navigation.tradersMenu.funds.transactions', to: 'funds/transactions' },
			],
		},
		{
			key: 'navigation.tradersMenu.profile.title',
			Icon: Profile,
			to: 'profile',
			children: [
				{ key: 'navigation.tradersMenu.profile.title', to: 'profile' },
				{ key: 'navigation.tradersMenu.profile.documents', to: 'profile/documents' },
			],
		},
		{ key: 'navigation.tradersMenu.tradingPlatforms', Icon: Platforms, to: 'platforms' },
		{ key: 'navigation.tradersMenu.tradingTools', Icon: Tools, to: 'trading-tools' },
		{ key: 'navigation.tradersMenu.tradingCalculator', Icon: Calculator, to: 'trading-calculator' },
		{ key: 'navigation.tradersMenu.howTo', Icon: HowTo, to: 'how-to' },
	],
};

const ibMenu: TMenuCategory = {
	key: 'navigation.ibMenu.title',
	children: [
		{ key: 'navigation.ibMenu.dashboard', Icon: Dashboard, to: 'dashboard' },
		{ key: 'navigation.ibMenu.performanceDashboard', Icon: PerformanceGraph, to: 'performance' },
		{ key: 'navigation.ibMenu.commissionSettings', Icon: Comissions, to: 'commission-settings' },
		{
			key: 'navigation.ibMenu.marketingTools.title',
			Icon: MarketingTools,
			to: 'marketing-tools',
			children: [],
		},
		{ key: 'navigation.ibMenu.reports.title', Icon: Reports, to: 'reports', children: [] },
	],
};

export const myAccountMenu: TMenuCategory = {
	key: 'navigation.myAccount.title',
	children: [
		{ key: 'navigation.myAccount.profile', Icon: Profile, to: 'profile' },
		{ key: 'navigation.myAccount.helpDesk', Icon: Support, to: 'support' },
		{ key: 'navigation.myAccount.logout', Icon: Logout, to: 'logout' },
	],
};

export function getCategories(isWideScreen: boolean) {
	return isWideScreen
		? [tradersMenu, ibMenu]
		: [quickActionsMenu, tradersMenu, ibMenu, myAccountMenu];
}

export function getCurrentPage(categories: TMenuCategory[], pathname: string) {
	const currentTo = pathname.slice(1);

	const elements = categories.map(({ children }) => children).flat();
	const subelements = elements
		.filter(({ children }) => children)
		.map(({ children }) => children)
		.flat() as TSubmenuElement[];
	const links = [...subelements, ...elements];
	return links.find(({ to }) => to === currentTo);
}
