import type { ComponentType} from 'react';
import { Suspense } from 'react';

export type TLoadFn = () => Promise<{ default: ComponentType<unknown> }>;

// expose load function as a prop to preload the component from the route config
/* eslint-disable @typescript-eslint/no-unused-vars */
export const Loadable = ({ children, load }: { children: JSX.Element; load: TLoadFn }) => {
	return <Suspense fallback={'...'}>{children}</Suspense>;
};
