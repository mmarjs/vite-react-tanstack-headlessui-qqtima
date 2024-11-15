import { useTranslation } from 'react-i18next';
import { Input } from '~/components/input/Input';
import type { useZodForm } from '~/hooks/useZodForm';
import type { TFilterTransactionsSchema } from '~/validation/funds/filterTransactions';

const modificators = ['any', 'specific'] as const;

export const CheckboxFilter = ({
	form,
	baseField,
	modificatorField,
	choices,
}: {
	form: ReturnType<typeof useZodForm<TFilterTransactionsSchema>>;
	baseField: keyof TFilterTransactionsSchema;
	modificatorField: keyof TFilterTransactionsSchema;
	choices: string[];
}) => {
	const { t } = useTranslation(['funds']);
	const { register, getValues } = form;
	const defaultModifier = getValues(modificatorField) || modificators[0];
	const defaultChoises = getValues(baseField) as string[] | undefined;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const oldSelected = form.getValues(baseField);
		if (!Array.isArray(oldSelected)) return;

		const { name, checked } = e.target;
		const changedField = name as (typeof oldSelected)[number];
		const newSelected = checked
			? [...oldSelected, changedField]
			: oldSelected.filter((value) => value !== changedField);

		form.setValue(baseField, newSelected);
		form.setValue(modificatorField, newSelected.length ? modificators[1] : modificators[0]);
	};

	return (
		<div className="mb-5">
			<select {...register(baseField)} className="hidden" multiple />

			<label className="font-bold">{t(`transactions.columns.${baseField}`)}</label>

			<div className="flex w-4/5 flex-col gap-y-1">
				<div className="flex flex-wrap gap-x-5 gap-y-1 px-4 pt-1">
					{modificators.map((modificator) => (
						<label key={modificator} className="flex cursor-pointer gap-[10px]">
							<Input
								type="radio"
								value={modificator}
								defaultChecked={modificator === defaultModifier}
								{...register(modificatorField)}
							/>
							{t(`transactions.history.filters.modificators.${modificator}`)}
						</label>
					))}
				</div>

				<div className="flex flex-wrap gap-5 px-4">
					{choices.map((choice) => (
						<Input
							key={choice}
							type="checkbox"
							label={t(`transactions.history.filters.modificators.${choice}`)}
							name={choice}
							defaultChecked={defaultChoises?.includes(choice)}
							onChange={handleChange}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
