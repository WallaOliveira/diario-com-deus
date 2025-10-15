'use client';

import { useEffect, useState } from 'react';
import { colors, typography } from '@/lib/design-system';

interface ToastCelebracaoProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  descricao: string;
  icone: string;
  duracao?: number; // em milissegundos
}

export default function ToastCelebracao({
  isOpen,
  onClose,
  titulo,
  descricao,
  icone,
  duracao = 4000
}: ToastCelebracaoProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para animação de entrada
      setTimeout(() => setIsVisible(true), 100);
      
      // Auto-fechar após duração
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Tempo para animação de saída
      }, duracao);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, duracao, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{
        maxWidth: '320px'
      }}
    >
      <div
        className="backdrop-blur-lg rounded-xl p-4 shadow-lg border"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          fontFamily: typography.sans
        }}
      >
        <div className="flex items-start gap-3">
          {/* Ícone */}
          <div className="flex-shrink-0 text-3xl mt-0.5">
            {icone}
          </div>
          
          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm mb-1">
              {titulo}
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              {descricao}
            </p>
          </div>
          
          {/* Botão fechar (opcional) */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

