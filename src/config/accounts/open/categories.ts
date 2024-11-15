export type TAccountCategory = 'demo' | 'live';

export const categories: { value: TAccountCategory; label: string; description: string }[] = [
	{
		value: 'demo',
		label: 'open.accountCategory.demo.label',
		description: 'open.accountCategory.demo.description',
	},
	{
		value: 'live', // aka 'real'
		label: 'open.accountCategory.real.label',
		description: 'open.accountCategory.real.description',
	},
];
