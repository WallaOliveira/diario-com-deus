'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useStatsStore } from '@/store/useStatsStore';
import { FiArrowLeft, FiTrendingUp, FiHeart, FiSmile, FiCheckCircle, FiLock, FiEye, FiStar } from 'react-icons/fi';
import { FiAward as FiTrophy } from 'react-icons/fi';
import Link from 'next/link';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import Loading from '@/components/Loading';

interface CheckInEmocional {
  data: string;
  paz: number; // 1-10
  proximidade: number; // 1-10
  ansiedade: number; // 1-10
}

export default function ProgressoPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { stats, achievements, loadStats, loadAchievements } = useStatsStore();
  
  const [mostrarCheckin, setMostrarCheckin] = useState(false);
  const [checkinsAnteriores, setCheckinsAnteriores] = useState<CheckInEmocional[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'emotional'>('overview');
  
  // Check-in do dia
  const [paz, setPaz] = useState(5);
  const [proximidade, setProximidade] = useState(5);
  const [ansiedade, setAnsiedade] = useState(5);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user?.id) {
      loadStats(user.id);
      loadAchievements(user.id);
      carregarCheckins();
    }
  }, [loading, user, router, loadStats, loadAchievements]);

  // Detectar hash na URL para abrir aba específica
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'achievements') {
      setActiveTab('achievements');
    }
  }, []);

  const carregarCheckins = () => {
    // Carregar do localStorage (em produção viria do Supabase)
    const saved = localStorage.getItem('checkins_emocionais');
    if (saved) {
      setCheckinsAnteriores(JSON.parse(saved));
    }
  };

  const salvarCheckin = () => {
    const novoCheckin: CheckInEmocional = {
      data: new Date().toISOString(),
      paz,
      proximidade,
      ansiedade,
    };

    const novosCheckins = [...checkinsAnteriores, novoCheckin];
    setCheckinsAnteriores(novosCheckins);
    localStorage.setItem('checkins_emocionais', JSON.stringify(novosCheckins));
    
    setMostrarCheckin(false);

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('checkin_emocional', {
        props: { paz, proximidade, ansiedade }
      });
    }
  };

  const calcularEvolucao = () => {
    if (checkinsAnteriores.length < 2) return null;

    const primeiro = checkinsAnteriores[0];
    const ultimo = checkinsAnteriores[checkinsAnteriores.length - 1];

    return {
      paz: ultimo.paz - primeiro.paz,
      proximidade: ultimo.proximidade - primeiro.proximidade,
      ansiedade: primeiro.ansiedade - ultimo.ansiedade, // Invertido (menos ansiedade é melhor)
    };
  };

  const evolucao = calcularEvolucao();

  // Calcular dias da semana para "Minha Semana"
  const hoje = new Date();
  const inicioSemana = startOfWeek(hoje, { locale: ptBR });
  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));

  // Mock de progresso (em produção viria do banco)
  const progressoDias = [true, true, false, true, false, false, false];

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  // Função para obter ícone do nível
  const getLevelIcon = (level: number): string => {
    switch (level) {
      case 1: return '🌱'; // Iniciante
      case 2: return '🌿'; // Crescendo
      case 3: return '🌳'; // Maduro
      case 4: return '🌲'; // Sábio
      case 5: return '🏞️'; // Guia
      default: return '🌱';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: colors.background.gradient }}>
      {/* Header */}
      <div className="sticky top-0 z-50" style={{ 
        background: 'rgba(0, 0, 0, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border.gold}`
      }}>
        <Container>
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.text.white }}
            >
              <FiArrowLeft size={20} />
              <span style={{ fontFamily: typography.sans, fontSize: typography.body.md }}>
                Voltar
              </span>
            </button>
            
            <div className="flex-1">
              <h1 
                className="text-xl font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  color: colors.text.gold
                }}
              >
                Minha Evolução
              </h1>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: typography.sans,
                  color: colors.text.whiteMuted
                }}
              >
                Sua jornada espiritual em números
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 pb-4">
            {[
              { id: 'overview', label: '📊 Visão Geral', icon: FiTrendingUp },
              { id: 'achievements', label: '🏆 Conquistas', icon: FiTrophy },
              { id: 'emotional', label: '💜 Emocional', icon: FiHeart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-whiteMuted hover:text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: typography.sans }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="py-8">
          {/* Tab: Visão Geral */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Streak */}
                <div className="p-6 rounded-xl border-2 border-orange-500/50 bg-orange-900/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <h3 className="font-semibold text-white" style={{ fontFamily: typography.serif }}>
                        Sequência
                      </h3>
                      <p className="text-sm text-orange-300">Dias seguidos</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-orange-400">
                    {stats?.streak || 0}
                  </div>
                </div>

                {/* Nível Espiritual */}
                <div className="p-6 rounded-xl border-2 border-green-500/50 bg-green-900/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{getLevelIcon(stats?.spiritual_level || 1)}</div>
                    <div>
                      <h3 className="font-semibold text-white" style={{ fontFamily: typography.serif }}>
                        Nível Espiritual
                      </h3>
                      <p className="text-sm text-green-300">Sua jornada</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    {stats?.spiritual_level === 1 && 'Iniciante'}
                    {stats?.spiritual_level === 2 && 'Crescendo'}
                    {stats?.spiritual_level === 3 && 'Maduro'}
                    {stats?.spiritual_level === 4 && 'Sábio'}
                    {stats?.spiritual_level === 5 && 'Guia'}
                    {!stats?.spiritual_level && 'Iniciante'}
                  </div>
                </div>

                {/* Momentos com Deus */}
                <div className="p-6 rounded-xl border-2 border-blue-500/50 bg-blue-900/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">⭐</div>
                    <div>
                      <h3 className="font-semibold text-white" style={{ fontFamily: typography.serif }}>
                        Momentos com Deus
                      </h3>
                      <p className="text-sm text-blue-300">Experiências totais</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {stats?.moments_with_god || 0}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/sessao-express"
                  className="p-6 rounded-xl border-2 border-gold-500/50 bg-gradient-to-br from-gold-900/20 to-yellow-900/20 hover:from-gold-900/30 hover:to-yellow-900/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">🙏</div>
                    <div>
                      <h3 className="font-bold text-white mb-1" style={{ fontFamily: typography.serif }}>
                        Devocional de Hoje
                      </h3>
                      <p className="text-sm text-yellow-300">Continue sua jornada</p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => setActiveTab('achievements')}
                  className="p-6 rounded-xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20 hover:from-purple-900/30 hover:to-pink-900/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">🏆</div>
                    <div>
                      <h3 className="font-bold text-white mb-1" style={{ fontFamily: typography.serif }}>
                        Ver Conquistas
                      </h3>
                      <p className="text-sm text-purple-300">Suas vitórias espirituais</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Tab: Conquistas */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ 
                    fontFamily: typography.serif,
                    color: colors.text.white
                  }}
                >
                  🏆 Suas Conquistas
                </h2>
                <p 
                  className="text-lg"
                  style={{ 
                    fontFamily: typography.sans,
                    color: colors.text.whiteMuted
                  }}
                >
                  Cada conquista é um marco na sua caminhada com Deus
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked_at 
                        ? 'border-green-500/50 bg-green-900/20' 
                        : 'border-gray-600/50 bg-gray-900/20'
                    }`}
                  >
                    {/* Achievement Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`text-3xl ${achievement.unlocked_at ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 
                          className={`text-lg font-semibold mb-1 ${
                            achievement.unlocked_at ? 'text-white' : 'text-gray-400'
                          }`}
                          style={{ fontFamily: typography.serif }}
                        >
                          {achievement.title}
                        </h3>
                        <p 
                          className={`text-sm ${
                            achievement.unlocked_at ? 'text-whiteMuted' : 'text-gray-500'
                          }`}
                          style={{ fontFamily: typography.sans }}
                        >
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-2xl">
                        {achievement.unlocked_at ? (
                          <FiCheckCircle className="text-green-500" />
                        ) : (
                          <FiLock className="text-gray-500" />
                        )}
                      </div>
                    </div>

                    {/* Achievement Content */}
                    {achievement.unlocked_at && (
                      <div className="space-y-3">
                        {/* Spiritual Benefit */}
                        {achievement.spiritual_benefit && (
                          <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-500/30">
                            <h4 
                              className="font-semibold mb-1 text-sm"
                              style={{ 
                                fontFamily: typography.serif,
                                color: colors.text.gold
                              }}
                            >
                              💎 Benefício Espiritual
                            </h4>
                            <p 
                              className="text-sm leading-relaxed"
                              style={{ 
                                fontFamily: typography.sans,
                                color: colors.text.whiteMuted
                              }}
                            >
                              {achievement.spiritual_benefit}
                            </p>
                          </div>
                        )}

                        {/* Bible Verse */}
                        {achievement.bible_verse && (
                          <div className="bg-green-900/30 rounded-lg p-3 border border-green-500/30">
                            <h4 
                              className="font-semibold mb-1 text-sm"
                              style={{ 
                                fontFamily: typography.serif,
                                color: colors.text.gold
                              }}
                            >
                              📖 Palavra de Deus
                            </h4>
                            <p 
                              className="text-sm leading-relaxed italic"
                              style={{ 
                                fontFamily: typography.serif,
                                color: colors.text.white
                              }}
                            >
                              {achievement.bible_verse}
                            </p>
                          </div>
                        )}

                        {/* Educational Text */}
                        {achievement.educational_text && (
                          <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/30">
                            <h4 
                              className="font-semibold mb-1 text-sm"
                              style={{ 
                                fontFamily: typography.serif,
                                color: colors.text.gold
                              }}
                            >
                              📚 Sobre Esta Prática
                            </h4>
                            <p 
                              className="text-sm leading-relaxed"
                              style={{ 
                                fontFamily: typography.sans,
                                color: colors.text.whiteMuted
                              }}
                            >
                              {achievement.educational_text}
                            </p>
                          </div>
                        )}

                        {/* Unlock Date */}
                        <div className="text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                          Desbloqueada em: {new Date(achievement.unlocked_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {achievements.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ 
                      fontFamily: typography.serif,
                      color: colors.text.white
                    }}
                  >
                    Nenhuma conquista ainda
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.whiteMuted
                    }}
                  >
                    Complete devocionais para desbloquear suas primeiras conquistas!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Emocional */}
          {activeTab === 'emotional' && (
            <div className="space-y-6">
              {/* CTA Check-in */}
              {!mostrarCheckin && (
                <button
                  onClick={() => setMostrarCheckin(true)}
                  className="w-full p-6 rounded-xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20 hover:from-purple-900/30 hover:to-pink-900/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white mb-1 flex items-center gap-2" style={{ fontFamily: typography.serif }}>
                        <FiHeart className="text-purple-400" />
                        Como está seu coração hoje?
                      </h3>
                      <p className="text-sm text-purple-300" style={{ fontFamily: typography.sans }}>
                        Faça um check-in emocional rápido (30 segundos)
                      </p>
                    </div>
                    <div className="text-3xl">😊</div>
                  </div>
                </button>
              )}

              {/* Formulário de Check-in */}
              {mostrarCheckin && (
                <div className="p-6 rounded-xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-fadeIn">
                  <h3 className="font-bold text-white mb-4 text-lg" style={{ fontFamily: typography.serif }}>
                    Check-in Emocional 💜
                  </h3>
                  
                  {/* Paz */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-purple-300" style={{ fontFamily: typography.sans }}>
                        🕊️ Nível de Paz
                      </label>
                      <span className="text-xl font-bold text-purple-400">{paz}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={paz}
                      onChange={(e) => setPaz(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-purple-400 mt-1">
                      <span>Muito agitado</span>
                      <span>Muito em paz</span>
                    </div>
                  </div>

                  {/* Proximidade com Deus */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-purple-300" style={{ fontFamily: typography.sans }}>
                        ✨ Proximidade com Deus
                      </label>
                      <span className="text-xl font-bold text-purple-400">{proximidade}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={proximidade}
                      onChange={(e) => setProximidade(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-purple-400 mt-1">
                      <span>Distante</span>
                      <span>Muito próximo</span>
                    </div>
                  </div>

                  {/* Ansiedade */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-purple-300" style={{ fontFamily: typography.sans }}>
                        😰 Nível de Ansiedade
                      </label>
                      <span className="text-xl font-bold text-purple-400">{ansiedade}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={ansiedade}
                      onChange={(e) => setAnsiedade(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-purple-400 mt-1">
                      <span>Nada ansioso</span>
                      <span>Muito ansioso</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={salvarCheckin} 
                      className="flex-1 py-3 px-6 rounded-lg font-bold transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${colors.text.gold} 0%, #d4af37 100%)`,
                        color: '#0f172a',
                        fontFamily: typography.sans
                      }}
                    >
                      Salvar Check-in
                    </button>
                    <button
                      onClick={() => setMostrarCheckin(false)}
                      className="px-6 py-3 rounded-lg font-medium transition-colors hover:bg-white/10"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: colors.text.white,
                        fontFamily: typography.sans
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Evolução (Antes vs Depois) */}
              {evolucao && (
                <div className="p-6 rounded-xl border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiTrendingUp size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1" style={{ fontFamily: typography.serif }}>
                        🎉 Sua Evolução
                      </h3>
                      <p className="text-sm text-green-300" style={{ fontFamily: typography.sans }}>
                        Desde {format(new Date(checkinsAnteriores[0].data), "d 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Paz */}
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${
                        evolucao.paz > 0 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {evolucao.paz > 0 ? '+' : ''}{evolucao.paz}
                      </div>
                      <p className="text-xs text-green-300">Paz</p>
                    </div>

                    {/* Proximidade */}
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${
                        evolucao.proximidade > 0 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {evolucao.proximidade > 0 ? '+' : ''}{evolucao.proximidade}
                      </div>
                      <p className="text-xs text-green-300">Proximidade</p>
                    </div>

                    {/* Ansiedade */}
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${
                        evolucao.ansiedade > 0 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {evolucao.ansiedade > 0 ? '+' : ''}{evolucao.ansiedade}
                      </div>
                      <p className="text-xs text-green-300">↓ Ansiedade</p>
                    </div>
                  </div>

                  {(evolucao.paz > 0 || evolucao.proximidade > 0 || evolucao.ansiedade > 0) && (
                    <div className="mt-4 pt-4 border-t border-green-500/30">
                      <p className="text-sm text-green-300 font-medium" style={{ fontFamily: typography.sans }}>
                        💚 Você está crescendo! Continue assim!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Estatísticas Emocionais */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border-2 border-orange-500/50 bg-orange-900/20 text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {stats?.streak || 0}
                  </div>
                  <p className="text-sm text-orange-300">Dias seguidos</p>
                </div>

                <div className="p-4 rounded-xl border-2 border-blue-500/50 bg-blue-900/20 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {checkinsAnteriores.length}
                  </div>
                  <p className="text-sm text-blue-300">Check-ins</p>
                </div>

                <div className="p-4 rounded-xl border-2 border-green-500/50 bg-green-900/20 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {Math.round(((stats?.streak || 0) / 7) * 100)}%
                  </div>
                  <p className="text-sm text-green-300">Meta semanal</p>
                </div>
              </div>

              {/* Minha Semana */}
              <div className="p-6 rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: typography.serif }}>📅 Minha Semana</h3>
                
                <div className="grid grid-cols-7 gap-2">
                  {diasSemana.map((dia, index) => {
                    const concluido = progressoDias[index];
                    const ehHoje = format(dia, 'dd/MM') === format(hoje, 'dd/MM');

                    return (
                      <div
                        key={index}
                        className={`text-center p-3 rounded-lg border-2 ${
                          concluido
                            ? 'bg-green-500/20 border-green-500'
                            : ehHoje
                            ? 'bg-gold-500/20 border-gold-500'
                            : 'bg-gray-500/20 border-gray-500'
                        }`}
                      >
                        <p className={`text-xs font-medium mb-1 ${
                          concluido ? 'text-green-300' : ehHoje ? 'text-gold-300' : 'text-gray-400'
                        }`}>
                          {format(dia, 'EEE', { locale: ptBR })}
                        </p>
                        <p className={`text-lg font-bold ${
                          concluido ? 'text-green-300' : ehHoje ? 'text-gold-300' : 'text-gray-300'
                        }`}>
                          {format(dia, 'd')}
                        </p>
                        {concluido && (
                          <FiCheckCircle className="text-green-400 mx-auto mt-1" size={16} />
                        )}
                        {ehHoje && !concluido && (
                          <div className="w-2 h-2 bg-gold-400 rounded-full mx-auto mt-1" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-blue-300">Concluído</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gold-400 rounded"></div>
                    <span className="text-blue-300">Hoje</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <span className="text-blue-300">Pendente</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Link 
                    href="/sessao-express" 
                    className="inline-block py-3 px-6 rounded-lg font-bold transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${colors.text.gold} 0%, #d4af37 100%)`,
                      color: '#0f172a',
                      fontFamily: typography.sans
                    }}
                  >
                    Fazer Devocional de Hoje
                  </Link>
                </div>
              </div>

              {/* Histórico de Check-ins */}
              {checkinsAnteriores.length > 0 && (
                <div className="p-6 rounded-xl border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: typography.serif }}>📊 Histórico</h3>
                  <div className="space-y-3">
                    {checkinsAnteriores.slice(-5).reverse().map((checkin, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div>
                          <p className="text-sm font-medium text-white" style={{ fontFamily: typography.sans }}>
                            {format(new Date(checkin.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <span className="text-purple-300">
                            🕊️ {checkin.paz}
                          </span>
                          <span className="text-purple-300">
                            ✨ {checkin.proximidade}
                          </span>
                          <span className="text-purple-300">
                            😰 {checkin.ansiedade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {checkinsAnteriores.length === 0 && (
                <div className="p-6 rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h4 className="font-bold text-white mb-2" style={{ fontFamily: typography.serif }}>
                    Comece a acompanhar sua evolução
                  </h4>
                  <p className="text-sm text-blue-300 mb-4" style={{ fontFamily: typography.sans }}>
                    Faça check-ins regulares para ver como sua vida espiritual está transformando seu coração.
                  </p>
                  <button
                    onClick={() => setMostrarCheckin(true)}
                    className="py-3 px-6 rounded-lg font-bold transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${colors.text.gold} 0%, #d4af37 100%)`,
                      color: '#0f172a',
                      fontFamily: typography.sans
                    }}
                  >
                    Fazer Primeiro Check-in
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}