import React from 'react';
import './ViperCard.css';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface ViperCardProps {
  title: string;
  marqueeText?: string;
  icon?: LucideIcon;
  theme?: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'amber';
  level?: string;
  onClick?: () => void;
  className?: string;
}

export const ViperCard: React.FC<ViperCardProps> = ({
  title,
  marqueeText = "VIPER",
  icon: Icon,
  theme = 'green',
  level,
  onClick,
  className
}) => {
  return (
    <div 
      className={cn("viper-card-container", `theme-${theme}`, className)}
      onClick={onClick}
    >
      <div className="card-border">
        <div className="card-bg">
          <div className="container-logo">
            <div className="logo"></div>
            <div className="logo-inside">
              {Icon ? <Icon className="w-5 h-5 text-white z-10" /> : (
                <>
                  <div className="first"></div>
                  <div className="second"></div>
                </>
              )}
            </div>
          </div>
          <div id="blur-area"></div>
          <div className="marquee">
            <div className="marquee__inner" aria-hidden="true">
              <span className="viper-text">{marqueeText} {marqueeText} {marqueeText} {marqueeText}</span>
              <span className="viper-text">{marqueeText} {marqueeText} {marqueeText} {marqueeText}</span>
              <span className="viper-text">{marqueeText} {marqueeText} {marqueeText} {marqueeText}</span>
            </div>
          </div>
        </div>
        
        <div className="mist-container">
          <div className="mist"></div>
        </div>
        
        <strong id="text-ext">{title}</strong>
        <strong id="text-border">
          {title}
          {level && (
            <span className="block text-[10px] opacity-70 mt-1 tracking-widest">{level}</span>
          )}
        </strong>
      </div>
    </div>
  );
};
