import { cn } from '../../utils/cn';
import React from 'react';

export const Container = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn('max-w-6xl mx-auto px-6 w-full', className)}>
    {children}
  </div>
);

export const Section = ({ className, children, id }: { className?: string, children: React.ReactNode, id?: string }) => (
  <section id={id} className={cn('py-20 relative overflow-hidden', className)}>
    {children}
  </section>
);
