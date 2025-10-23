'use client';

import { useState, useEffect, useCallback } from 'react';

export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

const FONT_SIZE_CONFIG = {
  small: '14px',
  medium: '16px',
  large: '18px',
  'extra-large': '20px'
};

const FONT_SIZE_STORAGE_KEY = 'diario-font-size';

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  // Função para aplicar tamanho globalmente
  const applyFontSize = useCallback((newFontSize: FontSize) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-size-base', FONT_SIZE_CONFIG[newFontSize]);
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, newFontSize);
      
      // Disparar evento customizado para sincronizar entre componentes
      window.dispatchEvent(new CustomEvent('fontSizeChanged', { 
        detail: { fontSize: newFontSize } 
      }));
    }
  }, []);

  // Carregar tamanho salvo do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFontSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize;
      if (savedFontSize && FONT_SIZE_CONFIG[savedFontSize]) {
        setFontSize(savedFontSize);
        applyFontSize(savedFontSize);
      }
    }
  }, [applyFontSize]);

  // Escutar mudanças de outros componentes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleFontSizeChange = (e: CustomEvent) => {
        setFontSize(e.detail.fontSize);
      };

      window.addEventListener('fontSizeChanged', handleFontSizeChange as EventListener);
      
      return () => {
        window.removeEventListener('fontSizeChanged', handleFontSizeChange as EventListener);
      };
    }
  }, []);

  const increaseFontSize = useCallback(() => {
    const sizes: FontSize[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      const newFontSize = sizes[currentIndex + 1];
      setFontSize(newFontSize);
      applyFontSize(newFontSize);
    }
  }, [fontSize, applyFontSize]);

  const decreaseFontSize = useCallback(() => {
    const sizes: FontSize[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      const newFontSize = sizes[currentIndex - 1];
      setFontSize(newFontSize);
      applyFontSize(newFontSize);
    }
  }, [fontSize, applyFontSize]);

  const resetFontSize = useCallback(() => {
    setFontSize('medium');
    applyFontSize('medium');
  }, [applyFontSize]);

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    canIncrease: fontSize !== 'extra-large',
    canDecrease: fontSize !== 'small'
  };
}