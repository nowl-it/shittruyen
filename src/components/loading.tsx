import { forwardRef, HTMLAttributes } from 'react';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
	return (
		<div className="h-screen w-full content-center text-center" ref={ref} {...props}>
			<h1 className="text-4xl">Cứt Truyện rác vcl 🐧</h1>
		</div>
	);
});

export default Loading;
