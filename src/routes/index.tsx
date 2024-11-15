import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Loadable } from '~/lazy/Loadable';
import { Root } from '~/routes/layouts/Root';
import { accountsLoader } from '~/routes/pages/accounts/AccountOverview';
import { transactionsLoader } from '~/routes/pages/funds/transactionsLoader';
import { documentsLoader } from '~/routes/pages/profile/Documents';
import { profileLoader } from '~/routes/pages/profile/profileLoader';
import { Anonymous } from '~/routes/pages/wrappers/Anonymous';
import { RequireAuth } from '~/routes/pages/wrappers/RequireAuth';

const loader = {
	// auth
	auth: () => import('~/routes/layouts/Auth'),
	register: () => import('~/routes/pages/auth/Register'),
	login: () => import('~/routes/pages/auth/Login'),
	logout: () => import('~/routes/pages/auth/Logout'),
	verificationRequired: () => import('~/routes/pages/auth/VerificationRequired'),
	// main
	main: () => import('~/routes/layouts/Main'),
	openAccount: () => import('~/routes/pages/accounts/OpenAccount'),
	accountOverview: () => import('~/routes/pages/accounts/AccountOverview'),
	transactions: () => import('~/routes/pages/funds/Transactions'),
	profile: () => import('~/routes/pages/profile/Profile'),
	documents: () => import('~/routes/pages/profile/Documents'),
	// errors
	errorPage: () => import('~/routes/pages/error/ErrorPage'),
	errorBoundary: () => import('~/routes/pages/error/ErrorBoundary'),
};

// Lazy-loadable components
const Auth = lazy(loader.auth);
const Register = lazy(loader.register);
const Login = lazy(loader.login);
const Logout = lazy(loader.logout);
const VerificationRequired = lazy(loader.verificationRequired);

const Main = lazy(loader.main);
const OpenAccount = lazy(loader.openAccount);
const AccountOverview = lazy(loader.accountOverview);
const Transactions = lazy(loader.transactions);
const Profile = lazy(loader.profile);
const Documents = lazy(loader.documents);

const ErrorPage = lazy(loader.errorPage);
const ErrorBoundary = lazy(loader.errorBoundary);

const routes: RouteObject[] = [
	{
		path: '',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: (
					<RequireAuth>
						<Main />
					</RequireAuth>
				),
				children: [
					{ index: true, loader: () => redirect('/accounts/overview') },
					{
						path: 'accounts',
						errorElement: <ErrorBoundary />,
						children: [
							{ index: true, loader: () => redirect('/accounts/overview') },
							{
								path: 'open',
								element: (
									<Loadable load={loader.openAccount}>
										<OpenAccount />
									</Loadable>
								),
							},
							{
								path: 'open/:type/:category',
								element: (
									<Loadable load={loader.openAccount}>
										<OpenAccount />
									</Loadable>
								),
							},
							{
								path: 'overview',
								element: (
									<Loadable load={loader.accountOverview}>
										<AccountOverview />
									</Loadable>
								),
								loader: accountsLoader,
							},
						],
					},
					{
						path: 'funds',
						errorElement: <ErrorBoundary />,
						children: [
							{ index: true, loader: () => redirect('/funds/transactions') },
							{
								path: 'transactions',
								element: (
									<Loadable load={loader.accountOverview}>
										<Transactions />
									</Loadable>
								),
								loader: transactionsLoader,
							},
						],
					},
					{
						path: 'profile',
						errorElement: <ErrorBoundary />,
						children: [
							{
								index: true,
								loader: profileLoader,
								element: (
									<Loadable load={loader.profile}>
										<Profile />
									</Loadable>
								),
							},
							{
								path: 'documents',
								element: (
									<Loadable load={loader.profile}>
										<Documents />
									</Loadable>
								),
								loader: documentsLoader,
							},
						],
					},
					{
						path: 'platforms',
						errorElement: <ErrorBoundary />,
						loader: () => {
							throw Error('Page is not implemented');
						},
					},
				],
			},
			{
				path: '/',
				element: <Auth />,
				children: [
					{
						path: 'login',
						element: (
							<Loadable load={loader.login}>
								<Anonymous>
									<Login />
								</Anonymous>
							</Loadable>
						),
					},
					{
						path: 'register',
						element: (
							<Loadable load={loader.register}>
								<Anonymous>
									<Register />
								</Anonymous>
							</Loadable>
						),
					},
					{
						path: 'verification-required',
						element: (
							<Loadable load={loader.verificationRequired}>
								<VerificationRequired />
							</Loadable>
						),
						loader: ({ request }) => {
							const url = new URL(request.url);
							const email = url.searchParams.get('email');
							if (!email) return redirect('/');
							return email;
						},
					},
					{
						path: 'logout',
						element: (
							<Loadable load={loader.logout}>
								<RequireAuth>
									<Logout />
								</RequireAuth>
							</Loadable>
						),
					},
				],
			},
		],
	},
];

export default routes;
