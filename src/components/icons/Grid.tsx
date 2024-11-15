import type { SVGProps } from 'react';

export const Grid = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20.2 18.8"
			aria-hidden="true"
			focusable="false"
			fill="currentColor"
			{...props}
		>
			<path d="M8.28 0H.48A.48.48 0 0 0 0 .48v7.13a.48.48 0 0 0 .48.49h7.8a.48.48 0 0 0 .48-.49V.48A.48.48 0 0 0 8.28 0M19.7 0h-7.79a.48.48 0 0 0-.48.48v7.13a.48.48 0 0 0 .48.49h7.8a.48.48 0 0 0 .48-.49V.48A.48.48 0 0 0 19.7 0m0 10.77h-7.79a.48.48 0 0 0-.48.48v7.13a.48.48 0 0 0 .48.48h7.8a.48.48 0 0 0 .48-.48v-7.13a.48.48 0 0 0-.49-.48m-11.42 0H.48a.48.48 0 0 0-.48.48v7.13a.48.48 0 0 0 .48.48h7.8a.48.48 0 0 0 .48-.48v-7.13a.48.48 0 0 0-.48-.48" />
		</svg>
	);
};
