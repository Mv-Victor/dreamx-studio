'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'accent' | 'outline';
  className?: string;
}

/**
 * Badge 组件
 * default: 红色背景 + 红色文字（主角/已选择等）
 * secondary: 白色/5 背景 + 白色/40 文字
 * accent: 红色强调
 * outline: 边框 + 白色/40 文字
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
        {
          'bg-[rgba(192,3,28,0.20)] text-[#FF4D4D]': variant === 'default',
          'bg-white/5 text-white/40': variant === 'secondary',
          'bg-[rgba(255,77,77,0.20)] text-[#FF4D4D]': variant === 'accent',
          'border border-white/15 text-white/40': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
