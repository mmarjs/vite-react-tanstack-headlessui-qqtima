import type { Control, FieldValues} from 'react-hook-form';
import { useFormState, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const rules = [
	{ key: 'length', regex: /^.{8,50}$/, message: 'passwordRules.length' }, // length between 8 and 50
	{ key: 'case', regex: /^(?=.*[a-z])(?=.*[A-Z]).+$/, message: 'passwordRules.case' }, // both uppercase and lowercase letters
	{ key: 'number', regex: /^(?=.*\d).+$/, message: 'passwordRules.number' }, // at least one number
];

export const PasswordRules = ({ control, fieldName }: { control: object; fieldName: string }) => {
	const { t } = useTranslation();

	const controller = control as Control<FieldValues, unknown>;
	const password = useWatch({ control: controller, name: fieldName });
	const { dirtyFields } = useFormState({ control: controller });
	const isDirty = dirtyFields[fieldName];
	const passed = rules.map(({ regex }) => regex.test(password));

	return (
		<ul className="my-2 flex list-inside list-[circle] flex-col gap-1 text-xs text-gray-500">
			{rules.map((rule, index) => (
				<li
					key={rule.key}
					className={isDirty ? (passed[index] ? 'text-green-500' : 'text-red-500') : ''}
				>
					{t(rule.message)}
				</li>
			))}
		</ul>
	);
};
