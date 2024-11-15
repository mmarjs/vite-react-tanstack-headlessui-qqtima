import { zodResolver } from '@hookform/resolvers/zod';
import i18next from 'i18next';
import { useCallback } from 'react';
import type { DeepPartial, FieldName, FieldValues } from 'react-hook-form';
import { useForm as useReactHookForm } from 'react-hook-form';
import type { z } from 'zod';

export const useZodForm = <TSchema extends FieldValues>(
	validationSchema: z.Schema,
	defaultValues?: DeepPartial<TSchema>,
) => {
	const form = useReactHookForm<TSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues,
	});

	const getError = useCallback(
		(field: FieldName<TSchema>) => {
			const error = form.formState.errors[field];
			return error?.message && i18next.t(error.message as string);
		},
		[form.formState.errors],
	);

	const isTouched = useCallback(
		(field: FieldName<TSchema>) => form.formState.touchedFields[field],
		[form.formState.touchedFields],
	);

	const getValue = useCallback((field: FieldName<TSchema>) => form.getValues()[field], [form]);

	return { ...form, getError, isTouched, setValue: form.setValue, getValue };
};
