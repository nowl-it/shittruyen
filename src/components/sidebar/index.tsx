import { cn } from '@/lib/utils';
import useSidebarStore from '@/store/sidebar';
import Left from './left';
import Right from './right';

export default function Sidebar() {
    const isActive = useSidebarStore((state) => state.isActive);

    return (
        <aside
            className='sticky left-0 top-9 flex h-aside w-fit flex-row items-center justify-center bg-primary-foreground bg-clip-padding text-primary z-40'
        >
            <Left />
            <Right />
        </aside>
    );
}
