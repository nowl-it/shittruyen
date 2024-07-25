import Loading from '@/pages/loading';
import useLoadingStore from '@/store/loading';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import useSEOStore from '../store/seo';
import Header from './header';
import Sidebar from './sidebar';

export default function Wrapped() {
	const isLoading = useLoadingStore((state) => state.isLoading);
	const { setState } = useSEOStore();

	if (isLoading) return <Loading />;

	return (
		<Fragment>
			<Helmet defaultTitle="Trang Chủ" prioritizeSeoTags onChangeClientState={(newState) => setState(newState)} />
			<Header />
			<main className="relative flex size-full min-h-full flex-row items-stretch justify-stretch p-navbar">
				<Sidebar />
				<article className="size-full min-h-full p-8">
					<Outlet />
				</article>
			</main>
		</Fragment>
	);
}
