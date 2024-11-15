import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Input } from '~/components/input/Input';
import { TextLink } from '~/components/link/TextLink';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useZodForm } from '~/hooks/useZodForm';
import { useAuth } from '~/providers/AuthProvider';
import { formatPlaceholder } from '~/utils/form';
import { notImplemented } from '~/utils/functional';
import { toastError } from '~/utils/toast';
import { loginSchema, type TLoginSchema } from '~/validation/auth/login';

const Login = () => {
	const { t } = useTranslation(['auth']);

	const { login } = useAuth();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const navigate = useNavigate();
	const location = useLocation();

	const { register, handleSubmit, getError } = useZodForm<TLoginSchema>(loginSchema);

	const mutation = useMutation({
		mutationFn: login,
		onMutate: globalLoading.start,
		onSuccess: () => {
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		},
		onError: toastError,
		onSettled: globalLoading.end,
	});

	return (
		<form
			name="login form"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			className="flex w-[300px] flex-col gap-6 md:w-[342px] md:gap-8"
			aria-disabled={mutation.isLoading}
			noValidate
		>
			<h1 className="text-2xl font-bold">{t('login.login')}</h1>

			<section className="flex flex-col gap-3">
				<Input
					type="email"
					label={t('login.email')}
					placeholder={formatPlaceholder(t('login.email'))}
					{...register('email')}
					error={getError('email')}
				/>
				<Input
					type="password"
					label={t('login.password')}
					placeholder={formatPlaceholder(t('login.password'))}
					{...register('password')}
					error={getError('password')}
				/>

				<div className="mt-1 flex items-center gap-3">
					<PrimaryButton type="submit">{t('login.login')}</PrimaryButton>
					<TextLink onClick={notImplemented}>{t('login.forgotPassword')}</TextLink>
				</div>
			</section>

			<section className="flex flex-col gap-3">
				<div className="flex items-baseline gap-2">
					<span className="text-xs">{t('login.orLoginWith')}</span>
					<div className="flex gap-2">
						<TextLink onClick={notImplemented}>Facebook</TextLink>
						<TextLink onClick={notImplemented}>Google</TextLink>
						<TextLink onClick={notImplemented}>Twitter</TextLink>
					</div>
				</div>

				<hr />

				<div className="flex items-baseline gap-4">
					<span className="text-xs">{t('login.noAccount')}</span>
					<TextLink to="/register">{t('login.signUpNow')}</TextLink>
				</div>
			</section>
		</form>
	);
};

export default Login;
