import type { ReactNode } from 'react';

export type TAccountType = 'ecn-plus' | 'oqtima-one';

type TType = {
	value: TAccountType;
	label: ReactNode;
	description: string;
	spreadFrom: number;
	commission: false | string;
	img: string;
	allowDemo: boolean;
	isRecommended: boolean;
};

export const accountTypes: TType[] = [
	{
		value: 'ecn-plus',
		label: (
			<>
				<span>ECN</span>
				<span className="text-primary">+</span>
			</>
		),
		description: 'open.accountType.ecn-plus.description',
		spreadFrom: 0.3,
		commission: false,
		img: '/images/ecn-plus.svg',
		allowDemo: true,
		isRecommended: true,
	},
	{
		value: 'oqtima-one',
		label: (
			<>
				<span>OQtima</span> <span className="text-primary">ONE</span>
			</>
		),
		description: 'open.accountType.oqtima-one.description',
		spreadFrom: 0.3,
		commission: false,
		img: '/images/oqtima-one.svg',
		allowDemo: false,
		isRecommended: false,
	},
];
