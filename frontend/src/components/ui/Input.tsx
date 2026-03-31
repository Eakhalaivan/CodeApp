import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={cn('relative w-full mb-6', className)}>
      <motion.div
        animate={error ? 'shake' : ''}
        variants={shakeVariants}
        className="relative"
      >
        <input
          {...props}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={handleBlur}
          onChange={(e) => { setHasValue(!!e.target.value); props.onChange?.(e); }}
          className={cn(
            "w-full bg-slate-800/50 border rounded-xl px-4 pt-6 pb-2 text-foreground outline-none transition-all duration-300",
            isFocused ? "border-primary ring-4 ring-primary/10 shadow-lg" : "border-slate-700",
            error ? "border-red-500 ring-red-500/10" : "hover:border-slate-600"
          )}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none font-medium",
            (isFocused || hasValue) 
              ? "top-2 text-xs text-primary" 
              : "top-4 text-base text-slate-500"
          )}
        >
          {label}
        </label>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-xs mt-1 absolute"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
