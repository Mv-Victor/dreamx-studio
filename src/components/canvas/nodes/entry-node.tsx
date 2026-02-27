'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import type { EntryNodeData } from '@/types/canvas';

interface EntryNodeProps extends NodeProps {
  data: EntryNodeData;
}

export function EntryNode({ data, selected }: EntryNodeProps) {
  return (
    <div className={cn(
      'w-[240px] rounded-xl border-[1.5px] px-4 py-3.5 transition-all duration-200',
      selected 
        ? 'border-[var(--drama-red-border)] shadow-lg shadow-[rgba(192,3,28,0.25)]' 
        : 'border-[var(--drama-border)]',
      'bg-[var(--drama-bg-primary)]'
    )}>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-[var(--drama-red)] !w-2.5 !h-2.5 !border-2 !border-[var(--drama-bg-primary)]" 
      />
      
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2">
        {/* Status Icon - Entry point indicator */}
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--drama-red-bg)]">
          <Play className="h-4 w-4 text-[var(--drama-red)]" strokeWidth={2.5} />
        </div>
        
        {/* Label */}
        <span className="text-sm font-semibold text-white/90">{data.label}</span>
      </div>
      
      {/* Description */}
      <p className="text-xs text-white/50 leading-relaxed">{data.description}</p>
    </div>
  );
}
