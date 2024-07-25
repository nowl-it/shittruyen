import { cn } from '@/lib/utils';
import { Bookmark, Home, LogIn, Search, Settings, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const iconClasses =
	'transition-all duration-500 opacity-60 stroke-primary size-6 scale-90 hover:scale-100 hover:opacity-100';

export default function Right() {
	return (
		<div className="relative flex h-full w-14 flex-col items-center justify-center border-x p-4">
			<TooltipProvider>
				<ul className="h-full space-y-3">
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/">
									<Home className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Trang chủ</TooltipContent>
						</li>
					</Tooltip>
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/search">
									<Search className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Tìm kiếm</TooltipContent>
						</li>
					</Tooltip>
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/tag">
									<Tag className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Thể loại</TooltipContent>
						</li>
					</Tooltip>
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/bookmark">
									<Bookmark className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Đánh dấu</TooltipContent>
						</li>
					</Tooltip>
				</ul>
				<ul className="w-full space-y-3">
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/auth/sign-in">
									<LogIn className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Đăng nhập</TooltipContent>
						</li>
					</Tooltip>
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/setting/account">
									<User className={iconClasses} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Tài khoản</TooltipContent>
						</li>
					</Tooltip>
					<Tooltip>
						<li>
							<TooltipTrigger asChild>
								<Link to="/setting/general">
									<Settings className={cn(iconClasses, 'hover:rotate-90')} />
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
