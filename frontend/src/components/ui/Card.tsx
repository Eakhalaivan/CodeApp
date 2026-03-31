import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  isGlass?: boolean;
  isHoverable?: boolean;
}

export const Card = ({
  className,
  isGlass = true,
  isHoverable = true,
  children,
  ...props
}: CardProps) => {
  return (
    <motion.div
      whileHover={isHoverable ? { 
        y: -8, 
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
        borderColor: 'rgba(139, 92, 246, 0.3)' // Subtle primary border on hover
      } : {}}
      transition={{ type: 'tween', duration: 0.3 }}
      className={cn(
        'rounded-2xl border border-card-border bg-card shadow-lg p-6 group transition-colors will-change-transform',
        isGlass && 'glass-card',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
