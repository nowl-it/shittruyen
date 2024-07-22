import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(
    async () =>
        ({
            plugins: [react()],
            clearScreen: false,
            server: {
                port: 1420,
                strictPort: true
            },
            envPrefix: ['VITE_', 'TAURI_'],
            build: {
                // Tauri supports es2021
                target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
                // don't minify for debug builds
                minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
                // produce sourcemaps for debug builds
                sourcemap: !!process.env.TAURI_DEBUG
            },
            resolve: {
                alias: {
                    '@global': path.resolve(__dirname, './'),
                    '@': path.resolve(__dirname, './src')
                }
            }
        }) as any
);
