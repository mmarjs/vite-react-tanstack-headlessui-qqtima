import type { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import routes from '~/routes';
import type { TLoadFn } from './Loadable';

const findRouteElement = (pathname: string) => {
	const matchingRoutes = matchRoutes(routes, { pathname });
	if (!matchingRoutes) return null;

	const route = matchingRoutes.at(-1)?.route;
	if (!route) return null;
	return route.element as unknown as Component<{ load: TLoadFn }>;
};

export const preload = async (to: string) => {
	const element = findRouteElement('/' + to);
	if (!element) return;
	const loader = element?.props?.load;
	if (!loader) console.error(`No loader for ${to}. Ensure Lazy is the first child of the route`);
	else loader();
};
