'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export function EntryNode({ data, selected }: NodeProps) {
  const d = data as Record<string, string>;
  return (
    <div
      className={cn(
        'w-[200px] rounded-xl border-2 bg-node-bg px-4 py-3 text-center transition-all',
        selected ? 'border-primary shadow-lg shadow-primary/20' : 'border-node-border'
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <Play className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{d.label}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
