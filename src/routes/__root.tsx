import Header from '@/components/header';
import Loading from '@/components/loading';
import NotFound from '@/components/not-found';
import Sidebar from '@/components/sidebar';
import useLoadingStore from '@/store/loading';
import useSEOStore from '@/store/seo';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react/jsx-runtime';
import Welcome from './welcome.lazy';

const isWelcomeDone = localStorage.getItem('welcome');

export const Route = createRootRoute({
	component: isWelcomeDone ? Root : Welcome,
	notFoundComponent: NotFound
});

function Root() {
	const { isLoading, setIsLoading } = useLoadingStore();
	const { setState } = useSEOStore();

	useLayoutEffect(() => {
		setIsLoading(true);
		const _timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => {
			setIsLoading(false);
			clearTimeout(_timeout);
		};
	}, []);

	if (isLoading) return <Loading />;

	return (
		<Fragment>
			<Helmet defaultTitle="Trang Chủ" prioritizeSeoTags onChangeClientState={(newState) => setState(newState)} />
			<Header />
			<main className="relative flex min-h-full w-full flex-row items-stretch justify-stretch p-navbar">
				<Sidebar />
				<article className="min-h-full w-full px-8 py-4">
					<Outlet />
				</article>
			</main>
			<TanStackRouterDevtools />
		</Fragment>
	);
}
