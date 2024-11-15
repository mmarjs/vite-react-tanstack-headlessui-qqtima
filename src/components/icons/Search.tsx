import type { SVGProps } from 'react';

export const Search = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 18"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M16.14 2.57a.7.7 0 0 0-.99 0L6.92 10.8 2.68 6.53a.7.7 0 0 0-.99 0L.2 8.02A.7.7 0 0 0 .2 9l6.22 6.26a.7.7 0 0 0 1 0l10.2-10.21a.7.7 0 0 0 0-1l-1.49-1.48z" />
		</svg>
	);
};
