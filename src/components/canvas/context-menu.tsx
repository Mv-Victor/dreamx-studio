'use client';

import { useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import type { NodeType } from '@/types/canvas';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onSelect: (type: NodeType) => void;
}

const NODE_OPTIONS: { type: NodeType; label: string; icon: string; description: string }[] = [
  { type: 'checkpoint', label: '基础信息', icon: '⚙️', description: '语言、风格、比例' },
  { type: 'storybible', label: '故事圣经', icon: '📖', description: '世界观、基调、主题' },
  { type: 'characterpack', label: '角色集', icon: '👥', description: '角色形象与配音' },
  { type: 'planningcenter', label: '规划中心', icon: '📋', description: '封面、剧集大纲' },
  { type: 'script', label: '剧本撰写', icon: '✍️', description: 'AI 生成分场剧本' },
  { type: 'scenedesign', label: '场景设计', icon: '🎬', description: 'AI 生成视觉参考' },
  { type: 'segmentdesign', label: '分镜设计', icon: '🎞️', description: '逐镜头分镜' },
  { type: 'compose', label: '合成导出', icon: '🎬', description: '视频合成与导出' },
];

export function ContextMenu({ x, y, onClose, onSelect }: ContextMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="context-menu fixed z-[100] w-72 rounded-xl border border-[var(--border-white-10)] bg-[#0a0a0f] shadow-2xl animate-fade-in"
      style={{ left: x, top: y }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-white-10)]">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-[var(--brand-primary)]" />
          <span className="text-xs font-semibold text-white/90">添加节点</span>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/5 cursor-pointer">
          <X className="h-3.5 w-3.5 text-white/40" />
        </button>
      </div>

      {/* Options */}
      <div className="max-h-[400px] overflow-y-auto p-2">
        {NODE_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => {
              onSelect(option.type);
              onClose();
            }}
            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer group"
          >
            <div className="text-xl">{option.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90 group-hover:text-white">
                  {option.label}
                </span>
              </div>
              <p className="text-[10px] text-white/40 mt-0.5">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
