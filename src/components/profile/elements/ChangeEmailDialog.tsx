import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Input } from '~/components/input/Input';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import { fetchProfileQuery } from '~/routes/pages/profile/profileLoader';
import type { TPinMethod } from '~/services/pin';
import { pinService } from '~/services/pin';
import { profileService } from '~/services/profile';
import { toastError, toastSuccess } from '~/utils/toast';
import { getChangeEmailSchema, type TChangeEmailSchema } from '~/validation/profile/changeEmail';
import { PinMethodsRadioGroup } from './PinMethodsRadioGroup';
import { InputPinCode } from '~/components/input/InputPinCode';

export const ChangeEmailDialog = ({ currentEmail }: { currentEmail: string }) => {
	const client = useQueryClient();
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const [isPinSent, setIsPinSent] = useState(false);

	const { register, handleSubmit, getError,setValue } = useZodForm<TChangeEmailSchema>(
		getChangeEmailSchema(isPinSent),
	);

	const [method, setMethod] = useState<TPinMethod>('email');

	const requestPinMutation = useMutation({
		mutationFn: () => pinService.send('changeEmail', method),
		onMutate: globalLoading.start,
		onSuccess: () => setIsPinSent(true),
		onError: toastError,
		onSettled: globalLoading.end,
	});

	const changeEmailMutation = useMutation({
		mutationFn: profileService.changeEmail,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('account.changeEmail.success'));
			dialog.close();
		},
		onError: toastError,
		onSettled: () => {
			client.invalidateQueries(fetchProfileQuery);
			globalLoading.end();
		},
	});
	return (
		<form
			name="change-email"
			className="flex w-[300px] flex-col gap-8 sm:w-[540px]"
			onSubmit={handleSubmit((data) => {
				if (isPinSent) return changeEmailMutation.mutate(data);
				return requestPinMutation.mutate();
			})}
			noValidate
		>
			<Header>{t('account.changeEmail.title')}</Header>

			<PinMethodsRadioGroup method={method} setMethod={setMethod} />	
			<hr className='flex-1 border-t-neutral-600' />

			{isPinSent ? (
				<div>

					{/* <Input
						label={t('account.pin.label')}
						placeholder={t(`account.pin.placeholder.${method}`) || ''}
						{...register('pin')}
						error={getError('pin')}
					/> */}
					<InputPinCode 
						setValue={setValue}
						getError={getError}
						register={register}
						handleClick={()=> requestPinMutation.mutate()}
					/>					
				</div>
			) :
				(<div>
					<Input label={t('account.changeEmail.currentEmail')} value={currentEmail} disabled />
					<div className='mt-4'>					
						<Input
							label={t('account.changeEmail.newEmail')}
							placeholder={t('account.changeEmail.newEmailPlaceholder') || ''}
							{...register('email')}
							error={getError('email')}
							disabled={isPinSent}
						/>	
					</div>
				</div>)	
			}

			<PrimaryButton type="submit" className="mt-12 h-10">
				{t('account.changeEmail.action')}
			</PrimaryButton>
		</form>
	);
};