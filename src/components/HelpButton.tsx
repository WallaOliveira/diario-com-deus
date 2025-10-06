'use client';

import { useState, useRef, useEffect } from 'react';
import { FiHelpCircle, FiBook, FiMail, FiMessageCircle } from 'react-icons/fi';

interface HelpButtonProps {
  onOpenTutorial: () => void;
}

export default function HelpButton({ onOpenTutorial }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTutorialClick = () => {
    setIsOpen(false);
    onOpenTutorial();
  };

  const handleSupportClick = () => {
    setIsOpen(false);
    // Abre WhatsApp, email ou sistema de suporte
    window.open('mailto:suporte@diariocomdeus.com.br?subject=Preciso de Ajuda', '_blank');
  };

  const handleFaqClick = () => {
    setIsOpen(false);
    // Redireciona para página de FAQ (criar depois)
    alert('Página de Perguntas Frequentes em breve!');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn mb-2 w-56">
          <div className="py-2">
            <button
              onClick={handleTutorialClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiBook size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Ver Tutorial</p>
                <p className="text-xs text-slate-500">Revisar funcionalidades</p>
              </div>
            </button>

            <button
              onClick={handleFaqClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiMessageCircle size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Perguntas Frequentes</p>
                <p className="text-xs text-slate-500">Tire suas dúvidas</p>
              </div>
            </button>

            <button
              onClick={handleSupportClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FiMail size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Falar com Suporte</p>
                <p className="text-xs text-slate-500">Estamos aqui para ajudar</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Botão principal - discreto e translúcido */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative
          w-12 h-12 
          rounded-full 
          backdrop-blur-md
          border border-slate-200/50
          shadow-lg hover:shadow-xl 
          transition-all duration-300
          ${isOpen 
            ? 'bg-blue-600 text-white scale-110' 
            : 'bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 hover:scale-105'
          }
        `}
        title="Ajuda e Suporte"
      >
        <FiHelpCircle 
          size={20} 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
        
        {/* Badge de "novo" (opcional) */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}

