import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TableHeader = ({ columns }: { columns: string[] }) => {
	const { t } = useTranslation(['funds']);
	const gridTemplateColumns = `repeat(${columns.length}, minmax(0, 1fr))`;

	return (
		<header
			aria-label="Table header"
			className="grid h-[50px] items-center justify-items-center gap-2 rounded-[5px] bg-primary pl-2 font-bold uppercase text-light"
			style={{ gridTemplateColumns }}
		>
			{columns.map((column) => (
				<div className="px-2 text-center" key={column}>
					{column && t(`transactions.columns.${column}`)}
				</div>
			))}
		</header>
	);
};

export const MemoizedTableHeader = memo(TableHeader);
