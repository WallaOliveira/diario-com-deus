// src/hooks/useFontSize.ts
import { useState, useEffect } from 'react';

export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

interface FontSizeConfig {
  small: string;
  medium: string;
  large: string;
  'extra-large': string;
}

const FONT_SIZE_CONFIG: FontSizeConfig = {
  small: '14px',
  medium: '16px',
  large: '18px',
  'extra-large': '20px'
};

const FONT_SIZE_STORAGE_KEY = 'diario-font-size';

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  // Carregar tamanho salvo do localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize;
    if (savedFontSize && FONT_SIZE_CONFIG[savedFontSize]) {
      setFontSize(savedFontSize);
    }
  }, []);

  // Aplicar tamanho no CSS
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-size-base', FONT_SIZE_CONFIG[fontSize]);
    
    // Salvar no localStorage
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
  }, [fontSize]);

  const increaseFontSize = () => {
    const sizes: FontSize[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const sizes: FontSize[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontSize('medium');
  };

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    canIncrease: fontSize !== 'extra-large',
    canDecrease: fontSize !== 'small'
  };
}
