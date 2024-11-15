import { z } from 'zod';

// (?=.*[a-z]): require at least one lowercase letter
// (?=.*[A-Z]): require at least one uppercase letter
// (?=.*[0-9]): require at least one digit
const passwordValidityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

export const password = z
	.string()
	.min(1, 'common:errors.form.password.required')
	.min(8, 'common:errors.form.password.tooShort')
	.max(255, 'common:errors.form.password.tooLong')
	.regex(passwordValidityRegex, 'common:errors.form.password.invalid');
