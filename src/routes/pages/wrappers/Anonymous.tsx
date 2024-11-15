import { Navigate } from 'react-router-dom';
import { useAuth } from '~/providers/AuthProvider';

export const Anonymous = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuth();

	if (user) return <Navigate to="/" replace />;
	return children;
};
