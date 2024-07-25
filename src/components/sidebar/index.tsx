import useSidebarStore from '@/store/sidebar';
import { motion } from 'framer-motion';
import Left from './left';
import Right from './right';

export default function Sidebar() {
	const { isActive, changeStatus } = useSidebarStore();

	return (
		<motion.aside
			className="sticky left-0 top-9 z-40 flex h-aside min-w-16 flex-row items-center justify-start overflow-hidden bg-secondary bg-clip-padding text-primary shadow-lg"
			initial={{ x: -300 }}
			animate={{
				x: 0,
				width: isActive ? '8.7rem' : '4rem',
				transition: {
					duration: isActive ? 0.2 : 0.5
				}
			}}
			exit={{ x: -300 }}
			transition={{ duration: 0.3 }}
			onMouseEnter={() => changeStatus(true)}
			onMouseLeave={() => changeStatus(false)}
		>
			<Left />
			<Right />
		</motion.aside>
	);
}
