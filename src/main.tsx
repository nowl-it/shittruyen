import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeConfig from '@global/themes.conf.json';
import App from '@/App';

import '@/globals.css';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';

const { general, resource } = ThemeConfig;
const { theme: defaultTheme } = general.default;
const { themes } = resource;

createRoot(document.getElementById('__shittruyen') as HTMLElement).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider
                defaultTheme={defaultTheme.value}
                themes={themes.map((theme: any) => theme.value)}
                attribute="class"
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>
);
