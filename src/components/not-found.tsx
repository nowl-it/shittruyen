import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { createLazyFileRoute } from '@tanstack/react-router';
import Info from 'global/info.json';
import { Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react/jsx-runtime';

type Chat = {
	name: 'CuuTruyenTranh' | '9OwL';
	message: string;
	type: 'message' | 'reply';
};

export const metadata = {
	title: 'Trang không tồn tại',
	description: 'Trang này khong tồn tại hoặc đã bị xóa.'
};

const messageClasses = 'rounded-lg p-2 bg-secondary text-secondary-foreground';
const replyClasses = 'rounded-lg bg-blue-500 p-2 text-white';

const chat: Chat[] = [
	{
		name: 'CuuTruyenTranh',
		message: 'má tháng này phải làm cho được cái figma',
		type: 'message'
	},
	{
		name: 'CuuTruyenTranh',
		message: 'không làm được là con chó.',
		type: 'message'
	},
	{
		name: '9OwL',
		message: 'Hóng kèo :))',
		type: 'reply'
	}
];

export const Route = createLazyFileRoute('/not-found')({
	component: NotFound
});

export default function NotFound() {
	return (
		<Fragment>
			<Helmet prioritizeSeoTags async title="Trang không tồn tại" />
			<section className="size-full content-center">
				<div className="text-center">
					<h1 className="text-9xl font-extrabold text-primary">4O4</h1>
					<p className="text-2xl font-medium text-primary/80">Trang không tồn tại.</p>
				</div>
				<div className="my-8 w-full text-center">
					<p className="text-current/70 mb-4">Nhưng có cái này tồn tại...</p>
					<div className="mx-auto h-px max-w-2xl bg-primary"></div>
				</div>
				<div className="mx-auto max-w-2xl space-y-2">
					{chat.map((c, index) => (
						<div
							key={index}
							className={cn(
								'flex items-end space-x-2',
								c.type === 'reply' && 'flex-row-reverse space-x-reverse'
							)}
						>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Avatar className="border border-primary/40">
										<AvatarImage src={Info[c.name].avatar} />
										<AvatarFallback>{c.name}</AvatarFallback>
									</Avatar>
								</HoverCardTrigger>
								<HoverCardContent className="w-80">
									<div className="flex flex-row-reverse justify-between space-x-4">
										<Avatar className="border border-primary/60">
											<AvatarImage src={Info[c.name].avatar} />
											<AvatarFallback>{c.name}</AvatarFallback>
										</Avatar>
										<div className="space-y-1">
											<h4 className="text-sm font-semibold">@{c.name}</h4>
											<p className="text-sm">{Info[c.name].description}</p>
											<div className="flex items-center pt-2">
												<Mail className="mr-2 h-4 w-4 opacity-70" />{' '}
												<span className="text-xs text-muted-foreground">
													{Info[c.name].mail}
												</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
							<div className={c.type === 'message' ? messageClasses : replyClasses}>
								<p className="text-sm text-current">{c.message}</p>
							</div>
						</div>
					))}
				</div>
				<div className="my-8 w-full text-center">
					<div className="mx-auto h-px max-w-2xl bg-primary"></div>
					<p className="text-current/70 mt-4 italic">
						Anh ấy đã sủa, <span className="text-xl text-primary">khá</span> nhiều 🐧
					</p>
				</div>
			</section>
		</Fragment>
	);
}
