import React from 'react';
import { colors, typography, spacing, utils } from '@/lib/design-system';

interface TitleProps {
  className?: string;
  size?: 'mobile' | 'desktop';
}

export default function Title({ className = '', size = 'mobile' }: TitleProps) {
  // Usando fluid typography - se adapta automaticamente (aumentados)
  const fontSizeDiario = 'clamp(3rem, 7vw, 4.5rem)';     // Aumentado de 2.5-4rem para 3-4.5rem
  const fontSizeDeus = 'clamp(3.5rem, 8vw, 5rem)';       // Aumentado de 3-4.5rem para 3.5-5rem
  const fontSizeCom = 'clamp(1.25rem, 3.5vw, 1.75rem)';  // Aumentado de 1-1.5rem para 1.25-1.75rem

  return (
    <div 
      className={`flex items-baseline justify-center flex-wrap mb-4 ${className}`}
      style={{ 
        lineHeight: 1,
        gap: spacing.fixed.titleGap
      }}
    >
      <span 
        className="font-bold"
        style={{ 
          fontFamily: typography.serif,
          fontWeight: typography.weights.semibold,
          fontSize: fontSizeDiario,
          letterSpacing: typography.letterSpacing.tight,
          ...utils.textGradient(colors.text.gold)
        }}
      >
        Diário
      </span>
      <span 
        className="font-light"
      style={{ 
        fontFamily: typography.serif,
        fontWeight: typography.weights.light,
        fontSize: fontSizeCom,
        color: colors.text.whiteSubtle,
        letterSpacing: typography.letterSpacing.normal,
        margin: `0 ${spacing.fixed.titleMargin}`,
        transform: 'translateY(-0.1em)'
      }}
      >
        com
      </span>
      <span 
        className="font-bold"
        style={{ 
          fontFamily: typography.serif,
          fontWeight: typography.weights.semibold,
          fontSize: fontSizeDeus,
          letterSpacing: typography.letterSpacing.tight,
          ...utils.textGradient(colors.text.blue)
        }}
      >
        Deus
      </span>
    </div>
  );
}
