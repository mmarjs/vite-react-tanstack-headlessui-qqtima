import { z } from 'zod';

export const pin = z
	.string()
	.trim()
	.min(1, 'common:errors.form.pin.required')
	.length(4, 'common:errors.form.pin.invalid');
