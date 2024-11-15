import { Table } from '~/components/table/Table';
import { Tab } from '~/components/tabs/Tabs';

export const PendingTransfers = () => {
	return (
		<Tab>
			<Table name="pendingTransfers" rows={[]} />
		</Tab>
	);
};
