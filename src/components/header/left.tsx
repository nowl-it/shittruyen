import { cn } from '@/lib/utils';
import useLoadingStore from '@/store/loading';
import { ArrowLeftIcon, ArrowRightIcon, Home, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

const classes =
    'size-4 cursor-pointer opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100 active:scale-75 stroke-primary';

export default function Left() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoadingStore();

    async function handleClick(control?: any) {
        setIsLoading(true);
        if (control) control();
        setIsLoading(false);
    }
    return (
        <div className="col-span-3 flex h-full w-full flex-row items-center justify-center gap-x-1">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <RefreshCw
                            className={cn(classes, 'hover:rotate-90 active:rotate-180')}
                            onClick={() => handleClick()}
                        />
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
                        <ArrowLeftIcon className={classes} onClick={() => handleClick(navigate(-1))} />
                    </TooltipTrigger>
                    <TooltipContent>Quay lại trang trước</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <ArrowRightIcon className={classes} onClick={() => handleClick(navigate(1))} />
                    </TooltipTrigger>
                    <TooltipContent>Tiến lên trang kế</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
