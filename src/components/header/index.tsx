import { motion } from 'framer-motion';
import Center from './center';
import Left from './left';
import Right from './right';

export default function Header() {
	return (
		<motion.header
			className="sticky left-0 right-0 top-0 z-50 grid h-9 w-full grid-cols-12 gap-4 bg-background/45 bg-clip-padding px-8 py-1 shadow-md backdrop-blur-xl backdrop-filter"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			exit={{ y: -100 }}
			transition={{ duration: 0.2 }}
		>
			<Left />
			<Center />
			<Right />
		</motion.header>
	);
}
