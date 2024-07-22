import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme';
import themeSettings from 'global/themes.conf.json';
import { BellIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const themes = themeSettings.resource.themes;

const notification = [];

const IconClasses = 'size-4 cursor-pointer transition-all duration-300 stroke-primary fill-transparent';

export default function Right() {
	const [open, setOpen] = useState(false);
	const { theme: NextTheme, setTheme: setNextTheme } = useTheme();
	const { setTheme, getTheme } = useThemeStore();

	return (
		<div className="col-span-3 flex size-full flex-row items-center justify-end gap-x-4">
			<TooltipProvider>
				<Tooltip>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="size-full w-full justify-between py-0"
								>
									<p className="line-clamp-1 w-full whitespace-pre-line text-start">
										{getTheme().name}
									</p>
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</TooltipTrigger>
						</PopoverTrigger>
						<PopoverContent className="w-fit p-0" align="end">
							<Command>
								<CommandInput placeholder="Tìm kiếm chủ đề..." />
								<CommandEmpty>Không tìm thấy chủ đề.</CommandEmpty>
								<CommandGroup>
									<CommandList>
										{themes.map((theme) => (
											<CommandItem
												key={theme.value}
												value={theme.value}
												onSelect={(currentValue) => {
													setTheme(currentValue, setNextTheme);
													setOpen(false);
												}}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														NextTheme === theme.value ? 'opacity-100' : 'opacity-0'
													)}
												/>
												{theme.name}
											</CommandItem>
										))}
									</CommandList>
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<TooltipContent>Chủ đề</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<Link to="/notification">
							<div className="relative">
								<BellIcon className={cn(IconClasses, 'hover:fill-primary')} />
								{notification.length > 0 && (
									<div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-400"></div>
								)}
							</div>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="bottom" align="end">
						{notification.length > 0
							? `Bạn có ${notification.length} thông báo mới`
							: 'Không có thông báo mới'}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
