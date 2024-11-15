import type { SVGProps } from 'react';

export const RoundedArrow = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" fill="currentColor" {...props}>
			<path
				transform="translate(8 4) rotate(180)"
				d="M3.293.707a1,1,0,0,1,1.414,0L6.293,2.293A1,1,0,0,1,5.586,4H2.414a1,1,0,0,1-.707-1.707Z"
			/>
		</svg>
	);
};
