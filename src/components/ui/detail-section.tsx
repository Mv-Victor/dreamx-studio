'use client';

import { ReactNode } from 'react';

interface DetailSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * 详情面板通用 Section 组件
 * 用于画布节点详情面板的分组布局
 */
export function DetailSection({ icon: Icon, label, children, className }: DetailSectionProps) {
  return (
    <div className={`mb-5 ${className || ''}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="h-4 w-4 text-white/40" />
        <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      {children}
    </div>
  );
}
