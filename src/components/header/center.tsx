import {
	CommandDescription,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from '@/components/ui/command';
import { DialogTitle } from '@/components/ui/dialog';
import Kbd from '@/components/ui/kbd';
import { cn } from '@/lib/utils';
import useSEOStore from '@/store/seo';
import { useNavigate } from '@tanstack/react-router';
import { Home, SearchIcon, Settings } from 'lucide-react';
import { Fragment, useState } from 'react';

const PLACEHOLDER_TEXT = 'Tìm kiếm nhanh...';

type DialogListType = {
	heading: string;
	items: {
		icon: any;
		title: string;
		shortcut?: string[];
		href: string;
	}[];
};

const DialogList: DialogListType[] = [
	{
		heading: 'Gợi ý',
		items: []
	},
	{
		heading: 'Trang',
		items: [
			{
				icon: Home,
				title: 'Trang chủ',
				href: '/'
			}
		]
	},
	{
		heading: 'Cài đặt',
		items: [
			{
				icon: Settings,
				title: 'Settings',
				href: '/setting/general',
				shortcut: ['⌘', 'S']
			}
		]
	}
];

export default function Center() {
	const [searchText, setSearchText] = useState('');
	const [open, setOpen] = useState(false);

	const navigation = useNavigate();

	function handleCommandItem(to: string) {
		navigation({ to }).then(() => setOpen(false));
	}

	const { title } = useSEOStore();

	return (
		<label className="relative col-span-6 size-full">
			<div
				className="flex size-full cursor-text items-center justify-center gap-1 rounded-md border border-input bg-background text-sm ring-offset-background"
				onClick={() => setOpen(true)}
			>
				<SearchIcon className={cn('size-4', !searchText && 'stroke-gray-400')} />
				<span className="max-w-[80%] truncate">{searchText || title}</span>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder={PLACEHOLDER_TEXT}
					onValueChange={(search) => setSearchText(search)}
					value={searchText}
				/>
				<DialogTitle className="hidden">{searchText || title}</DialogTitle>
				<CommandDescription className="text-gray-400">
					Bạn có thể nhấn <Kbd>Esc</Kbd> hoặc{' '}
					<span className="!font-semibold text-primary">nhấn ra ngoài</span> để đóng.
				</CommandDescription>
				<CommandList>
					<CommandEmpty>Không có kết quả tìm kiếm.</CommandEmpty>
					{DialogList.map((group, index) => (
						<Fragment key={index}>
							<CommandGroup heading={group.heading}>
								{group.items.map((item, index) => (
									<CommandItem
										key={index}
										value={item.href}
										className="cursor-pointer"
										onSelect={handleCommandItem}
									>
										<item.icon className="mr-2 h-4 w-4" />
										<span>{item.title}</span>
										{item.shortcut && (
											<CommandShortcut className="space-x-1">
												{item.shortcut.map((key, index) => (
													<Kbd key={index}>{key}</Kbd>
												))}
											</CommandShortcut>
										)}
									</CommandItem>
								))}
							</CommandGroup>
							{index !== DialogList.length - 1 && <CommandSeparator />}
						</Fragment>
					))}
				</CommandList>
			</CommandDialog>
		</label>
	);
}
