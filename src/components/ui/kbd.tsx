import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLElement> { }

const Kbd = forwardRef<HTMLElement, KbdProps>(({ children, className = '', ...props }, ref) => {
    return (
        <kbd
            ref={ref}
            className={cn(
                'pointer-events-none select-none rounded border bg-muted px-2 py-1 text-[10px] !font-semibold leading-none text-muted-foreground',
                className
            )}
            {...props}
        >
            {children}
        </kbd>
    );
});

Kbd.displayName = 'Kbd';

export default Kbd;
