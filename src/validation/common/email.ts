import { z } from 'zod';

export const email = z
	.string()
	.min(1, 'common:errors.form.email.required')
	.max(255, 'common:errors.form.email.tooLong')
	.email('common:errors.form.email.invalid');
