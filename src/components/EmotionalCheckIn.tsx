'use client';

import { useState } from 'react';
import { colors, typography } from '@/lib/design-system';

interface Emotion {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export const emotions: Emotion[] = [
  // Emoções difíceis (5) - Dores
  { id: 'ansioso', label: 'Ansioso', emoji: '💙', color: colors.accent.blue },
  { id: 'solitario', label: 'Solitário', emoji: '🤗', color: colors.accent.purple },
  { id: 'culpado', label: 'Culpado', emoji: '💔', color: colors.accent.red },
  { id: 'cansado', label: 'Cansado', emoji: '🌙', color: colors.accent.purple },
  { id: 'angustiado', label: 'Angustiado', emoji: '🕊️', color: colors.accent.gold },
  // Emoções boas (5) - Desejos
  { id: 'grato', label: 'Grato', emoji: '🙏', color: colors.accent.gold },
  { id: 'esperançoso', label: 'Esperançoso', emoji: '✨', color: colors.accent.gold },
  { id: 'alegre', label: 'Alegre', emoji: '😊', color: colors.accent.green },
  { id: 'amoroso', label: 'Amoroso', emoji: '💕', color: colors.accent.pink },
  { id: 'motivado', label: 'Motivado', emoji: '🚀', color: colors.accent.blue },
];

interface EmotionalCheckInProps {
  onSelect: (emotion: string) => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export default function EmotionalCheckIn({ onSelect, onSkip, onBack }: EmotionalCheckInProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId);
    onSelect(emotionId);
    // Salvar no localStorage
    localStorage.setItem('current_emotion', emotionId);
  };

  return (
    <div 
      className="p-6 rounded-xl mb-4"
      style={{
        background: colors.background.card,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <h3 
        className="text-center mb-3"
        style={{
          fontFamily: typography.serif,
          fontSize: 'calc(var(--font-size-base, 1rem) * 1.2)',
          color: colors.text.white,
          fontWeight: 'bold'
        }}
      >
        Como você está se sentindo hoje?
      </h3>
      
      <p 
        className="text-center mb-4"
        style={{
          fontFamily: typography.sans,
          fontSize: 'calc(var(--font-size-base, 1rem) * 0.9)',
          color: colors.text.whiteMuted
        }}
      >
        Compartilhe seu coração conosco e receba uma palavra especial
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {emotions.map(emotion => (
          <button
            key={emotion.id}
            onClick={() => handleSelect(emotion.id)}
            className="p-4 rounded-lg transition-all hover:scale-105"
            style={{
              background: selectedEmotion === emotion.id 
                ? `${emotion.color}30` 
                : 'rgba(255, 255, 255, 0.05)',
              border: selectedEmotion === emotion.id 
                ? `2px solid ${emotion.color}` 
                : `1px solid ${colors.border}`,
              cursor: 'pointer'
            }}
          >
            <div 
              className="text-3xl mb-1"
              style={{ fontSize: 'var(--font-size-base, 1rem)' }}
            >
              {emotion.emoji}
            </div>
            <div 
              className="text-sm font-semibold"
              style={{
                fontFamily: typography.sans,
                color: colors.text.white
              }}
            >
              {emotion.label}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center space-y-2">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm underline"
            style={{
              fontFamily: typography.sans,
              color: colors.text.whiteMuted
            }}
          >
            ← Voltar
          </button>
        )}
        {onSkip && (
          <button
            onClick={onSkip}
            className="text-sm underline block w-full"
            style={{
              fontFamily: typography.sans,
              color: colors.text.whiteMuted
            }}
          >
            Pular
          </button>
        )}
      </div>
    </div>
  );
}

