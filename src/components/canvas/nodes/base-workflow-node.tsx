'use client';

import React, { useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Check, Loader2, Lock, LucideIcon } from 'lucide-react';
import { BaseWorkflowNodeData, NodeStatus } from '@/types/canvas';

interface BaseWorkflowNodeProps {
  data: BaseWorkflowNodeData;
  selected: boolean;
  icon: LucideIcon;
  iconColor: string;
}

const BaseWorkflowNodeComponent = function BaseWorkflowNode({ 
  data, 
  selected, 
  icon: Icon, 
  iconColor 
}: BaseWorkflowNodeProps) {
  const status = data.status;
  const locked = data.locked ?? false;
  const label = data.label;
  const description = data.description;

  // 缓存 status 相关的计算结果
  const statusConfig = useMemo(() => {
    const config: Record<NodeStatus, { icon: LucideIcon; color: string; bg: string }> = {
      completed: { icon: Check, color: 'text-green-500', bg: 'bg-green-500/15' },
      active: { icon: Loader2, color: 'text-[var(--drama-red-active)]', bg: 'bg-[var(--drama-red-bg)]' },
      pending: { icon: Lock, color: 'text-white/30', bg: 'bg-white/5' },
    };
    return config[status] || config.pending;
  }, [status]);

  const StatusIcon = statusConfig.icon;
  const statusColor = statusConfig.color;
  const statusBg = statusConfig.bg;

  const borderClass = selected 
    ? 'border-[var(--drama-red-border)] shadow-lg shadow-[rgba(192,3,28,0.25)]' 
    : locked 
      ? 'border-[var(--drama-border)]' 
      : 'border-[var(--drama-border)]';
  
  const bgClass = locked ? 'bg-[var(--drama-bg-secondary)]' : 'bg-[var(--drama-bg-primary)]';

  return (
    <div className={cn(
      'w-[240px] rounded-xl border-[1.5px] px-4 py-3.5 transition-all duration-200',
      borderClass,
      bgClass,
      status === 'active' && 'animate-pulse-glow'
    )}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-[var(--drama-red)] !w-2.5 !h-2.5 !border-2 !border-[var(--drama-bg-primary)]" 
      />
      
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2">
        {/* Status Icon */}
        <div className={cn('w-7 h-7 rounded-full flex items-center justify-center transition-colors', statusBg)}>
          <StatusIcon className={cn('h-4 w-4', statusColor)} strokeWidth={2.5} />
        </div>
        
        {/* Node Icon */}
        <Icon className={cn('h-4 w-4 opacity-80', iconColor)} />
        
        {/* Label */}
        <span className="text-sm font-semibold text-white/90">{label}</span>
      </div>
      
      {/* Description */}
      <p className="text-xs text-white/50 leading-relaxed">{description}</p>
      
      {/* Locked Hint */}
      {locked && (
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5">
          <Lock className="h-3 w-3 text-white/20" />
          <p className="text-[10px] text-white/20">完成上一步后解锁</p>
        </div>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-[var(--drama-red)] !w-2.5 !h-2.5 !border-2 !border-[var(--drama-bg-primary)]" 
      />
    </div>
  );
};

// 使用 React.memo 避免不必要的重渲染
export const BaseWorkflowNode = React.memo(BaseWorkflowNodeComponent);
BaseWorkflowNode.displayName = 'BaseWorkflowNode';
