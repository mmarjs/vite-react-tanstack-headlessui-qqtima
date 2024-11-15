import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Android } from '~/components/icons/Android';
import { Ios } from '~/components/icons/Ios';
import { Secured } from '~/components/icons/Secured';
import { Input } from '~/components/input/Input';
import { TextLink } from '~/components/link/TextLink';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import { fetchProfileQuery } from '~/routes/pages/profile/profileLoader';
import type { TQrCode } from '~/services/profile';
import { profileService } from '~/services/profile';
import { formatPlaceholder } from '~/utils/form';
import { toastError, toastSuccess } from '~/utils/toast';
import {
	twoFactorAuthentificationSchema,
	type TTwoFactorAuthentificationSchema,
} from '~/validation/profile/twoFactorAuthentification';

export const SetTwoFactorAuthDialog = ({ enabled }: { enabled: boolean }) => {
	const client = useQueryClient();
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const [qrCode, setQrCode] = useState<TQrCode | null>(null);
	const { register, handleSubmit, getError } = useZodForm<TTwoFactorAuthentificationSchema>(
		twoFactorAuthentificationSchema,
	);

	const generateCodeMutation = useMutation({
		mutationFn: profileService.generateQrCode,
		onMutate: globalLoading.start,
		onSuccess: setQrCode,
		onError: toastError,
		onSettled: globalLoading.end,
	});

	const enableMutation = useMutation({
		mutationFn: profileService.enableTwoFactorAuth,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('account.setTwoFactorAuthentication.success.enabled'));
			dialog.close();
		},
		onError: toastError,
		onSettled: () => {
			client.invalidateQueries(fetchProfileQuery);
			globalLoading.end();
		},
	});

	const disableMutation = useMutation({
		mutationFn: profileService.disableTwoFactorAuth,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('account.setTwoFactorAuthentication.success.disabled'));
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
			name="set-two-factor-authentification"
			className="flex w-[300px] flex-col gap-8 sm:w-[540px]"
			onSubmit={handleSubmit(
				(data) => enableMutation.mutate(data), // code passed validation
				() => {
					if (qrCode) return; // code is generated, but failed validation
					const mutation = enabled ? disableMutation : generateCodeMutation;
					mutation.mutate(); // qr code is not generated yet
				},
			)}
			noValidate
		>
			<Header>{t('account.setTwoFactorAuthentication.title')}</Header>

			<div className="flex flex-col items-center gap-[10px]">
				{qrCode ? (
					<div className="flex flex-col gap-2 text-[14px] font-bold">
						<label>{t('account.setTwoFactorAuthentication.code.scan')}</label>

						<img
							src={qrCode.url}
							alt={formatPlaceholder(t('account.setTwoFactorAuthentication.code.qrCode'))}
							className="w-max self-center"
						/>

						<label className="break-all">
							{t('account.setTwoFactorAuthentication.code.manual')}:{' '}
							<code>{qrCode.manualCode}</code>
						</label>

						<Input
							label={t('account.setTwoFactorAuthentication.code.label')}
							placeholder={formatPlaceholder(
								t('account.setTwoFactorAuthentication.code.placeholder'),
							)}
							{...register('code')}
							error={getError('code')}
						/>
					</div>
				) : (
					<p className="text-[14px] font-bold">
						{t(
							enabled
								? 'account.setTwoFactorAuthentication.enabled'
								: 'account.setTwoFactorAuthentication.disabled',
						)}
					</p>
				)}

				<PrimaryButton type="submit" className="mt-[10px] flex h-10 gap-2">
					<Secured width={22} />
					{t(
						enabled
							? 'account.setTwoFactorAuthentication.disable'
							: 'account.setTwoFactorAuthentication.enable',
					)}
				</PrimaryButton>

				<TextLink
					to="https://en.wikipedia.org/wiki/Multi-factor_authentication"
					className="font-normal"
				>
					{t('account.setTwoFactorAuthentication.whatIs2FA')}
				</TextLink>

				<div className="mt-6 flex flex-col items-center gap-[5px]">
					<TextLink
						to="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
						className="flex gap-[6px] font-normal"
					>
						<Android height={14} />
						{t('account.setTwoFactorAuthentication.androidAuthenticator')}
					</TextLink>

					<TextLink
						to="https://apps.apple.com/us/app/google-authenticator/id388497605"
						className="flex gap-[6px] font-normal"
					>
						<Ios height={14} />
						{t('account.setTwoFactorAuthentication.iosAuthenticator')}
					</TextLink>
				</div>
			</div>
		</form>
	);
};
