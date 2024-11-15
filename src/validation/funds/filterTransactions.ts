import { z } from 'zod';

const textModificator = z.enum(['any', 'contains', 'doesnotContain']);
const dateModificator = z.enum([
	'any',
	'today',
	'yesterday',
	'thisMonth',
	'lastMonth',
	'exactDate',
]);
const checkboxModificator = z.enum(['any', 'specific']);

const optional = z
	.string()
	.transform((value) => (value === '' ? undefined : value))
	.optional();

export const filterTransactionsSchema = z
	.object({
		id_modificator: textModificator,
		id: optional,
		type_modificator: textModificator,
		type: optional,
		status: z.array(z.enum(['approved', 'declined', 'cancelled'])).optional(),
		status_modificator: checkboxModificator,
		paymentSystem_modificator: textModificator,
		paymentSystem: optional,
		account_modificator: textModificator,
		account: optional,
		createdAt_modificator: dateModificator,
		createdAt: optional,
		amount_modificator: textModificator,
		amount: optional,
		currency_modificator: textModificator,
		currency: optional,
	})
	.refine((data) => (data.id_modificator !== 'any' && !data.id ? false : true), {
		message: 'common:errors.form.generic.required',
		path: ['id'],
	})
	.refine((data) => (data.type_modificator !== 'any' && !data.type ? false : true), {
		message: 'common:errors.form.generic.required',
		path: ['type'],
	})
	.refine(
		(data) => (data.paymentSystem_modificator !== 'any' && !data.paymentSystem ? false : true),
		{
			message: 'common:errors.form.generic.required',
			path: ['paymentSystem'],
		},
	)
	.refine((data) => (data.account_modificator !== 'any' && !data.account ? false : true), {
		message: 'common:errors.form.generic.required',
		path: ['account'],
	})
	.refine(
		(data) => (data.createdAt_modificator === 'exactDate' && !data.createdAt ? false : true),
		{
			message: 'common:errors.form.generic.required',
			path: ['createdAt'],
		},
	)
	.refine((data) => (data.amount_modificator !== 'any' && !data.amount ? false : true), {
		message: 'common:errors.form.generic.required',
		path: ['amount'],
	})
	.refine((data) => (data.currency_modificator !== 'any' && !data.currency ? false : true), {
		message: 'common:errors.form.generic.required',
		path: ['currency'],
	});

export type TFilterTransactionsSchema = z.infer<typeof filterTransactionsSchema>;
