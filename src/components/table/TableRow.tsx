import { memo } from 'react';
import { ShowDetails } from './ShowDetailsCell';
import { TableCell } from './TableCell';
import type { TRow } from './types';

const TableRow = ({ row, columns }: { row: TRow; columns: string[] }) => {
	const data = row.data.filter(({ type }) => columns.includes(type));
	const gridTemplateColumns = `repeat(${columns.length}, minmax(0, 1fr))`;

	return (
		<div
			aria-label="Table row"
			className="grid min-h-[70px] items-center justify-items-center gap-2 rounded-b-[5px] bg-background-elevated-light pl-2 font-bold shadow-10 transition-colors hover:bg-zinc-100 dark:bg-background-elevated-dark dark:hover:bg-background-dark"
			style={{ gridTemplateColumns }}
		>
			{data.map(({ type, content }) => (
				<TableCell key={type} content={content} />
			))}

			{data.length < row.data.length && <ShowDetails row={row} />}
		</div>
	);
};

export const MemoizedTableRow = memo(TableRow);
