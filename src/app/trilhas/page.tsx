'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiClock, FiCheckCircle, FiMap, FiChevronDown, FiChevronUp, FiLock } from 'react-icons/fi';
import Container from '@/components/Container';
import { FontSizeControls } from '@/components/FontSizeControls';
import { colors, typography, spacing } from '@/lib/design-system';
import { TRILHAS_DISPONIVEIS, calcularProgressoTrilha, getProximoDiaDisponivel } from '@/lib/trilhas';
import Link from 'next/link';

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

interface TrilhaComProgresso {
  id: string;
  titulo: string;
  descricao: string;
  dias: number;
  progresso: number;
  diasConcluidos: number[];
  proximoDia: number;
  emoji: string;
  cor: string;
}

export default function TrilhasPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const [trilhasComProgresso, setTrilhasComProgresso] = useState<TrilhaComProgresso[]>([]);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    if (!DEV_MODE && user === null) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    // Carregar progresso das trilhas do localStorage
    const trilhasProcessadas = TRILHAS_DISPONIVEIS.map(trilha => {
      const progressoSalvo = localStorage.getItem(`trilha-${trilha.id}-progress`);
      let diasConcluidos: number[] = [];
      
      if (progressoSalvo) {
        const progresso = JSON.parse(progressoSalvo);
        diasConcluidos = progresso.diasConcluidos || [];
      }

      const proximoDia = getProximoDiaDisponivel(diasConcluidos, trilha.duracao);
      const progresso = calcularProgressoTrilha(diasConcluidos, trilha.duracao);

      return {
        id: trilha.id,
        titulo: trilha.titulo,
        descricao: trilha.descricao,
        dias: trilha.duracao,
        progresso: progresso,
        diasConcluidos: diasConcluidos,
        proximoDia: proximoDia,
        emoji: trilha.icone,
        cor: `linear-gradient(135deg, ${trilha.cor} 0%, #10b981 100%)`
      };
    });

    setTrilhasComProgresso(trilhasProcessadas);
  }, []);

  if (!DEV_MODE && !user) return null;

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
          <div className="flex items-center">
            <Link href="/dashboard" className="transition-colors hover:opacity-80 mr-1.5" style={{ color: colors.text.whiteMuted }}>
              <FiArrowLeft size={24} />
            </Link>
            <div className="flex-1">
              <h1 
                className="font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Trilhas Devocionais
              </h1>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  color: colors.text.whiteMuted
                }}
              >
                Jornadas temáticas de 7, 14 e 30 dias
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <FontSizeControls />
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">
        {/* Explicação opcional com botão para expandir */}
        <div style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <button
            onClick={() => setMostrarExplicacao(!mostrarExplicacao)}
            className="w-full flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.text.blue
              }}>
                <FiMap size={24} className="text-white" />
              </div>
              <h2 
                className="font-bold text-left"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                🗺️ O que são Trilhas?
              </h2>
            </div>
            <div className="flex-shrink-0" style={{ color: colors.text.whiteMuted }}>
              {mostrarExplicacao ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </div>
          </button>
          
          {mostrarExplicacao && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  color: colors.text.whiteMuted,
                  lineHeight: '1.6'
                }}
              >
                Trilhas são jornadas guiadas com devocionais sequenciais sobre um tema específico. 
                Cada dia tem um roteiro completo: versículo → reflexão → ação → oração.
              </p>
            </div>
          )}
        </div>

        {/* Lista de Trilhas com Nova Identidade */}
        <div className="space-y-6">
          {trilhasComProgresso.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p style={{ color: colors.text.whiteMuted }}>Carregando trilhas...</p>
            </div>
          ) : (
            trilhasComProgresso.map((trilha) => (
              <Link
                key={trilha.id}
                href={`/trilhas/${trilha.id}`}
                className="block group transition-all hover:scale-[1.02]"
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
                          fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
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
                          fontSize: 'var(--font-size-base, 1rem)',
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
                          fontSize: 'var(--font-size-base, 1rem)'
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
                          fontSize: 'var(--font-size-base, 1rem)'
                        }}
                      >
                        {trilha.diasConcluidos.length}/{trilha.dias} concluídos
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
                          width: `${trilha.progresso}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div 
                    className="w-full py-3 px-6 rounded-xl font-medium transition-all group-hover:scale-105 text-center"
                    style={{
                      background: colors.text.gold,
                      color: 'white',
                      fontFamily: typography.sans,
                      fontSize: typography.body.md,
                      fontWeight: typography.weights.medium
                    }}
                  >
                    {trilha.diasConcluidos.length === 0 
                      ? '✨ Começar Trilha' 
                      : trilha.proximoDia === -1
                        ? '🎉 Trilha Completa'
                        : `📖 Continuar no Dia ${trilha.proximoDia}`
                    }
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* CTA para mais trilhas - Bloqueado para testes */}
        <div 
          className="text-center relative"
          style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            opacity: 0.6,
            filter: 'blur(1px)'
          }}
        >
          {/* Cadeado de bloqueio */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div 
              className="bg-black/80 backdrop-blur rounded-full p-4 border-2 border-gray-400/50"
              style={{
                boxShadow: '0 0 20px rgba(156, 163, 175, 0.3)'
              }}
            >
              <FiLock size={32} className="text-gray-400" />
            </div>
          </div>

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
            className="px-6 py-3 rounded-xl font-medium transition-all"
            style={{
              background: 'transparent',
              border: `2px solid ${colors.text.gold}`,
              color: colors.text.gold,
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              fontWeight: typography.weights.medium,
              opacity: 0.5,
              cursor: 'not-allowed'
            }}
            disabled
          >
            Ver Trilhas Extras
          </button>
          
          {/* Texto explicativo */}
          <div className="mt-4">
            <p 
              className="text-xs"
              style={{ 
                fontFamily: typography.sans,
                color: colors.text.whiteMuted,
                opacity: 0.7
              }}
            >
              🔒 Em breve - Apenas para testadores beta
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

