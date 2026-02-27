'use client';

import { useProjectStore } from '@/stores/project-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Edit3 } from 'lucide-react';

export function ScriptDetail() {
  const { episodes } = useProjectStore();
  const episode = episodes[0];

  if (!episode) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">暂无剧本数据</p>
        <Button className="mt-4">
          <Sparkles className="h-4 w-4" />
          生成剧本
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{episode.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{episode.scenes.length} 个场景</p>
        </div>
        <Button variant="ghost" size="sm">
          <Edit3 className="h-3.5 w-3.5" />
          编辑
        </Button>
      </div>

      {episode.scenes.map((scene) => (
        <div key={scene.scene_number} className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">场景 {String(scene.scene_number).padStart(2, '0')}</Badge>
            <span className="text-xs font-medium text-foreground">{scene.header}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{scene.description}</p>

          {/* Dialogue */}
          {scene.dialogue.length > 0 && (
            <div className="space-y-1 pl-2 border-l-2 border-primary/30">
              {scene.dialogue.map((line, i) => (
                <p key={i} className="text-xs text-foreground">{line}</p>
              ))}
            </div>
          )}

          {/* VO */}
          {scene.vo_narration && (
            <div className="bg-muted rounded-md px-2.5 py-1.5">
              <p className="text-xs text-muted-foreground italic">🎙 {scene.vo_narration}</p>
            </div>
          )}
        </div>
      ))}

      <Button className="w-full">
        <Sparkles className="h-4 w-4" />
        确认剧本
      </Button>
    </div>
  );
}
