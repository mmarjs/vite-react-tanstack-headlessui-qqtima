import type { SVGProps } from 'react';

export const NotUploaded = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth=".6"
			strokeLinecap="round"
			viewBox="3 3 16 16"
			{...props}
		>
			<defs>
				<mask id="mask">
					<rect fill="white" width="100%" height="100%" />
					<path stroke="black" d="m14.07 11.03 3.58 3.58 M13 12.82l3.58 3.58" />
				</mask>
			</defs>
			<path
				mask="url(#mask)"
				d="M13.51 14.22H6.82a2.34 2.34 0 0 1-2.33-2.34v-3.5a.38.38 0 0 1 .76 0v3.5a1.58 1.58 0 0 0 1.58 1.58h6.68a1.58 1.58 0 0 0 1.58-1.58v-3.5a.38.38 0 0 1 .76 0v3.5a2.34 2.34 0 0 1-2.34 2.34Zm-1.69-6.79a.38.38 0 0 1-.27-.11l-1.38-1.39-1.39 1.39a.38.38 0 1 1-.53-.54L9.9 5.13a.38.38 0 0 1 .54 0l1.65 1.65a.38.38 0 0 1 0 .54.37.37 0 0 1-.27.1Z"
			/>
			<path d="M10.17 11.46a.38.38 0 0 1-.38-.38V5.4a.38.38 0 0 1 .76 0v5.68a.38.38 0 0 1-.38.38Z" />
			<path strokeWidth="1.5" d="M14.07 12.43 17.65 16m-.01-3.57L14.06 16" />
		</svg>
	);
};
