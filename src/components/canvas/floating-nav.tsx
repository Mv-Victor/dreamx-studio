'use client';

import { useCallback } from 'react';
import { Plus, Minus, Maximize, Nodes, Hand } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

interface FloatingNavProps {
  onAddNode?: () => void;
}

export function FloatingNav({ onAddNode }: FloatingNavProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleFitView = useCallback(() => {
    fitView({ duration: 200 });
  }, [fitView]);

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
      <div className="flex flex-col rounded-xl border border-[var(--drama-border)] bg-[var(--drama-bg-primary)] shadow-lg overflow-hidden">
        <button
          onClick={onAddNode}
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="添加节点"
        >
          <Plus className="h-5 w-5" />
        </button>
        <div className="h-px bg-[var(--drama-border)]" />
        <button
          onClick={handleZoomIn}
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="放大"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="缩小"
        >
          <Minus className="h-5 w-5" />
        </button>
        <button
          onClick={handleFitView}
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="适应视图"
        >
          <Maximize className="h-5 w-5" />
        </button>
        <div className="h-px bg-[var(--drama-border)]" />
        <button
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="节点列表"
        >
          <Nodes className="h-5 w-5" />
        </button>
        <button
          className="p-3 text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors"
          title="拖拽模式"
        >
          <Hand className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}
