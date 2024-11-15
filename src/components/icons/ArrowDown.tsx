import type { SVGProps } from 'react';

export const ArrowDown = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 7.3 4"
			aria-hidden="true"
			focusable="false"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="0"
			{...props}
		>
			<path d="M7.25.1a.33.33 0 0 0-.47 0l-3.1 3.1L.55.1A.33.33 0 1 0 .1.56L3.43 3.9a.33.33 0 0 0 .47 0L7.24.56a.33.33 0 0 0 0-.46" />
		</svg>
	);
};
