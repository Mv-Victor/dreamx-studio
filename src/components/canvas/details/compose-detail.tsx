'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Play, Settings2 } from 'lucide-react';

export function ComposeDetail() {
  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-muted-foreground">将所有分镜合成为最终视频</p>

      {/* Preview */}
      <div className="aspect-[9/16] max-h-[300px] rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center mx-auto">
        <div className="text-center">
          <Play className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-xs text-muted-foreground mt-2">预览区域</p>
        </div>
      </div>

      {/* Export Settings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">导出设置</span>
          <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        <div className="rounded-lg bg-muted p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">分辨率</span>
            <Badge variant="outline">1080p</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">格式</span>
            <Badge variant="outline">MP4</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">字幕</span>
            <Badge variant="outline">内嵌</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">预计积分</span>
            <span className="text-xs text-primary font-medium">5</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          剪映工程
        </Button>
        <Button className="flex-1">
          <Download className="h-4 w-4" />
          导出视频
        </Button>
      </div>
    </div>
  );
}
