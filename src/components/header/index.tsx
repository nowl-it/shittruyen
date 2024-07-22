'use client';

import useLoadingStore from '@/store/loading';
import { useEffect, useLayoutEffect } from 'react';
import Center from './center';
import Left from './left';
import Right from './right';

export default function Header() {
    const { isLoading, setIsLoading } = useLoadingStore();

    if (isLoading) return null;

    return (
        <header className="col-span-full sticky left-0 right-0 top-0 z-50 grid h-navbar w-full grid-cols-12 gap-4 bg-background/75 bg-clip-padding px-8 py-1 shadow-md backdrop-blur-xl backdrop-filter">
            <Left />
            <Center />
            <Right />
        </header>
    );
}
