import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip = ({ content, children, position = 'top', className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const coords = {
    top: { bottom: '120%', left: '50%', x: '-50%', y: 10 },
    bottom: { top: '120%', left: '50%', x: '-50%', y: -10 },
    left: { right: '120%', top: '50%', y: '-50%', x: 10 },
    right: { left: '120%', top: '50%', y: '-50%', x: -10 },
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, ...coords[position] }}
            animate={{ opacity: 1, x: coords[position].x, y: 0 }}
            exit={{ opacity: 0, ...coords[position] }}
            className={cn(
              "absolute z-[200] px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-white shadow-xl whitespace-nowrap",
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
