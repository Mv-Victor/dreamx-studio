'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Maximize, List, Move, ChevronLeft } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

interface FloatingNavProps {
  onAddNode?: () => void;
}

export function FloatingNav({ onAddNode }: FloatingNavProps) {
  const router = useRouter();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleBack = useCallback(() => {
    router.push('/projects');
  }, [router]);

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
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 px-3 py-4 rounded-2xl border border-[var(--drama-border)] bg-[var(--drama-bg-primary)]/80 backdrop-blur-md shadow-lg">
      {/* Back to Projects */}
      <button
        onClick={handleBack}
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="返回项目"
      >
        <ChevronLeft className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>

      {/* Divider */}
      <div className="h-px w-6 bg-[var(--drama-border)]" />

      {/* Add Node */}
      <button
        onClick={onAddNode}
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="添加节点"
      >
        <Plus className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>

      {/* Divider */}
      <div className="h-px w-6 bg-[var(--drama-border)]" />

      {/* Zoom Controls */}
      <button
        onClick={handleZoomIn}
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="放大"
      >
        <Plus className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="缩小"
      >
        <Minus className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>
      <button
        onClick={handleFitView}
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="适应视图"
      >
        <Maximize className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>

      {/* Divider */}
      <div className="h-px w-6 bg-[var(--drama-border)]" />

      {/* View Modes */}
      <button
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="节点列表"
      >
        <List className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-[var(--drama-bg-white-5)] cursor-pointer transition-colors"
        title="拖拽模式"
      >
        <Move className="h-5 w-5 text-[var(--drama-text-tertiary)]" />
      </button>
    </aside>
  );
}
