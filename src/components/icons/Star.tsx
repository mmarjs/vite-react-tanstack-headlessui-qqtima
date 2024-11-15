import type { SVGProps } from 'react';

export const Star = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18.95 19.85"
			fill="currentColor"
			{...props}
		>
			<path d="m10.01.35 2.44 5.5a.59.59 0 0 0 .45.34l5.55.9a.59.59 0 0 1 .34.98l-4.09 4.42a.59.59 0 0 0-.15.5l.96 6.18a.59.59 0 0 1-.88.6l-4.86-2.83a.59.59 0 0 0-.6 0l-4.85 2.83a.59.59 0 0 1-.88-.6l.96-6.19a.59.59 0 0 0-.15-.49L.15 8.06a.59.59 0 0 1 .35-.98l5.55-.9a.59.59 0 0 0 .45-.34L8.94.35a.59.59 0 0 1 1.07 0" />
		</svg>
	);
};
