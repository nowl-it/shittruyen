import { cn } from '@/lib/utils';
import useSidebarStore from '@/store/sidebar';
import { Bookmark, ChevronRight } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const BookmarkItemClasses = 'size-10 cursor-pointer content-center rounded-full border border-dashed border-primary';

export default function Left() {
    const { isActive, changeStatus, bookmark } = useSidebarStore();

    return (
        <div className="flex h-full min-w-16 w-16 max-w-16 flex-col items-center justify-center px-2 py-4 border-r border-r-primary/20">
            <TooltipProvider>
                <ScrollArea className="size-full">
                    <ul className="size-full flex flex-col items-center justify-start">
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
                                        <Bookmark className="mx-auto size-4" />
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent side="right">Bạn chưa đánh dấu truyện nào!</TooltipContent>
                            </Tooltip>
                        )}
                    </ul>
                </ScrollArea>
                <Tooltip>
                    <TooltipTrigger>
                        <ChevronRight
                            onClick={() => changeStatus(!isActive)}
                            className={cn(
                                'size-6 cursor-pointer transition-transform duration-300 ease-linear',
                                isActive && 'rotate-180'
                            )}
                        />
                    </TooltipTrigger>
                    <TooltipContent side="right">{!isActive ? 'Mở rộng' : 'Thu nhỏ'}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
