'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw } from 'lucide-react';

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
];

export function StoryBibleDetail() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">AI 生成了 2 个故事方案，选择一个继续</p>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-3.5 w-3.5" />
          重新生成
        </Button>
      </div>

      {mockStoryBibles.map((story) => (
        <div
          key={story.id}
          className={`rounded-lg border-2 p-3 cursor-pointer transition-all ${
            story.selected
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">{story.title}</h4>
            <Badge variant="secondary">{story.genre}</Badge>
          </div>
          <p className="text-xs text-primary mb-2">{story.logline}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{story.synopsis}</p>
        </div>
      ))}

      <Button className="w-full">
        <Sparkles className="h-4 w-4" />
        确认选择并继续
      </Button>
    </div>
  );
}
