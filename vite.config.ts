import reactRefresh from '@vitejs/plugin-react-refresh';
import {defineConfig} from 'vite';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
// import babel from '@rollup/plugin-babel';
// import typescript from '@rollup/plugin-typescript'

const OVERRIDE_ANTD_LESS = path.resolve(__dirname, './src/reset-antd.less');

export default defineConfig({
	plugins: [
		reactRefresh(),
		// babel({
		// 	babelHelpers: 'bundled'
		// }),
		// typescript(),
		vitePluginImp({
			libList: [
				{
					libName: 'antd',
					style: name => `antd/es/${name}/style`
				}
			]
		})
	],
	// optimizeDeps: {
	// 	include: ['antd/es/locale/zh_CN']
	// },
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 8010
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					hack: `true; @import "${OVERRIDE_ANTD_LESS}";` // Override with less file
				}
			}
		}
	}
});
