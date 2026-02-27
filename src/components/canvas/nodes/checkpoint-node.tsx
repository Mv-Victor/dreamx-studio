'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Settings, Check, Loader2 } from 'lucide-react';

export function CheckPointNode({ data, selected }: NodeProps) {
  const d = data as Record<string, unknown>;
  const status = d.status as string;

  return (
    <div
      className={cn(
        'w-[220px] rounded-xl border-2 bg-node-bg px-4 py-3 transition-all',
        selected ? 'border-primary shadow-lg shadow-primary/20' : 'border-node-border',
        status === 'active' && 'animate-pulse-glow'
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-1">
        <div className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center',
          status === 'completed' ? 'bg-green-500/20' : status === 'active' ? 'bg-primary/20' : 'bg-muted'
        )}>
          {status === 'completed' ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : status === 'active' ? (
            <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
          ) : (
            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </div>
        <span className="text-sm font-medium text-foreground">{d.label as string}</span>
      </div>
      <p className="text-xs text-muted-foreground ml-8">{d.description as string}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
