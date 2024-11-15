export type TRow = {
	key: string;
	data: TCell[];
};

export type TCell = {
	type: string;
	label: string;
	content: string | (() => JSX.Element);
	priority: number; // 1 is highest priority
};
