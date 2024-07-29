import { HomeAPI } from '@/api/home';
import getTags from '@/api/tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { SpotlightManga } from '@/types/home_a';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const Route = createFileRoute('/')({
	loader: HomeAPI,
	pendingComponent: () => <Skeleton className="h-80 w-full" />,
	errorComponent: ({ error }) => {
		return <div>{error.message}</div>;
	},
	component: Index
});

function Index() {
	const {
		data: { spotlight_mangas }
	} = Route.useLoaderData();

	return (
		<>
			<Helmet title="Trang chủ" />
			<section className="mb-6">
				<Spotlight data={spotlight_mangas} />
			</section>

			<h1>Suck</h1>
		</>
	);
}

function Spotlight({ data }: { data: SpotlightManga[] }) {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCurrent(api.selectedScrollSnap());

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full"
			opts={{
				loop: true
			}}
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			setApi={setApi}
		>
			<CarouselContent>
				{data.map((item, index) => (
					<CarouselItem key={item.id} className="basis-5/6 p-0">
						<figure
							className={cn(
								'relative w-full overflow-hidden rounded-lg',
								current === index ? 'scale-100' : 'scale-95'
							)}
						>
							<img src={item.panorama_url} alt={item.name} className="size-full" />
							{current === index ? (
								<figcaption className="absolute bottom-0 left-0 right-0 top-0 flex size-full flex-col items-stretch justify-end bg-black/60 p-4">
									<h1 className="text-2xl font-semibold text-white">{item.name}</h1>
									<Genres id={item.id} />
									<p className="text-white">{item.description}</p>
									<Button asChild variant="default" className="mt-2 w-fit">
										<Link to={`/manga/${item.id}`}> Đọc ngay</Link>
									</Button>
								</figcaption>
							) : (
								<div className="absolute bottom-0 left-0 right-0 top-0 bg-black/80"></div>
							)}
						</figure>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

function Genres({ id }: { id: number }) {
	const {
		data: genres,
		isFetching,
		isLoading
	} = useQuery({
		queryKey: ['genres', id],
		queryFn: async () => await getTags(id)
	});

	if (isFetching && isLoading) return;

	return (
		<ul className="my-2 flex flex-row flex-wrap gap-x-2 gap-y-1">
			{genres?.map(({ name, slug }, id) => (
				<li key={id}>
					<Badge variant="secondary" asChild className="whitespace-nowrap">
						<Link to={`/tag/${slug}`}>{name}</Link>
					</Badge>
				</li>
			))}
		</ul>
	);
}
