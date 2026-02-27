'use client';

import { cn } from '@/lib/utils';
import { Check, Loader2, Lock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'completed' | 'generating' | 'pending';
  className?: string;
}

/**
 * 状态 Badge 组件
 * completed: 绿色 + ✓
 * generating: 红色 + 转圈动画
 * pending: 灰色 + Lock 图标
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (status === 'completed') {
    return (
      <span className={cn('inline-flex items-center gap-1 text-[10px] text-green-500', className)}>
        <Check className="h-2.5 w-2.5" />
        完成
      </span>
    );
  }
  if (status === 'generating') {
    return (
      <span className={cn('inline-flex items-center gap-1 text-[10px] text-[#FF4D4D]', className)}>
        <Loader2 className="h-2.5 w-2.5 animate-spin" />
        生成中
      </span>
    );
  }
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] text-white/40', className)}>
      <Lock className="h-2.5 w-2.5" />
      待生成
    </span>
  );
}
