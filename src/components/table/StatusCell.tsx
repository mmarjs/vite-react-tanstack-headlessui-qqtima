import { useTranslation } from 'react-i18next';

const statuses: { [key: string]: { label: string; backgroundColor: string; color: string } } = {
	fresh: { label: 'transactions.status.fresh', backgroundColor: '#FAFA33', color: '#1A1A1A' },
	pending: { label: 'transactions.status.pending', backgroundColor: '#FFCB4E', color: '#1A1A1A' },
	'pending check': {
		label: 'transactions.status.pending',
		backgroundColor: '##4D4D4D',
		color: '#FFFFFF',
	},
	approved: { label: 'transactions.status.approved', backgroundColor: '#00FF67', color: '#1A1A1A' },
	processed: {
		label: 'transactions.status.processed',
		backgroundColor: '#008080',
		color: '#FFFFFF',
	},
	declined: { label: 'transactions.status.declined', backgroundColor: '#FF0000', color: '#FFFFFF' },
	cancelled: {
		label: 'transactions.status.declined',
		backgroundColor: '#FF0000',
		color: '#FFFFFF',
	},
	splitted: { label: 'transactions.status.splitted', backgroundColor: '#363636', color: '#FFFFFF' },
	error: { label: 'transactions.status.declined', backgroundColor: '#FF0000', color: '#FFFFFF' },
};

export const StatusCell = ({ value }: { value: string }) => {
	const { t } = useTranslation(['funds']);
	const { label, backgroundColor, color } = statuses[value];

	return (
		<span
			className="flex w-[100px] justify-center rounded-[5px] py-1 text-xs uppercase shadow-10"
			style={{ backgroundColor, color }}
		>
			{t(label)}
		</span>
	);
};
