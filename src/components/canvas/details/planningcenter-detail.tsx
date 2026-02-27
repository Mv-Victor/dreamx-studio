'use client';

import { Sparkles, LayoutGrid, Image as ImageIcon, Film, Eye } from 'lucide-react';
import { useState } from 'react';

export function PlanningCenterDetail() {
  const [activeTab, setActiveTab] = useState('overview');

  const Section = ({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) => (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="h-4 w-4 text-white/40" />
        <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      {children}
    </div>
  );

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
      <div className="flex gap-1 rounded-lg p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-1.5 rounded-md text-[10px] font-medium cursor-pointer transition-all"
            style={{
              background: activeTab === tab.id ? 'rgba(192,3,28,0.20)' : 'transparent',
              color: activeTab === tab.id ? '#FF4D4D' : 'rgba(255,255,255,0.40)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <Section icon={LayoutGrid} label="Overview">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 mb-3">
            <h4 className="text-[10px] text-white/40 mb-1">核心叙事</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              千年白骨精为求解脱轮回之苦，化身人形接近取经僧人。在伪装的日子里，她逐渐被唐僧的慈悲所打动，一段跨越人妖界限的禁忌之恋就此展开。
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(192,3,28,0.20)', color: '#FF4D4D' }}>奇幻</span>
            <span className="text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.40)' }}>爱情</span>
            <span className="text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.40)' }}>古装</span>
          </div>
        </Section>
      )}

      {activeTab === 'cover' && (
        <Section icon={ImageIcon} label="Cover">
          <div className="aspect-[3/4] rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mb-3">
            <div className="text-center">
              <ImageIcon className="h-8 w-8 text-white/20 mx-auto mb-2" />
              <p className="text-[10px] text-white/30">AI 生成封面</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 rounded-lg text-[10px] font-medium transition-all cursor-pointer border border-white/10"
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.60)' }}
            >
              重新生成
            </button>
            <button
              className="flex-1 py-2 rounded-lg text-[10px] font-medium transition-all cursor-pointer border border-white/10"
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.60)' }}
            >
              上传参考
            </button>
          </div>
        </Section>
      )}

      {activeTab === 'episodes' && (
        <Section icon={Film} label="Episodes">
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
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.30)' }}>
                    {ep.sceneCount} 个场景
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Action Button */}
      <button
        className="w-full py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
        style={{ background: 'rgba(192,3,28,0.20)', color: '#FF4D4D' }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        确认规划
      </button>
    </div>
  );
}
