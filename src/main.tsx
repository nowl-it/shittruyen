import ThemeConfig from 'global/themes.conf.json';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/globals.css';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import Root from './root';

const { general, resource } = ThemeConfig;
const { theme: defaultTheme } = general.default;
const { themes } = resource;

const router = createBrowserRouter([
	{
		path: '*',
		element: <Root />
	}
]);

createRoot(document.getElementById('__shittruyen') as HTMLElement).render(
	<StrictMode>
		<HelmetProvider>
			<ThemeProvider
				defaultTheme={defaultTheme.value}
				themes={themes.map((theme: any) => theme.value)}
				attribute="class"
			>
				<RouterProvider router={router} />
			</ThemeProvider>
		</HelmetProvider>
	</StrictMode>
);
