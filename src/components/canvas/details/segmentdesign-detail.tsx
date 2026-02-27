'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Play, RefreshCw } from 'lucide-react';

const mockSegments = [
  { id: 1, description: '夕阳下的荒山古道，镜头缓缓推进', shotType: '远景', camera: '推镜头', duration: '4s', status: 'completed' },
  { id: 2, description: '悟空警觉地环顾四周', shotType: '中景', camera: '跟拍', duration: '3s', status: 'completed' },
  { id: 3, description: '唐僧坚定地望向前方', shotType: '特写', camera: '固定', duration: '2s', status: 'generating' },
  { id: 4, description: '白骨洞内，骨制王座的全貌', shotType: '全景', camera: '摇镜头', duration: '4s', status: 'pending' },
  { id: 5, description: '白骨夫人缓缓睁开冰蓝色的眼睛', shotType: '大特写', camera: '固定', duration: '3s', status: 'pending' },
];

export function SegmentDesignDetail() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{mockSegments.length} 个分镜</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>总时长</span>
          <span className="text-foreground font-medium">16s</span>
        </div>
      </div>

      <div className="space-y-2">
        {mockSegments.map((seg) => (
          <div key={seg.id} className="rounded-lg border border-border p-3 flex gap-3">
            {/* Thumbnail */}
            <div className="w-20 h-14 rounded-md bg-gradient-to-br from-muted to-secondary flex items-center justify-center flex-shrink-0 relative">
              {seg.status === 'completed' && (
                <Play className="h-4 w-4 text-primary" />
              )}
              {seg.status === 'generating' && (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
              {seg.status === 'pending' && (
                <span className="text-xs text-muted-foreground">—</span>
              )}
              <span className="absolute bottom-0.5 right-1 text-[10px] text-muted-foreground bg-background/80 px-1 rounded">
                {seg.duration}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed line-clamp-2">{seg.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="outline" className="text-[10px]">{seg.shotType}</Badge>
                <Badge variant="outline" className="text-[10px]">{seg.camera}</Badge>
                <Badge
                  variant={seg.status === 'completed' ? 'default' : seg.status === 'generating' ? 'accent' : 'secondary'}
                  className="text-[10px] ml-auto"
                >
                  {seg.status === 'completed' ? '✓' : seg.status === 'generating' ? '生成中' : '待生成'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <RefreshCw className="h-4 w-4" />
          重新生成
        </Button>
        <Button className="flex-1">
          <Sparkles className="h-4 w-4" />
          确认分镜
        </Button>
      </div>
    </div>
  );
}
