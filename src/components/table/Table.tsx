import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	TABLE_MIN_COLUMNS,
	TABLE_MIN_COLUMN_WIDTH,
	TABLE_PAGE_SIZE,
} from '~/config/funds/transactions';

import { MemoizedTableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { MemoizedTableRow } from './TableRow';
import type { TRow } from './types';

type TableProps = {
	name: string;
	rows: TRow[];
	setDisplayed?: (data: { current: number; total: number }) => void;
};

export const Table = ({ name, rows, setDisplayed }: TableProps) => {
	const { t } = useTranslation(['funds']);
	const [page, setPage] = useState(1);

	// derivative data
	const start = (page - 1) * TABLE_PAGE_SIZE;
	const end = start + TABLE_PAGE_SIZE;
	const isLastPage = rows.length <= end;
	const displayed = rows.slice(start, end);

	const allColumns = rows[0]?.data;
	const [columns, setColumns] = useState(allColumns?.map(({ type }) => type) || []);
	const container = useRef<HTMLDivElement>(null);

	// define columns that can fit into the table
	useEffect(() => {
		const element = container.current;
		if (!element || !allColumns) return;

		const observer = new ResizeObserver(() => {
			const columnsFit = Math.max(
				~~(element.offsetWidth / TABLE_MIN_COLUMN_WIDTH),
				TABLE_MIN_COLUMNS,
			);

			const columnsToShow = allColumns
				.filter(({ priority }) => priority <= columnsFit)
				.map(({ type }) => type);
			if (columnsFit < allColumns.length) columnsToShow.push('');
			setColumns(columnsToShow);
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [allColumns]);

	useEffect(() => {
		if (page !== 1 && rows.length < start) setPage(1); // reset page on filtering
	}, [page, rows.length, start]);

	useEffect(() => {
		if (setDisplayed) setDisplayed({ current: displayed.length, total: rows.length });
	}, [displayed.length, rows.length, setDisplayed]);

	if (rows.length === 0) {
		return (
			<div
				aria-label={name}
				className="dark rounded-[5px] bg-background-elevated-light px-4 py-2 font-bold shadow-10 dark:bg-background-elevated-dark"
			>
				{t(`transactions.notFound.${name}`)}
			</div>
		);
	}

	return (
		<div
			aria-label={name}
			ref={container}
			className="flex flex-col gap-2 text-xs sm:gap-[15px] sm:p-[10px] sm:text-sm"
		>
			<MemoizedTableHeader columns={columns} />

			{displayed.map((row) => (
				<MemoizedTableRow key={row.key} row={row} columns={columns} />
			))}

			<TablePagination page={page} setPage={setPage} isLastPage={isLastPage} />
		</div>
	);
};
