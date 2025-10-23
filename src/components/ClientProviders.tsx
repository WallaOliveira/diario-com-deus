'use client';

import { useEffect } from 'react';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  useEffect(() => {
    // Aplicar CSS global de acessibilidade
    const root = document.documentElement;
    
    // Definir tamanho de fonte padrão
    root.style.setProperty('--font-size-base', '16px');
    
    // Aplicar estilos de acessibilidade
    root.style.setProperty('--line-height-base', '1.6');
    root.style.setProperty('--letter-spacing-base', '0.01em');
    
    // Carregar tamanho salvo do localStorage
    const savedFontSize = localStorage.getItem('diario-font-size');
    if (savedFontSize) {
      const fontSizeConfig = {
        small: '14px',
        medium: '16px',
        large: '18px',
        'extra-large': '20px'
      };
      root.style.setProperty('--font-size-base', fontSizeConfig[savedFontSize as keyof typeof fontSizeConfig] || '16px');
    }
  }, []);

  return <>{children}</>;
}