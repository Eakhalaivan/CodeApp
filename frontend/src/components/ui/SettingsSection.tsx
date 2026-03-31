import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const SettingsSection = ({ title, description, children, icon }: SettingsSectionProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-10 last:mb-0"
    >
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </motion.section>
  );
};
