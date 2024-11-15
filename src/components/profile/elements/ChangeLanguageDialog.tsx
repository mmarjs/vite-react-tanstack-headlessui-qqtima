import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { Select } from '~/components/input/Select';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { LANG_CONFIG } from '~/config/languages';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import { fetchProfileQuery } from '~/routes/pages/profile/profileLoader';
import { profileService } from '~/services/profile';
import { toastError, toastSuccess } from '~/utils/toast';
import {
	changeLanguageSchema,
	type TChangeLanguageSchema,
} from '~/validation/profile/changeLanguage';

const languageOptions = LANG_CONFIG.map(({ id, name }) => ({ label: name, value: id }));

export const ChangeLanguageDialog = ({ language }: { language: string }) => {
	const client = useQueryClient();
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const { register, handleSubmit, getError } = useZodForm<TChangeLanguageSchema>(
		changeLanguageSchema,
		{ language },
	);

	const mutation = useMutation({
		mutationFn: (data: TChangeLanguageSchema) => profileService.changeLanguage(data.language),
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('personal.setLanguage.success'));
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
			name="change-language"
			className="flex w-[300px] flex-col gap-8 sm:w-[540px]"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			noValidate
		>
			<Header>{t('personal.setLanguage.title')}</Header>

			<Select
				label={t('personal.setLanguage.label')}
				options={languageOptions}
				defaultOption={languageOptions.find(({ value }) => value === language)}
				{...register('language')}
				error={getError('language')}
				maxHeight={108}
			/>

			<PrimaryButton type="submit" className="mt-[84px] h-10">
				{t('personal.setLanguage.action')}
			</PrimaryButton>
		</form>
	);
};
