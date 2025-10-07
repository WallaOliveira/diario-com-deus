'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiClock, FiCheckCircle, FiMap } from 'react-icons/fi';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import Link from 'next/link';

// Mock de trilhas
const TRILHAS = [
  {
    id: '7-dias-recomeco',
    titulo: '7 Dias de Recomeço',
    descricao: 'Para quem quer (re)começar sua jornada com Deus sem culpa',
    dias: 7,
    progresso: 0,
    emoji: '🌱',
    cor: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
  },
  {
    id: '14-dias-paz-ansiedade',
    titulo: '14 Dias de Paz na Ansiedade',
    descricao: 'Encontre descanso para seu coração em meio às tempestades',
    dias: 14,
    progresso: 0,
    emoji: '🕊️',
    cor: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
  },
  {
    id: '30-dias-evangelho-joao',
    titulo: '30 Dias no Evangelho de João',
    descricao: 'Conheça Jesus através de passagens selecionadas',
    dias: 30,
    progresso: 0,
    emoji: '✝️',
    cor: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },
];

export default function TrilhasPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div 
      className="min-h-screen"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Header com Nova Identidade */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="transition-colors hover:opacity-80" style={{ color: colors.text.whiteMuted }}>
              <FiArrowLeft size={24} />
            </Link>
            <div>
              <h1 
                className="font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h2,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Trilhas Devocionais
              </h1>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Jornadas temáticas de 7, 14 e 30 dias
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">
        {/* Explicação com Nova Identidade */}
        <div style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.text.blue
            }}>
              <FiMap size={24} className="text-white" />
            </div>
            <div>
              <h2 
                className="font-bold mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                🗺️ O que são Trilhas?
              </h2>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.md,
                  color: colors.text.whiteMuted,
                  lineHeight: '1.6'
                }}
              >
                Trilhas são jornadas guiadas com devocionais sequenciais sobre um tema específico. 
                Cada dia tem um roteiro completo: versículo → reflexão → ação → oração.
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Trilhas com Nova Identidade */}
        <div className="space-y-6">
          {TRILHAS.map((trilha) => (
            <div 
              key={trilha.id} 
              className="group transition-all hover:scale-105"
              style={{
                background: colors.background.card,
                borderRadius: '20px',
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(10px)',
                overflow: 'hidden'
              }}
            >
              {/* Header com gradiente */}
              <div 
                className="p-6 text-white"
                style={{ background: trilha.cor }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{trilha.emoji}</div>
                  <div className="flex-1">
                    <h3 
                      className="font-bold mb-2"
                      style={{ 
                        fontFamily: typography.serif,
                        fontSize: typography.heading.h2,
                        fontWeight: typography.weights.semibold,
                        color: 'white'
                      }}
                    >
                      {trilha.titulo}
                    </h3>
                    <p 
                      className="opacity-90"
                      style={{ 
                        fontFamily: typography.sans,
                        fontSize: typography.body.md,
                        color: 'white'
                      }}
                    >
                      {trilha.descricao}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detalhes */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-6" style={{ color: colors.text.whiteMuted }}>
                  <div className="flex items-center gap-2">
                    <FiClock size={16} />
                    <span 
                      style={{ 
                        fontFamily: typography.sans,
                        fontSize: typography.body.sm
                      }}
                    >
                      {trilha.dias} dias
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle size={16} />
                    <span 
                      style={{ 
                        fontFamily: typography.sans,
                        fontSize: typography.body.sm
                      }}
                    >
                      {trilha.progresso}/{trilha.dias} concluídos
                    </span>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div>
                  <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: colors.background.primary }}
                  >
                    <div
                      className="h-full transition-all duration-500"
                      style={{ 
                        background: trilha.cor,
                        width: `${(trilha.progresso / trilha.dias) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button 
                  className="w-full py-3 px-6 rounded-xl font-medium transition-all hover:scale-105"
                  style={{
                    background: colors.text.gold,
                    color: 'white',
                    fontFamily: typography.sans,
                    fontSize: typography.body.md,
                    fontWeight: typography.weights.medium
                  }}
                >
                  {trilha.progresso === 0 ? 'Começar Trilha' : 'Continuar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mais trilhas */}
        <div 
          className="text-center"
          style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 
            className="font-bold mb-2"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.heading.h3,
              fontWeight: typography.weights.semibold,
              color: colors.text.white
            }}
          >
            ✨ Quer mais trilhas?
          </h3>
          <p 
            className="mb-4"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted
            }}
          >
            Acesse trilhas exclusivas sobre maternidade, casamento, trabalho e muito mais
          </p>
          <button 
            className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{
              background: 'transparent',
              border: `2px solid ${colors.text.gold}`,
              color: colors.text.gold,
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              fontWeight: typography.weights.medium
            }}
          >
            Ver Trilhas Extras
          </button>
        </div>
      </Container>
    </div>
  );
}

