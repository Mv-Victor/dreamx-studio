import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', onClick && 'cursor-pointer', className)} onClick={onClick}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <span className="text-white font-bold text-sm">DX</span>
      </div>
      <span className="font-semibold text-lg">DreamX Studio</span>
    </div>
  );
}
