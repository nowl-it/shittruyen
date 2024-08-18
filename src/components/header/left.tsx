import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon, ArrowRightIcon, Home, RefreshCw } from 'lucide-react';

const classes =
	'size-4 cursor-pointer opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100 active:scale-75 stroke-primary';

function reload(): void {
	window.location.reload();
}

export default function Left() {
	const { history } = useRouter();
	const { back, forward } = history;

	return (
		<div className="col-span-3 flex h-full w-full flex-row items-center justify-center gap-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<RefreshCw className={cn(classes, 'hover:rotate-90 active:rotate-180')} onClick={reload} />
					</TooltipTrigger>
					<TooltipContent align="start">Làm mới trang</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger className="mr-auto">
						<Link to="/">
							<Home className={classes} />
						</Link>
					</TooltipTrigger>
					<TooltipContent align="start">Trang chủ</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<ArrowLeftIcon className={classes} onClick={() => back()} />
					</TooltipTrigger>
					<TooltipContent>Quay lại trang trước</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<ArrowRightIcon className={classes} onClick={() => forward()} />
					</TooltipTrigger>
					<TooltipContent>Tiến lên trang kế</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
