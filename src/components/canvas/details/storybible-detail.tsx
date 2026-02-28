'use client';

import React from 'react';
import { Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { StoryBibleData } from '@/types/canvas';
import { DEFAULT_STORY_BIBLE_DATA } from '@/lib/defaults';

interface StoryBibleDetailProps {
  _nodeData?: StoryBibleData;
  _updateNode?: (patch: Partial<StoryBibleData>) => void;
  onNodeComplete?: () => void;
}

import { STORY_BIBLE_MOCK_DATA } from '@/mock/story-bible-mock';

export const StoryBibleDetail = ({ _nodeData, _updateNode, onNodeComplete }: StoryBibleDetailProps) => {
  // data is initialized for API consistency but not used directly in this component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- data is initialized for API consistency but not used directly in this component
  const data = { ...DEFAULT_STORY_BIBLE_DATA, ..._nodeData };
  // updateNode is initialized for API consistency; fallback logs warning if not provided
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- updateNode is initialized for API consistency; fallback logs warning if not provided
  const updateNode = _updateNode || ((patch) => {
    console.warn('[StoryBibleDetail] updateNode not provided:', patch);
  });

  return (
    <div className="p-4 space-y-4">
      <DetailSection icon={BookOpen} label="Story Options">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/40">AI 生成了 {STORY_BIBLE_MOCK_DATA.length} 个故事方案</p>
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-3 w-3" />
            重新生成
          </Button>
        </div>

        <div className="space-y-3">
          {STORY_BIBLE_MOCK_DATA.map((story) => (
            <div
              key={story.id}
              className={cn(
                'rounded-lg border p-3 cursor-pointer transition-all',
                story.selected
                  ? 'border-[var(--drama-red-border-active)] bg-[var(--drama-red-bg)]'
                  : 'border-[var(--drama-border)] bg-[var(--drama-bg-white-5)]'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white/80">{story.title}</h4>
                <Badge variant={story.selected ? 'default' : 'secondary'}>
                  {story.genre}
                </Badge>
              </div>
              <p className="text-xs text-white/60 mb-2">{story.logline}</p>
              <p className="text-xs text-white/40 line-clamp-2">{story.synopsis}</p>
            </div>
          ))}
        </div>

        <Button variant="default" size="sm" className="w-full mt-4" onClick={onNodeComplete}>
          <Sparkles className="h-4 w-4" />
          确认并继续
        </Button>
      </DetailSection>
    </div>
  );
};

export default React.memo(StoryBibleDetail);
