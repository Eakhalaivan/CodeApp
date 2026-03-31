import { cn } from '../../utils/cn';

export const Skeleton = ({ className, variant = 'rect' }: { className?: string, variant?: 'rect' | 'circle' | 'text' }) => {
  return (
    <div 
      className={cn(
        "animate-shimmer bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:400%_100%] overflow-hidden",
        variant === 'circle' ? 'rounded-full' : 'rounded-lg',
        variant === 'text' ? 'h-4 w-full' : '',
        className
      )}
    />
  );
};
