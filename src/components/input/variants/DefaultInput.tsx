import { InputBase } from './elements/InputBase';
import { InputContainer } from './elements/InputContainer';
import type { InputProps } from '../types';

export const DefaultInput = ({ label, ...props }: InputProps) => {
	return (
		<InputContainer label={label} error={props.error} disabled={props.disabled}>
			<InputBase {...props} />
		</InputContainer>
	);
};
