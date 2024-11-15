import { forwardRef } from 'react';
import { CheckboxInput } from './variants/CheckboxInput';
import { DefaultInput } from './variants/DefaultInput';
import { PasswordInput } from './variants/PasswordInput';
import { RadioInput } from './variants/RadioInput';
import { RangeInput } from './variants/RangeInput';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
	if (type === 'checkbox') return <CheckboxInput inputRef={ref} {...props} />;
	if (type === 'radio') return <RadioInput inputRef={ref} {...props} />;
	if (type === 'password') return <PasswordInput inputRef={ref} {...props} />;
	if (type === 'range') return <RangeInput inputRef={ref} {...props} />;
	return <DefaultInput inputRef={ref} type={type} {...props} />;
});

Input.displayName = 'Input';
