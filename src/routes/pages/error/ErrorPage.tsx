import { lazy, useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

const GenericError = lazy(() => import('~/components/error/GenericError'));
const Error404 = lazy(() => import('~/components/error/Error404'));

const ErrorPage = () => {
	const error = useRouteError() as RouteError;

	useEffect(() => {
		document.getElementById('loadingScreen')?.remove();
	}, []);

	return (
		<main aria-label="Error page" className="fixed inset-0 flex items-center justify-center">
			{error.status === 404 ? <Error404 /> : <GenericError />}
		</main>
	);
};

export default ErrorPage;
