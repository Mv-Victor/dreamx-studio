'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TabsProps {
  tabs: { id: string; label: string }[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn('flex gap-1 rounded-lg bg-muted p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActive(tab.id);
            onChange?.(tab.id);
          }}
          className={cn(
            'flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer',
            active === tab.id
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
