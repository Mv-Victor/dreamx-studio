'use client';

import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const DetailLoading = () => (
  <div className="flex items-center justify-center h-40">
    <Spinner />
  </div>
);

const CheckPointDetail = dynamic(() => import('./details/checkpoint-detail').then(m => ({ default: m.CheckPointDetail })), { loading: DetailLoading });
const StoryBibleDetail = dynamic(() => import('./details/storybible-detail').then(m => ({ default: m.StoryBibleDetail })), { loading: DetailLoading });
const CharacterPackDetail = dynamic(() => import('./details/characterpack-detail').then(m => ({ default: m.CharacterPackDetail })), { loading: DetailLoading });
const PlanningCenterDetail = dynamic(() => import('./details/planningcenter-detail').then(m => ({ default: m.PlanningCenterDetail })), { loading: DetailLoading });
const ScriptDetail = dynamic(() => import('./details/script-detail').then(m => ({ default: m.ScriptDetail })), { loading: DetailLoading });
const SceneDesignDetail = dynamic(() => import('./details/scenedesign-detail').then(m => ({ default: m.SceneDesignDetail })), { loading: DetailLoading });
const SegmentDesignDetail = dynamic(() => import('./details/segmentdesign-detail').then(m => ({ default: m.SegmentDesignDetail })), { loading: DetailLoading });
const ComposeDetail = dynamic(() => import('./details/compose-detail').then(m => ({ default: m.ComposeDetail })), { loading: DetailLoading });

interface DetailPanelProps {
  selectedNodeType: string | null;
  onClose: () => void;
  onNodeComplete?: (nodeId: string) => void;
}

export function DetailPanel({ selectedNodeType, onClose, onNodeComplete }: DetailPanelProps) {
  if (!selectedNodeType) return null;

  return (
    <div className="w-[360px] border-l border-white/10 bg-[#0a0a0f] flex flex-col animate-slide-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-white-10)] bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3.5 rounded-full bg-[var(--brand-primary)]" />
          <h3 className="text-sm font-semibold text-white/90 capitalize">{selectedNodeType.replace(/([A-Z])/g, ' $1').trim()}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        >
          <X className="h-4 w-4 text-white/40" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedNodeType === 'checkpoint' && <CheckPointDetail onNodeComplete={onNodeComplete} />}
        {selectedNodeType === 'storybible' && <StoryBibleDetail />}
        {selectedNodeType === 'characterpack' && <CharacterPackDetail />}
        {selectedNodeType === 'planningcenter' && <PlanningCenterDetail />}
        {selectedNodeType === 'script' && <ScriptDetail />}
        {selectedNodeType === 'scenedesign' && <SceneDesignDetail />}
        {selectedNodeType === 'segmentdesign' && <SegmentDesignDetail />}
        {selectedNodeType === 'compose' && <ComposeDetail />}
      </div>
    </div>
  );
}
