'use client';

import { useProjectStore } from '@/stores/project-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';

export function PlanningCenterDetail() {
  const { episodes } = useProjectStore();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 space-y-4">
      <Tabs
        tabs={[
          { id: 'overview', label: '概览' },
          { id: 'cover', label: '封面' },
          { id: 'episodes', label: '剧集' },
        ]}
        defaultTab="overview"
        onChange={setActiveTab}
      />

      {activeTab === 'overview' && (
        <div className="space-y-3">
          <div className="rounded-lg bg-muted p-3">
            <h4 className="text-xs text-muted-foreground mb-1">核心叙事</h4>
            <p className="text-sm text-foreground leading-relaxed">
              千年白骨精为求解脱轮回之苦，化身人形接近取经僧人。在伪装的日子里，她逐渐被唐僧的慈悲所打动，一段跨越人妖界限的禁忌之恋就此展开。
            </p>
          </div>
          <div className="flex gap-2">
            <Badge>奇幻</Badge>
            <Badge variant="secondary">爱情</Badge>
            <Badge variant="secondary">古装</Badge>
          </div>
        </div>
      )}

      {activeTab === 'cover' && (
        <div className="space-y-3">
          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🎬</span>
              <p className="text-xs text-muted-foreground mt-2">AI 生成封面</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">重新生成</Button>
            <Button variant="outline" size="sm" className="flex-1">上传参考</Button>
          </div>
        </div>
      )}

      {activeTab === 'episodes' && (
        <div className="space-y-3">
          {episodes.map((ep, i) => (
            <div key={ep.episode_id} className="rounded-lg border border-border p-3 cursor-pointer hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-sm font-medium">{ep.title}</h4>
                </div>
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{ep.summary}</p>
              <div className="mt-2">
                <Badge variant="outline">{ep.scenes.length} 个场景</Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button className="w-full">
        <Sparkles className="h-4 w-4" />
        确认规划
      </Button>
    </div>
  );
}
