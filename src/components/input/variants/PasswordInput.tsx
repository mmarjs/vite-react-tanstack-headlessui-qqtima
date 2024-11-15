import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeClosed } from '~/components/icons/EyeClosed';
import { EyeOpen } from '~/components/icons/EyeOpen';
import { InputBase } from './elements/InputBase';
import { InputContainer } from './elements/InputContainer';
import type { InputProps } from '../types';

export const PasswordInput = (props: InputProps) => {
	const { t } = useTranslation(['auth']);
	const [dynamicType, setDynamicType] = useState('password');

	const togglePasswordVisibility = () => {
		setDynamicType((prevType) => (prevType === 'password' ? 'text' : 'password'));
	};

	const Icon = dynamicType === 'password' ? EyeOpen : EyeClosed;

	return (
		<InputContainer label={props.label} error={props.error}>
			<InputBase {...props} type={dynamicType} />
			<button
				type="button"
				title={t('login.togglePasswordVisibility') || undefined}
				onClick={togglePasswordVisibility}
				className="absolute right-2 bottom-[5px] p-0"
			>
				<Icon width={14} />
			</button>
		</InputContainer>
	);
};
