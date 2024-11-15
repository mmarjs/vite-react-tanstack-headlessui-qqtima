import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Input } from '~/components/input/Input';
import { Select } from '~/components/input/Select';
import { TextLink } from '~/components/link/TextLink';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { countries } from '~/constants/countries';
import { phoneCodes } from '~/constants/phoneCodes';
import { useZodForm } from '~/hooks/useZodForm';
import { useAuth } from '~/providers/AuthProvider';
import { formatPlaceholder } from '~/utils/form';
import { toastError } from '~/utils/toast';
import type { TRegisterSchema } from '~/validation/auth/register';
import { birthDateMax, birthDateMin, registerSchema } from '~/validation/auth/register';

const Register = () => {
	const { t } = useTranslation(['auth', 'countries']);

	const { register: signup } = useAuth();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);
	const navigate = useNavigate();

	const form = useZodForm<TRegisterSchema>(registerSchema);
	const { register, handleSubmit, control, setValue, isTouched, getError } = form;

	const country = useWatch({ control, name: 'country' });
	useEffect(() => {
		// auto-populate phone code on country change
		if (country && !isTouched('phone')) setValue('phone', phoneCodes.get(country) ?? '');
	}, [country, isTouched, setValue]);

	const mutation = useMutation({
		mutationFn: signup,
		onMutate: globalLoading.start,
		onSuccess: (result, data) => {
			navigate(`/verification-required?email=${data.email}`, { replace: true });
		},
		onError: toastError,
		onSettled: globalLoading.end,
	});

	// translate client type options
	const clientTypeOptions = useMemo(
		() => [
			{ value: 'Individual', label: t('register.clientType.individual') },
			{ value: 'Corporate', label: t('register.clientType.corporate') },
		],
		[t],
	);

	// translate country names and sort by name
	const countryOptions = useMemo(() => {
		return countries
			.map(({ code, name }) => ({ value: code, label: t(code, { ns: 'countries' }) || name }))
			.sort((a, b) => a.label.localeCompare(b.label));
	}, [t]);

	return (
		<form
			name="register form"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			className="flex w-[300px] flex-col gap-6 md:w-[342px] md:gap-4"
			aria-disabled={mutation.isLoading}
			noValidate
		>
			<h1 className="text-2xl font-bold">{t('register.register')}</h1>

			<section className="flex flex-col gap-3">
				<Select
					label={t('register.registerAs')}
					options={clientTypeOptions}
					defaultOption={{ value: '', label: t('select', { ns: 'common' }) }}
					{...register('clientType')}
					error={getError('clientType')}
				/>

				<div className="flex flex-row gap-2">
					<div className="w-[calc(50%-.25rem)]">
						<Input
							type="text"
							label={t('register.firstName')}
							placeholder={formatPlaceholder(t('register.firstName'))}
							{...register('firstName')}
							error={getError('firstName')}
						/>
					</div>

					<div className="w-[calc(50%-.25rem)]">
						<Input
							type="text"
							label="ㅤ"
							placeholder={formatPlaceholder(t('register.lastName'))}
							{...register('lastName')}
							error={getError('lastName')}
						/>
					</div>
				</div>

				<Input
					type="date"
					min={birthDateMin}
					max={birthDateMax}
					label={t('register.dateOfBirth')}
					{...register('birthDate')}
					error={getError('birthDate')}
				/>

				<Select
					label={t('register.countryOfResidence')}
					options={countryOptions}
					defaultOption={{ value: '', label: t('select', { ns: 'common' }) }}
					{...register('country')}
					error={getError('country')}
				/>

				<Input
					type="tel"
					label={t('register.phoneNumber')}
					placeholder="+12 345 567 890"
					{...register('phone')}
					error={getError('phone')}
				/>

				<Input
					type="email"
					label={t('register.email')}
					placeholder={formatPlaceholder(t('register.email'))}
					{...register('email')}
					error={getError('email')}
				/>

				<Input
					type="checkbox"
					label={<AcceptDocumentsLabel />}
					{...register('acceptDocuments')}
					error={getError('acceptDocuments')}
					className="mt-1 text-xs"
				/>

				<Input
					type="checkbox"
					label={<AcceptTermsLabel />}
					{...register('acceptTerms')}
					error={getError('acceptTerms')}
					className="text-xs"
				/>
			</section>

			<section className="flex w-max flex-col gap-3">
				<PrimaryButton type="submit">{t('register.continue')}</PrimaryButton>
			</section>

			<section className="flex items-baseline gap-3">
				<span className="text-xs">{t('register.haveAccount')}</span>
				<TextLink to="/login">{t('register.logInNow')}</TextLink>
			</section>
		</form>
	);
};

const AcceptDocumentsLabel = () => (
	<Trans i18nKey="register.acceptDocuments" ns="auth">
		I accept the <TextLink to="/privacy-policy">Privacy Policy</TextLink>,
		<TextLink to="/share-certificate">Share Certificate</TextLink>, and
		<TextLink to="/memorandum">Memorandum</TextLink>
	</Trans>
);

const AcceptTermsLabel = () => (
	<Trans i18nKey="register.acceptTerms" ns="auth">
		I accept the <TextLink to="/terms">Terms and Conditions</TextLink>
	</Trans>
);

export default Register;
