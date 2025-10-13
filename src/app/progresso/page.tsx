'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useStatsStore } from '@/store/useStatsStore';
import { FiArrowLeft, FiHeart, FiTrendingUp, FiBookmark, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import Loading from '@/components/Loading';

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const mockUser = {
  id: 'dev-user-123',
  email: 'dev@diariocomdeus.com',
  user_metadata: {
    name: 'Desenvolvedor'
  }
};

export default function ProgressoPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { stats, loadStats } = useStatsStore();
  
  const [emocaoSelecionada, setEmocaoSelecionada] = useState<string>('');
  const [favoritos, setFavoritos] = useState<any[]>([]);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    if (!DEV_MODE && !loading && !user) {
      router.push('/login');
    } else if (currentUser?.id) {
      loadStats(currentUser.id);
      carregarFavoritos();
      carregarEmocaoSelecionada();
    }
  }, [currentUser, loading, user, router, loadStats]);

  const carregarFavoritos = () => {
    // Mock de favoritos
    setFavoritos([
      {
        id: 1,
        content: "Porque para Deus nada é impossível.",
        type: 'verse',
        reference: 'Lucas 1:37',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        content: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
        type: 'verse',
        reference: 'Hebreus 11:1',
        created_at: new Date().toISOString()
      }
    ]);
  };

  const carregarEmocaoSelecionada = () => {
    const emocao = localStorage.getItem('emocao_selecionada');
    if (emocao) {
      setEmocaoSelecionada(emocao);
    }
  };

  const calcularProgressoSemanal = () => {
    // Mock: calcular quantos dias da semana atual foram completados
    return 4; // 4 de 7 dias
  };

  const calcularProgressoMensal = () => {
    // Mock: calcular quantos dias do mês atual foram completados
    return 12; // 12 de 30 dias
  };

  const getEmocaoInfo = (emocao: string) => {
    switch (emocao) {
      case 'ansioso':
        return { emoji: '💙', nome: 'Ansioso(a)', cor: colors.accent.blue };
      case 'grato':
        return { emoji: '🙏', nome: 'Grato(a)', cor: colors.accent.gold };
      case 'cansado':
        return { emoji: '🌙', nome: 'Cansado(a)', cor: colors.accent.purple };
      case 'esperançoso':
        return { emoji: '🌟', nome: 'Esperançoso(a)', cor: colors.accent.yellow };
      default:
        return { emoji: '😊', nome: 'Bem', cor: colors.accent.green };
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!DEV_MODE && !user) {
    return <Loading />;
  }

  const emocaoInfo = emocaoSelecionada ? getEmocaoInfo(emocaoSelecionada) : null;

  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.text.whiteMuted }}
            >
              <FiArrowLeft size={20} />
            </button>
            
            <div className="flex-1">
              <h1 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  color: colors.text.white,
                  fontWeight: typography.weights.semibold
                }}
              >
                Minha Jornada
              </h1>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Sua jornada espiritual em números
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">
        {/* Cards Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sequência */}
          <div 
            className="p-6 rounded-2xl transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.orange
              }}>
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    color: colors.text.white
                  }}
                >
                  Sequência
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Dias seguidos
                </p>
              </div>
            </div>
            <div 
              className="text-3xl font-bold mt-4"
              style={{ color: colors.accent.orange }}
            >
              {stats?.streak || 0}
            </div>
          </div>

          {/* Progresso da Semana */}
          <div 
            className="p-6 rounded-2xl transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.green
              }}>
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    color: colors.text.white
                  }}
                >
                  Esta Semana
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Dias completados
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.accent.green }}
              >
                {calcularProgressoSemanal()}/7
              </div>
              <div 
                className="w-full bg-gray-700 rounded-full h-2"
              >
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    background: colors.accent.green,
                    width: `${(calcularProgressoSemanal() / 7) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Como você está */}
          <div 
            className="p-6 rounded-2xl transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: emocaoInfo?.cor || colors.accent.blue
              }}>
                <FiHeart size={24} className="text-white" />
              </div>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    color: colors.text.white
                  }}
                >
                  Como você está
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Seu estado emocional
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-2xl">{emocaoInfo?.emoji || '😊'}</span>
              <span 
                className="font-bold"
                style={{ color: emocaoInfo?.cor || colors.text.white }}
              >
                {emocaoInfo?.nome || 'Não definido'}
              </span>
            </div>
          </div>
        </div>

        {/* Estatísticas Adicionais */}
        <div 
          className="p-6 rounded-2xl"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.accent.blue
            }}>
              <FiTrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  color: colors.text.white
                }}
              >
                Estatísticas
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Sua jornada em números
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.accent.blue }}
              >
                {calcularProgressoMensal()}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Este Mês
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.accent.gold }}
              >
                {stats?.devotionals_completed || 0}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Total Completos
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.accent.green }}
              >
                {favoritos.length}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Favoritos
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.accent.purple }}
              >
                {stats?.notes_added || 0}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Anotações
              </p>
            </div>
          </div>
        </div>

        {/* Favoritos */}
        {favoritos.length > 0 && (
          <div 
            className="p-6 rounded-2xl"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.red
              }}>
                <FiBookmark size={24} className="text-white" />
              </div>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    color: colors.text.white
                  }}
                >
                  Seus Favoritos
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Versículos e citações que tocaram seu coração
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {favoritos.slice(0, 3).map((favorito) => (
                <div 
                  key={favorito.id}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⭐</div>
                    <div className="flex-1">
                      <p 
                        className="mb-2 leading-relaxed"
                        style={{ 
                          fontFamily: typography.serif,
                          color: colors.text.white,
                          fontSize: typography.body.md
                        }}
                      >
                        "{favorito.content}"
                      </p>
                      <p 
                        className="text-sm"
                        style={{ 
                          fontFamily: typography.sans,
                          color: colors.text.whiteMuted
                        }}
                      >
                        {favorito.reference}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {favoritos.length > 3 && (
              <div className="text-center mt-4">
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  +{favoritos.length - 3} favoritos adicionais
                </p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div 
          className="p-6 rounded-2xl text-center"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-4xl mb-4">🙏</div>
          <h3 
            className="font-bold mb-2"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.heading.h3,
              color: colors.text.white
            }}
          >
            Continue sua jornada
          </h3>
          <p 
            className="mb-6"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted
            }}
          >
            Que tal dedicar alguns minutos para estar com Deus hoje?
          </p>
          
          <div className="flex gap-3 justify-center">
            <Link
              href="/devocional-do-dia"
              className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: colors.text.gold,
                color: colors.background.primary,
                fontFamily: typography.sans
              }}
            >
              Devocional do Dia
            </Link>
            
            <Link
              href="/trilhas"
              className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: colors.text.white,
                border: `1px solid ${colors.border}`,
                fontFamily: typography.sans
              }}
            >
              Trilhas Guiadas
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}