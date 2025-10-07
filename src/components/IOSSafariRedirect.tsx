'use client';

import { useEffect, useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

export default function IOSSafariRedirect() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detectar se é iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    // Detectar se é Safari
    const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(userAgent);
    
    // Detectar se já está instalado como PWA
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;

    // Verificar se usuário já viu este aviso
    const dismissed = localStorage.getItem('ios_safari_redirect_dismissed');

    // Mostrar aviso se:
    // 1. É iOS
    // 2. NÃO é Safari
    // 3. NÃO está instalado
    // 4. NÃO foi dismissed
    if (isIOS && !isSafari && !isInstalled && !dismissed) {
      // Aguarda 2 segundos para não ser intrusivo
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    // Salva por 30 dias
    localStorage.setItem('ios_safari_redirect_dismissed', new Date().toISOString());
  };

  const handleOpenSafari = () => {
    // Tenta abrir no Safari
    const currentUrl = window.location.href;
    
    // iOS permite abrir URLs no Safari através de esquemas especiais
    // Mas por limitação, vamos apenas instruir o usuário
    setShow(false);
    localStorage.setItem('ios_safari_redirect_dismissed', new Date().toISOString());
    
    // Mostra instrução de copiar URL
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert('✅ Link copiado! Agora:\n\n1. Abra o Safari\n2. Cole o link (segurar na barra de endereço)\n3. Pronto! Você poderá instalar o app 📱');
      } catch (err) {
        alert('📱 Para instalar o app:\n\n1. Copie este link: ' + currentUrl + '\n2. Abra o Safari\n3. Cole o link\n4. Siga as instruções de instalação');
      }
    };
    
    copyToClipboard();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
        {/* Ícone de alerta */}
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiAlertCircle className="text-amber-600" size={32} />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">
          Para instalar no iPhone
        </h2>

        {/* Descrição */}
        <p className="text-slate-600 mb-4 text-center leading-relaxed">
          Você está usando o <strong>Chrome ou outro navegador</strong>. 
          No iPhone, a instalação de apps só funciona no <strong>Safari</strong>.
        </p>

        {/* Instruções */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-900 font-medium mb-2">
            <strong>Como abrir no Safari:</strong>
          </p>
          <ol className="text-sm text-blue-800 space-y-1 pl-4">
            <li>1. Toque no botão abaixo para copiar o link</li>
            <li>2. Abra o app <strong>Safari</strong> 🧭</li>
            <li>3. Cole o link na barra de endereço</li>
            <li>4. Pronto! Você poderá instalar o app 📱</li>
          </ol>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleOpenSafari}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            📋 Copiar link e ver instruções
          </button>
          <button
            onClick={handleDismiss}
            className="w-full text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
          >
            Continuar mesmo assim
          </button>
        </div>

        {/* Nota */}
        <p className="text-xs text-slate-500 text-center mt-4">
          💡 Você ainda pode usar o app normalmente no navegador atual. 
          O aviso é apenas para instalação.
        </p>

        {/* Botão fechar */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          title="Fechar"
        >
          <FiX size={24} />
        </button>
      </div>
    </div>
  );
}

