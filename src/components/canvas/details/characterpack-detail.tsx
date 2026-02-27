'use client';

import { useProjectStore } from '@/stores/project-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { Sparkles, Volume2, Plus } from 'lucide-react';

export function CharacterPackDetail() {
  const { characters, voices, loadVoices } = useProjectStore();

  useEffect(() => {
    if (voices.length === 0) loadVoices();
  }, [voices.length, loadVoices]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{characters.length} 个角色</p>
        <Button variant="ghost" size="sm">
          <Plus className="h-3.5 w-3.5" />
          添加角色
        </Button>
      </div>

      {characters.map((char) => (
        <div key={char.id} className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center flex-shrink-0">
              {char.image_url ? (
                <img src={char.image_url} alt="" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-xl">👤</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{char.name}</h4>
                <Badge variant={char.level === 'major' ? 'default' : 'secondary'}>
                  {char.level === 'major' ? '主角' : char.level === 'supporting' ? '配角' : '龙套'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{char.occupation}</p>
              <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                <span>{char.gender}</span>
                <span>·</span>
                <span>{char.age}</span>
                <span>·</span>
                <span>{char.height}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{char.brief_bio}</p>

          {/* Voice */}
          {char.voice_id && (
            <div className="flex items-center gap-2 bg-muted rounded-md px-2.5 py-1.5">
              <Volume2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs">
                {voices.find((v) => v.id === char.voice_id)?.name || '未选择'}
              </span>
              <button className="ml-auto text-xs text-primary cursor-pointer hover:underline">切换</button>
            </div>
          )}
        </div>
      ))}

      <Button className="w-full">
        <Sparkles className="h-4 w-4" />
        确认角色集
      </Button>
    </div>
  );
}
