'use client';

import { useCallback } from 'react';
import { Plus, Minus, Maximize, List, Move } from 'lucide-react';
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
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 px-3 py-4 rounded-2xl border border-white/10 bg-[var(--drama-bg-primary)]/80 backdrop-blur-md shadow-lg">
      {/* Add Node */}
      <button
        onClick={onAddNode}
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="添加节点"
      >
        <Plus className="h-5 w-5 text-white/60" />
      </button>

      {/* Divider */}
      <div className="h-px w-6 bg-white/10" />

      {/* Zoom Controls */}
      <button
        onClick={handleZoomIn}
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="放大"
      >
        <Plus className="h-5 w-5 text-white/60" />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="缩小"
      >
        <Minus className="h-5 w-5 text-white/60" />
      </button>
      <button
        onClick={handleFitView}
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="适应视图"
      >
        <Maximize className="h-5 w-5 text-white/60" />
      </button>

      {/* Divider */}
      <div className="h-px w-6 bg-white/10" />

      {/* View Modes */}
      <button
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="节点列表"
      >
        <List className="h-5 w-5 text-white/60" />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        title="拖拽模式"
      >
        <Move className="h-5 w-5 text-white/60" />
      </button>
    </aside>
  );
}
