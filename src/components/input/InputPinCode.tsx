import {  useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TPinMethod } from '~/services/pin';
import { PinInput } from 'react-input-pin-code';
import { Input } from '~/components/input/Input';
import { ResendPinButton } from '~/components/profile/elements/ResendPinButton';
import type { UseFormSetValue, UseFormRegister} from 'react-hook-form/dist/types';

type PincodeProps = {
	setValue: UseFormSetValue<{ email: string; pin: string; }>
	register: UseFormRegister<{ email: string; pin: string; }>
	getError: (field: string) => string | undefined
	handleClick: () => void;
};

export const InputPinCode = ({ setValue,register, getError,  handleClick }: PincodeProps) => {
	const { t } = useTranslation(['profile']);
	const [method] = useState<TPinMethod>('email');
	const [pinValues, setPinValues] = useState(['', '', '', '']);

	return (
		<div className='flex flex-col items-center justify-center'>
			<label className='font-bold mb-2'>{t('account.pin.pincode')}</label>
			<label className='font-normal mb-2 text-light/25'>
				{t(`account.pin.placeholder.${method}`) || ''}
			</label>							
			<PinInput
				values={pinValues}
				borderColor={'rgb(0,0,0)'}
				focusBorderColor={'rgb(0,0,0)'}
				validBorderColor={'rgb(0,0,0)'}
				type={'text'}
				onChange={(value, index, values) => {setPinValues(values); setValue('pin',values.join(''));}}
				inputStyle={{
					border: 0,
					boxShadow: 'unset',
					backgroundColor: 'transparent',
					borderRadius: 0,
					borderBottomWidth: 1,
					borderStyle: 'solid',
					borderBottomColor: 'rgb(255 68 0'
				}}
			/>
			<Input
				type="hidden"
				{...register('pin')}
				error={getError('pin')}
			/>
			<div className="flex mt-4 content-center items-start text-xs sm:text-[13px]">
				<label className="">
					{t('account.pin.didntGetPin')}
				</label>
	
				<ResendPinButton
					onClick={() => handleClick()}
					className="text-right pl-2 "
				/>
			</div>
		</div>
	);
};
