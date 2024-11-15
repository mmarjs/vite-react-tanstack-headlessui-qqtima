import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [
			react(),
			mode === 'analyze' && visualizer({ template: 'sunburst', gzipSize: true, open: true }),
		],
		build: {
			chunkSizeWarningLimit: 1024,
		},
		resolve: {
			alias: {
				'~/': '/src/',
			},
		},
	};
});
