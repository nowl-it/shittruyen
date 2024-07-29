import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const BookmarkItemClasses = 'size-10 cursor-pointer content-center rounded-full border border-dashed border-primary';

export default function Left() {
	const bookmark: any[] = [];

	return (
		<div className="flex h-full w-16 flex-none flex-col items-center justify-center px-2 py-4">
			<TooltipProvider>
				<ScrollArea className="size-full">
					<ul className="flex size-full flex-col items-center justify-start">
						{bookmark.length ? (
							bookmark.map((item, index) => (
								<li key={index} className={BookmarkItemClasses}>
									{item.icon}
								</li>
							))
						) : (
							<Tooltip>
								<TooltipTrigger asChild>
									<li className={cn(BookmarkItemClasses, 'cursor-help')}>
										<Bookmark className="mx-auto size-4 stroke-primary" />
									</li>
								</TooltipTrigger>
								<TooltipContent side="right">Bạn chưa đánh dấu truyện nào!</TooltipContent>
							</Tooltip>
						)}
					</ul>
				</ScrollArea>
			</TooltipProvider>
		</div>
	);
}
