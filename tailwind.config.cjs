/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FF4400',
					dark: '#e63d00',
				},
				dark: '#1A1A1A',
				light: '#FFFFFF',
				background: {
					dark: '#4d4d4d',
					light: '#f3f4f4',
					elevated: {
						dark: '#363636',
						light: '#fefefe',
					},
				},
				success: '#00FF67',
				warning: '#FFCB4E',
				error: {
					DEFAULT: '#FF4E4E',
					background: '#FF4E4E1a',
				},
			},
			spacing: {
				'15': '3.75rem',
			},
			transitionDuration: {
				400: '400ms',
			},
			boxShadow: {
				'10': '0px 0px 10px #0000001A',
			},
		},
	},
	plugins: [require('@headlessui/tailwindcss'), require('@thoughtbot/tailwindcss-aria-attributes')],
};
