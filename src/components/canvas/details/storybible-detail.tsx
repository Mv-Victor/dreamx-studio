'use client';

import React from 'react';
import { Sparkles, RefreshCw, BookOpen } from 'lucide-react';
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

const STORY_BIBLE_MOCK_DATA = [
  {
    id: 1,
    title: '命运交织',
    genre: '奇幻 / 爱情',
    logline: '千年白骨精为求解脱轮回之苦，化身人形接近取经僧人，却在朝夕相处中动了真情。',
    synopsis: '白骨夫人本是千年妖族女王，因厌倦无尽轮回，设计接近唐三藏。然而在朝夕相处中，她逐渐被唐僧的慈悲所打动，内心的孤寂开始融化...',
    selected: true,
  },
  {
    id: 2,
    title: '破界之约',
    genre: '奇幻 / 动作',
    logline: '人妖两界的禁忌之恋，引发一场改变三界格局的风暴。',
    synopsis: '白骨夫人与唐僧的相遇并非偶然，而是天庭与妖界博弈的一枚棋子。当真相揭开，两人必须在命运与自由之间做出抉择...',
    selected: false,
  },
  {
    id: 3,
    title: '千年等待',
    genre: '奇幻 / 剧情',
    logline: '她等了一千年，不是为了吃唐僧肉，而是为了一个承诺。',
    synopsis: '五百年前，白骨夫人还是一名普通村姑，被唐僧的前世所救。千年轮回，她修炼成妖，只为再见恩人一面...',
    selected: false,
  },
];

export const StoryBibleDetail = ({ _nodeData, _updateNode, onNodeComplete }: StoryBibleDetailProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = { ...DEFAULT_STORY_BIBLE_DATA, ..._nodeData };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              className="rounded-lg border p-3 cursor-pointer transition-all"
              style={{
                border: story.selected ? 'var(--drama-red-border-active)' : 'var(--drama-border)',
                background: story.selected ? 'var(--drama-red-bg)' : 'var(--drama-bg-white-5)',
              }}
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
