'use client';

import { useProjectStore } from '@/stores/project-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export function CheckPointDetail() {
  const { checkPoint, updateCheckPoint, visualStyles, loadVisualStyles } = useProjectStore();

  useEffect(() => {
    if (visualStyles.length === 0) loadVisualStyles();
  }, [visualStyles.length, loadVisualStyles]);

  if (!checkPoint) return null;

  return (
    <div className="p-4 space-y-5">
      {/* Language */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">语言</label>
        <div className="flex gap-2">
          {['zh-CN', 'en-US'].map((lang) => (
            <button
              key={lang}
              onClick={() => updateCheckPoint({ language: lang })}
              className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                checkPoint.language === lang
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-muted text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              {lang === 'zh-CN' ? '中文' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">评级</label>
        <div className="flex gap-2">
          {['PG', 'PG-13', 'R'].map((r) => (
            <button
              key={r}
              onClick={() => updateCheckPoint({ rating: r })}
              className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                checkPoint.rating === r
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-muted text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Ratio */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">画面比例</label>
        <div className="flex gap-2">
          {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => updateCheckPoint({ camera_frame_ratio: ratio })}
              className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                checkPoint.camera_frame_ratio === ratio
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-muted text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Episode Count */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">剧集数量</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={12}
            value={checkPoint.episode_count}
            onChange={(e) => updateCheckPoint({ episode_count: parseInt(e.target.value) })}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-medium w-8 text-center">{checkPoint.episode_count}</span>
        </div>
      </div>

      {/* Episode Duration */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">单集时长（秒）</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={15}
            max={300}
            step={15}
            value={checkPoint.episode_duration}
            onChange={(e) => updateCheckPoint({ episode_duration: parseInt(e.target.value) })}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-medium w-12 text-center">{checkPoint.episode_duration}s</span>
        </div>
      </div>

      {/* Visual Style */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-muted-foreground">视觉风格</label>
          <button className="text-xs text-primary flex items-center gap-0.5 cursor-pointer hover:underline">
            查看全部 <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {visualStyles.slice(0, 4).map((style) => (
            <button
              key={style.id}
              onClick={() => updateCheckPoint({ visual_style_id: style.id })}
              className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                checkPoint.visual_style_id === style.id
                  ? 'border-primary'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <span className="text-xs text-muted-foreground">🎨</span>
              </div>
              <div className="px-2 py-1.5 bg-muted">
                <p className="text-xs truncate">{style.title}</p>
                <Badge variant="outline" className="mt-0.5 text-[10px]">{style.type}</Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Idea Text */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">创意描述</label>
        <textarea
          value={checkPoint.idea_text}
          onChange={(e) => updateCheckPoint({ idea_text: e.target.value })}
          className="w-full min-h-[80px] rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <Button className="w-full">
        <Sparkles className="h-4 w-4" />
        确认并继续
      </Button>
    </div>
  );
}
