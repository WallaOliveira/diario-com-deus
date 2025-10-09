'use client';

import { useState } from 'react';
import { colors, typography, spacing } from '@/lib/design-system';

interface CheckInEmocionalProps {
  onSelect?: (emocao: string) => void;
}

export default function CheckInEmocional({ onSelect }: CheckInEmocionalProps) {
  const [selecionada, setSelecionada] = useState<string>('');

  const emocoes = [
    { id: 'ansioso', emoji: '😰', label: 'Ansioso(a)' },
    { id: 'grato', emoji: '😊', label: 'Grato(a)' },
    { id: 'cansado', emoji: '😔', label: 'Cansado(a)' },
    { id: 'esperancoso', emoji: '🙏', label: 'Esperançoso(a)' },
  ];

  const handleSelect = (emocaoId: string) => {
    setSelecionada(emocaoId);
    if (onSelect) {
      onSelect(emocaoId);
    }
    // Salvar no localStorage
    localStorage.setItem('emocao_hoje', emocaoId);
    localStorage.setItem('emocao_data', new Date().toISOString().split('T')[0]);
  };

  return (
    <div 
      style={{
        background: colors.background.card,
        borderRadius: '16px',
        padding: spacing.fixed.cardPadding,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <h3 
        className="mb-4"
        style={{ 
          fontFamily: typography.serif,
          fontSize: typography.heading.h3,
          fontWeight: typography.weights.semibold,
          color: colors.text.white
        }}
      >
        Como você está se sentindo hoje?
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {emocoes.map((emocao) => (
          <button
            key={emocao.id}
            onClick={() => handleSelect(emocao.id)}
            className="p-4 rounded-xl border-2 transition-all hover:scale-105"
            style={{
              background: selecionada === emocao.id 
                ? 'rgba(212, 175, 55, 0.2)' 
                : 'rgba(255, 255, 255, 0.05)',
              borderColor: selecionada === emocao.id 
                ? colors.accent.gold 
                : colors.border,
            }}
          >
            <span className="text-3xl block mb-2">{emocao.emoji}</span>
            <p 
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.body.sm,
                color: colors.text.white,
                fontWeight: selecionada === emocao.id 
                  ? typography.weights.semibold 
                  : typography.weights.normal
              }}
            >
              {emocao.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

