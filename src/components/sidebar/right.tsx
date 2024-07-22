import { cn } from '@/lib/utils';
import useSidebarStore from '@/store/sidebar';
import { Bookmark, Home, LogIn, LogOut, Search, Settings, Tag, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Link } from 'react-router-dom';

const iconClasses =
    'transition-all duration-500 opacity-60 stroke-current size-6 hover:opacity-100 hover:stroke-primary';

export default function Right() {
    const { isActive } = useSidebarStore();

    return (
        <div
            className={cn(
                'relative size-full flex-col items-center justify-center border border-l-0 border-primary/40 px-2 py-4 rounded-r-lg',
                isActive ? 'flex' : 'hidden'
            )}
        >
            <TooltipProvider>
                <ul className="size-full space-y-3">
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/">
                                    <Home className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Trang chủ</TooltipContent>
                        </li>
                    </Tooltip>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/search">
                                    <Search className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Tìm kiếm</TooltipContent>
                        </li>
                    </Tooltip>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/tag" >
                                    <Tag className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Thể loại</TooltipContent>
                        </li>
                    </Tooltip>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/bookmark" >
                                    <Bookmark className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Đánh dấu</TooltipContent>
                        </li>
                    </Tooltip>
                </ul>
                <ul className='w-full space-y-3'>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/auth/sign-in" >
                                    <LogIn className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Đăng nhập</TooltipContent>
                        </li>
                    </Tooltip>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/setting/account" >
                                    <User className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Tài khoản</TooltipContent>
                        </li>
                    </Tooltip>
                    <Tooltip>
                        <li>
                            <TooltipTrigger>
                                <Link to="/setting/general" >
                                    <Settings className={iconClasses} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Cài đặt</TooltipContent>
                        </li>
                    </Tooltip>
                </ul>
            </TooltipProvider>
        </div>
    );
}
