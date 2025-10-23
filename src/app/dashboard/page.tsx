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
import { getEmotionalSuggestion } from '@/lib/emotional-suggestions';

// Sistema de mensagens dinâmicas
const getDynamicMessage = (streak: number, lastLogin: string | null, completedToday: boolean, emotion?: string) => {
  const now = new Date();
  const lastLoginDate = lastLogin ? new Date(lastLogin) : null;
  const daysSinceLastLogin = lastLoginDate ? Math.floor((now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  // Se completou hoje
  if (completedToday) {
    return {
      title: '✨ Que lindo compromisso com Deus!',
      message: 'Você já fez seu devocional hoje. Cada momento com Ele fortalece sua fé!',
      emoji: '✨',
      animation: 'celebrate',
      color: 'gold'
    };
  }

  // Se tem check-in emocional, personalizar mensagem
  if (emotion) {
    switch (emotion) {
      case 'ansioso':
        return {
          title: '💙 Deus está no controle',
          message: 'Respire fundo. Mesmo na ansiedade, Deus te ama e tem cuidado de você. Que tal um momento de paz?',
          emoji: '💙',
          animation: 'gentle',
          color: 'blue'
        };
      case 'grato':
        return {
          title: '🙏 Que lindo coração grato!',
          message: 'A gratidão transforma tudo! Vamos celebrar as bênçãos de hoje com Deus?',
          emoji: '🙏',
          animation: 'sunshine',
          color: 'yellow'
        };
      case 'cansado':
        return {
          title: '🌙 Vinde a mim, cansados',
          message: 'Deus conhece seu cansaço. Ele oferece descanso para sua alma. Aceita esse convite?',
          emoji: '🌙',
          animation: 'gentle',
          color: 'purple'
        };
      case 'esperançoso':
        return {
          title: '🌟 Sua esperança é linda!',
          message: 'Que bom ter esperança! Deus tem planos de esperança para você. Vamos descobrir juntos?',
          emoji: '🌟',
          animation: 'sparkle',
          color: 'gold'
        };
    }
  }
  
  // Usuário ativo (0-1 dias)
  if (daysSinceLastLogin <= 1) {
    if (streak >= 7) {
      return {
        title: '🔥 Que constância incrível!',
        message: `${streak} dias seguidos! Você está criando um hábito abençoado.`,
        emoji: '🔥',
        animation: 'fire',
        color: 'orange'
      };
    } else if (streak >= 3) {
      return {
        title: '🌟 Sua fé está crescendo!',
        message: `${streak} dias seguidos! Continue assim, cada dia conta.`,
        emoji: '🌟',
        animation: 'sparkle',
        color: 'yellow'
      };
    } else {
      return {
        title: '☀️ Que bom ter você aqui hoje!',
        message: 'Reserve poucos minutos para estar com Deus. Você não vai se arrepender.',
        emoji: '☀️',
        animation: 'sunshine',
        color: 'yellow'
      };
    }
  }
  
  // Usuário regular (2-3 dias)
  if (daysSinceLastLogin <= 3) {
    return {
      title: '😊 Que bom te ver novamente!',
      message: 'Deus está sempre aqui, te esperando com carinho. Que tal um momento especial hoje?',
      emoji: '😊',
      animation: 'gentle',
      color: 'blue'
    };
  }
  
  // Usuário retorno (4-7 dias)
  if (daysSinceLastLogin <= 7) {
    return {
      title: '💙 Sentimos sua falta!',
      message: 'Deus te espera com amor. Não há condenação, só acolhimento. Vamos recomeçar?',
      emoji: '💙',
      animation: 'heartbeat',
      color: 'purple'
    };
  }
  
  // Usuário longo retorno (8+ dias)
  return {
    title: '🤗 Que alegria te ver de volta!',
    message: 'Recomeçar é um ato de coragem. Deus te acolhe com amor infinito. Bem-vindo!',
    emoji: '🤗',
    animation: 'aurora',
    color: 'green'
  };
};

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
  const { stats, achievements, newAchievements, loadStats, loadAchievements, clearNewAchievements } = useStatsStore();
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
  const [showEmotionalDevotionalSuggestion, setShowEmotionalDevotionalSuggestion] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;
  
  // Mensagem dinâmica baseada no comportamento
  const dynamicMessage = getDynamicMessage(
    streak || 0, 
    currentUser?.last_login || null, 
    completedToday,
    emocaoSelecionada || undefined
  );

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
              <Link
                href="/progresso"
                className="p-1.5 transition-all hover:scale-110"
                style={{ color: colors.text.whiteMuted }}
                title="Minha Jornada"
              >
                <FiCalendar size={20} />
              </Link>
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
            <div 
              className="absolute top-16 right-4 z-50"
              style={{
                background: colors.background.card,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '0.5rem',
                backdropFilter: 'blur(10px)',
                minWidth: '180px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }}
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
                style={{ 
                  color: colors.text.whiteMuted,
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm
                }}
              >
                <FiLogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
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

        {/* Mensagem dinâmica de boas-vindas */}
        <div 
          className={`relative overflow-hidden ${dynamicMessage.animation}-container`}
          style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Animação de fundo */}
          <div 
            className={`absolute inset-0 ${dynamicMessage.animation}-bg`}
            style={{ 
              opacity: 0.1,
              background: dynamicMessage.color === 'gold' ? 'linear-gradient(45deg, #fbbf24, #f59e0b)' :
                         dynamicMessage.color === 'orange' ? 'linear-gradient(45deg, #f97316, #ea580c)' :
                         dynamicMessage.color === 'yellow' ? 'linear-gradient(45deg, #eab308, #ca8a04)' :
                         dynamicMessage.color === 'blue' ? 'linear-gradient(45deg, #3b82f6, #2563eb)' :
                         dynamicMessage.color === 'purple' ? 'linear-gradient(45deg, #8b5cf6, #7c3aed)' :
                         'linear-gradient(45deg, #10b981, #059669)'
            }}
          />
          
          <div className="relative z-10">
            <h2 
              className={`mb-2 ${dynamicMessage.animation}-text`}
              style={{ 
                fontFamily: typography.serif,
                fontSize: typography.heading.h2,
                fontWeight: typography.weights.semibold,
                color: colors.text.white
              }}
            >
              {dynamicMessage.title}
            </h2>
            <p 
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.body.md,
                color: colors.text.whiteMuted
              }}
            >
              {dynamicMessage.message}
            </p>
          </div>
        </div>


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

          {/* Presentes para Você */}
          <Link 
            href="/presentes"
            className="presentes-card group transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              borderRadius: '16px',
              padding: spacing.fixed.cardPadding,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
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
      
      {/* Modal de Conquistas */}
      {newAchievements.length > 0 && currentUser && (
        <AchievementModal 
          achievements={newAchievements}
          onClose={() => clearNewAchievements(currentUser.id)}
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
                // Salvar emoção no localStorage para uso em outras páginas
                localStorage.setItem('emocao_selecionada', emocao);
                // Mostrar sugestão de devocional emocional
                setShowEmotionalDevotionalSuggestion(true);
              }} 
            />
          </div>
        </div>
      )}

      {/* Modal de Sugestão de Devocional Emocional */}
      {showEmotionalDevotionalSuggestion && emocaoSelecionada && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            {(() => {
              const suggestion = getEmotionalSuggestion(emocaoSelecionada);
              
              if (!suggestion) return null;
              
              return (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{suggestion.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Devocional Especial para Você
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {suggestion.description}
                    </p>
                  </div>

                  {/* Versículo Preview */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      📖 {suggestion.verse}
                    </h4>
                    <p className="text-gray-700 italic leading-relaxed text-sm">
                      "{suggestion.verseText.substring(0, 120)}..."
                    </p>
                  </div>

                  {/* Explicação */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-700 text-sm leading-relaxed">
                      Este devocional foi especialmente escolhido para te ajudar com o que você está sentindo hoje. 
                      Que tal dedicar alguns minutos para esta palavra especial?
                    </p>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowEmotionalDevotionalSuggestion(false)}
                      className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Voltar ao Dashboard
                    </button>
                    <Link
                      href="/devocional-emocional"
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all font-medium text-center"
                      onClick={() => setShowEmotionalDevotionalSuggestion(false)}
                    >
                      Fazer Devocional Especial
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

