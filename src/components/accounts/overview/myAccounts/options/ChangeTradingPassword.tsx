import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PasswordRules } from '~/components/accounts/PasswordRules';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Input } from '~/components/input/Input';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import type { TAccount } from '~/services/accounts';
import { accountsService } from '~/services/accounts';
import { formatPlaceholder } from '~/utils/form';
import { toastError, toastSuccess } from '~/utils/toast';
import {
	changePasswordSchema,
	type TChangePasswordSchema,
} from '~/validation/accounts/changePassword';

export const ChangeTradingPassword = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const { register, control, handleSubmit, getError } =
		useZodForm<TChangePasswordSchema>(changePasswordSchema);

	const mutation = useMutation({
		mutationFn: (data: TChangePasswordSchema) =>
			accountsService.changePassword(account.loginSid, data.password),
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('changePassword.success'));
			dialog.close();
		},
		onError: toastError,
		onSettled: globalLoading.end,
	});

	return (
		<form
			name="set-max-leverage"
			className="flex w-[300px] flex-col gap-6 sm:w-[540px]"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			noValidate
		>
			<Header>{t('changePassword.title')}</Header>

			<div className="flex flex-col gap-6">
				<div>
					<span>{t('changePassword.account')}: </span>
					<span className="font-bold">{account.type.title}</span>
				</div>
			</div>

			<section aria-label="Password input" className="mt-3">
				<Input
					type="password"
					label={t('changePassword.label')}
					placeholder={formatPlaceholder(t('changePassword.placeholder'))}
					{...register('password')}
					error={getError('password')}
				/>

				<PasswordRules control={control} fieldName="password" />
			</section>

			<PrimaryButton type="submit" className="h-10">
				{t('changePassword.action')}
			</PrimaryButton>
		</form>
	);
};
