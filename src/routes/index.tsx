import { HomeAPI } from '@/api/home';
import { Skeleton } from '@/components/ui/skeleton';
import { MangaListCard, Spotlight } from '@/pages/home';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const Route = createFileRoute('/')({
	loader: HomeAPI,
	pendingComponent: () => <Skeleton className="mx-auto h-80 w-4/5" />,
	errorComponent: ({ error }) => {
		return <div>{error.message}</div>;
	},
	component: Index
});

function Index() {
	const {
		data: { spotlight_mangas, new_chapter_mangas }
	} = Route.useLoaderData();

	return (
		<Fragment>
			<Helmet title="Trang chủ" />
			<section className="mb-6">
				<Spotlight data={spotlight_mangas} />
			</section>

			<section className="mb-6 w-full px-4">
				<h2 className="mb-4 text-2xl font-semibold">Mới cập nhật</h2>
				<MangaListCard data={new_chapter_mangas} />
			</section>
		</Fragment>
	);
}
