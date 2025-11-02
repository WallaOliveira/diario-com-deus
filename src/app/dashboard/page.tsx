'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import Link from 'next/link';
import { FiBook, FiMap, FiHeart, FiCalendar, FiLogOut, FiMenu, FiGift, FiLock } from 'react-icons/fi';
import Tutorial, { useTutorial } from '@/components/Tutorial';
import PWAInstallGuide, { usePWAInstallGuide } from '@/components/PWAInstallGuide';
import PWAInstallBanner from '@/components/PWAInstallBanner';
// AchievementModal removido
import HelpButton from '@/components/HelpButton';
import Container from '@/components/Container';
import EmotionalCheckIn, { emotions } from '@/components/EmotionalCheckIn';
import { colors, typography, spacing, components, animations, utils } from '@/lib/design-system';
import { 
  checkInactivityStatus, 
  updateLastAccessDate, 
  getComebackReward,
  requestNotificationPermission 
} from '@/lib/reengagement';
import { getEngagementMessage } from '@/lib/motivational-messages';

// Sistema de mensagens dinâmicas agora usa getEngagementMessage do lib/motivational-messages

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
  const { stats, achievements, loadStats, loadAchievements } = useStatsStore();
  const { showTutorial, openTutorial, closeTutorial } = useTutorial();
  const { showGuide, openGuide, closeGuide } = usePWAInstallGuide();
  const [inactivityStatus, setInactivityStatus] = useState<{
    isInactive: boolean;
    daysInactive: number;
    message: string | null;
  } | null>(null);
  const [showComebackReward, setShowComebackReward] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmotionalCheckIn, setShowEmotionalCheckIn] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  // Verificar se precisa mostrar check-in emocional
  useEffect(() => {
    const emotion = localStorage.getItem('current_emotion');
    
    // NÃO FORÇAR CHECK-IN - só aparece quando usuário clica no card
    // setShowEmotionalCheckIn(true); // REMOVIDO
    
    if (emotion) {
      setCurrentEmotion(emotion);
    }
  }, []);

  const handleEmotionSelect = (emotion: string) => {
    setCurrentEmotion(emotion);
    setShowEmotionalCheckIn(false);
    localStorage.setItem('last_emotional_checkin', new Date().toDateString());
    
    // Redirecionar automaticamente para o devocional emocional
    router.push('/devocional-emocional');
  };

  const handleSkipCheckIn = () => {
    setShowEmotionalCheckIn(false);
    // Não salvar last_emotional_checkin, permitir que o usuário escolha depois
  };

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
      
      // Carregar stats do Supabase
      loadStats(user.id);
      
      // Carregar conquistas APENAS se ainda não foram carregadas
      // Isso evita recarregar toda vez que navegamos de volta
      if (achievements.length === 0) {
        loadAchievements(user.id);
      } else {
      }
      
      // NÃO verificar conquistas automaticamente - apenas carregar as existentes
      // As conquistas são verificadas apenas quando o devocional/trilha é completado
      
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
            }
          });
        }, 5000); // Espera 5s para não ser intrusivo
      }
    }
  }, [user, loading, router, fetchProgress, achievements.length]);

  const handleSignOut = async () => {
    if (DEV_MODE) {
      router.push('/login');
      return;
    }
    await signOut();
    router.push('/login');
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
      <HelpButton onOpenTutorial={openTutorial} onOpenPWAInstall={openGuide} />

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
                      fontFamily: typography.sans,
                      fontWeight: typography.weights.semibold,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                      letterSpacing: typography.letterSpacing.tight,
                      ...utils.textGradient(colors.text.gold)
                    }}
                  >
                    Diário
                  </span>
                  <span 
                    className="font-light whitespace-nowrap"
                    style={{ 
                      fontFamily: typography.sans,
                      fontWeight: typography.weights.light,
                      fontSize: 'var(--font-size-base, 1rem)',
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
                      fontFamily: typography.sans,
                      fontWeight: typography.weights.semibold,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
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
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  Olá, {currentUser.user_metadata?.name || 'amigo(a)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 transition-colors hover:opacity-80 relative"
                style={{ color: colors.text.whiteMuted }}
                title="Menu"
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>

          {/* Menu Dropdown */}
          {showMenu && (
            <>
              {/* Overlay para fechar ao clicar fora */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              
        {/* Menu */}
        <div 
          className="absolute top-14 right-4 z-50 animate-fadeIn"
          style={components.dropdown}
        >
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all"
            style={{ 
              color: colors.text.white,
              fontFamily: typography.sans,
              fontSize: typography.body.sm,
              fontWeight: typography.weights.medium
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = colors.interactive.hover}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <FiLogOut size={18} style={{ color: colors.accent.red }} />
            <span>Sair da conta</span>
          </button>
        </div>
            </>
          )}

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

        {/* Check-in Emocional */}
        {showEmotionalCheckIn && (
          <EmotionalCheckIn 
            onSelect={handleEmotionSelect}
            onSkip={handleSkipCheckIn}
          />
        )}


        {/* Mensagem dinâmica de boas-vindas */}
        {stats && (
          <div className="mb-4 text-center relative">
            {/* Efeito de brilho pulsante no texto */}
            <style jsx>{`
              @keyframes pulse-text-glow {
                0%, 100% {
                  text-shadow: 0 0 8px rgba(212, 175, 55, 0.3),
                              0 0 16px rgba(212, 175, 55, 0.2),
                              0 0 24px rgba(212, 175, 55, 0.1);
                }
                50% {
                  text-shadow: 0 0 12px rgba(212, 175, 55, 0.6),
                              0 0 24px rgba(212, 175, 55, 0.4),
                              0 0 36px rgba(212, 175, 55, 0.2);
                }
              }
            `}</style>
            
            <p 
              className="font-semibold mb-1"
              style={{
                fontFamily: typography.serif,
                fontSize: 'calc(var(--font-size-base, 1rem) * 1.15)',
                color: colors.text.white,
                animation: 'pulse-text-glow 3s ease-in-out infinite'
              }}
            >
              {getEngagementMessage(stats).message}
            </p>
            <p 
              className="italic"
              style={{
                fontFamily: typography.sans,
                fontSize: 'calc(var(--font-size-base, 1rem) * 0.9)',
                color: colors.text.whiteMuted
              }}
            >
              {getEngagementMessage(stats).subMessage}
            </p>
          </div>
        )}


        {/* Atalhos principais */}
        <div className="flex flex-col gap-4">
          {/* Devocional do Dia */}
          <Link href="/devocional" className="devocional-do-dia-card group transition-all hover:scale-105" style={{
            ...components.card.base,
            padding: spacing.fixed.cardPadding,
            boxShadow: colors.shadow.card
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  📖 Devocional do Dia
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
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
            ...components.card.base,
            padding: spacing.fixed.cardPadding,
            boxShadow: colors.shadow.card
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  🗺️ Trilhas Guiadas
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
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

          {/* Minha Jornada */}
          <Link href="/progresso" className="minha-jornada-card group transition-all hover:scale-105" style={{
            ...components.card.base,
            padding: spacing.fixed.cardPadding,
            boxShadow: colors.shadow.card
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  📊 Minha Jornada
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  Acompanhe seu progresso espiritual
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{
                background: colors.text.green
              }}>
                <FiCalendar size={24} className="text-white" />
              </div>
            </div>
          </Link>

          {/* Presentes para Você */}
          <Link 
            href="/presentes"
            className="presentes-card group transition-all hover:scale-105"
            style={{
              ...components.card.base,
              padding: spacing.fixed.cardPadding,
              boxShadow: colors.shadow.card
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    fontWeight: typography.weights.semibold,
                    color: colors.text.white
                  }}
                >
                  🎁 Presentes para Você
                </h3>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  PDFs, wallpapers, playlists e muito mais
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

      </Container>

      {/* Tutorial */}
      {showTutorial && <Tutorial show={showTutorial} onClose={closeTutorial} />}
      
      {/* Guia de Instalação PWA */}
      <PWAInstallGuide show={showGuide} onClose={closeGuide} />

      {/* Banner de Instalação Inteligente */}
      <PWAInstallBanner onOpenGuide={openGuide} />
      
      {/* Sistema de conquistas removido */}

    </div>
  );
}

