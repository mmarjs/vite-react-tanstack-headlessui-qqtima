import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { Loader } from '~/components/loader/Loader';
import { LoadingScreen } from '~/components/loader/LoadingScreen';

import { AuthProvider } from '~/providers/AuthProvider';
import { DialogProvider } from '~/providers/DialogProvider';

export const Root = () => {
	useEffect(() => {
		document.getElementById('loadingScreen')?.remove();
	}, []);

	return (
		<>
			<Suspense fallback={<Loader />}>
				<AuthProvider>
					<DialogProvider>
						<Outlet />
					</DialogProvider>
				</AuthProvider>
			</Suspense>
			<LoadingScreen />
			<Toaster position="bottom-right" reverseOrder={false} />
		</>
	);
};
