'use client';

import { useEffect } from 'react';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  useEffect(() => {
    // Função para aplicar tamanho de fonte global
    const applyGlobalFontSize = () => {
      const root = document.documentElement;
      
      // Carregar tamanho salvo do localStorage
      const savedFontSize = localStorage.getItem('diario-font-size') || 'medium';
      
      const fontSizeConfig = {
        small: '14px',
        medium: '16px',
        large: '18px',
        'extra-large': '20px'
      };
      
      const fontSize = fontSizeConfig[savedFontSize as keyof typeof fontSizeConfig] || '16px';
      root.style.setProperty('--font-size-base', fontSize);
    };

    // Aplicar imediatamente
    applyGlobalFontSize();

    // Escutar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'diario-font-size') {
        applyGlobalFontSize();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return <>{children}</>;
}