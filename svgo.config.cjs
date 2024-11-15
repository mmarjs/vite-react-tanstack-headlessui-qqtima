/** @type {import('svgo').Config} */
module.exports = {
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					collapseGroups: false,
				},
			},
		},
		{
			name: 'convertPathData',
			params: {
				floatPrecision: 2,
				transformPrecision: 4,
			},
		},
		{
			name: 'sortAttrs',
		},
		{
			name: 'removeAttrs',
			params: {
				attrs: ['data-*', 'data.*'],
			},
		},
		{
			name: 'removeDimensions',
		},
		{
			name: 'convertStyleToAttrs',
			params: {
				keepImportant: true,
			},
		},
	],
};
