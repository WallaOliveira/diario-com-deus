'use client';

import { useEffect, useState } from 'react';
import { colors, typography } from '@/lib/design-system';
import type { UserAchievement } from '@/lib/database';

interface AchievementModalProps {
  achievements: UserAchievement[];
  onClose: () => void;
}

export default function AchievementModal({ achievements, onClose }: AchievementModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  const currentAchievement = achievements[currentIndex];

  useEffect(() => {
    // Reset confetti quando muda de conquista
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < achievements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  if (!currentAchievement) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Confetes */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: ['#fbbf24', '#f59e0b', '#ef4444', '#8b5cf6', '#22c55e'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div 
        className="relative max-w-md w-full p-8 rounded-2xl shadow-2xl animate-scaleIn"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: `2px solid ${colors.text.gold}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brilho de fundo */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
          style={{ background: colors.text.gold }}
        />

        {/* Conteúdo */}
        <div className="relative z-10 text-center space-y-6">
          {/* Badge "Nova" */}
          {achievements.length > 1 && (
            <div className="absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-bold" style={{
              background: colors.text.gold,
              color: '#0f172a',
            }}>
              {currentIndex + 1} de {achievements.length}
            </div>
          )}

          {/* Ícone */}
          <div className="text-7xl mb-4 animate-bounce">
            {currentAchievement.icon}
          </div>

          {/* Título "Nova Conquista da Fé!" */}
          <div>
            <p 
              className="text-sm uppercase tracking-wider mb-2"
              style={{ 
                fontFamily: typography.sans,
                color: colors.text.gold,
                fontWeight: typography.weights.bold,
              }}
            >
              ✨ Nova Conquista da Fé! ✨
            </p>
            
            <h2 
              className="font-bold text-white mb-3"
              style={{ 
                fontFamily: typography.serif,
                fontSize: typography.heading.h2,
                fontWeight: typography.weights.bold,
              }}
            >
              {currentAchievement.title}
            </h2>
          </div>

          {/* Descrição */}
          <p 
            className="leading-relaxed"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted,
              lineHeight: '1.7'
            }}
          >
            {currentAchievement.description}
          </p>

          {/* Benefício Espiritual */}
          {currentAchievement.spiritual_benefit && (
            <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
              <h3 
                className="font-semibold mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.body.md,
                  color: colors.text.gold,
                }}
              >
                💎 Benefício Espiritual
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted,
                  lineHeight: '1.6'
                }}
              >
                {currentAchievement.spiritual_benefit}
              </p>
            </div>
          )}

          {/* Versículo Bíblico */}
          {currentAchievement.bible_verse && (
            <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
              <h3 
                className="font-semibold mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.body.md,
                  color: colors.text.gold,
                }}
              >
                📖 Palavra de Deus
              </h3>
              <p 
                className="leading-relaxed italic"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.body.sm,
                  color: colors.text.white,
                  lineHeight: '1.6'
                }}
              >
                {currentAchievement.bible_verse}
              </p>
            </div>
          )}

          {/* Separador */}
          <div className="flex items-center gap-3 py-4">
            <div className="flex-1 h-px" style={{ background: colors.border }} />
            <span style={{ color: colors.text.gold, fontSize: typography.body.sm }}>
              Continue brilhando!
            </span>
            <div className="flex-1 h-px" style={{ background: colors.border }} />
          </div>

          {/* Botão */}
          <button
            onClick={handleNext}
            className="w-full py-3 px-6 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colors.text.gold} 0%, #d4af37 100%)`,
              color: '#0f172a',
              fontFamily: typography.sans,
              fontSize: typography.body.md,
            }}
          >
            {currentIndex < achievements.length - 1 ? 'Próxima Conquista →' : 'Que lindo! 💚'}
          </button>

          {/* Link "Ver todas" */}
          <button
            onClick={() => {
              onClose();
              // Navegar para a página de progresso na aba de conquistas
              if (typeof window !== 'undefined') {
                window.location.href = '/progresso#achievements';
              }
            }}
            className="text-sm underline hover:opacity-80 transition-opacity"
            style={{ color: colors.text.whiteMuted }}
          >
            Ver todas as conquistas
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook para gerenciar modal de conquistas
 */
export function useAchievementModal() {
  const [showModal, setShowModal] = useState(false);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);

  const show = (newAchievements: UserAchievement[]) => {
    if (newAchievements.length > 0) {
      setAchievements(newAchievements);
      setShowModal(true);
    }
  };

  const close = () => {
    setShowModal(false);
    setAchievements([]);
  };

  return { showModal, achievements, show, close };
}

