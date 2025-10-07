'use client';

import { useState, useEffect } from 'react';
import { FiX, FiSmartphone, FiDownload } from 'react-icons/fi';
import { analytics } from '@/lib/analytics';

interface PWAInstallBannerProps {
  onOpenGuide: () => void;
}

export default function PWAInstallBanner({ onOpenGuide }: PWAInstallBannerProps) {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Verificar se já foi instalado
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;

    // Verificar se usuário pediu para não mostrar mais
    const dismissed = localStorage.getItem('pwa_banner_dismissed');

    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iOS);

    // Mostrar banner se:
    // 1. Não está instalado
    // 2. Não foi dismissed
    // 3. Esperou 5 segundos (para não ser intrusivo)
    if (!isInstalled && !dismissed) {
      const timer = setTimeout(() => {
        setShow(true);
        analytics.pwaPromptShown();
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa_banner_dismissed', 'temp');
    analytics.pwaPromptDismissed();
    // Limpa depois de 7 dias
    setTimeout(() => {
      localStorage.removeItem('pwa_banner_dismissed');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  const handleNeverShow = () => {
    setShow(false);
    localStorage.setItem('pwa_banner_dismissed', 'permanent');
    analytics.pwaPromptDismissed();
  };

  const handleInstall = () => {
    analytics.pwaPromptAccepted();
    onOpenGuide();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slideUp">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-4 text-white">
        <div className="flex items-start gap-4">
          {/* Ícone */}
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <FiSmartphone size={24} />
          </div>

          {/* Conteúdo */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {isIOS ? '📱 Instale nosso app no iPhone!' : '📲 Instale nosso app!'}
            </h3>
            <p className="text-sm text-blue-100 mb-3">
              {isIOS 
                ? 'Acesso rápido pelo Safari, funciona offline e receba lembretes diários!'
                : 'Acesso rápido, funciona offline e receba lembretes diários!'
              }
            </p>

            {/* Botões */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleInstall}
                className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <FiDownload size={16} />
                {isIOS ? 'Ver como instalar' : 'Instalar agora'}
              </button>
              <button
                onClick={handleDismiss}
                className="text-blue-100 hover:text-white text-sm font-medium px-3 py-2 transition-colors"
              >
                Mais tarde
              </button>
              <button
                onClick={handleNeverShow}
                className="text-blue-200/70 hover:text-blue-100 text-xs px-2 py-2 transition-colors"
              >
                Não avisar novamente
              </button>
            </div>
          </div>

          {/* Botão fechar */}
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors p-1"
            title="Fechar"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para controlar o banner
export function usePWAInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    const dismissed = localStorage.getItem('pwa_banner_dismissed');
    
    if (!isInstalled && !dismissed) {
      setShowBanner(true);
    }
  }, []);

  return { showBanner };
}

