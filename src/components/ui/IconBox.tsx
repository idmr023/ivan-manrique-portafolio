import type { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  size?: number;
  color?: 'sky' | 'neon' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  sky: 'bg-sky-400/10 border-sky-400/20 text-sky-400',
  neon: 'bg-neon-400/10 border-neon-400/20 text-neon-400',
  amber: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
};

export default function IconBox({
  icon: Icon,
  size = 22,
  color = 'sky',
  className = 'w-12 h-12',
}: IconBoxProps) {
  return (
    <div className={`${className} rounded-md border flex items-center justify-center shrink-0 ${COLOR_MAP[color]}`}>
      <Icon size={size} />
    </div>
  );
}
