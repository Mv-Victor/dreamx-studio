'use client';

import { Sparkles, RefreshCw, BookOpen } from 'lucide-react';

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
  const Section = ({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) => (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="h-4 w-4 text-white/40" />
        <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <Section icon={BookOpen} label="Story Options">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/40">AI 生成了 {mockStoryBibles.length} 个故事方案</p>
          <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] text-white/60 hover:text-white/80 cursor-pointer transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <RefreshCw className="h-3 w-3" />
            重新生成
          </button>
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
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: story.selected ? 'rgba(192,3,28,0.20)' : 'rgba(255,255,255,0.05)',
                    color: story.selected ? '#FF4D4D' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  {story.genre}
                </span>
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
      </Section>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border border-white/10"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.60)' }}
        >
          重新生成
        </button>
        <button
          className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
          style={{ background: 'rgba(192,3,28,0.20)', color: '#FF4D4D' }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          确认选择
        </button>
      </div>
    </div>
  );
}
