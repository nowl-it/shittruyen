import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Welcome from '@/components/welcome';
import { cn } from '@/lib/utils';
import useSEOStore from '@/store/seo';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const isWelcomeDone = localStorage.getItem('welcome');

export const Route = createRootRoute({
	component: isWelcomeDone ? Root : Welcome,
	beforeLoad: async () => {
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
});

export const RootContext = createContext<{
	className: string;
	setClassName: (className: string) => void;
}>({
	className: '',
	setClassName: () => {}
});

function Root() {
	const { status } = useRouterState();
	const { setState } = useSEOStore();
	const [className, setClassName] = useState('');

	useEffect(() => {
		if (status === 'pending') setClassName('');
	}, [status]);

	return (
		<RootContext.Provider
			value={{
				className,
				setClassName
			}}
		>
			<Helmet defaultTitle="Trang Chủ" prioritizeSeoTags onChangeClientState={(newState) => setState(newState)} />
			<Header />
			<Base />
		</RootContext.Provider>
	);
}

function Base() {
	const { className } = useContext(RootContext);
	return (
		<main className="relative min-h-full w-full pl-16">
			<Sidebar />
			<article className={cn('min-h-full w-full py-4', className)}>
				<Outlet />
			</article>
		</main>
	);
}
