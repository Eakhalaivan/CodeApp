import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import React from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    outline: 'border border-card-border bg-transparent hover:bg-card-border/30 hover:shadow-cyan-500/10 text-foreground',
    ghost: 'bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground',
    danger: 'bg-danger text-white hover:bg-danger/90',
    accent: 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20',
    gradient: 'bg-gradient-to-r from-primary-from to-primary-to text-white shadow-xl shadow-primary/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    icon: 'p-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none gap-2 shrink-0 select-none will-change-transform',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : null}
      {children}
    </motion.button>
  );
};
