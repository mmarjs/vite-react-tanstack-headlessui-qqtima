import type { SVGProps } from 'react';

export const WarningSign = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 69" {...props}>
			<rect width="73" height="69" fill="#e9b945" rx="5" />
			<g transform="translate(-9 -8)">
				<path
					fill="#1a1a1a"
					d="M45.5 20.94a.98.98 0 0 0-.86.5L22.37 59.5a.98.98 0 0 0 0 1 .98.98 0 0 0 .86.5h44.54a.98.98 0 0 0 .87-.5.98.98 0 0 0 0-1L46.35 21.44a.98.98 0 0 0-.86-.5m0-2c1 0 2.01.5 2.59 1.49l22.27 38.06a3 3 0 0 1-2.6 4.51H23.24a3 3 0 0 1-2.59-4.51l22.27-38.07a2.97 2.97 0 0 1 2.59-1.48Z"
				/>
				<path stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" d="M45.5 29.5v19m0 4.5v3" />
			</g>
		</svg>
	);
};
