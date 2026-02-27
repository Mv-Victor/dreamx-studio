'use client';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ProjectType } from '@/types';
import { useProjectStore } from '@/stores/project-store';
import { Upload, FolderOpen, Globe, ChevronDown, X, Sparkles } from 'lucide-react';

const modeTabs: { id: ProjectType; label: string; short: string }[] = [
  { id: 'single_episode', label: '单集视频', short: 'SINGLE' },
  { id: 'multi_episodes', label: '连续剧集', short: 'SEASON' },
  { id: 'script_based', label: '剧本模式', short: 'SCRIPT' },
  { id: 'music_mv', label: '🎵 MV', short: '🎵MV' },
  { id: 'redbook_note', label: '📕 小红书', short: '📕小红书' },
];

const mockShowcases = [
  { id: 1, title: '共生劫：白骨夫人的生死局', cover: null, views: '12.3K' },
  { id: 2, title: '霓虹深处的秘密', cover: null, views: '8.7K' },
  { id: 3, title: '星际漂流者', cover: null, views: '5.2K' },
  { id: 4, title: '古镇迷踪', cover: null, views: '3.1K' },
  { id: 5, title: '赛博朋克：觉醒', cover: null, views: '15.6K' },
  { id: 6, title: '山海经异闻录', cover: null, views: '9.4K' },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ProjectType>('single_episode');
  const [ideaText, setIdeaText] = useState('');
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [showBanner, setShowBanner] = useState(true);
  const createProject = useProjectStore((s) => s.createProject);

  const handleCreate = () => {
    if (!ideaText.trim()) return;
    const project = createProject(selectedMode, ideaText.trim());
    router.push(`/projects/${project.project_id}/canvas`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Breathing Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(192,3,28,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(255,77,77,0.10) 0%, transparent 70%)', animationDelay: '3s' }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(192,3,28,0.08) 0%, transparent 60%)', animationDelay: '1.5s' }}
        />
      </div>

      {/* Announcement Banner */}
      {showBanner && (
        <div
          className="relative z-20 flex items-center justify-center px-4 py-2 text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(90deg, #C0031C 0%, #FF4D4D 100%)' }}
        >
          <span>🚀 即将来袭：更稳的角色、更准的卡点、更自由的表达</span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Fixed Transparent Nav */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-md border-b border-white/5">
        <Logo />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs text-white/60 hover:text-white/80 border border-white/10 cursor-pointer transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {language === 'zh' ? '中文' : 'EN'}
          </button>
          <Button variant="ghost" size="sm" onClick={() => router.push('/projects')}>
            我的项目
          </Button>
          <Button size="sm" onClick={() => router.push('/login')}>
            注册 / 登录
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 pt-20 pb-10">
        {/* Hero Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1
            className="text-7xl lg:text-8xl xl:text-[110px] font-black tracking-tight leading-none animate-hero-glow"
            style={{ transform: 'skewX(-15deg) rotate(-5deg)' }}
          >
            <span className="text-white">把你的想法</span>
            <br />
            <span className="text-white">「玩」成一支视频</span>
          </h1>
        </div>

        {/* Search Box - Glassmorphism */}
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-3xl overflow-hidden">
            {/* Textarea */}
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="描述你的创意... 例如：一个关于白骨精和唐僧的现代爱情故事"
              className="w-full min-h-[120px] bg-transparent px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCreate();
              }}
            />

            {/* Bottom Toolbar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10">
              {/* Upload & Asset */}
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors">
                <Upload className="h-3.5 w-3.5" />
                上传音频
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-white/40 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-colors">
                <FolderOpen className="h-3.5 w-3.5" />
                素材
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              {/* Mode Tabs - Pill Style (hidden on mobile) */}
              <div className="hidden md:flex flex-shrink-0 items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5 overflow-x-auto">
                {modeTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedMode(tab.id)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-all whitespace-nowrap"
                    style={{
                      background: selectedMode === tab.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                      color: selectedMode === tab.id ? '#fff' : 'rgba(255,255,255,0.40)',
                    }}
                    onMouseEnter={(e) => { if (selectedMode !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.60)'; }}
                    onMouseLeave={(e) => { if (selectedMode !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.40)'; }}
                  >
                    {tab.short}
                  </button>
                ))}
              </div>

              <div className="flex-1" />

              {/* Language Selector */}
              <span className="text-[11px] text-white/20">{language === 'zh' ? '中文' : 'EN'}</span>

              <div className="h-4 w-px bg-white/10" />

              {/* Char Count */}
              <span className="text-[11px] text-white/20">{ideaText.length}/20,000</span>

              {/* Generate Button */}
              <button
                onClick={handleCreate}
                disabled={!ideaText.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-white cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: ideaText.trim() ? 'rgba(192,3,28,0.25)' : 'rgba(192,3,28,0.10)',
                }}
                onMouseEnter={(e) => { if (ideaText.trim()) e.currentTarget.style.background = 'rgba(192,3,28,0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ideaText.trim() ? 'rgba(192,3,28,0.25)' : 'rgba(192,3,28,0.10)'; }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Showcases Indicator */}
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-sm text-white/40 tracking-widest uppercase">Showcases</p>
          <ChevronDown className="h-5 w-5 text-white/20 mx-auto mt-2 animate-bounce" />
        </div>

        {/* Showcases Grid */}
        <section className="w-full max-w-5xl mt-16 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">The DreamX Lands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockShowcases.map((item) => (
              <div
                key={item.id}
                className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer transition-all hover:border-white/20 hover:bg-white/8"
              >
                <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                  <span className="text-3xl opacity-20">🎬</span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white/80 truncate group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 mt-1">{item.views} 次观看</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-5xl border-t border-white/10 pt-8 pb-12">
          <div className="flex flex-wrap justify-between gap-8">
            <div>
              <Logo />
              <p className="text-xs text-white/30 mt-2">AI 驱动的全链路短剧创作平台</p>
            </div>
            <div className="flex gap-12">
              <div>
                <h4 className="text-xs font-medium text-white/60 mb-3">产品</h4>
                <ul className="space-y-2 text-xs text-white/30">
                  <li className="hover:text-white/50 cursor-pointer">功能介绍</li>
                  <li className="hover:text-white/50 cursor-pointer">定价</li>
                  <li className="hover:text-white/50 cursor-pointer">更新日志</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-white/60 mb-3">资源</h4>
                <ul className="space-y-2 text-xs text-white/30">
                  <li className="hover:text-white/50 cursor-pointer">帮助中心</li>
                  <li className="hover:text-white/50 cursor-pointer">API 文档</li>
                  <li className="hover:text-white/50 cursor-pointer">社区</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-white/60 mb-3">法律</h4>
                <ul className="space-y-2 text-xs text-white/30">
                  <li className="hover:text-white/50 cursor-pointer">隐私政策</li>
                  <li className="hover:text-white/50 cursor-pointer">使用条款</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/20 mt-8 text-center">© 2026 DreamX Studio. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
