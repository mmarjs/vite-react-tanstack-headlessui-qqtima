import { z } from 'zod';
import { email } from '../common/email';
import { phone } from '../common/phone';

const ADULTHOOD = 18;
const currentDate = new Date();

export const birthDateMin = '1900-01-01';
export const birthDateMax = [
	currentDate.getFullYear() - ADULTHOOD,
	String(currentDate.getMonth() + 1).padStart(2, '0'),
	String(currentDate.getDate()).padStart(2, '0'),
].join('-');

export const registerSchema = z.object({
	clientType: z.string().min(1, 'auth:register.errors.clientType.required'),
	firstName: z
		.string()
		.trim()
		.min(1, 'auth:register.errors.firstName.required')
		.max(50, 'auth:register.errors.firstName.tooLong'),
	lastName: z
		.string()
		.trim()
		.min(1, 'auth:register.errors.lastName.required')
		.max(50, 'auth:register.errors.lastName.tooLong'),
	birthDate: z
		.string()
		.min(1, 'auth:register.errors.birthDate.required')
		.refine((value) => {
			const date = new Date(value);
			return date instanceof Date && !isNaN(date.getTime());
		}, 'auth:register.errors.birthDate.invalid')
		.refine(
			(value) => new Date(value) <= new Date(birthDateMax),
			'auth:register.errors.birthDate.tooYoung',
		)
		.refine(
			(value) => new Date(value) >= new Date(birthDateMin),
			'auth:register.errors.birthDate.tooOld',
		),
	country: z.string().min(2, 'auth:register.errors.country.required'),
	phone,
	email,
	acceptDocuments: z.literal(true, {
		errorMap: () => ({ message: 'auth:register.errors.acceptDocuments.required' }),
	}),
	acceptTerms: z.literal(true, {
		errorMap: () => ({ message: 'auth:register.errors.acceptTerms.required' }),
	}),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
