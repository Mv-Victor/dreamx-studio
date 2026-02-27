'use client';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { PROJECT_TYPE_LABELS } from '@/lib/utils';
import { ArrowLeft, MessageSquare, MessageSquareOff, Coins, Play } from 'lucide-react';

interface CanvasToolbarProps {
  project: Project;
  chatOpen: boolean;
  onToggleChat: () => void;
  onBack: () => void;
}

export function CanvasToolbar({ project, chatOpen, onToggleChat, onBack }: CanvasToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Logo />
        <div className="h-4 w-px bg-border" />
        <span className="text-sm font-medium truncate max-w-[200px]">{project.series_title}</span>
        <Badge variant="secondary">{PROJECT_TYPE_LABELS[project.project_type]}</Badge>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-sm mr-2">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-foreground font-medium">4,825</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleChat} title={chatOpen ? '关闭聊天' : '打开聊天'}>
          {chatOpen ? <MessageSquareOff className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </Button>
        <Button size="sm">
          <Play className="h-3.5 w-3.5" />
          预览
        </Button>
      </div>
    </div>
  );
}
