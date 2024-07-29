import '@/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ThemeConfig from 'global/themes.conf.json';
import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { routeTree } from './routeTree.gen';

const { general, resource } = ThemeConfig;
const { theme: defaultTheme } = general.default;
const { themes } = resource;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
const rootElement = document.getElementById('__shittruyen')!;

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<ThemeProvider
						defaultTheme={defaultTheme.value}
						themes={themes.map((theme: any) => theme.value)}
						attribute="class"
					>
						<RouterProvider router={router} />
					</ThemeProvider>
				</HelmetProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}
