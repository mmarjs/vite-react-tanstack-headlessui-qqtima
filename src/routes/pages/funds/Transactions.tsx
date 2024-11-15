import { Pending } from '~/components/funds/transactions/pending/Pending';
import { History } from '~/components/funds/transactions/history/History';

const Transactions = () => {
	return (
		<>
			<Pending />
			<History />
		</>
	);
};

export default Transactions;
