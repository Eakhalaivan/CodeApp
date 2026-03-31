import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'basic' | 'easy' | 'medium' | 'hard' | 'default' | 'accent' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    basic: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    easy: 'bg-success/10 text-success border border-success/20',
    medium: 'bg-warning/10 text-warning border border-warning/20',
    hard: 'bg-danger/10 text-danger border border-danger/20',
    accent: 'bg-primary/10 text-primary border border-primary/20',
    outline: 'border border-white/10 bg-transparent text-slate-400',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
