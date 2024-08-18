import { cn } from '@/lib/utils';
import { forwardRef, SVGAttributes } from 'react';

export interface SVGProps extends SVGAttributes<SVGSVGElement> {
	className?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SVGProps>(({ className, ...props }, ref) => {
	return (
		<svg
			ref={ref}
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn('animate-spin', className)}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
});
