import type { SVGProps } from 'react';

export const Pending = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			{...props}
		>
			<circle cx="10" cy="10" r="9" fill="none" />
			<g transform="translate(9 6)">
				<line y2="5" />
				<line transform="rotate(120 0 5)" y2="5" />
			</g>
		</svg>
	);
};
