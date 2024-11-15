import type { TCell } from './types';

export const TableCell = ({ content }: { content: TCell['content'] }) => {
	if (typeof content === 'function') return content();
	return <div className="text-center capitalize">{content || '–'}</div>;
};
