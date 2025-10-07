import React from 'react';
import { breakpoints, spacing } from '@/lib/design-system';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Container({ 
  children, 
  className = '',
  maxWidth = 'lg',
  padding = 'md'
}: ContainerProps) {
  
  const maxWidthClasses = {
    sm: 'max-w-sm',      // 384px
    md: 'max-w-md',      // 448px
    lg: 'max-w-2xl',     // 672px
    xl: 'max-w-4xl',     // 896px
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-4 md:px-6 lg:px-8',
    lg: 'px-6 md:px-8 lg:px-12',
  };

  return (
    <div 
      className={`
        mx-auto w-full
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        ${className}
      `}
      style={{
        // Container responsivo com fluid spacing
        paddingTop: spacing.fluid.sm,
        paddingBottom: spacing.fluid.sm,
      }}
    >
      {children}
    </div>
  );
}
