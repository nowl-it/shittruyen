import getTags from '@/api/tags';
import { TopMangaAPI } from '@/api/top';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel';
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { NewChapterManga, SpotlightManga } from '@/types/home_a';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react/components/useEmblaCarousel';
import { Clock } from 'lucide-react';
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import TimeAgo from 'timeago-react';

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

interface Props {
	pluginConfig: AutoplayOptionsType;
	carouselConfig: CarouselOptions;
	setCurrent?: Dispatch<SetStateAction<number>>;
	className?: string;
	children: ReactNode;
}

export function Genres({ id }: { id: number }) {
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

export function Spotlight({ data }: { data: SpotlightManga[] }) {
	const [current, setCurrent] = useState(0);

	return (
		<CarouselBoilerplate
			carouselConfig={{
				loop: true,
				align: 'center'
			}}
			pluginConfig={{
				delay: 5000,
				stopOnInteraction: true
			}}
			setCurrent={setCurrent}
		>
			<CarouselContent className="-ml-1">
				{data.map((item, index) => (
					<CarouselItem key={item.id} className="basis-5/6 pl-1">
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
			<CarouselPrevious className="left-6 h-16 opacity-0 transition-all group-hover/carousel:opacity-100" />
			<CarouselNext className="right-6 h-16 opacity-0 transition-all group-hover/carousel:opacity-100" />
		</CarouselBoilerplate>
	);
}

export function MangaListCard({ data }: { data: NewChapterManga[] }) {
	const rows = 2;

	return (
		<CarouselBoilerplate
			carouselConfig={{
				loop: false,
				align: 'start',
				slidesToScroll: 5
			}}
			pluginConfig={{
				delay: 5000,
				stopOnInteraction: true
			}}
			className="px-4"
		>
			<CarouselContent rows={rows} rowClassName="basis-1/5">
				{Array.from({
					length: data.length - (data.length % rows)
				}).map((_, index) => {
					const item = data[index];
					return (
						<CarouselItem
							className="opacity-60 transition-opacity duration-300 hover:opacity-100"
							key={item.id}
						>
							<HoverCard>
								<HoverCardTrigger asChild>
									<img src={item.cover_url} alt={item.name} className="size-full rounded-lg" />
								</HoverCardTrigger>
								<HoverCardPortal container={document.body}>
									<HoverCardContent side="right">
										<h1 className="text-lg font-semibold">{item.name}</h1>
										<p className="text-sm">Chapter {item.newest_chapter_number}</p>
										<span className="mr-2 text-sm">
											<Clock size={16} className="mr-1 inline-block" />
											<TimeAgo datetime={item.newest_chapter_created_at} locale="vi" />
										</span>
										<Genres id={item.id} />
										<Button asChild variant="default" className="mt-2 w-fit">
											<Link to={`/manga/${item.id}`}>Đọc ngay</Link>
										</Button>
									</HoverCardContent>
								</HoverCardPortal>
							</HoverCard>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious className="left-0 h-16 opacity-0 transition-all group-hover/carousel:opacity-100" />
			<CarouselNext className="right-0 h-16 opacity-0 transition-all group-hover/carousel:opacity-100" />
		</CarouselBoilerplate>
	);
}

function CarouselBoilerplate({
	pluginConfig = {},
	carouselConfig = {},
	setCurrent = () => {},
	className = '',
	children
}: Props) {
	const plugin = useRef(Autoplay(pluginConfig));
	const [api, setApi] = useState<CarouselApi>();

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
			className={cn('group/carousel relative w-full', className)}
			opts={carouselConfig}
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			setApi={setApi}
		>
			{children}
		</Carousel>
	);
}

export function Top() {
	const [type, setType] = useState<'week' | 'month' | 'all'>('week');

	const { data: top, isSuccess } = useQuery({
		queryKey: ['top', type],
		queryFn: async () =>
			await TopMangaAPI({
				duration: type,
				page: 1,
				per_page: 5
			})
	});

	return (
		<Fragment>
			<Tabs
				defaultValue="week"
				className="mx-auto w-fit"
				onValueChange={(value) => setType(value as 'week' | 'month' | 'all')}
			>
				<TabsList>
					<TabsTrigger value="week">Tuần</TabsTrigger>
					<TabsTrigger value="month">Tháng</TabsTrigger>
					<TabsTrigger value="all">Tất cả</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="relative w-full">
				{isSuccess ? (
					top.map((item, index) => (
						<div key={item.id} className="w-32 overflow-hidden rounded-lg">
							<img src={item.cover_url} alt={item.name} className="w-full" />
						</div>
					))
				) : (
					<p>Đang tải...</p>
				)}
			</div>
		</Fragment>
	);
}
