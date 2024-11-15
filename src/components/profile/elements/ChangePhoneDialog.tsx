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
import { getChangePhoneSchema, type TChangePhoneSchema } from '~/validation/profile/changePhone';
import { PinMethodsRadioGroup } from './PinMethodsRadioGroup';
import { ResendPinButton } from './ResendPinButton';

export const ChangePhoneDialog = ({
	currentPhone,
	email,
}: {
	currentPhone: string;
	email: string;
}) => {
	const client = useQueryClient();
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const [isPinSent, setIsPinSent] = useState(false);
	const { register, handleSubmit, getError } = useZodForm<TChangePhoneSchema>(
		getChangePhoneSchema(isPinSent),
	);

	const [method, setMethod] = useState<TPinMethod>('email');

	const requestPinMutation = useMutation({
		mutationFn: () => pinService.send('changePhone', method),
		onMutate: globalLoading.start,
		onSuccess: () => setIsPinSent(true),
		onError: toastError,
		onSettled: globalLoading.end,
	});

	const changePhoneMutation = useMutation({
		mutationFn: profileService.changePhone,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('account.changePhone.success'));
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
			name="change-phone"
			className="flex w-[300px] flex-col gap-8 sm:w-[540px]"
			onSubmit={handleSubmit((data) => {
				if (isPinSent) return changePhoneMutation.mutate(data);
				return requestPinMutation.mutate();
			})}
			noValidate
		>
			<Header>{t('account.changePhone.title')}</Header>

			<PinMethodsRadioGroup method={method} setMethod={setMethod} />

			<Input label={t('account.changePhone.currentMobileNumber')} value={currentPhone} disabled />

			<Input
				label={t('account.changePhone.newMobileNumber')}
				placeholder={t('account.changePhone.newMobileNumberPlaceholder') || ''}
				{...register('phone')}
				error={getError('phone')}
				disabled={isPinSent}
			/>

			{isPinSent && (
				<div>
					<div className="flex content-between items-start pb-2 text-xs sm:text-[13px]">
						<label className="font-bold">{t(`account.pin.description.${method}`, { email })}</label>

						<ResendPinButton
							onClick={() => requestPinMutation.mutate()}
							className="w-40 text-right"
						/>
					</div>

					<Input
						label={t('account.pin.label')}
						placeholder={t(`account.pin.placeholder.${method}`) || ''}
						{...register('pin')}
						error={getError('pin')}
					/>
				</div>
			)}

			<PrimaryButton type="submit" className="mt-12 h-10">
				{t('account.changePhone.action')}
			</PrimaryButton>
		</form>
	);
};
