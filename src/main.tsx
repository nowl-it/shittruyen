import '@/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ThemeConfig from 'global/themes.conf.json';
import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import Error from './components/error';
import Loading from './components/loading';
import NotFound from './components/not-found';
import { routeTree } from './routeTree.gen';

timeago.register('vi', vi);

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

const router = createRouter({
    routeTree,
    context: {
        queryClient
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingMs: 1000,
    defaultPendingComponent: Loading,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: Error
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
const rootElement = document.getElementById('__shittruyen')!;

if (!rootElement) {
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
