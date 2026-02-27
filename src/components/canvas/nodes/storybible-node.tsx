'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { BookOpen, Check, Loader2, Lock } from 'lucide-react';

export function StoryBibleNode({ data, selected }: NodeProps) {
  const d = data as Record<string, unknown>;
  const status = d.status as string;

  const StatusIcon = status === 'completed' ? Check : status === 'active' ? Loader2 : Lock;
  const iconClass = status === 'completed' ? 'text-green-500' : status === 'active' ? 'text-primary animate-spin' : 'text-muted-foreground';
  const bgClass = status === 'completed' ? 'bg-green-500/20' : status === 'active' ? 'bg-primary/20' : 'bg-muted';

  return (
    <div className={cn(
      'w-[220px] rounded-xl border-2 bg-node-bg px-4 py-3 transition-all',
      selected ? 'border-primary shadow-lg shadow-primary/20' : 'border-node-border',
      status === 'active' && 'animate-pulse-glow'
    )}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-1">
        <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', bgClass)}>
          <StatusIcon className={cn('h-3.5 w-3.5', iconClass)} />
        </div>
        <BookOpen className="h-4 w-4 text-orange-400" />
        <span className="text-sm font-medium text-foreground">{d.label as string}</span>
      </div>
      <p className="text-xs text-muted-foreground ml-8">{d.description as string}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
