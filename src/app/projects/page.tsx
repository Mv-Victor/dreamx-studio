'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjectStore } from '@/stores/project-store';
import { PROJECT_TYPE_LABELS, formatTime } from '@/lib/utils';
import { Plus, Coins, FolderOpen } from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-border">
        <Logo className="cursor-pointer" onClick={() => router.push('/')} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="text-foreground font-medium">4,825</span>
          </div>
          <Badge variant="accent">STARTER</Badge>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
            D
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">导演工案</h1>
            <p className="text-sm text-muted-foreground mt-1">你的创作项目</p>
          </div>
          <Button size="sm" onClick={() => router.push('/')}>
            <Plus className="h-4 w-4" />
            新建项目
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">空无一人的土地</p>
            <p className="text-xs text-muted-foreground mt-1">创建你的第一个项目开始创作</p>
            <Button className="mt-4" size="sm" onClick={() => router.push('/')}>
              开始创作
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.project_id}
                onClick={() => router.push(`/projects/${project.project_id}/canvas`)}
                className="group rounded-lg border border-border bg-card overflow-hidden cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Cover */}
                <div className="aspect-video bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                  {project.drama_cover ? (
                    <img src={project.drama_cover} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-3xl opacity-20">🎬</div>
                  )}
                </div>
                {/* Info */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {project.series_title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">{PROJECT_TYPE_LABELS[project.project_type]}</Badge>
                    <span className="text-xs text-muted-foreground">{formatTime(project.updated_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="border-t border-border px-6 py-2 flex justify-around">
        {[
          { label: '首页', icon: '🏠', active: true },
          { label: '存档', icon: '📁', active: false },
          { label: '资产', icon: '🎨', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs cursor-pointer ${
              tab.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
