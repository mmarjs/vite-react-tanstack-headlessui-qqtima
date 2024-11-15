import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { client } from '~/config/query';
import '~/i18n';
import '~/index.css';
import routes from '~/routes';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>,
);
