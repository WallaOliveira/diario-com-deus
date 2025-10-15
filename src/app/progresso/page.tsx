'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useStatsStore } from '@/store/useStatsStore';
import { FiArrowLeft, FiHeart, FiTrendingUp, FiBookmark, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import { getMotivationalMessage, getProgressLevel, getProgressLevelMessage } from '@/lib/motivational-messages';
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
  const [calendarioExpandido, setCalendarioExpandido] = useState(false);
  const [mesAtual, setMesAtual] = useState(new Date());
  const [dadosCarregados, setDadosCarregados] = useState(false);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  useEffect(() => {
    if (!DEV_MODE) {
    checkUser();
    } else {
      // Em modo DEV, definir loading como false imediatamente
      setDadosCarregados(false);
    }
  }, [checkUser]);

  useEffect(() => {
    if (!DEV_MODE && !loading && !user) {
      router.push('/login');
    } else if (currentUser?.id) {
      // Em modo DEV, não carregar dados do Supabase
      if (DEV_MODE) {
        // Simular dados carregados
        setTimeout(() => {
          setDadosCarregados(true);
          carregarFavoritos();
          carregarEmocaoSelecionada();
        }, 1000);
      } else {
        loadStats(currentUser.id);
        carregarFavoritos();
        carregarEmocaoSelecionada();
      }
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

  const gerarHistoricoDias = (dias: number) => {
    return Array.from({ length: dias }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (dias - 1 - i));
      
      // Mock: simular dias completados (últimos 4 dias + alguns aleatórios)
      const isCompleted = i >= dias - 4 || (i % 3 === 0 && i > 0);
      
      return {
        date: day,
        isCompleted,
        weekday: day.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNumber: day.getDate(),
        month: day.toLocaleDateString('pt-BR', { month: 'short' })
      };
    });
  };

  const navegarMes = (direcao: 'anterior' | 'proximo') => {
    const novoMes = new Date(mesAtual);
    if (direcao === 'anterior') {
      novoMes.setMonth(novoMes.getMonth() - 1);
    } else {
      novoMes.setMonth(novoMes.getMonth() + 1);
    }
    setMesAtual(novoMes);
  };

  const gerarCalendarioCompleto = () => {
    const primeiroDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1);
    const ultimoDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0);
    const primeiroDiaSemana = primeiroDiaMes.getDay(); // 0 = domingo, 1 = segunda, etc.
    
    // Ajustar para segunda-feira começar na posição 0
    const primeiroDiaSemanaAjustado = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1;
    
    const dias: any[] = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < primeiroDiaSemanaAjustado; i++) {
      dias.push({ isEmpty: true });
    }
    
    // Adicionar dias do mês atual
    for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
      const dataAtual = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), dia);
  const hoje = new Date();
      const isHoje = dataAtual.toDateString() === hoje.toDateString();
      const isPassado = dataAtual < hoje;
      
      // Mock: simular dias completados (dias pares + alguns aleatórios)
      const isCompleted = (dia % 2 === 0) || (dia % 7 === 0);
      
      dias.push({
        day: dia,
        date: dataAtual,
        isCompleted,
        isHoje,
        isPassado
      });
    }
    
    return dias;
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

  if ((!DEV_MODE && loading) || (!DEV_MODE && !dadosCarregados)) {
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

        {/* Insights Inteligentes */}
        {stats && (
          <div 
            className="p-6 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.blue}15 0%, ${colors.accent.purple}15 100%)`,
              border: `1px solid ${colors.accent.blue}40`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">💡</span>
              <h3 
                className="font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  color: colors.text.white
                }}
              >
                {getProgressLevelMessage(getProgressLevel(stats))}
              </h3>
          </div>
            <p 
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.body.md,
                color: colors.text.whiteMuted,
                fontStyle: 'italic'
              }}
            >
              {getMotivationalMessage('streak', stats?.streak || 0).insight}
            </p>
      </div>
        )}

        {/* Devocionais Feitos - Seção Principal */}
        <div 
          className="p-6 rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-2xl"
          style={{
            background: colors.background.card,
            border: `2px solid ${colors.accent.gold}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.text.gold
            }}>
              <span className="text-2xl">📖</span>
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
                Devocionais Feitos
                      </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Seu histórico de momentos com Deus
              </p>
                    </div>
                  </div>

          {/* Estatísticas rápidas com mensagens motivacionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Dias Seguidos */}
            <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-2">
                {getMotivationalMessage('streak', stats?.streak || 0).emoji}
                  </div>
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: getMotivationalMessage('streak', stats?.streak || 0).color }}
              >
                {getMotivationalMessage('streak', stats?.streak || 0).primary}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                {getMotivationalMessage('streak', stats?.streak || 0).secondary}
              </p>
                </div>

            {/* Esta Semana */}
            <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-2">
                {getMotivationalMessage('weekly', calcularProgressoSemanal()).emoji}
                    </div>
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: getMotivationalMessage('weekly', calcularProgressoSemanal()).color }}
              >
                {getMotivationalMessage('weekly', calcularProgressoSemanal()).primary}
                  </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                {getMotivationalMessage('weekly', calcularProgressoSemanal()).secondary}
              </p>
                </div>

            {/* Total */}
            <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-2">
                {getMotivationalMessage('total', stats?.devotionals_completed || 0).emoji}
                    </div>
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: getMotivationalMessage('total', stats?.devotionals_completed || 0).color }}
              >
                {getMotivationalMessage('total', stats?.devotionals_completed || 0).primary}
                  </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                {getMotivationalMessage('total', stats?.devotionals_completed || 0).secondary}
              </p>
                </div>
              </div>

          {/* Calendário de Progresso */}
          <div 
            className="bg-white/5 rounded-xl p-4 cursor-pointer transition-all hover:bg-white/10"
            onClick={() => setCalendarioExpandido(!calendarioExpandido)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 
                className="font-semibold"
                style={{ 
                  fontFamily: typography.sans,
                  color: colors.text.white,
                  fontSize: typography.body.md
                }}
              >
                {calendarioExpandido ? 'Calendário Completo' : 'Últimos 7 dias'}
              </h4>
              <div 
                className="text-sm transition-transform"
                style={{ 
                  color: colors.text.whiteMuted,
                  transform: calendarioExpandido ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                ▼
                    </div>
                  </div>
            
            {!calendarioExpandido ? (
              // Visual compacto - últimos 7 dias
              <div className="grid grid-cols-7 gap-2">
                {gerarHistoricoDias(7).map((day, i) => (
                  <div key={i} className="text-center">
                    <div 
                      className="text-xs mb-1"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      {day.weekday}
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                      style={{
                        background: day.isCompleted ? colors.accent.green : 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${day.isCompleted ? colors.accent.green : colors.border}`
                      }}
                    >
                      <span className="text-sm">{day.isCompleted ? '✓' : '○'}</span>
                  </div>
              </div>
                ))}
            </div>
            ) : (
              // Calendário completo
              <div className="space-y-4">
                {/* Cabeçalho com navegação */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navegarMes('anterior');
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: colors.text.whiteMuted }}
                  >
                    ←
                  </button>
                  
                  <h5 
                    className="font-semibold"
                  style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.white,
                      fontSize: typography.body.md
                    }}
                  >
                    {mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h5>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navegarMes('proximo');
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: colors.text.whiteMuted }}
                  >
                    →
                  </button>
                </div>
                
                {/* Dias da semana */}
                <div className="grid grid-cols-7 gap-1">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia) => (
                    <div 
                      key={dia}
                      className="text-center py-2"
                  style={{ 
                        color: colors.text.whiteMuted,
                        fontSize: typography.body.sm,
                        fontFamily: typography.sans
                  }}
                >
                      {dia}
                    </div>
                  ))}
              </div>

                {/* Dias do calendário */}
                <div className="grid grid-cols-7 gap-1">
                  {gerarCalendarioCompleto().map((dia, i) => (
                    <div key={i} className="text-center">
                      {dia.isEmpty ? (
                        <div className="w-8 h-8" />
                      ) : (
                        <div 
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-medium
                            transition-all duration-200
                            ${dia.isHoje ? 'ring-2 ring-blue-400' : ''}
                          `}
                          style={{
                            background: dia.isCompleted 
                              ? colors.accent.green 
                              : dia.isHoje 
                                ? colors.accent.blue 
                                : dia.isPassado 
                                  ? 'rgba(255, 255, 255, 0.1)' 
                                  : 'rgba(255, 255, 255, 0.05)',
                            border: dia.isCompleted 
                              ? `2px solid ${colors.accent.green}` 
                              : dia.isHoje 
                                ? `2px solid ${colors.accent.blue}` 
                                : `1px solid ${colors.border}`,
                            color: dia.isCompleted || dia.isHoje 
                              ? colors.text.white 
                              : colors.text.whiteMuted
                          }}
                        >
                          {dia.day}
                      </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Legenda */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ background: colors.accent.green }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      Completo
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full ring-2"
                      style={{ 
                        background: colors.accent.blue,
                        ringColor: colors.accent.blue
                      }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      Hoje
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {!calendarioExpandido && (
              <p 
                className="text-xs text-center mt-3"
                style={{ color: colors.text.whiteMuted }}
              >
                Toque para ver o calendário completo
              </p>
                        )}
                      </div>
                    </div>

        {/* Trilhas Feitas - Seção Secundária */}
        <div 
          className="p-5 rounded-2xl transform transition-all hover:scale-[1.01]"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.text.blue
            }}>
              <span className="text-2xl">🗺️</span>
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
                Trilhas Feitas
              </h3>
                            <p 
                              style={{ 
                                fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                                color: colors.text.whiteMuted
                              }}
                            >
                Suas jornadas temáticas
                            </p>
                          </div>
          </div>

          {/* Trilhas em andamento */}
          <div className="space-y-3">
            <div 
              className="p-4 rounded-xl flex items-center justify-between relative"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              {/* Badge de Progresso */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse" style={{
                background: colors.accent.green,
                color: 'white',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}>
                3
              </div>
              
              <div>
                <h4 
                  className="font-semibold mb-1"
                              style={{ 
                    fontFamily: typography.sans,
                    color: colors.text.white,
                    fontSize: typography.body.md
                              }}
                            >
                  🌿 7 Dias de Paz Interior
                            </h4>
                            <p 
                              style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                              }}
                            >
                  Dia 3 de 7 - Continue assim!
                            </p>
                          </div>
              <div 
                className="text-2xl font-bold"
                style={{ color: colors.accent.blue }}
              >
                3/7
              </div>
            </div>

            {/* Trilhas completadas */}
            <div 
              className="p-4 rounded-xl flex items-center justify-between relative"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              {/* Badge de Conquista */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{
                background: colors.accent.gold,
                color: 'white',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)'
              }}>
                🏆
              </div>
              
              <div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ 
                    fontFamily: typography.sans,
                    color: colors.text.white,
                    fontSize: typography.body.md
                  }}
                >
                  ✨ Jornada de Gratidão
                </h4>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Completada há 2 dias - Parabéns!
                </p>
              </div>
              <div className="text-2xl">🎉</div>
            </div>
                      </div>
              </div>

        {/* Anotações - Seção Terciária */}
        <div 
          className="p-5 rounded-2xl"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            opacity: 0.95
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.accent.purple
            }}>
              <span className="text-2xl">📝</span>
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
                Anotações
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                      color: colors.text.whiteMuted
                    }}
                  >
                Suas reflexões e insights pessoais
                  </p>
                </div>
            </div>

          {/* Estatísticas com mensagens motivacionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Reflexões Escritas */}
            <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-2">
                {getMotivationalMessage('reflections', stats?.notes_added || 0).emoji}
              </div>
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: getMotivationalMessage('reflections', stats?.notes_added || 0).color }}
              >
                {getMotivationalMessage('reflections', stats?.notes_added || 0).primary}
              </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                {getMotivationalMessage('reflections', stats?.notes_added || 0).secondary}
                      </p>
                    </div>
            
            {/* Versículos Favoritos */}
            <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-2">
                {getMotivationalMessage('favorites', favoritos.length).emoji}
                    </div>
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: getMotivationalMessage('favorites', favoritos.length).color }}
              >
                {getMotivationalMessage('favorites', favoritos.length).primary}
                    </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                {getMotivationalMessage('favorites', favoritos.length).secondary}
              </p>
                    </div>
                  </div>

          {/* Anotações recentes (mock) */}
          <div className="space-y-3">
            <div 
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p 
                className="text-sm mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  color: colors.text.white,
                  fontStyle: 'italic'
                }}
              >
                "Deus me deu uma paz que excede todo entendimento hoje..."
              </p>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: typography.sans,
                  color: colors.text.whiteMuted
                }}
              >
                Hoje • Devocional da Manhã
              </p>
                  </div>

            <div 
              className="p-4 rounded-xl"
                      style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p 
                className="text-sm mb-2"
                      style={{
                  fontFamily: typography.serif,
                        color: colors.text.white,
                  fontStyle: 'italic'
                }}
              >
                "A gratidão transforma tudo. Preciso praticar mais isso..."
              </p>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: typography.sans,
                  color: colors.text.whiteMuted
                }}
              >
                Ontem • Trilha de Gratidão
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

        {/* Call to Action Fortalecido */}
        <div 
          className="p-8 rounded-2xl text-center transform transition-all hover:scale-[1.02] hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.gold}20 0%, ${colors.accent.blue}20 100%)`,
            border: `2px solid ${colors.accent.gold}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 12px 40px rgba(212, 175, 55, 0.3)'
          }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" style={{
            background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.orange} 100%)`,
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)'
          }}>
            <span className="text-4xl">🙏</span>
                </div>

          <h3 
            className="font-bold mb-3"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.heading.h2,
              fontWeight: typography.weights.semibold,
              color: colors.text.white,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Continue sua jornada
          </h3>
          <p 
            className="mb-8 text-lg"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.lg,
              color: colors.text.whiteMuted,
              fontWeight: typography.weights.medium
            }}
          >
            Que tal dedicar alguns minutos para estar com Deus hoje?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link 
              href="/devocional-do-dia"
              className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl"
                    style={{
                background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.orange} 100%)`,
                color: 'white',
                fontFamily: typography.sans,
                fontSize: typography.body.lg,
                fontWeight: typography.weights.bold,
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              ✨ Devocional do Dia
                  </Link>
            
            <Link
              href="/trilhas"
              className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl"
                    style={{
                background: 'transparent',
                border: `3px solid ${colors.accent.gold}`,
                color: colors.accent.gold,
                fontFamily: typography.sans,
                fontSize: typography.body.lg,
                fontWeight: typography.weights.bold,
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)'
              }}
            >
              🗺️ Trilhas Guiadas
            </Link>
                </div>
        </div>
      </Container>
    </div>
  );
}