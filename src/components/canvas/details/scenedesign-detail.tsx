'use client';

import { Sparkles, RefreshCw, Image as ImageIcon, Lock } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import type { SceneDesignData } from '@/types/canvas';

interface SceneDesignDetailProps {
  _nodeData?: SceneDesignData;
  _updateNode?: (patch: Partial<SceneDesignData>) => void;
  onNodeComplete?: () => void;
}

const DEFAULT_SCENE_DESIGN_DATA: SceneDesignData = {
  label: '场景设计',
  status: 'generating',
  scenes: [],
};

const SCENE_DESIGN_MOCK_DATA = [
  { id: 1, header: '外景 - 荒山古道 - 黄昏', status: 'completed' as const },
  { id: 2, header: '内景 - 白骨洞 - 夜', status: 'generating' as const },
  { id: 3, header: '外景 - 山间小路 - 清晨', status: 'pending' as const },
  { id: 4, header: '内景 - 客栈 - 午后', status: 'pending' as const },
];

export function SceneDesignDetail({ _nodeData, _updateNode, onNodeComplete }: SceneDesignDetailProps) {
  // TODO: Implement data binding when backend integration is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = { ...DEFAULT_SCENE_DESIGN_DATA, ..._nodeData };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateNode = _updateNode || ((patch) => {
    console.warn('[SceneDesignDetail] updateNode not provided:', patch);
  });

  return (
    <div className="p-4 space-y-4">
      <DetailSection icon={ImageIcon} label="Scene Design">
        <p className="text-xs text-white/40 mb-3">AI 为每个场景生成视觉参考图</p>

        <div className="space-y-3">
          {SCENE_DESIGN_MOCK_DATA.map((scene) => (
            <div key={scene.id} className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative">
                {scene.status === 'generating' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-5 h-5 border-2 border-[#FF4D4D] border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-[10px] text-white/60 mt-2">生成中...</p>
                    </div>
                  </div>
                )}
                {scene.status === 'completed' && <span className="text-2xl opacity-30">🖼</span>}
                {scene.status === 'pending' && (
                  <>
                    <span className="text-2xl opacity-10">🖼</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-white/20" />
                    </div>
                  </>
                )}
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/30">
                    {String(scene.id).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-white/60 truncate">{scene.header}</span>
                </div>
                <StatusBadge status={scene.status} />
              </div>
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          <RefreshCw className="h-3.5 w-3.5" />
          重新生成
        </Button>
        <Button variant="default" size="sm" className="flex-1" onClick={onNodeComplete}>
          <Sparkles className="h-3.5 w-3.5" />
          确认场景
        </Button>
      </div>
    </div>
  );
}
