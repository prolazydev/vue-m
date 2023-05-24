import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
		}),
		typescript2({
			check: false,
			include: [ "src/components/**/*.vue" ],
			tsconfigOverride: {
				compilerOptions: {
					outDir: "dist",
					sourceMap: true,
					declaration: true,
					declarationMap: true,
				},
			},
			exclude: [ "vite.config.ts" ]
		})
	],
	build: {
		cssCodeSplit: true,
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: "src/main.ts",
			name: 'vueM', // INFO: Using vue-m may result an error
			formats: [ "es", "cjs", "umd" ],
			fileName: format => `vue-m.${format}.js`
		},
		rollupOptions: {
			// make sure to externalize deps that should not be bundled
			// into your library
			input: {
				main: path.resolve(__dirname, "src/main.ts"),
			},
			external: [ 'vue' ],
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'main.css')
						return 'vue-m.css';
					else if (assetInfo.name.endsWith('.css')) 
						return `css/${assetInfo.name}`; // Output the extracted Tailwind CSS file to a separate folder
					return assetInfo.name;
				},
				exports: "named",
				globals: {
					vue: 'Vue',
				},
			},
		},
		// sourcemap: true,
		// emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});