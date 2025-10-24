'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { colors, typography, spacing } from '@/lib/design-system';
import FontSizeControls from './FontSizeControls';

interface ModalRespiraProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onContinueAndDisable: () => void;
  tema?: string;
}

export default function ModalRespira({ isOpen, onClose, onContinue, onContinueAndDisable, tema }: ModalRespiraProps) {
  const [breathStep, setBreathStep] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  // Animação de respiração automática
  useEffect(() => {
    if (!isOpen) return;

    const breathCycle = () => {
      setBreathStep('inhale');
      setTimeout(() => setBreathStep('hold'), 2000);
      setTimeout(() => setBreathStep('exhale'), 4000);
      setTimeout(() => {
        setBreathStep('inhale');
        setBreathCount(prev => prev + 1);
      }, 6000);
    };

    const interval = setInterval(breathCycle, 6000);
    
    // Iniciar imediatamente
    breathCycle();

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const getBreathMessage = () => {
    switch (breathStep) {
      case 'inhale': return 'Inspire...';
      case 'hold': return 'Segure...';
      case 'exhale': return 'Expire...';
    }
  };

  const getBreathEmoji = () => {
    switch (breathStep) {
      case 'inhale': return '🫁';
      case 'hold': return '⏸️';
      case 'exhale': return '🌬️';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          background: colors.background.card,
          borderRadius: '20px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(20px)',
          boxShadow: colors.shadow.card
        }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              {tema && (
                <span 
                  className="inline-block px-3 py-1 bg-yellow-400/20 text-yellow-200 rounded-full text-xs font-medium border border-yellow-300/30"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)'
                  }}
                >
                  {tema}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <FontSizeControls />
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="text-center space-y-6">
            {/* Instrução inicial */}
            <div>
              <p 
                className="text-lg text-white leading-relaxed"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)'
                }}
              >
                Feche os olhos, inspire, segure e expire por 3x
              </p>
            </div>

            {/* Círculo de respiração animado */}
            <div className="flex justify-center">
              <div 
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-2000 ${
                  breathStep === 'inhale' ? 'scale-110 bg-blue-500/30' :
                  breathStep === 'hold' ? 'scale-125 bg-yellow-500/30' :
                  'scale-100 bg-green-500/30'
                }`}
                style={{
                  border: '3px solid #10b981',
                  animation: breathStep === 'inhale' ? 'pulse 2s ease-in-out' :
                             breathStep === 'hold' ? 'none' :
                             'pulse 2s ease-in-out reverse'
                }}
              >
                <div className="text-4xl">
                  {getBreathEmoji()}
                </div>
              </div>
            </div>

            {/* Mensagem de respiração */}
            <div>
              <p 
                className="text-2xl font-bold mb-2 transition-colors duration-500"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
                  color: breathStep === 'inhale' ? colors.text.blue :
                         breathStep === 'hold' ? colors.text.gold :
                         '#10b981'
                }}
              >
                {getBreathMessage()}
              </p>
            </div>

            {/* Instrução final */}
            <p 
              className="text-base text-white/90"
              style={{ 
                fontFamily: typography.sans,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              Deixe o caos para trás. Este é um momento sagrado.
            </p>

            {/* Botões de ação */}
            <div className="space-y-3">
              <button
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Estou Presente - Continuar
              </button>
              
              <button
                onClick={onContinueAndDisable}
                className="w-full bg-white/10 text-white/80 border border-white/20 py-2 px-4 rounded-lg transition-all hover:bg-white/20 hover:text-white"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Não aparecer novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
