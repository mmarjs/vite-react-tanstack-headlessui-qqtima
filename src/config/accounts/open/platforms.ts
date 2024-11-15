export type TPlatform = 'mt4' | 'mt5' | 'cTrader';

export const DEFAULT_PLATFORM: TPlatform = 'mt4';

export const platforms: {
	title: TPlatform;
	label: string;
	spreadFrom: number;
	commission: false | string;
	maxLeverage: string;
	defaultCurrency: string;
	currencies: string[];
	defaultLeverage: number;
	leverages: number[];
}[] = [
	{
		title: 'mt4',
		label: 'MT4',
		spreadFrom: 0.3,
		commission: false,
		maxLeverage: '1:Unlimited',
		defaultCurrency: 'USD',
		currencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'],
		defaultLeverage: 50,
		leverages: [1, 2, 5, 10, 33, 50, 100, 200, 300, 400, 500],
	},
	{
		title: 'mt5',
		label: 'MT5',
		spreadFrom: 0.3,
		commission: false,
		maxLeverage: '1:Unlimited',
		defaultCurrency: 'USD',
		currencies: ['USD', 'EUR', 'GBP', 'JPY'],
		defaultLeverage: 400,
		leverages: [1, 2, 5, 10, 33, 50, 100, 200, 300, 400, 500, 777],
	},
	{
		title: 'cTrader',
		label: 'cTrader',
		spreadFrom: 0.5,
		commission: 'USD 10',
		maxLeverage: '1:500',
		defaultCurrency: 'EUR',
		currencies: ['USD', 'EUR'],
		defaultLeverage: 500,
		leverages: [1, 2, 5, 10, 33, 50, 100, 200, 300, 400, 500],
	},
];
