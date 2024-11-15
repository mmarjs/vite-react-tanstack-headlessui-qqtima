import { z } from 'zod';

export const phone = z
	.string()
	.trim()
	.min(1, 'common:errors.form.phone.required')
	.refine((value) => {
		const regex = /^\+[0-9]{10,14}$/;
		return regex.test(value);
	}, 'common:errors.form.phone.invalid');
