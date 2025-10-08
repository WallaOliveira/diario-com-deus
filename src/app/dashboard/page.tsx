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
import { colors, typography, spacing } from '@/lib/design-system';
import { 
  checkInactivityStatus, 
  updateLastAccessDate, 
  getComebackReward,
  requestNotificationPermission 
} from '@/lib/reengagement';

// Função para obter ícone do nível espiritual
function getLevelIcon(level: number): string {
  switch (level) {
    case 1: return '🌱'; // Semente
    case 2: return '🌿'; // Broto
    case 3: return '🌳'; // Árvore
    case 4: return '🌲'; // Bosque
    case 5: return '🏞️'; // Floresta
    default: return '🌱';
  }
}

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

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
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
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) return null;

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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{
                background: colors.text.gold
              }}>
                <span className="text-2xl text-white">📖</span>
              </div>
              <div>
                <h1 
                  className="font-bold text-white"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold
                  }}
                >
                  Diário com Deus
                </h1>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  Olá, {user.user_metadata?.name || 'amigo(a)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openTutorial}
                className="p-2 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Ver tutorial"
              >
                <FiHelpCircle size={20} />
              </button>
              <button
                onClick={openGuide}
                className="p-2 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Como instalar o app"
              >
                <FiSmartphone size={20} />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 transition-colors hover:opacity-80"
                style={{ color: colors.text.whiteMuted }}
                title="Sair"
              >
                <FiLogOut size={20} />
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
        <div className="grid grid-cols-2 gap-4">
          {/* Sessão Express */}
          <Link href="/sessao-express" className="sessao-express-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg" style={{
                background: colors.text.gold
              }}>
                <FiBook size={24} className="text-white" />
              </div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Devocional Diário
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
          </Link>

          {/* Devocional Pessoal */}
          <Link href="/modo-livre" className="modo-livre-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }}>
                <FiHeart size={24} className="text-white" />
              </div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Devocional Pessoal
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Conforme sua Necessidade
              </p>
            </div>
          </Link>

          {/* Trilhas */}
          <Link href="/trilhas" className="trilhas-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg" style={{
                background: colors.text.blue
              }}>
                <FiMap size={24} className="text-white" />
              </div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Trilhas Devocionais
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
          </Link>

          {/* Conteúdo Extra */}
          <Link href="/extras" className="trilhas-especiais-card group transition-all hover:scale-105" style={{
            background: colors.background.card,
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }}>
                <FiGift size={24} className="text-white" />
              </div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Trilhas Especiais
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Trilhas, conteúdos e planos avançados
              </p>
            </div>
          </Link>
        </div>

        {/* Voltei Hoje */}
        {!completedToday && (
          <Link href="/voltei-hoje" className="block text-white transition-all hover:scale-105" style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)',
            borderRadius: '16px',
            padding: spacing.fixed.cardPadding,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="text-center">
              <h3 
                className="mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                💙 Voltei Hoje
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Recomeço sem culpa. Vamos juntos?
              </p>
            </div>
          </Link>
        )}

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
                📈 Meu Progresso
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

        {/* Bônus Gratuitos */}
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
                🎁 Bônus Gratuitos
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
    </div>
  );
}

