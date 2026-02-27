'use client';

import { Node } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { CheckPointDetail } from '@/components/canvas/details/checkpoint-detail';
import { StoryBibleDetail } from '@/components/canvas/details/storybible-detail';
import { CharacterPackDetail } from '@/components/canvas/details/characterpack-detail';
import { PlanningCenterDetail } from '@/components/canvas/details/planningcenter-detail';
import { ScriptDetail } from '@/components/canvas/details/script-detail';
import { SceneDesignDetail } from '@/components/canvas/details/scenedesign-detail';
import { SegmentDesignDetail } from '@/components/canvas/details/segmentdesign-detail';
import { ComposeDetail } from '@/components/canvas/details/compose-detail';

interface DetailPanelProps {
  node: Node;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  const renderDetail = () => {
    switch (node.type) {
      case 'checkpoint': return <CheckPointDetail />;
      case 'storybible': return <StoryBibleDetail />;
      case 'characterpack': return <CharacterPackDetail />;
      case 'planningcenter': return <PlanningCenterDetail />;
      case 'script': return <ScriptDetail />;
      case 'scenedesign': return <SceneDesignDetail />;
      case 'segmentdesign': return <SegmentDesignDetail />;
      case 'compose': return <ComposeDetail />;
      case 'entry':
        return (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">这是你创作旅程的起点</p>
            <p className="text-xs mt-2">点击下一个节点开始配置</p>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center text-muted-foreground text-sm">
            选择一个节点查看详情
          </div>
        );
    }
  };

  return (
    <div className="w-[380px] border-l border-border bg-sidebar overflow-y-auto animate-slide-right">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-sidebar z-10">
        <div>
          <h3 className="text-sm font-medium">{(node.data as Record<string, string>).label}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{(node.data as Record<string, string>).description}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {renderDetail()}
    </div>
  );
}
