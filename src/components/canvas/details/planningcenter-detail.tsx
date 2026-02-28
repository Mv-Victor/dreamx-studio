'use client';

import React from 'react';
import { Sparkles, LayoutGrid, Image as ImageIcon, Film, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PlanningCenterData } from '@/types/canvas';
import { DEFAULT_PLANNING_CENTER_DATA } from '@/lib/defaults';

interface PlanningCenterDetailProps {
  _nodeData?: PlanningCenterData;
  _updateNode?: (patch: Partial<PlanningCenterData>) => void;
  onNodeComplete?: () => void;
}

export const PlanningCenterDetail = ({ _nodeData, _updateNode, onNodeComplete }: PlanningCenterDetailProps) => {
  // data is initialized for API consistency but not used directly in this component
  const data = { ...DEFAULT_PLANNING_CENTER_DATA, ..._nodeData }; // eslint-disable-line @typescript-eslint/no-unused-vars
  // updateNode is initialized for API consistency; fallback logs warning if not provided
  const updateNode = _updateNode || ((patch) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    console.warn('[PlanningCenterDetail] updateNode not provided:', patch);
  });
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '概览' },
    { id: 'cover', label: '封面' },
    { id: 'episodes', label: '剧集' },
  ];

  const mockEpisodes = [
    { id: 'e-001', title: '第一集：初遇', summary: '白骨夫人在荒山设下陷阱，等待取经队伍的到来。一场命运的邂逅即将展开。', sceneCount: 4 },
    { id: 'e-002', title: '第二集：试探', summary: '白骨夫人化身村姑接近取经队伍，与唐僧展开第一次对话。', sceneCount: 3 },
    { id: 'e-003', title: '第三集：动心', summary: '朝夕相处中，白骨夫人逐渐被唐僧的慈悲所打动。', sceneCount: 5 },
    { id: 'e-004', title: '第四集：抉择', summary: '真相揭开，两人必须在命运与自由之间做出抉择。', sceneCount: 6 },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg p-1 bg-[var(--bg-white-5)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 py-1.5 rounded-md text-[10px] font-medium cursor-pointer transition-all',
              activeTab === tab.id
                ? 'bg-[var(--brand-primary-rgba-20)] text-[var(--brand-accent)]'
                : 'bg-transparent text-white/40'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <DetailSection icon={LayoutGrid} label="Overview">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 mb-3">
            <h4 className="text-[10px] text-white/40 mb-1">核心叙事</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              千年白骨精为求解脱轮回之苦，化身人形接近取经僧人。在伪装的日子里，她逐渐被唐僧的慈悲所打动，一段跨越人妖界限的禁忌之恋就此展开。
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="default">奇幻</Badge>
            <Badge variant="secondary">爱情</Badge>
            <Badge variant="secondary">古装</Badge>
          </div>
        </DetailSection>
      )}

      {activeTab === 'cover' && (
        <DetailSection icon={ImageIcon} label="Cover">
          <div className="aspect-[3/4] rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mb-3">
            <div className="text-center">
              <ImageIcon className="h-8 w-8 text-white/20 mx-auto mb-2" />
              <p className="text-[10px] text-white/30">AI 生成封面</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              重新生成
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              上传参考
            </Button>
          </div>
        </DetailSection>
      )}

      {activeTab === 'episodes' && (
        <DetailSection icon={Film} label="Episodes">
          <div className="space-y-2">
            {mockEpisodes.map((ep, i) => (
              <div
                key={ep.id}
                className="rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-xs font-medium text-white/70">{ep.title}</h4>
                  </div>
                  <Eye className="h-3.5 w-3.5 text-white/20" />
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2">{ep.summary}</p>
                <div className="mt-2">
                  <Badge variant="outline">
                    {ep.sceneCount} 个场景
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* Action Button */}
      <Button variant="default" size="sm" className="w-full" onClick={onNodeComplete}>
        <Sparkles className="h-3.5 w-3.5" />
        确认规划
      </Button>
    </div>
  );
};

export default React.memo(PlanningCenterDetail);
