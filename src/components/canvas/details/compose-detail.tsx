'use client';

import { Download, Play, Settings2, Film } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ComposeData } from '@/types/canvas';

interface ComposeDetailProps {
  _nodeData?: ComposeData;
  _updateNode?: (patch: Partial<ComposeData>) => void;
  onNodeComplete?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ComposeDetail({ _nodeData, _updateNode, onNodeComplete }: ComposeDetailProps) {
  return (
    <div className="p-4 space-y-4">
      <DetailSection icon={Film} label="Preview">
        <p className="text-xs text-white/40 mb-3">将所有分镜合成为最终视频</p>

        {/* Preview */}
        <div className="aspect-[9/16] max-h-[280px] rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center mx-auto">
          <div className="text-center">
            <Play className="h-8 w-8 text-white/20 mx-auto" />
            <p className="text-[10px] text-white/30 mt-2">预览区域</p>
          </div>
        </div>
      </DetailSection>

      {/* Export Settings */}
      <DetailSection icon={Settings2} label="Export Settings">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">分辨率</span>
            <Badge variant="outline">1080p</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">格式</span>
            <Badge variant="outline">MP4</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">字幕</span>
            <Badge variant="outline">内嵌</Badge>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-[10px] text-white/40">预计积分</span>
            <span className="text-[10px] font-medium text-[#FF4D4D]">5</span>
          </div>
        </div>
      </DetailSection>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          剪映工程
        </Button>
        <Button variant="default" size="sm" className="flex-1" onClick={onNodeComplete}>
          <Download className="h-3.5 w-3.5" />
          导出视频
        </Button>
      </div>
    </div>
  );
}
