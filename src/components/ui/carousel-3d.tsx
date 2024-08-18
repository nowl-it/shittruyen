import { cn } from '@/lib/utils';
import { AnimationControls, motion, MotionProps, TargetAndTransition, VariantLabels } from 'framer-motion';
import { createContext, forwardRef, HTMLAttributes, ReactNode, useCallback, useContext, useState } from 'react';

export interface Carousel3DProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode[];
}

type Carousel3DContextProps = {
	handleCurrent: (index: number) => void;
	animate: (index: number) => boolean | VariantLabels | AnimationControls | TargetAndTransition | undefined;
	current: number;
};

const Carousel3DContext = createContext<Carousel3DContextProps | null>(null);
const { Provider: Carousel3DContextProvider } = Carousel3DContext;

function useCarousel3D() {
	const context = useContext(Carousel3DContext);

	if (!context) {
		throw new Error('useCarousel3D must be used within a <Carousel3D />');
	}

	return context;
}

export const Carousel3D = forwardRef<HTMLDivElement, Carousel3DProps>(({ children, ...props }, ref) => {
	if (children.length % 2 === 0) throw new Error('Data length must be an odd number');

	const cleanPositions = useCallback(() => Array.from({ length: children.length }, (_, i) => i), [children.length]);

	const [indexPositions, setIndexPositions] = useState(cleanPositions);
	const [current, setCurrent] = useState(0);

	const handleCurrent = useCallback(
		(index: number) => {
			const dataLength = indexPositions.length;
			const newPositions = Array.from({ length: dataLength }, (_, i) => (i + dataLength - index) % dataLength);

			setCurrent(index);
			setIndexPositions(newPositions);
		},
		[children.length, indexPositions]
	);

	const animate = useCallback(
		(index: number) => {
			if (index === current)
				return {
					x: 0,
					scale: 0.8,
					zIndex: indexPositions.length
				};

			const isLeftSide = indexPositions[index] % 2 !== 0;

			return {
				x: (20 + 15 * Math.round(indexPositions[index] / 2)) * (isLeftSide ? -1 : 1) + '%',
				scale: 0.75 - 0.05 * Math.round(indexPositions[index] / 2),
				zIndex: indexPositions.length - indexPositions[index]
			};
		},
		[current, indexPositions]
	);

	return (
		<Carousel3DContextProvider
			value={{
				handleCurrent,
				animate,
				current
			}}
		>
			<div className="flex h-full w-full flex-row items-center justify-center" {...props} ref={ref}>
				{children}
			</div>
		</Carousel3DContextProvider>
	);
});

export interface Carousel3DItemProps extends HTMLAttributes<HTMLDivElement> {
	index: number;
}

export const Carousel3DItem = forwardRef<HTMLDivElement, Carousel3DItemProps & MotionProps>(
	({ index, className, ...props }, ref) => {
		const { current, handleCurrent, animate } = useCarousel3D();

		return (
			<motion.div
				data-index={index}
				className={cn(current === index ? 'relative' : 'absolute', className)}
				animate={animate(index)}
				transition={{ duration: 0.5 }}
				onClick={() => handleCurrent(index)}
				ref={ref}
				{...props}
			/>
		);
	}
);
