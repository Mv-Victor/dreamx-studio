'use client';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Sparkles, Film, BookOpen, Music, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { PROJECT_TYPE_LABELS } from '@/lib/utils';
import { ProjectType } from '@/types';
import { useProjectStore } from '@/stores/project-store';

const modeIcons: Record<string, React.ReactNode> = {
  single_episode: <Film className="h-5 w-5" />,
  multi_episodes: <BookOpen className="h-5 w-5" />,
  script_based: <BookOpen className="h-5 w-5" />,
  music_mv: <Music className="h-5 w-5" />,
  redbook_note: <ImageIcon className="h-5 w-5" />,
};

const modeDescriptions: Record<string, string> = {
  single_episode: '单集短视频，适合抖音/快手',
  multi_episodes: '多集连续剧，DAG 工作流',
  script_based: '导入已有剧本，跳过 AI 编剧',
  music_mv: '音乐驱动的视觉创作',
  redbook_note: '图文笔记 → 爆款视频',
};

export default function HomePage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ProjectType>('single_episode');
  const [ideaText, setIdeaText] = useState('');
  const createProject = useProjectStore((s) => s.createProject);

  const handleCreate = () => {
    if (!ideaText.trim()) return;
    const project = createProject(selectedMode, ideaText.trim());
    router.push(`/projects/${project.project_id}/canvas`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Logo />
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push('/projects')}>
            我的项目
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
            登录
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            把你的想法
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">「玩」</span>
            成一支视频
          </h1>
          <p className="text-muted-foreground text-lg">AI 驱动的全链路短剧/短视频创作平台</p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 animate-fade-in">
          {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                selectedMode === mode
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-secondary text-secondary-foreground border border-transparent hover:border-border'
              }`}
            >
              {modeIcons[mode]}
              <div className="text-left">
                <div className="font-medium">{PROJECT_TYPE_LABELS[mode]}</div>
                <div className="text-xs opacity-70">{modeDescriptions[mode]}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="relative rounded-xl border border-border bg-card p-1">
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="描述你的创意... 例如：一个关于白骨精和唐僧的现代爱情故事"
              className="w-full min-h-[120px] bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCreate();
              }}
            />
            <div className="flex items-center justify-between px-3 py-2 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {PROJECT_TYPE_LABELS[selectedMode]}
                </span>
              </div>
              <Button size="sm" onClick={handleCreate} disabled={!ideaText.trim()}>
                <Sparkles className="h-4 w-4" />
                开始创作
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            ⌘ + Enter 快速创建 · 支持中英文输入
          </p>
        </div>
      </main>
    </div>
  );
}
