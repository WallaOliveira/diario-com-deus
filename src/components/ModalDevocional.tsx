'use client';

import { useState, useEffect } from 'react';
import { FiX, FiHeart, FiCalendar } from 'react-icons/fi';
import { colors, typography } from '@/lib/design-system';
import FontSizeControls from './FontSizeControls';

interface DevocionalData {
  id: string;
  title: string;
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
  action: string;
  date: string;
  isFavorited?: boolean;
}

interface ModalDevocionalProps {
  isOpen: boolean;
  onClose: () => void;
  devocional: DevocionalData | null;
  onToggleFavorite: (devocional: DevocionalData) => void;
}

export default function ModalDevocional({
  isOpen,
  onClose,
  devocional,
  onToggleFavorite
}: ModalDevocionalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen || !devocional) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          background: colors.background.card,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.accent.gold
            }}>
              <FiCalendar className="text-white" size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 
                className="font-bold leading-tight"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'clamp(1rem, calc(var(--font-size-base, 1rem) * 1.1), 1.3rem)',
                  color: colors.text.white,
                  wordBreak: 'keep-all',
                  hyphens: 'none',
                  lineHeight: '1.2'
                }}
              >
                {devocional.title}
              </h2>
              <p 
                className="text-sm opacity-80 mt-1"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'clamp(0.875rem, calc(var(--font-size-base, 1rem) * 0.875), 1rem)',
                  color: colors.text.whiteMuted
                }}
              >
                {devocional.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
            <FontSizeControls />
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Versículo */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
            <p 
              className="mb-3 leading-relaxed"
              style={{ 
                fontFamily: typography.serif,
                color: colors.text.white,
                fontSize: 'var(--font-size-base, 1rem)',
                fontStyle: 'italic'
              }}
            >
              "{devocional.verse}"
            </p>
            <p 
              className="text-sm font-medium"
              style={{ 
                fontFamily: typography.sans,
                color: colors.accent.gold,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              {devocional.reference}
            </p>
          </div>

          {/* Reflexão */}
          <div>
            <p 
              className="text-sm font-medium mb-2"
              style={{ 
                fontFamily: typography.sans,
                color: colors.accent.blue,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)'
              }}
            >
              Reflexão
            </p>
            <p 
              className="leading-relaxed"
              style={{ 
                fontFamily: typography.sans,
                color: colors.text.whiteMuted,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              {devocional.reflection}
            </p>
          </div>

          {/* Oração */}
          <div>
            <p 
              className="text-sm font-medium mb-2"
              style={{ 
                fontFamily: typography.sans,
                color: colors.accent.purple,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)'
              }}
            >
              Oração
            </p>
            <p 
              className="leading-relaxed"
              style={{ 
                fontFamily: typography.sans,
                color: colors.text.whiteMuted,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              {devocional.prayer}
            </p>
          </div>

          {/* Ação do Dia */}
          <div>
            <p 
              className="text-sm font-medium mb-2"
              style={{ 
                fontFamily: typography.sans,
                color: colors.accent.green,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)'
              }}
            >
              Ação do Dia
            </p>
            <p 
              className="leading-relaxed"
              style={{ 
                fontFamily: typography.sans,
                color: colors.text.whiteMuted,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              {devocional.action}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => onToggleFavorite(devocional)}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                devocional.isFavorited 
                  ? 'text-white bg-red-500 hover:bg-red-600' 
                  : 'text-red-500 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50'
              }`}
              style={{
                fontFamily: typography.sans,
                fontSize: 'clamp(0.875rem, calc(var(--font-size-base, 1rem) * 0.875), 1rem)',
                fontWeight: typography.weights.medium,
                minHeight: '40px'
              }}
            >
              <FiHeart 
                size={14} 
                fill={devocional.isFavorited ? 'currentColor' : 'none'}
              />
              <span className="hidden sm:inline">
                {devocional.isFavorited ? 'Favoritado' : 'Favoritar'}
              </span>
              <span className="sm:hidden">
                {devocional.isFavorited ? '❤️' : '🤍'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-xl font-medium transition-all"
              style={{
                background: colors.accent.gold,
                color: 'white',
                fontFamily: typography.sans,
                fontSize: 'clamp(0.875rem, calc(var(--font-size-base, 1rem) * 0.875), 1rem)',
                fontWeight: typography.weights.medium,
                minHeight: '40px'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
