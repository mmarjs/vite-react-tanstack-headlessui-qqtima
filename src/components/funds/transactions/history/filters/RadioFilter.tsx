import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '~/components/input/Input';
import type { useZodForm } from '~/hooks/useZodForm';
import type { TFilterTransactionsSchema } from '~/validation/funds/filterTransactions';

export const RadioFilter = ({
	form,
	baseField,
	modificatorField,
	modificators,
	placeholder,
}: {
	form: ReturnType<typeof useZodForm<TFilterTransactionsSchema>>;
	baseField: keyof TFilterTransactionsSchema;
	modificatorField: keyof TFilterTransactionsSchema;
	modificators: string[];
	placeholder?: string;
}) => {
	const { t } = useTranslation(['funds']);

	const { register, control, trigger, getValues, getError } = form;
	const modificator = useWatch({ control, name: modificatorField }) as string | undefined;
	const enableTextInput = ['contains', 'doesnotContain', 'exactDate'].includes(modificator || '');
	const defaultChecked = getValues(modificatorField) || modificators[0];

	useEffect(() => {
		trigger(baseField);
	}, [baseField, trigger, modificator]);

	return (
		<div>
			<label className="font-bold">{t(`transactions.columns.${baseField}`)}</label>

			<div className="flex w-4/5 flex-wrap gap-x-5 gap-y-1 px-4 pt-1">
				{modificators.map((modificator) => (
					<label key={modificator} className="flex cursor-pointer gap-[10px]">
						<Input
							type="radio"
							value={modificator}
							defaultChecked={modificator === defaultChecked}
							{...register(modificatorField)}
						/>
						{t(`transactions.history.filters.modificators.${modificator}`)}
					</label>
				))}
			</div>

			<Input
				type="text"
				{...register(baseField)}
				error={getError(baseField)}
				disabled={!enableTextInput}
				placeholder={enableTextInput ? placeholder : ''}
			/>
		</div>
	);
};
