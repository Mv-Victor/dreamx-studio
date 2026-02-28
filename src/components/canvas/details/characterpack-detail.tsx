'use client';

import { useProjectStore } from '@/stores/project-store';
import { useEffect } from 'react';
import { Sparkles, Volume2, Plus, User } from 'lucide-react';
import { DetailSection } from '@/components/ui/detail-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CharacterPackData } from '@/types/canvas';

interface CharacterPackDetailProps {
  nodeData?: CharacterPackData;
  updateNode?: (patch: Partial<CharacterPackData>) => void;
  onNodeComplete?: () => void;
}

export function CharacterPackDetail({ onNodeComplete }: CharacterPackDetailProps) {
  const { characters, voices, loadVoices } = useProjectStore();

  useEffect(() => {
    if (voices.length === 0) loadVoices();
  }, [voices.length, loadVoices]);

  if (!characters || characters.length === 0) {
    return (
      <div className="p-5 text-center">
        <p className="text-sm text-white/40 mb-4">暂无角色数据</p>
        <Button variant="default" size="sm">
          <Sparkles className="h-3.5 w-3.5" />
          生成角色集
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <DetailSection icon={User} label="Characters">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-white/40">{characters.length} 个角色</span>
          <Button variant="secondary" size="sm">
            <Plus className="h-3 w-3" />
            添加角色
          </Button>
        </div>

        <div className="space-y-3">
          {characters.map((char) => (
            <div
              key={char.id}
              className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center flex-shrink-0 border border-white/10">
                  {char.image_url ? (
                    <span className="text-xl">👤</span>
                  ) : (
                    <User className="h-5 w-5 text-white/20" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-white/80">{char.name}</h4>
                    <Badge variant={char.level === 'major' ? 'default' : 'secondary'}>
                      {char.level === 'major' ? '主角' : char.level === 'supporting' ? '配角' : '龙套'}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5">{char.occupation}</p>
                  <div className="flex gap-1.5 mt-1 text-[10px] text-white/30">
                    <span>{char.gender}</span>
                    <span>·</span>
                    <span>{char.age}</span>
                    <span>·</span>
                    <span>{char.height}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-white/50 leading-relaxed">{char.brief_bio}</p>

              {/* Voice */}
              {char.voice_id && (
                <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Volume2 className="h-3 w-3 text-[#FF4D4D]" />
                  <span className="text-[10px] text-white/60">
                    {voices.find((v) => v.id === char.voice_id)?.name || '未选择'}
                  </span>
                  <button className="ml-auto text-[10px] text-[#FF4D4D] hover:underline cursor-pointer">切换</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          重新生成
        </Button>
        <Button variant="default" size="sm" className="flex-1" onClick={onNodeComplete}>
          <Sparkles className="h-3.5 w-3.5" />
          确认角色集
        </Button>
      </div>
    </div>
  );
}
