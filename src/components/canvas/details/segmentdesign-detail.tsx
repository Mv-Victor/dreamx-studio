'use client';

import React from 'react';
import { Sparkles, RefreshCw, Clapperboard, Lock, Play } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import type { SegmentDesignData } from '@/types/canvas';
import { DEFAULT_SEGMENT_DESIGN_DATA } from '@/lib/defaults';

interface SegmentDesignDetailProps {
  _nodeData?: SegmentDesignData;
  _updateNode?: (patch: Partial<SegmentDesignData>) => void;
  onNodeComplete?: () => void;
}

import { SEGMENT_DESIGN_MOCK_DATA } from '@/mock/segment-design-mock';

export const SegmentDesignDetail = ({ _nodeData, _updateNode, onNodeComplete }: SegmentDesignDetailProps) => {
  // data is initialized for API consistency but not used directly in this component
  const _data = { ...DEFAULT_SEGMENT_DESIGN_DATA, ..._nodeData };
  // updateNode is initialized for API consistency; fallback logs warning if not provided
  const _update = _updateNode || ((patch) => {
    console.warn('[SegmentDesignDetail] updateNode not provided:', patch);
  });

  return (
    <div className="p-5 space-y-5">
      <DetailSection icon={Clapperboard} label="Segments">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/40">{SEGMENT_DESIGN_MOCK_DATA.length} 个分镜</p>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <span>总时长</span>
            <span className="text-white/60 font-medium">16s</span>
          </div>
        </div>

        <div className="space-y-2">
          {SEGMENT_DESIGN_MOCK_DATA.map((seg) => (
            <div key={seg.id} className="rounded-lg border border-white/10 bg-white/5 p-2.5 flex gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-md bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center flex-shrink-0 relative border border-white/10">
                {seg.status === 'completed' && (
                  <Play className="h-4 w-4 text-white/40" />
                )}
                {seg.status === 'generating' && (
                  <div className="w-3.5 h-3.5 border-2 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin" />
                )}
                {seg.status === 'pending' && (
                  <Lock className="h-3.5 w-3.5 text-white/10" />
                )}
                <span className="absolute bottom-0.5 right-1 text-[9px] text-white/30 bg-black/60 px-1 rounded">
                  {seg.duration}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/70 leading-relaxed line-clamp-2">{seg.description}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Badge variant="outline">{seg.shotType}</Badge>
                  <Badge variant="outline">{seg.camera}</Badge>
                  <div className="ml-auto">
                    <StatusBadge status={seg.status} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          <RefreshCw className="h-3.5 w-3.5" />
          重新生成
        </Button>
        <Button variant="default" size="sm" className="flex-1" onClick={onNodeComplete}>
          <Sparkles className="h-3.5 w-3.5" />
          确认分镜
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SegmentDesignDetail);
