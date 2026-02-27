'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[rgba(192,3,28,0.20)] text-[#FF4D4D] hover:bg-[rgba(192,3,28,0.25)]': variant === 'default',
            'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80': variant === 'secondary',
            'text-white/60 hover:bg-white/5 hover:text-white/80': variant === 'ghost',
            'border border-white/10 bg-transparent hover:bg-white/5 text-white/80': variant === 'outline',
            'bg-destructive text-white hover:bg-destructive/90': variant === 'destructive',
            'bg-[rgba(255,77,77,0.20)] text-[#FF4D4D] hover:bg-[rgba(255,77,77,0.25)]': variant === 'accent',
          },
          {
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-9 w-9 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
