'use client';

import React from 'react';
import { FiMinus, FiPlus, FiType } from 'react-icons/fi';
import { useFontSize } from '@/hooks/useFontSize';
import { colors, typography } from '@/lib/design-system';

interface FontSizeControlsProps {
  className?: string;
}

export const FontSizeControls: React.FC<FontSizeControlsProps> = ({ className = '' }) => {
  const { 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize, 
    canIncrease, 
    canDecrease 
  } = useFontSize();

  const getFontSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return 'A-';
      case 'medium': return 'A';
      case 'large': return 'A+';
      case 'extra-large': return 'A++';
      default: return 'A';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Ícone de fonte */}
      <FiType 
        size={16} 
        className="text-white/80"
        style={{ color: colors.text.whiteSubtle }}
      />
      
      {/* Botão diminuir */}
      <button
        onClick={decreaseFontSize}
        disabled={!canDecrease}
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
          ${canDecrease 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-white/5 text-white/30 cursor-not-allowed'
          }
        `}
        style={{ fontFamily: typography.sans }}
        title="Diminuir tamanho da fonte"
      >
        <FiMinus size={14} />
      </button>

      {/* Indicador atual */}
      <span 
        className="text-sm font-medium px-2 py-1 rounded-md bg-white/10 text-white"
        style={{ fontFamily: typography.sans }}
      >
        {getFontSizeLabel(fontSize)}
      </span>

      {/* Botão aumentar */}
      <button
        onClick={increaseFontSize}
        disabled={!canIncrease}
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
          ${canIncrease 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-white/5 text-white/30 cursor-not-allowed'
          }
        `}
        style={{ fontFamily: typography.sans }}
        title="Aumentar tamanho da fonte"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
};