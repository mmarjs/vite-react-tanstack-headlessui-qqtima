import type { SVGProps } from 'react';

export const MarketingTools = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20.5 20.5"
			stroke="currentColor"
			{...props}
		>
			<g
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth=".6"
				transform="translate(.3 .3)"
			>
				<path d="M17.2 13.02a7.84 7.84 0 0 0 .61-3.06h0A7.86 7.86 0 0 0 9.96 2.1h0A7.85 7.85 0 0 0 2.1 9.96h0a7.86 7.86 0 0 0 7.86 7.85h0a7.84 7.84 0 0 0 3.06-.61" />
				<path d="M13.4 14.63a5.82 5.82 0 1 1 1.23-1.22" />
				<circle cx="3.78" cy="3.78" r="3.78" transform="rotate(-45 14.325 -.589)" />
				<circle cx="1.544" cy="1.544" r="1.544" transform="rotate(-67.5 12.046 -.545)" />
				<path d="M1.12 5.37a10 10 0 0 1 4.14-4.2m8.83 17.85a9.95 9.95 0 0 1-4.13.9h0A9.96 9.96 0 0 1 0 9.94h0a9.97 9.97 0 0 1 .3-2.4M9.96 0c.21 0 .43 0 .64.02a9.96 9.96 0 0 1 9.31 9.94h0a9.95 9.95 0 0 1-.89 4.13M7.9.21a9.72 9.72 0 0 1 1-.15" />
				<circle cx="3.491" cy="3.491" r="3.491" transform="translate(12.932 12.932)" />
				<path d="M17.3 14.9H16a.47.47 0 0 0-.46.47v.59a.47.47 0 0 0 .47.47h.59" />
				<path d="M15.54 17.95h1.3a.47.47 0 0 0 .46-.47v-.59a.47.47 0 0 0-.46-.47h-.61m.19 1.53v.7m0-4.45v.7m-2.46-.94-4-4" />
			</g>
		</svg>
	);
};
