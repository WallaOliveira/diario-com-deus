'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import Link from 'next/link';
import { FiBook, FiMap, FiHeart, FiCalendar, FiLogOut, FiMenu, FiHelpCircle, FiGift, FiSmartphone } from 'react-icons/fi';
import Tutorial, { useTutorial } from '@/components/Tutorial';
import PWAInstallGuide, { usePWAInstallGuide } from '@/components/PWAInstallGuide';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import AchievementModal from '@/components/AchievementModal';
import HelpButton from '@/components/HelpButton';
import Container from '@/components/Container';
import CheckInEmocional from '@/components/CheckInEmocional';
import { colors, typography, spacing, utils } from '@/lib/design-system';
import { 
  checkInactivityStatus, 
  updateLastAccessDate, 
  getComebackReward,
  requestNotificationPermission 
} from '@/lib/reengagement';

// Função para obter ícone do nível espiritual
function getLevelIcon(level: number): string {
  switch (level) {
    case 1: return '🌱'; // Iniciante
    case 2: return '🌿'; // Crescendo
    case 3: return '🌳'; // Maduro
    case 4: return '🌲'; // Sábio
    case 5: return '🏞️'; // Guia
    default: return '🌱';
  }
}

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
// Para desativar: mude NEXT_PUBLIC_DEV_MODE=false no .env.local
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const mockUser = {
  id: 'dev-user-123',
  email: 'dev@diariocomdeus.com',
  user_metadata: {
    name: 'Desenvolvedor'
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut, checkUser } = useAuthStore();
  const { streak, completedToday, fetchProgress, showStreak, toggleStreak } = useProgressStore();
  const { stats, achievements, newAchievements, loadStats, loadAchievements, checkNewAchievements, clearNewAchievements } = useStatsStore();
  const { showTutorial, openTutorial, closeTutorial } = useTutorial();
  const { showGuide, openGuide, closeGuide } = usePWAInstallGuide();
  const [inactivityStatus, setInactivityStatus] = useState<{
    isInactive: boolean;
    daysInactive: number;
    message: string | null;
  } | null>(null);
  const [showComebackReward, setShowComebackReward] = useState(false);
  const [emocaoSelecionada, setEmocaoSelecionada] = useState<string>('');
  const [showCheckIn, setShowCheckIn] = useState(false);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    if (DEV_MODE) {
      // Em modo desenvolvimento, não fazer nada
      return;
    }
    
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchProgress(user.id);
      
      // Carregar stats e conquistas do Supabase
      loadStats(user.id);
      loadAchievements(user.id);
      
      // Verificar conquistas novas
      checkNewAchievements(user.id);
      
      // Verificar inatividade
      const status = checkInactivityStatus();
      setInactivityStatus(status);
      
      // Mostrar bônus de retorno se ficou inativo por 3+ dias
      if (status.isInactive && status.daysInactive >= 3) {
        setShowComebackReward(true);
      }
      
      // Atualizar data de último acesso
      updateLastAccessDate();
      
      // Solicitar permissão para notificações (apenas uma vez)
      const hasAskedPermission = localStorage.getItem('notification_permission_asked');
      if (!hasAskedPermission) {
        setTimeout(() => {
          requestNotificationPermission().then((granted) => {
            localStorage.setItem('notification_permission_asked', 'true');
            if (granted) {
              console.log('✅ Notificações ativadas!');
            }
          });
        }, 5000); // Espera 5s para não ser intrusivo
      }
    }
  }, [user, loading, router, fetchProgress]);

  const handleSignOut = async () => {
    if (DEV_MODE) {
      router.push('/');
      return;
    }
    await signOut();
    router.push('/');
  };

  if (!DEV_MODE && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!DEV_MODE && !user) return null;

  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Tutorial */}
      <Tutorial show={showTutorial} onClose={closeTutorial} />

      {/* Botão de ajuda discreto com menu */}
      <HelpButton onOpenTutorial={openTutorial} />

      {/* Header com Nova Identidade */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0" style={{
                background: colors.text.gold
              }}>
                <span className="text-2xl text-white">📖</span>
              </div>
              <div className="min-w-0 flex-1">
                <div 
                  className="flex items-baseline flex-wrap mb-1"
                  style={{ 
                    lineHeight: 1,
                    gap: spacing.fixed.titleGap
                  }}
                >
                  <span 
                    className="font-bold whitespace-nowrap"
                    style={{ 
                      fontFamily: typography.serif,
                      fontWeight: typography.weights.semibold,
                      fontSize: typography.heading.h3,
                      letterSpacing: typography.letterSpacing.tight,
                      ...utils.textGradient(colors.text.gold)
                    }}
                  >
                    Diário
                  </span>
                  <span 
                    className="font-light whitespace-nowrap"
                    style={{ 
                      fontFamily: typography.serif,
                      fontWeight: typography.weights.light,
                      fontSize: typography.body.sm,
                      color: colors.text.whiteSubtle,
                      letterSpacing: typography.letterSpacing.normal,
                      margin: `0 ${spacing.fixed.titleMargin}`,
                      transform: 'translateY(-0.1em)'
                    }}
                  >
                    com
                  </span>
                  <span 
                    className="font-bold whitespace-nowrap"
                    style={{ 
                      fontFamily: typography.serif,
                      fontWeight: typography.weights.semibold,
                      fontSize: typography.heading.h3,
                      letterSpacing: typography.letterSpacing.tight,
                      ...utils.textGradient(colors.text.blue)
                    }}
                  >
                    Deus
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Olá, {currentUser.user_metadata?.name || 'amigo(a)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setShowCheckIn(true)}
                className="p-1.5 transition-all hover:scale-110"
                style={{ color: colors.text.whiteMuted }}
                title="Como você está hoje?"
              >
                <FiHeart 
                  size={20} 
                  className="transition-all duration-300"
                  style={{ 
                    color: emocaoSelecionada ? colors.accent.gold : colors.text.whiteMuted,
                    fill: emocaoSelecionada ? colors.accent.gold : 'none',
                    animation: emocaoSelecionada ? 'none' : 'heartbeat 2s ease-in-out infinite'
                  }}
                />
              </button>
              <button
                onClick={openTutorial}
                className="p-1.5 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Ver tutorial"
              >
                <FiHelpCircle size={18} />
              </button>
              <button
                onClick={openGuide}
                className="p-1.5 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Como instalar o app"
              >
                <FiSmartphone size={18} />
              </button>
              <button
                onClick={handleSignOut}
                className="p-1.5 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Sair"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">
        {/* Bônus de Retorno (usuários inativos 3+ dias) */}
        {showComebackReward && inactivityStatus && inactivityStatus.daysInactive >= 3 && (
          <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 backdrop-blur rounded-2xl p-6 text-white animate-fadeIn border border-white/20">
            <button
              onClick={() => setShowComebackReward(false)}
              className="float-right text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiGift size={24} className="text-white" />
              </div>
              <div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {getComebackReward(inactivityStatus.daysInactive).title}
                </h3>
                <p 
                  className="text-sm mb-2 opacity-90"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {getComebackReward(inactivityStatus.daysInactive).description}
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p 
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    🎁 {getComebackReward(inactivityStatus.daysInactive).reward}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de boas-vindas */}
        <div style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <h2 
            className="mb-2"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.heading.h2,
              fontWeight: typography.weights.semibold,
              color: colors.text.white
            }}
          >
            {completedToday 
              ? '✨ Parabéns! Você já fez seu devocional hoje' 
              : inactivityStatus?.message 
                ? inactivityStatus.message 
                : '☀️ Que bom ter você aqui hoje!'
            }
          </h2>
          <p 
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted
            }}
          >
            {completedToday 
              ? 'Continue assim! Cada dia com Deus fortalece sua fé.'
              : 'Reserve poucos minutos para estar com Deus. Você não vai se arrepender.'
            }
          </p>
        </div>

        {/* Stats do Supabase */}
        {stats && (
          <div style={{
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid rgba(212, 175, 55, 0.3)`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p 
                  className="mb-1"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Sua jornada espiritual
                </p>
                <p 
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h1,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  🔥 {stats.streak} {stats.streak === 1 ? 'dia' : 'dias'} seguidos
                </p>
              </div>
            </div>
            
            {/* Nível e Momentos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Nível
                </p>
                <p 
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.gold
                  }}
                >
                  {getLevelIcon(stats.spiritual_level)} {stats.spiritual_level}
                </p>
              </div>
              <div className="text-center">
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Momentos
                </p>
                <p 
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.gold
                  }}
                >
                  ⭐ {stats.moments_with_god}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Atalhos principais */}
        <div className="flex flex-col gap-4">
          {/* Devocional do Dia */}
          <Link href="/devocional-do-dia" className="devocional-do-dia-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  📖 Devocional do Dia
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Momento Preciso com Deus
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{
                background: colors.text.gold
              }}>
                <FiBook size={24} className="text-white" />
              </div>
            </div>
          </Link>


          {/* Trilhas Guiadas */}
          <Link href="/trilhas" className="trilhas-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  🗺️ Trilhas Guiadas
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Jornadas Temáticas de 7, 14 e 30 dias
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{
                background: colors.text.blue
              }}>
                <FiMap size={24} className="text-white" />
              </div>
            </div>
          </Link>

          {/* Trilhas Especiais */}
          <Link href="/extras" className="trilhas-especiais-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  ✨ Trilhas Especiais
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Conteúdos e planos avançados (Premium)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }}>
                <FiGift size={24} className="text-white" />
              </div>
            </div>
          </Link>
        </div>


        {/* Progresso Avançado */}
        <Link href="/progresso" className="progresso-card block transition-all hover:scale-105" style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                📈 Minha Evolução
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Veja suas estatísticas e conquistas
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FiCalendar size={24} className="text-white" />
            </div>
          </div>
        </Link>

        {/* Favoritos */}
        <Link href="/favoritos" className="favoritos-card block transition-all hover:scale-105" style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                ❤️ Meus Favoritos
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Versículos e citações salvos
              </p>
            </div>
            <div className="w-12 h-12 bg-red-600/30 rounded-full flex items-center justify-center flex-shrink-0">
              <FiHeart size={24} className="text-red-400" />
            </div>
          </div>
        </Link>

        {/* Presentes para Você */}
        <Link href="/bonus" className="bonus-card block transition-all hover:scale-105" style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                🎁 Presentes para Você
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                PDFs, wallpapers, playlists e muito mais
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FiGift size={24} className="text-white" />
            </div>
          </div>
        </Link>

      </Container>

      {/* Tutorial */}
      {showTutorial && <Tutorial show={showTutorial} onClose={closeTutorial} />}
      
      {/* Guia de Instalação PWA */}
      <PWAInstallGuide show={showGuide} onClose={closeGuide} />

      {/* Banner de Instalação Inteligente */}
      <PWAInstallBanner onOpenGuide={openGuide} />
      
      {/* Modal de Conquistas */}
      {newAchievements.length > 0 && (
        <AchievementModal 
          achievements={newAchievements}
          onClose={clearNewAchievements}
        />
      )}

      {/* Modal Check-in Emocional */}
      {showCheckIn && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setShowCheckIn(false)}
        >
          <div 
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckInEmocional 
              onSelect={(emocao) => {
                setEmocaoSelecionada(emocao);
                setShowCheckIn(false);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

