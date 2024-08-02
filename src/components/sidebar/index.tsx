import { motion } from 'framer-motion';
import { useState } from 'react';
import Left from './left';
import Right from './right';

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	return (
		<motion.aside
			className="fixed left-0 top-9 z-40 flex h-aside flex-row items-center justify-start overflow-hidden bg-secondary bg-clip-padding text-primary shadow-lg"
			initial={{ x: -200, width: '4rem', minWidth: '4rem' }}
			animate={{ x: 0, width: open ? '7.5rem' : '4rem', minWidth: open ? '7.5rem' : '4rem' }}
			transition={{ type: 'tween', duration: 0.35 }}
			exit={{ x: -200, width: '4rem' }}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<Left />
			<Right />
		</motion.aside>
	);
}
