import { useTranslation } from 'react-i18next';
import { NavLink, useRouteError } from 'react-router-dom';
import { Logo } from '~/components/logo/Logo';

type ErrorResponse = {
	status: number;
	statusText: string;
	message: string;
};

const GenericError = () => {
	const { t } = useTranslation();
	const error = useRouteError() as ErrorResponse;

	return (
		<div
			aria-label="Generic error"
			className="m-auto flex h-96 max-w-lg flex-col items-center gap-4 p-1 text-center"
		>
			<h1 className="text-4xl font-bold">{t('errors.common.title')}</h1>
			<p className="text-xl">{t('errors.common.subtitle')}</p>
			<Logo className="w-60 text-primary" />
			<p className="italic text-gray-500">{error.statusText || error.message}</p>

			<NavLink
				to="/"
				className="rounded-md bg-primary px-4 py-2 text-white transition-all duration-300 ease-in-out hover:scale-105"
			>
				{t('errors.common.backToHome')}
			</NavLink>
		</div>
	);
};

export default GenericError;
