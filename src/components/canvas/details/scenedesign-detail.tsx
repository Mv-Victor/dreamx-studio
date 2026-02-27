'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw } from 'lucide-react';

const mockScenes = [
  { id: 1, header: '外景 - 荒山古道 - 黄昏', status: 'completed', thumbnail: null },
  { id: 2, header: '内景 - 白骨洞 - 夜', status: 'generating', thumbnail: null },
  { id: 3, header: '外景 - 山间小路 - 清晨', status: 'pending', thumbnail: null },
  { id: 4, header: '内景 - 客栈 - 午后', status: 'pending', thumbnail: null },
];

export function SceneDesignDetail() {
  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-muted-foreground">AI 为每个场景生成视觉参考图</p>

      <div className="space-y-3">
        {mockScenes.map((scene) => (
          <div key={scene.id} className="rounded-lg border border-border overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-muted to-secondary flex items-center justify-center relative">
              {scene.status === 'generating' && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-muted-foreground mt-2">生成中...</p>
                  </div>
                </div>
              )}
              {scene.status === 'completed' && <span className="text-2xl">🖼</span>}
              {scene.status === 'pending' && <span className="text-2xl opacity-30">🖼</span>}
            </div>
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {String(scene.id).padStart(2, '0')}
                </span>
                <span className="text-xs truncate">{scene.header}</span>
              </div>
              <Badge
                variant={scene.status === 'completed' ? 'default' : scene.status === 'generating' ? 'accent' : 'secondary'}
              >
                {scene.status === 'completed' ? '完成' : scene.status === 'generating' ? '生成中' : '待生成'}
              </Badge>
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
          确认场景
        </Button>
      </div>
    </div>
  );
}
