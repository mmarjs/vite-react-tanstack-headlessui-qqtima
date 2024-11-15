import type { DeepPartial } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { SecondaryButton } from '~/components/button/SecondaryButton';
import { Header } from '~/components/dialog/Header';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import type { TFilter } from '~/services/transactions';
import {
	filterTransactionsSchema,
	type TFilterTransactionsSchema,
} from '~/validation/funds/filterTransactions';
import { CheckboxFilter } from './CheckboxFilter';
import { composeFilters } from './filter';
import { RadioFilter } from './RadioFilter';

// persist form state between remounts
let formValues: DeepPartial<TFilterTransactionsSchema>;

export const FiltersDialog = ({ setFilters }: { setFilters: (filters: TFilter[]) => void }) => {
	const { t } = useTranslation(['funds']);
	const dialog = useDialog();

	const form = useZodForm<TFilterTransactionsSchema>(filterTransactionsSchema, formValues);

	const applyFilters = (data: TFilterTransactionsSchema) => {
		formValues = data;
		const filters = composeFilters(data);
		setFilters(filters);
		dialog.close();
	};

	return (
		<form
			name="filter-transactions"
			className="flex w-[300px] flex-col gap-10 sm:w-[540px]"
			onSubmit={form.handleSubmit(applyFilters)}
			noValidate
		>
			<Header>{t('transactions.history.filters.title')}</Header>

			<div className="flex flex-col gap-2">
				<RadioFilter
					form={form}
					baseField="id"
					modificatorField="id_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>

				<RadioFilter
					form={form}
					baseField="type"
					modificatorField="type_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>

				<CheckboxFilter
					form={form}
					baseField="status"
					modificatorField="status_modificator"
					choices={['approved', 'declined', 'cancelled']}
				/>

				<RadioFilter
					form={form}
					baseField="paymentSystem"
					modificatorField="paymentSystem_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>

				<RadioFilter
					form={form}
					baseField="account"
					modificatorField="account_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>

				<RadioFilter
					form={form}
					baseField="createdAt"
					modificatorField="createdAt_modificator"
					modificators={['any', 'today', 'yesterday', 'thisMonth', 'lastMonth', 'exactDate']}
					placeholder={'2023-04-05'}
				/>

				<RadioFilter
					form={form}
					baseField="amount"
					modificatorField="amount_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>

				<RadioFilter
					form={form}
					baseField="currency"
					modificatorField="currency_modificator"
					modificators={['any', 'contains', 'doesnotContain']}
				/>
			</div>

			<div className="flex gap-4">
				<SecondaryButton
					type="button"
					onClick={() => dialog.close()}
					className="h-10 w-full min-w-[120px]"
				>
					{t('transactions.history.filters.discard')}
				</SecondaryButton>

				<PrimaryButton type="submit" className="h-10 w-full min-w-[120px]">
					{t('transactions.history.filters.apply')}
				</PrimaryButton>
			</div>
		</form>
	);
};
