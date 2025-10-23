// src/components/AccessibilityProvider.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useFontSize } from '@/hooks/useFontSize';

interface AccessibilityContextType {
  fontSize: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const fontControls = useFontSize();

  // Aplicar estilos globais de acessibilidade
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar tamanho de fonte base
    root.style.setProperty('--font-size-base', fontControls.fontSize === 'small' ? '14px' : 
                                 fontControls.fontSize === 'medium' ? '16px' :
                                 fontControls.fontSize === 'large' ? '18px' : '20px');
    
    // Aplicar estilos de acessibilidade
    root.style.setProperty('--line-height-base', '1.6');
    root.style.setProperty('--letter-spacing-base', '0.01em');
    
  }, [fontControls.fontSize]);

  return (
    <AccessibilityContext.Provider value={fontControls}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
