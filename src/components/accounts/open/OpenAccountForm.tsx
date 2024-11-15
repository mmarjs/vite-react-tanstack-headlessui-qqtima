import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LeverageInput } from '~/components/accounts/open/LeverageInput';
import { RadioBox } from '~/components/accounts/open/RadioBox';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Input } from '~/components/input/Input';
import { Select } from '~/components/input/Select';
import { InputLabel } from '~/components/input/variants/elements/InputLabel';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { categories, type TAccountCategory } from '~/config/accounts/open/categories';
import { platforms, type TPlatform } from '~/config/accounts/open/platforms';
import type { TAccountType } from '~/config/accounts/open/types';
import { useZodForm } from '~/hooks/useZodForm';
import i18n from '~/i18n';
import { accountsService } from '~/services/accounts';
import { formatPlaceholder } from '~/utils/form';
import { getDefaultLeveage } from '~/utils/leverage';
import { toastError, toastSuccess } from '~/utils/toast';
import { openAccountSchema, type TOpenAccountSchema } from '~/validation/accounts/open';

type OpenAccountFormProps = {
	type: TAccountType;
	category: TAccountCategory;
	platform: TPlatform;
};

export const OpenAccountForm = (props: OpenAccountFormProps) => {
	const { t } = useTranslation(['accounts', 'currencies']);
	const navigate = useNavigate();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const [currencyOptions, setCurrencyOptions] = useState(getCurrencyOptions(props.platform));

	const { register, control, handleSubmit, setValue, getError, getValue } =
		useZodForm<TOpenAccountSchema>(openAccountSchema, {
			...props,
			currency: getDefaultCurrency(props.platform),
			leverage: getDefaultLeveage(props.platform),
		});

	const category = useWatch({ control, name: 'category' }) as TAccountCategory;
	const platform = useWatch({ control, name: 'platform' }) as TPlatform;
	const currency = useWatch({ control, name: 'currency' });

	const createPlatformChangeHandler = useCallback(
		(platform: TPlatform) => () => {
			setValue('platform', platform);

			const availableCurrencies = getCurrencyOptions(platform);
			setCurrencyOptions(availableCurrencies);

			if (!availableCurrencies.find(({ value }) => value === getValue('currency')))
				setValue('currency', getDefaultCurrency(platform));
		},
		[getValue, setValue],
	);

	const mutation = useMutation({
		mutationFn: accountsService.create,
		onMutate: globalLoading.start,
		onSuccess: () => {
			toastSuccess(t('open.success'));
			navigate('/accounts/overview');
		},
		onError: toastError,
		onSettled: globalLoading.end,
	});

	return (
		<form
			name="open account form"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			className="flex max-w-[712px] flex-col gap-5"
			noValidate
		>
			<section aria-label="Account category select" className="flex flex-col gap-3">
				<InputLabel>{t('open.accountCategory.label')}</InputLabel>
				<div className="grid gap-[10px] sm:grid-cols-2 sm:gap-5">
					{categories.map(({ value, label, description }) => (
						<RadioBox
							key={value}
							label={t(label)}
							description={t(description)}
							isCurrent={category === value}
							onClick={() => setValue('category', value)}
						>
							<Input type="radio" {...register('category')} value={value} className="mt-[5px]" />
						</RadioBox>
					))}
				</div>
			</section>

			<section aria-label="Trading platform select" className="flex flex-col gap-3">
				<InputLabel>{t('open.tradingPlatform.label')}</InputLabel>
				<div className="grid gap-[10px] sm:grid-cols-2 sm:gap-5">
					{platforms.map(({ title, label, spreadFrom, commission, maxLeverage }) => (
						<RadioBox
							key={title}
							label={label}
							description={t('open.tradingPlatform.maxLeverage', {
								maxLeverage: getMaxLeverage(maxLeverage),
							})}
							features={[
								t('open.features.spreadFrom', { spreadFrom }),
								commission
									? t('open.features.commission', { commission })
									: t('open.features.noCommission'),
							]}
							isCurrent={platform === title}
							onClick={createPlatformChangeHandler(title)}
						>
							<Input type="radio" {...register('platform')} value={title} className="mt-[5px]" />
						</RadioBox>
					))}
				</div>
			</section>

			<section aria-label="Leverage input" className="mt-3">
				<LeverageInput
					platform={platform}
					defaultLeverage={getDefaultLeveage(platform)}
					setFormLeverage={(leverage) => setValue('leverage', leverage)}
					error={getError('leverage')}
				/>
			</section>

			{category === 'demo' ? (
				<section
					aria-label="Starting balance and currency select"
					className="mt-3 grid gap-8 sm:grid-cols-2 sm:gap-5"
				>
					<Input
						type="number"
						label={t('open.initialBalance.label')}
						placeholder={formatPlaceholder(t('open.initialBalance.placeholder'))}
						{...register('initialBalance', { valueAsNumber: true, value: 500 })}
						error={getError('initialBalance')}
						min={0}
					/>

					<Select
						label={t('open.currency.label')}
						options={currencyOptions}
						value={currency}
						{...register('currency')}
						error={getError('currency')}
					/>
				</section>
			) : (
				<section aria-label="Currency select" className="mt-3">
					<Select
						label={t('open.currency.label')}
						options={currencyOptions}
						value={currency}
						{...register('currency')}
						error={getError('currency')}
					/>
				</section>
			)}

			<PrimaryButton type="submit" className="h-10 w-max">
				{t('open.actions.create')}
			</PrimaryButton>
		</form>
	);
};

function getDefaultCurrency(platform: TPlatform) {
	const currency = platforms.find(({ title }) => title === platform)?.defaultCurrency;
	return currency || '';
}

function getCurrencyOptions(platform: TPlatform) {
	const currencies = platforms.find(({ title }) => title === platform)?.currencies;
	if (!currencies) return [];

	return currencies.map((currency) => ({
		value: currency,
		label: i18n.t(currency, { ns: 'currencies' }) || currency,
	}));
}

function getMaxLeverage(maxLeverage: string) {
	if (maxLeverage === '1:Unlimited')
		return `1:${i18n.t('open.features.unlimited', { ns: 'accounts' })}`;
	return maxLeverage;
}
