'use client';

import { useReactFlow } from '@xyflow/react';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import type { WorkflowNodeData, CheckPointData, StoryBibleData, CharacterPackData, PlanningCenterData, ScriptData, SceneDesignData, SegmentDesignData, ComposeData } from '@/types/canvas';

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
  selectedNodeId: string | null;
  onClose: () => void;
  onNodeComplete?: (nodeId: string) => void;
}

export function DetailPanel({ selectedNodeId, onClose, onNodeComplete }: DetailPanelProps) {
  const { getNode, updateNodeData } = useReactFlow();

  if (!selectedNodeId) return null;

  const node = getNode(selectedNodeId);
  if (!node) return null;

  const nodeType = node.type;
  const nodeData = node.data as WorkflowNodeData;
  const displayLabel = nodeData?.label || nodeType || '节点详情';

  // Helper to update node data
  const updateNode = (patch: Partial<WorkflowNodeData>) => {
    updateNodeData(selectedNodeId, { ...nodeData, ...patch });
  };

  return (
    <div className="w-[360px] border-l border-white/10 bg-[#0a0a0f] flex flex-col animate-slide-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-white-10)] bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3.5 rounded-full bg-[var(--brand-primary)]" />
          <h3 className="text-sm font-semibold text-white/90">{displayLabel}</h3>
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
        {nodeType === 'checkpoint' && (
          <CheckPointDetail nodeData={nodeData as CheckPointData} updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'storybible' && (
          <StoryBibleDetail _nodeData={nodeData as StoryBibleData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'characterpack' && (
          <CharacterPackDetail _nodeData={nodeData as CharacterPackData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'planningcenter' && (
          <PlanningCenterDetail _nodeData={nodeData as PlanningCenterData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'script' && (
          <ScriptDetail _nodeData={nodeData as ScriptData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'scenedesign' && (
          <SceneDesignDetail _nodeData={nodeData as SceneDesignData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'segmentdesign' && (
          <SegmentDesignDetail _nodeData={nodeData as SegmentDesignData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
        {nodeType === 'compose' && (
          <ComposeDetail _nodeData={nodeData as ComposeData} _updateNode={updateNode} onNodeComplete={() => onNodeComplete?.(selectedNodeId)} />
        )}
      </div>
    </div>
  );
}
