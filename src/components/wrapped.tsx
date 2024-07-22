'use client';

import { cn } from '@/lib/utils';
import useLoadingStore from '@/store/loading';
import useThemeStore from '@/store/theme';
import { useTheme } from 'next-themes';
import { Fragment, ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { log } from 'console';
import Loading from '@/pages/loading';

interface Props {
    children: ReactNode;
    className?: string;
    metadata?: {
        title: string;
        description: string;
    };
}

export default function Wrapped(props: Props) {
    const { children, className = '', metadata } = props;

    const { isLoading, setIsLoading } = useLoadingStore((state) => state);
    const { theme } = useTheme();
    const { setTheme } = useThemeStore();

    const helmetRef = useRef(null);
    const helmetContext = {};

    function handleRouteChange() {
        if (helmetRef && helmetRef.current) setIsLoading(false);
        if (theme) setTheme(theme);
    }

    useEffect(() => {
        const timeOut = setTimeout(handleRouteChange, 1000)

        return () => {
            setIsLoading(true);
            clearTimeout(timeOut)
        };
    }, [helmetRef]);

    return (
        <Fragment>
            <Helmet ref={helmetRef} defaultTitle='Cứt Truyện'>
                {metadata &&
                    <Fragment>
                        <title>{metadata.title}</title>
                        <meta name="description" content={metadata.description} />
                        <meta property="og:title" content={metadata.title} />
                        <meta property="og:description" content={metadata.description} />
                        <meta name="twitter:title" content={metadata.title} />
                        <meta name="twitter:description" content={metadata.description} />
                    </Fragment>
                }
            </Helmet>
            {!isLoading ?
                <Fragment>
                    <Header />
                    <Sidebar />
                    <main className="relative size-full min-h-full col-span-ful">
                        <article className={cn('size-full min-h-full p-8', className)}>{children}</article>
                    </main>
                </Fragment>
                : <Loading />}
        </Fragment>
    );
}
