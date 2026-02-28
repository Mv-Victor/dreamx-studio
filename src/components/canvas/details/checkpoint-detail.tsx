'use client';

import React from 'react';
import { Sparkles, ChevronRight, Monitor, Shield, Film, Clock, Type, Image as ImageIcon, FileText } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented-control';
import type { CheckPointData } from '@/types/canvas';
import { visualStyles } from '@/mock/visual-styles';
import { DEFAULT_CHECKPOINT_DATA } from '@/lib/defaults';

interface CheckPointDetailProps {
  _nodeData?: CheckPointData;
  _updateNode?: (patch: Partial<CheckPointData>) => void;
  onNodeComplete?: () => void;
}

export const CheckPointDetail = ({ _nodeData, _updateNode, onNodeComplete }: CheckPointDetailProps) => {
  const data = { ...DEFAULT_CHECKPOINT_DATA, ..._nodeData };
  const updateNode = _updateNode || ((patch) => {
    console.warn('[CheckPointDetail] updateNode not provided:', patch);
  });

  return (
    <div className="p-5 space-y-5">
      {/* Language */}
      <DetailSection icon={Type} label="Language">
        <SegmentedControl
          options={[
            { value: 'zh-CN', label: '中文' },
            { value: 'en-US', label: 'English' },
          ]}
          value={data.language}
          onChange={(val) => updateNode({ language: val as 'zh-CN' | 'en-US' })}
        />
      </DetailSection>

      {/* Rating */}
      <DetailSection icon={Shield} label="Content Rating">
        <SegmentedControl
          options={[
            { value: 'PG', label: 'PG' },
            { value: 'PG-13', label: 'PG-13' },
            { value: 'R', label: 'R' },
          ]}
          value={data.rating}
          onChange={(val) => updateNode({ rating: val as 'PG' | 'PG-13' | 'R' })}
        />
      </DetailSection>

      {/* Frame Ratio */}
      <DetailSection icon={Monitor} label="Aspect Ratio">
        <SegmentedControl
          options={[
            { value: '9:16', label: '9:16' },
            { value: '16:9', label: '16:9' },
            { value: '1:1', label: '1:1' },
          ]}
          value={data.camera_frame_ratio}
          onChange={(val) => updateNode({ camera_frame_ratio: val as '9:16' | '16:9' | '1:1' })}
        />
      </DetailSection>

      {/* Episode Count */}
      <DetailSection icon={Film} label={`Episodes: ${data.episode_count || 1}`}>
        <input
          type="range"
          min={1}
          max={12}
          value={data.episode_count || 1}
          onChange={(e) => updateNode({ episode_count: parseInt(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: 'var(--bg-white-10)' }}
        />
        <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
          <span>1</span>
          <span>12</span>
        </div>
      </DetailSection>

      {/* Episode Duration */}
      <DetailSection icon={Clock} label={`Duration: ${data.episode_duration || 60}s`}>
        <input
          type="range"
          min={15}
          max={300}
          step={15}
          value={data.episode_duration || 60}
          onChange={(e) => updateNode({ episode_duration: parseInt(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: 'var(--bg-white-10)' }}
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
              onClick={() => updateNode({ visual_style_id: style.id })}
              className="group rounded-lg overflow-hidden border transition-all cursor-pointer"
              style={{
                border: data.visual_style_id === style.id ? '1px solid var(--brand-primary-rgba-60)' : '1px solid var(--border-white-10)',
                background: data.visual_style_id === style.id ? 'var(--brand-primary-rgba-20)' : 'var(--bg-white-5)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative overflow-hidden">
                <div className="text-2xl opacity-30">🎨</div>
                {data.visual_style_id === style.id && (
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
          value={data.idea_text || ''}
          onChange={(e) => updateNode({ idea_text: e.target.value })}
          placeholder="描述你的创意故事..."
          className="w-full min-h-[100px] rounded-lg border bg-white/5 px-3 py-2.5 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 resize-none transition-colors"
          style={{ borderColor: 'var(--border-white-10)' }}
        />
      </DetailSection>

      {/* Action Button */}
      <Button
        variant="default"
        size="sm"
        className="w-full"
        onClick={onNodeComplete}
      >
        <Sparkles className="h-4 w-4" />
        确认并继续
      </Button>
    </div>
  );
};

export default React.memo(CheckPointDetail);
