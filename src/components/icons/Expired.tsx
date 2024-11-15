import type { SVGProps } from 'react';

export const Expired = (props: SVGProps<SVGSVGElement>) => {
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
			<defs>
				<mask id="mask">
					<rect fill="white" x="0" y="0" width="20" height="20" />
					<rect fill="black" x="14" y="11" width="10" height="10" />
				</mask>
			</defs>
			<circle mask="url(#mask)" cx="10" cy="10" r="8" fill="none" />
			<g transform="translate(9 6)">
				<line y2="5" />
				<line transform="rotate(130 0 5)" y2="5" />
			</g>
			<g transform="translate(17 12)">
				<line transform="rotate(45 0 2.5)" y2="5" />
				<line transform="rotate(-45 0 2.5)" y2="5" />
			</g>
		</svg>
	);
};
