import { HomeAPI } from '@/api/home';
import { Spinner } from '@/components/ui/spinner';
import { MangaListCard, Spotlight, Top } from '@/pages/home';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Crown } from 'lucide-react';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const Route = createFileRoute('/')({
	component: Index,
	loader: HomeAPI,
	pendingComponent: Spinner
});

function Index() {
	const { useLoaderData } = Route;

	const {
		data: { spotlight_mangas, new_chapter_mangas }
	} = useLoaderData();

	return (
		<Fragment>
			<Helmet title="Trang chủ" />
			<section className="mb-6">
				<Spotlight data={spotlight_mangas} />
			</section>

			<section className="mb-6 w-full px-4">
				<div className="mb-4 flex w-full flex-row items-end justify-between">
					<h2 className="text-2xl font-semibold">Mới cập nhật</h2>
					<Link
						to="/newest"
						className="font-medium text-primary/40 transition-colors hover:text-primary hover:underline"
					>
						Xem thêm
					</Link>
				</div>
				<MangaListCard data={new_chapter_mangas} />
			</section>

			<section className="mb-6 mt-24 w-full px-4">
				<div className="relative mx-auto mb-4 flex w-fit flex-row items-center justify-center gap-x-2">
					<Crown className="size-7 stroke-yellow-400" />
					<h2 className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-4xl font-semibold text-transparent">
						Truyện nổi bật
					</h2>
					<Crown className="size-7 stroke-yellow-400" />
				</div>
				<Top />
			</section>
		</Fragment>
	);
}
