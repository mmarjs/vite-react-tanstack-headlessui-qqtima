import type { SVGProps } from 'react';

export const Cross = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 44 44"
			aria-hidden="true"
			focusable="false"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M0.549989 4.44999L4.44999 0.549988L43.45 39.55L39.55 43.45L0.549989 4.44999Z" />
			<path d="M39.55 0.549988L43.45 4.44999L4.44999 43.45L0.549988 39.55L39.55 0.549988Z" />
		</svg>
	);
};
