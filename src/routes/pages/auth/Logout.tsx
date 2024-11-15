import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { useAuth } from '~/providers/AuthProvider';
import { toastError } from '~/utils/toast';

let isExecuted = false;

const Logout = () => {
	const { logout } = useAuth();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: () => logout(),
		onMutate: globalLoading.start,
		onSuccess: () => navigate('/login', { replace: true }),
		onError: (error: Error) => {
			toastError(error.message);
			navigate('/');
		},
		onSettled: globalLoading.end,
	});

	useEffect(() => {
		if (!isExecuted) mutation.mutate();
		isExecuted = true;
	}, [mutation]);

	return <p>You are being logged out...</p>;
};

export default Logout;
