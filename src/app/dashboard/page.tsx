'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import Link from 'next/link';
import { FiBook, FiMap, FiHeart, FiCalendar, FiLogOut, FiMenu, FiHelpCircle, FiGift } from 'react-icons/fi';
import Tutorial, { useTutorial } from '@/components/Tutorial';
import HelpButton from '@/components/HelpButton';
import { 
  checkInactivityStatus, 
  updateLastAccessDate, 
  getComebackReward,
  requestNotificationPermission 
} from '@/lib/reengagement';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut, checkUser } = useAuthStore();
  const { streak, completedToday, fetchProgress, showStreak, toggleStreak } = useProgressStore();
  const { showTutorial, openTutorial, closeTutorial } = useTutorial();
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
    <div className="min-h-screen pb-20">
      {/* Tutorial */}
      <Tutorial show={showTutorial} onClose={closeTutorial} />

      {/* Botão de ajuda discreto com menu */}
      <HelpButton onOpenTutorial={openTutorial} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-xl">✝️</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Diário com Deus</h1>
              <p className="text-xs text-gray-600">Olá, {user.user_metadata?.name || 'amigo(a)'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openTutorial}
              className="text-gray-600 hover:text-gray-900 p-2"
              title="Ver tutorial"
            >
              <FiHelpCircle size={20} />
            </button>
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-900"
              title="Sair"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Bônus de Retorno (usuários inativos 3+ dias) */}
        {showComebackReward && inactivityStatus && inactivityStatus.daysInactive >= 3 && (
          <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white animate-fadeIn">
            <button
              onClick={() => setShowComebackReward(false)}
              className="float-right text-white/80 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiGift size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {getComebackReward(inactivityStatus.daysInactive).title}
                </h3>
                <p className="text-sm mb-2 opacity-90">
                  {getComebackReward(inactivityStatus.daysInactive).description}
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-sm font-medium">
                    🎁 {getComebackReward(inactivityStatus.daysInactive).reward}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de boas-vindas (ajustada para inatividade) */}
        <div className="card bg-gradient-to-br from-primary-50 to-orange-50 border-primary-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {completedToday 
              ? '✨ Parabéns! Você já fez seu devocional hoje' 
              : inactivityStatus?.message 
                ? inactivityStatus.message 
                : '☀️ Que bom ter você aqui hoje!'
            }
          </h2>
          <p className="text-gray-700">
            {completedToday 
              ? 'Continue assim! Cada dia com Deus fortalece sua fé.'
              : 'Reserve 7-10 minutos para estar com Deus. Você não vai se arrepender.'
            }
          </p>
        </div>

        {/* Streak (opcional) */}
        {showStreak && streak > 0 && (
          <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sua sequência</p>
                <p className="text-3xl font-bold text-primary-700">
                  🔥 {streak} {streak === 1 ? 'dia' : 'dias'}
                </p>
              </div>
              <button
                onClick={toggleStreak}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Ocultar
              </button>
            </div>
          </div>
        )}

        {/* Atalhos principais */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sessão Express */}
          <Link href="/sessao-express" className="card hover:shadow-lg transition-shadow cursor-pointer group sessao-express-card">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
                <FiBook size={24} className="text-primary-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Sessão Express</h3>
              <p className="text-sm text-gray-600">Devocional guiado em 7-10 min</p>
            </div>
          </Link>

          {/* Trilhas */}
          <Link href="/trilhas" className="card hover:shadow-lg transition-shadow cursor-pointer group trilhas-card">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <FiMap size={24} className="text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Trilhas</h3>
              <p className="text-sm text-gray-600">7, 14 ou 30 dias guiados</p>
            </div>
          </Link>

          {/* Modo Livre */}
          <Link href="/modo-livre" className="card hover:shadow-lg transition-shadow cursor-pointer group modo-livre-card">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <FiHeart size={24} className="text-purple-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Modo Livre</h3>
              <p className="text-sm text-gray-600">Por tema ou estado do coração</p>
            </div>
          </Link>

          {/* Minha Semana */}
          <Link href="/minha-semana" className="card hover:shadow-lg transition-shadow cursor-pointer group minha-semana-card">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <FiCalendar size={24} className="text-green-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Minha Semana</h3>
              <p className="text-sm text-gray-600">Veja seu progresso</p>
            </div>
          </Link>
        </div>

        {/* Voltei Hoje */}
        {!completedToday && (
          <Link href="/voltei-hoje" className="block card bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-shadow">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">💙 Voltei Hoje</h3>
              <p className="text-sm opacity-90">
                Recomeço sem culpa. Vamos juntos?
              </p>
            </div>
          </Link>
        )}

        {/* Progresso Avançado */}
        <Link href="/progresso" className="block card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow progresso-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">📈 Meu Progresso Completo</h3>
              <p className="text-sm text-gray-600">Veja sua transformação visível</p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
        </Link>

        {/* Bônus Gratuitos */}
        <Link href="/bonus" className="block card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow bonus-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">🎁 Bônus Gratuitos</h3>
              <p className="text-sm text-gray-600">PDFs, wallpapers, playlists e mais!</p>
            </div>
            <div className="text-3xl">✨</div>
          </div>
        </Link>

        {/* Conteúdos Extras (área de monetização) */}
        <Link href="/extras" className="block card bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">💎 Conteúdos Premium</h3>
              <p className="text-sm text-gray-600">Trilhas especiais para aprofundar sua fé</p>
            </div>
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              NOVO
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs bg-white rounded px-2 py-1.5 text-gray-700">
              📖 Maternidade (R$17)
            </div>
            <div className="text-xs bg-white rounded px-2 py-1.5 text-gray-700">
              💒 Casamento (R$27)
            </div>
            <div className="text-xs bg-white rounded px-2 py-1.5 text-gray-700">
              🎯 Propósito (R$37)
            </div>
            <div className="text-xs bg-white rounded px-2 py-1.5 text-gray-700 font-bold">
              🎁 Bundle (R$97)
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

