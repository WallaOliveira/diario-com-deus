'use client';

import { FiArrowLeft, FiDownload, FiMusic, FiImage, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';
import Container from '@/components/Container';

import { colors, typography, spacing } from '@/lib/design-system';

export default function PresentesPage() {
  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: colors.background.primary
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl">
          <div className="flex items-center">
            <Link 
              href="/dashboard"
              className="p-2 transition-colors hover:opacity-80 mr-1.5"
              style={{ color: colors.text.whiteMuted }}
            >
              <FiArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }}>
                <span className="text-xl">🎁</span>
              </div>
              <div>
                <h1 
                  className="font-bold text-white"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    fontWeight: typography.weights.semibold
                  }}
                >
                  Presentes para Você
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 px-4">
        {/* Bônus Gratuitos */}
        <div className="mb-8">
          <h2 
            className="font-bold mb-4 text-white"
            style={{ 
              fontFamily: typography.sans,
              fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
              fontWeight: typography.weights.semibold
            }}
          >
            ✨ Bônus Gratuitos
          </h2>

          <div className="grid gap-4">
            {[
              { icon: FiImage, emoji: '🖼️', title: 'Wallpapers Inspiradores', desc: '10 papéis de parede com versículos' },
              { icon: FiMusic, emoji: '🎵', title: 'Playlist de Adoração', desc: 'Curadoria especial para seus momentos' },
              { icon: FiBookOpen, emoji: '📖', title: 'Guia de Oração', desc: 'PDF com modelo de diário de oração' },
              { icon: FiDownload, emoji: '📝', title: 'Planner Espiritual', desc: 'Template para organizar sua jornada' }
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: colors.background.card,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                }}>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.white,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.whiteMuted,
                      fontSize: 'var(--font-size-base, 1rem)'
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <FiDownload size={20} className="text-white/60" />
              </button>
            ))}
          </div>
        </div>

        {/* Materiais Especiais */}
        <div>
          <h2 
            className="font-bold mb-4 text-white"
            style={{ 
              fontFamily: typography.sans,
              fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
              fontWeight: typography.weights.semibold
            }}
          >
            💎 Materiais Especiais
          </h2>

          <div className="grid gap-4">
            {[
              { emoji: '📚', title: 'E-book: 40 Dias com Deus', price: 'R$ 19,90', desc: 'Devocional completo para transformação' },
              { emoji: '🎧', title: 'Áudios de Meditação Guiada', price: 'R$ 14,90', desc: '12 meditações cristãs exclusivas' },
              { emoji: '📖', title: 'Curso: Como Estudar a Bíblia', price: 'R$ 29,90', desc: 'Método prático em vídeo-aulas' },
              { emoji: '🙏', title: 'Kit Completo de Oração', price: 'R$ 24,90', desc: 'PDFs + Áudios + Wallpapers' },
              { emoji: '✍️', title: 'Diário de Gratidão Digital', price: 'R$ 12,90', desc: 'Template interativo para 90 dias' },
              { emoji: '🎵', title: 'Pack de Playlists Premium', price: 'R$ 9,90', desc: '50+ horas de adoração curada' }
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: colors.background.card,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                }}>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.white,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.whiteMuted,
                      fontSize: 'var(--font-size-base, 1rem)'
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="text-right">
                  <p 
                    className="font-bold"
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.accent.gold,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)'
                    }}
                  >
                    {item.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
