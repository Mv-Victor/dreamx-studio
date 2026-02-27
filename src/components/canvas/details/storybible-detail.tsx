'use client';

import { Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockStoryBibles = [
  {
    id: 1,
    title: '命运交织',
    genre: '奇幻 / 爱情',
    logline: '千年白骨精为求解脱轮回之苦，化身人形接近取经僧人，却在朝夕相处中动了真情。',
    synopsis: '白骨夫人本是千年妖族女王，因厌倦无尽轮回，设计接近唐三藏。然而在伪装的日子里，她逐渐被唐僧的慈悲所打动，内心的孤寂开始融化...',
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

export function StoryBibleDetail() {
  return (
    <div className="p-4 space-y-4">
      <DetailSection icon={BookOpen} label="Story Options">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/40">AI 生成了 {mockStoryBibles.length} 个故事方案</p>
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-3 w-3" />
            重新生成
          </Button>
        </div>

        <div className="space-y-3">
          {mockStoryBibles.map((story) => (
            <div
              key={story.id}
              className="rounded-lg border p-3 cursor-pointer transition-all"
              style={{
                border: story.selected ? '1px solid rgba(192,3,28,0.60)' : '1px solid rgba(255,255,255,0.10)',
                background: story.selected ? 'rgba(192,3,28,0.10)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white/80">{story.title}</h4>
                <Badge variant={story.selected ? 'default' : 'secondary'}>
                  {story.genre}
                </Badge>
              </div>
              <p className="text-[10px] text-[#FF4D4D] mb-2">{story.logline}</p>
              <p className="text-[10px] text-white/50 leading-relaxed line-clamp-3">{story.synopsis}</p>
              {story.selected && (
                <div className="flex items-center gap-1 mt-2 text-[10px] text-green-500">
                  <span>✓</span>
                  <span>已选择</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          重新生成
        </Button>
        <Button variant="default" size="sm" className="flex-1">
          <Sparkles className="h-3.5 w-3.5" />
          确认选择
        </Button>
      </div>
    </div>
  );
}
