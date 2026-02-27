'use client';

import { cn } from '@/lib/utils';

interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn('flex gap-2', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border"
          style={{
            background: value === option.value ? 'var(--brand-primary-rgba-20)' : 'var(--bg-white-5)',
            border: value === option.value ? 'var(--brand-primary-rgba-40)' : 'var(--border-white-10)',
            color: value === option.value ? 'var(--brand-accent)' : 'var(--text-white-60)',
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
