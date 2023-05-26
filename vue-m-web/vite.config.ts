import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ vue() ],
	build: {
		outDir: 'build',
		cssCodeSplit: true,
		chunkSizeWarningLimit: 2000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	}
})
