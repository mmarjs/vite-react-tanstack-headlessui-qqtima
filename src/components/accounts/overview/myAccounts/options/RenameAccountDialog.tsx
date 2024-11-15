import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Input } from '~/components/input/Input';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { client, keys } from '~/config/query';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import type { TAccount } from '~/services/accounts';
import { accountsService } from '~/services/accounts';
import { formatPlaceholder } from '~/utils/form';
import { toastError, toastSuccess } from '~/utils/toast';
import { renameSchema, type TRenameSchema } from '~/validation/accounts/rename';

export const RenameAccountDialog = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const { register, handleSubmit, getError } = useZodForm<TRenameSchema>(renameSchema);

	const mutation = useMutation({
		mutationFn: (data: TRenameSchema) => accountsService.changeName(account.loginSid, data.name),
		onMutate: globalLoading.start,
		onSuccess: (result, data) => {
			toastSuccess(t('setLeverage.success', { name: data.name }));
			dialog.close();
		},
		onError: toastError,
		onSettled: () => {
			client.invalidateQueries({ queryKey: [keys.accounts] });
			globalLoading.end();
		},
	});

	return (
		<form
			name="rename-account"
			className="flex w-[300px] flex-col gap-6 sm:w-[540px]"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			noValidate
		>
			<Header>{t('rename.title')}</Header>

			<div className="flex flex-col gap-6">
				<div>
					<span>{t('rename.account')}: </span>
					<span className="font-bold">{account.type.title}</span>
				</div>

				<div>{t('rename.tip')}</div>

				<Input
					type="text"
					label={t('rename.newNickname')}
					placeholder={formatPlaceholder(t('rename.newNicknamePlaceholder'))}
					{...register('name')}
					error={getError('name')}
					className="w-full"
				/>
			</div>

			<PrimaryButton type="submit" className="h-10">
				{t('rename.action')}
			</PrimaryButton>
		</form>
	);
};
