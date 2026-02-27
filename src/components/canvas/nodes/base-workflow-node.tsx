'use client';

import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Check, Loader2, Lock, LucideIcon } from 'lucide-react';

interface BaseWorkflowNodeProps {
  data: Record<string, unknown>;
  selected: boolean;
  icon: LucideIcon;
  iconColor: string;
}

export function BaseWorkflowNode({ data, selected, icon: Icon, iconColor }: BaseWorkflowNodeProps) {
  const status = data.status as string;
  const locked = data.locked as boolean;
  const label = data.label as string;
  const description = data.description as string;

  const StatusIcon = status === 'completed' ? Check : status === 'active' ? Loader2 : Lock;
  const statusColor = status === 'completed' ? 'text-green-500' : status === 'active' ? 'text-[#FF4D4D]' : 'text-white/30';
  const statusBg = status === 'completed' ? 'bg-green-500/15' : status === 'active' ? 'bg-[rgba(255,77,77,0.15)]' : 'bg-white/5';
  const borderClass = selected 
    ? 'border-[rgba(192,3,28,0.80)] shadow-lg shadow-[rgba(192,3,28,0.25)]' 
    : locked ? 'border-white/5' : 'border-white/10';
  const bgClass = locked ? 'bg-white/[0.02]' : 'bg-[#0a0a0a]';

  return (
    <div className={cn(
      'w-[240px] rounded-xl border px-4 py-3.5 transition-all duration-200',
      borderClass,
      bgClass,
      status === 'active' && 'animate-pulse-glow'
    )}>
      <Handle type="target" position={Position.Top} className="!bg-[#C0031C] !w-2.5 !h-2.5 !border-2 !border-[#0a0a0a]" />
      
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
      
      <Handle type="source" position={Position.Bottom} className="!bg-[#C0031C] !w-2.5 !h-2.5 !border-2 !border-[#0a0a0a]" />
    </div>
  );
}
