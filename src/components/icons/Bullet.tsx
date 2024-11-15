import type { SVGProps } from 'react';

export const Bullet = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="currentColor" {...props}>
			<circle cx="5" cy="5" r="5" />
		</svg>
	);
};
