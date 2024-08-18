import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { internalIpV4 } from "internal-ip"

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineConfig(
	async () =>
		({
			plugins: [TanStackRouterVite(), react()],
			clearScreen: false,
			server: {
				port: 1420,
				strictPort: true,
				host: mobile ? "0.0.0.0" : false,
				hmr: mobile ? {
					protocol: "ws",
					host: await internalIpV4(),
					port: 1420
				} : undefined,
				watch: {
					ignored: [
						"**/src-tauri/**"
					]
				}
			},
			envPrefix: [
				'VITE_',
				'TAURI_PLATFORM',
				'TAURI_ARCH',
				'TAURI_FAMILY',
				'TAURI_PLATFORM_VERSION',
				'TAURI_PLATFORM_TYPE',
				'TAURI_DEBUG'
			],
			build: {
				target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
				minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
				sourcemap: !!process.env.TAURI_DEBUG
			},
			resolve: {
				alias: {
					global: path.resolve(__dirname, './'),
					'@': path.resolve(__dirname, './src')
				}
			}
		}) as any
);
