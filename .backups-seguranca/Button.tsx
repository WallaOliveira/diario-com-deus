import React from 'react';
import Link from 'next/link';
import { colors, typography, components } from '@/lib/design-system';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  disabled = false 
}: ButtonProps) {
  
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3.5 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const baseStyles = `
    font-semibold rounded-xl transition-all duration-300 
    flex items-center justify-center gap-2 w-full
    ${sizeStyles[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
    ${className}
  `;

  const variantStyles = variant === 'primary' 
    ? {
        background: colors.text.gold,
        color: '#0f172a',
        boxShadow: colors.shadow.gold,
        fontFamily: typography.sans,
      }
    : {
        background: 'transparent',
        color: colors.text.white,
        border: `2px solid ${colors.text.white}`,
        fontFamily: typography.sans,
      };

  const buttonElement = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      style={variantStyles}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}
