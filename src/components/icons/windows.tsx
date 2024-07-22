import { forwardRef } from 'react';
import { IconProps } from '.';

const WindowsIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
	return (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			width="100"
			height="100"
			viewBox="0 0 50 50"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={0}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M4 4H24V24H4zM26 4H46V24H26zM4 26H24V46H4zM26 26H46V46H26z"></path>
		</svg>
	);
});

WindowsIcon.displayName = 'WindowsIcon';

export default WindowsIcon;
