'use client';

import { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

export default function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      // Criar 50 partículas de confete
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // Posição horizontal (%)
        delay: Math.random() * 0.5, // Delay aleatório
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'][
          Math.floor(Math.random() * 6)
        ],
      }));
      
      setParticles(newParticles);

      // Limpar após animação
      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-3 animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}

