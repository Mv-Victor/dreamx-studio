'use client';

import { useProjectStore } from '@/stores/project-store';
import { useEffect } from 'react';
import { Sparkles, ChevronRight, Monitor, Shield, Film, Clock, Type, Image as ImageIcon, FileText } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function CheckPointDetail() {
  const { checkPoint, updateCheckPoint, visualStyles, loadVisualStyles } = useProjectStore();

  useEffect(() => {
    if (visualStyles.length === 0) loadVisualStyles();
  }, [visualStyles.length, loadVisualStyles]);

  if (!checkPoint) return null;

  return (
    <div className="p-5 space-y-6">
      {/* Language */}
      <DetailSection icon={Type} label="Language">
        <div className="flex gap-2">
          {['zh-CN', 'en-US'].map((lang) => (
            <button
              key={lang}
              onClick={() => updateCheckPoint({ language: lang })}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border"
              style={{
                background: checkPoint.language === lang ? 'rgba(192,3,28,0.20)' : 'rgba(255,255,255,0.05)',
                border: checkPoint.language === lang ? 'rgba(192,3,28,0.40)' : 'rgba(255,255,255,0.10)',
                color: checkPoint.language === lang ? '#FF4D4D' : 'rgba(255,255,255,0.60)',
              }}
            >
              {lang === 'zh-CN' ? '中文' : 'English'}
            </button>
          ))}
        </div>
      </DetailSection>

      {/* Rating */}
      <DetailSection icon={Shield} label="Content Rating">
        <div className="flex gap-2">
          {['PG', 'PG-13', 'R'].map((r) => (
            <button
              key={r}
              onClick={() => updateCheckPoint({ rating: r })}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border"
              style={{
                background: checkPoint.rating === r ? 'rgba(192,3,28,0.20)' : 'rgba(255,255,255,0.05)',
                border: checkPoint.rating === r ? 'rgba(192,3,28,0.40)' : 'rgba(255,255,255,0.10)',
                color: checkPoint.rating === r ? '#FF4D4D' : 'rgba(255,255,255,0.60)',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </DetailSection>

      {/* Frame Ratio */}
      <DetailSection icon={Monitor} label="Aspect Ratio">
        <div className="flex gap-2">
          {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => updateCheckPoint({ camera_frame_ratio: ratio })}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border"
              style={{
                background: checkPoint.camera_frame_ratio === ratio ? 'rgba(192,3,28,0.20)' : 'rgba(255,255,255,0.05)',
                border: checkPoint.camera_frame_ratio === ratio ? 'rgba(192,3,28,0.40)' : 'rgba(255,255,255,0.10)',
                color: checkPoint.camera_frame_ratio === ratio ? '#FF4D4D' : 'rgba(255,255,255,0.60)',
              }}
            >
              {ratio}
            </button>
          ))}
        </div>
      </DetailSection>

      {/* Episode Count */}
      <DetailSection icon={Film} label={`Episodes: ${checkPoint.episode_count}`}>
        <input
          type="range"
          min={1}
          max={12}
          value={checkPoint.episode_count}
          onChange={(e) => updateCheckPoint({ episode_count: parseInt(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.10)' }}
        />
        <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
          <span>1</span>
          <span>12</span>
        </div>
      </DetailSection>

      {/* Episode Duration */}
      <DetailSection icon={Clock} label={`Duration: ${checkPoint.episode_duration}s`}>
        <input
          type="range"
          min={15}
          max={300}
          step={15}
          value={checkPoint.episode_duration}
          onChange={(e) => updateCheckPoint({ episode_duration: parseInt(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.10)' }}
        />
        <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
          <span>15s</span>
          <span>300s</span>
        </div>
      </DetailSection>

      {/* Visual Style */}
      <DetailSection icon={ImageIcon} label="Visual Style">
        <div className="grid grid-cols-2 gap-2">
          {visualStyles.slice(0, 4).map((style) => (
            <button
              key={style.id}
              onClick={() => updateCheckPoint({ visual_style_id: style.id })}
              className="group rounded-lg overflow-hidden border transition-all cursor-pointer"
              style={{
                border: checkPoint.visual_style_id === style.id ? '1px solid rgba(192,3,28,0.60)' : '1px solid rgba(255,255,255,0.10)',
                background: checkPoint.visual_style_id === style.id ? 'rgba(192,3,28,0.10)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative overflow-hidden">
                <div className="text-2xl opacity-30">🎨</div>
                {checkPoint.visual_style_id === style.id && (
                  <div className="absolute inset-0 bg-[rgba(192,3,28,0.20)] flex items-center justify-center">
                    <span className="text-white text-xs font-medium">✓</span>
                  </div>
                )}
              </div>
              <div className="px-2 py-2">
                <p className="text-[10px] font-medium text-white/80 truncate">{style.title}</p>
                <Badge variant="outline" className="mt-1">
                  {style.type}
                </Badge>
              </div>
            </button>
          ))}
        </div>
        <button className="w-full mt-2 text-[10px] text-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-1 cursor-pointer">
          查看全部风格 <ChevronRight className="h-3 w-3" />
        </button>
      </DetailSection>

      {/* Idea Text */}
      <DetailSection icon={FileText} label="Story Idea">
        <textarea
          value={checkPoint.idea_text}
          onChange={(e) => updateCheckPoint({ idea_text: e.target.value })}
          placeholder="描述你的创意故事..."
          className="w-full min-h-[100px] rounded-lg border bg-white/5 px-3 py-2.5 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 resize-none transition-colors"
          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        />
      </DetailSection>

      {/* Action Button */}
      <Button variant="default" size="sm" className="w-full">
        <Sparkles className="h-4 w-4" />
        确认并继续
      </Button>
    </div>
  );
}
