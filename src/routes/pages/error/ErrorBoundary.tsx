import { lazy } from 'react';
import { useRouteError } from 'react-router-dom';

const GenericError = lazy(() => import('~/components/error/GenericError'));
const Error404 = lazy(() => import('~/components/error/Error404'));

const ErrorBoundary = () => {
	const error = useRouteError() as RouteError;
	return error.status === 404 ? <Error404 /> : <GenericError />;
};

export default ErrorBoundary;
