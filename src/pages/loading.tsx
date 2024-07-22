import { VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

export interface LoadingProps
    extends HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
    return (
        <div className="size-full content-center text-center col-span-full row-span-full" ref={ref}>
            <h1 className="text-2xl">Cuttruyen Is Suck</h1>
        </div>
    );
})

export default Loading;
