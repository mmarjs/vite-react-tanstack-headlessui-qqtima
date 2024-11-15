import type { SVGProps } from 'react';

export const Approved = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			{...props}
		>
			<circle cx="10" cy="10" r="9" fill="none" />
			<path
				stroke="none"
				transform="translate(4 4) scale(0.7)"
				d="M16.14 2.57a.7.7 0 0 0-.99 0L6.92 10.8 2.68 6.53a.7.7 0 0 0-.99 0L.2 8.02A.7.7 0 0 0 .2 9l6.22 6.26a.7.7 0 0 0 1 0l10.2-10.21a.7.7 0 0 0 0-1l-1.49-1.48z"
			/>
		</svg>
	);
};
