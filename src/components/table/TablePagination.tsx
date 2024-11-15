import { ArrowDown } from '~/components/icons/ArrowDown';

export const TablePagination = ({
	page,
	setPage,
	isLastPage,
}: {
	page: number;
	setPage: (page: number) => void;
	isLastPage: boolean;
}) => {
	return (
		<div aria-label="Table pagination" className="flex gap-2 self-end text-base">
			<button
				disabled={page <= 1}
				onClick={() => setPage(page - 1)}
				className="p-1 transition-all hover:text-primary disabled:text-neutral-400"
			>
				<ArrowDown width={8} className="translate-y-[2px] rotate-[90deg] transform" />
			</button>

			{page > 1 && (
				<button
					onClick={() => setPage(page - 1)}
					className="flex h-[22px] w-5 items-center justify-center p-0 underline transition-all hover:text-primary"
				>
					{page - 1}
				</button>
			)}

			<button
				disabled
				className="flex h-[22px] w-5 items-center justify-center rounded-[5px] border border-primary p-0 text-primary underline transition-all"
			>
				{page}
			</button>

			{!isLastPage && (
				<button
					onClick={() => setPage(page + 1)}
					className="flex h-[22px] w-5 items-center justify-center p-0 underline transition-all hover:text-primary"
				>
					{page + 1}
				</button>
			)}

			<button
				disabled={isLastPage}
				onClick={() => setPage(page + 1)}
				className="p-1 transition-all hover:text-primary disabled:text-neutral-400"
			>
				<ArrowDown width={8} className="translate-y-[2px] rotate-[-90deg] transform" />
			</button>
		</div>
	);
};
