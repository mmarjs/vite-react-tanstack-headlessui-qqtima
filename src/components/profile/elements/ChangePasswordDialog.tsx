import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PasswordRules } from '~/components/accounts/PasswordRules';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Input } from '~/components/input/Input';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import { fetchProfileQuery } from '~/routes/pages/profile/profileLoader';
import { profileService } from '~/services/profile';
import { formatPlaceholder } from '~/utils/form';
import { toastError, toastSuccess } from '~/utils/toast';
import {
	changePasswordSchema,
	type TChangePasswordSchema,
} from '~/validation/profile/changePassword';

export const ChangePasswordDialog = () => {
	const client = useQueryClient();
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const { control, register, handleSubmit, getError } =
		useZodForm<TChangePasswordSchema>(changePasswordSchema);

	const mutation = useMutation({
		mutationFn: profileService.changePassword,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('account.changePassword.success'));
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
			name="change-password"
			className="flex w-[300px] flex-col gap-8 sm:w-[540px]"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			noValidate
		>
			<Header>{t('account.changePassword.title')}</Header>

			<Input
				type="password"
				label={t('account.changePassword.currentPassword')}
				placeholder={formatPlaceholder(t('account.changePassword.currentPasswordPlaceholder'))}
				{...register('oldPassword')}
				error={getError('oldPassword')}
			/>

			<div>
				<Input
					type="password"
					label={t('account.changePassword.newPassword')}
					placeholder={formatPlaceholder(t('account.changePassword.newPasswordPlaceholder'))}
					{...register('newPassword')}
					error={getError('newPassword')}
				/>

				<PasswordRules control={control} fieldName="newPassword" />
			</div>

			<PrimaryButton type="submit" className="mt-2 h-10">
				{t('account.changePassword.action')}
			</PrimaryButton>
		</form>
	);
};
