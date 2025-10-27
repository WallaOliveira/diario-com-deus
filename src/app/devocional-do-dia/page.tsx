'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import { useRespiraModal } from '@/hooks/useRespiraModal';
import { FiArrowLeft, FiVolume2, FiCheck, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
// AchievementModal removido
import ModalRespira from '@/components/ModalRespira';
import ToastCelebracao from '@/components/ToastCelebracao';
import { FontSizeControls } from '@/components/FontSizeControls';
import DailyLimitModal from '@/components/DailyLimitModal';
import { getDevotionalOfTheDay, type Devotional } from '@/lib/devotionals';
import { analytics } from '@/lib/analytics';
import { saveDevotionalProgress, updateUserStats, checkAndUnlockAchievements, addFavorite, userCompletedToday } from '@/lib/database';
import { colors, typography, spacing } from '@/lib/design-system';

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const mockUser = {
  id: 'dev-user-123',
  email: 'dev@diariocomdeus.com',
  user_metadata: {
    name: 'Desenvolvedor'
  }
};

export default function SessaoExpressPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const { markComplete } = useProgressStore();
  const { refreshAll } = useStatsStore();
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [devocional, setDevocional] = useState<Devotional | null>(null);
  const [startTime] = useState(Date.now());
  const [showContexto, setShowContexto] = useState(false);
  const [showSugestao, setShowSugestao] = useState(false);
  const [showOracaoLivre, setShowOracaoLivre] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Toast de celebração
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ titulo: '', descricao: '', icone: '' });
  
  // Modal de limite diário
  const [showLimitModal, setShowLimitModal] = useState(false);
  
  // Hook para controlar o modal RESPIRA
  const { showRespira, showRespiraModal, closeRespiraModal, continueRespiraModal, continueAndDisableRespiraModal } = useRespiraModal();

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    const loadDevotional = async () => {
      try {
        const currentUser = DEV_MODE ? mockUser : user;
        
        // SEM verificação de limite - permitir abrir
        
        // Carrega devocional do dia (sem filtro de emoção)
        const devotionalOfDay = getDevotionalOfTheDay();
        console.log('📖 Devocional carregado:', devotionalOfDay?.tema);
        setDevocional(devotionalOfDay);
        
        // Track devocional iniciado
        if (devotionalOfDay) {
          analytics.devotionalStarted(devotionalOfDay.tema);
        }

        // Mostrar modal RESPIRA apenas se não foi mostrado hoje
        showRespiraModal();
      } catch (error) {
        console.error('❌ Erro ao carregar devocional:', error);
      }
    };
    
    loadDevotional();
  }, [user, router]);

  useEffect(() => {
    if (!DEV_MODE && user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (currentUser && devocional) {
      const duration = Math.floor((Date.now() - startTime) / 1000); // seconds
      analytics.devotionalCompleted(devocional.tema, duration);
      if (notes) analytics.notesAdded();
      
      try {
        // Salvar progresso no Supabase
        await saveDevotionalProgress({
          userId: currentUser.id,
          devotionalId: devocional.id,
          durationMinutes: duration,
          personalNotes: notes,
          personalPrayer: '', // Pode ser expandido futuramente
          usedAudio: false, // TODO: Implementar quando tivermos áudio
          completedAllSteps: true
        });
        
        // Atualizar stats do usuário
        await updateUserStats(currentUser.id);
        
        // Verificar conquistas novas
        await checkAndUnlockAchievements(currentUser.id);
        
        // Atualizar store local
        await markComplete(currentUser.id, devocional.id, notes);
        
        // Atualizar stats no store
        await refreshAll(currentUser.id);
        
        // Salvar timestamp de atividade para controle de conquistas
        localStorage.setItem('last_activity_timestamp', Date.now().toString());
        
        // Salvar data do último devocional completado (para limite diário)
        const today = new Date().toISOString().split('T')[0];
        const lastDevotionalKey = `last-devotional-${currentUser.id}`;
        localStorage.setItem(lastDevotionalKey, today);
        
        // Mostrar toast de celebração
        setToastData({
          titulo: '🌿 Um passo na jornada',
          descricao: 'Devocional completado! Que esta palavra permaneça em seu coração.',
          icone: '✨'
        });
        setShowToast(true);
        
        setCompleted(true);
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        // Fallback para o sistema local
        await markComplete(currentUser.id, devocional.id, notes);
        setCompleted(true);
      }
    }
  };

  const speak = (text: string, contentType: string = 'texto') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
      analytics.audioPlayed(contentType);
    }
  };

  const handleSaveFavorite = async (content: string, type: 'verse' | 'reflection' | 'prayer', reference?: string) => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (!currentUser || !devocional) return;
    
    try {
      const result = await addFavorite({
        userId: currentUser.id,
        devotionalId: devocional.id,
        type,
        content,
        reference,
        notes: ''
      });
      
      if (result.success) {
        // Marcar como favoritado e mostrar feedback
        setIsFavorited(true);
        setToastData({
          titulo: '💜 Favoritado!',
          descricao: 'Devocional salvo em seus favoritos.',
          icone: '❤️'
        });
        setShowToast(true);
        
        // Notificar outras páginas sobre o novo favorito
        window.dispatchEvent(new CustomEvent('favoriteAdded', {
          detail: {
            devotionalId: devocional.id,
            content,
            reference,
            type
          }
        }));
        
        console.log('✅ Favorito salvo e notificação enviada!');
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  if (completed) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <Confetti show={true} />
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mx-auto flex items-center justify-center">
            <FiCheck size={40} className="text-white" />
          </div>
          <h1 
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ✨ Parabéns!
          </h1>
          <p 
            className="text-xl text-blue-100 max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Você completou seu devocional de hoje. Que Deus abençoe seu dia!
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Voltar ao Dashboard
          </Link>
        </div>
        
        {/* Sistema de conquistas removido */}
      </div>
    );
  }

  const currentUser = DEV_MODE ? mockUser : user;
  
  if (!currentUser || !devocional) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Confetti quando completar */}
      {completed && <Confetti show={true} />}

      {/* Header com Nova Identidade */}
      <header className="bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FontSizeControls />
            <span 
              className="text-sm text-blue-100"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {step}/4
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: LÊ - Leitura Bíblica (RESPIRA agora é modal) */}
        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h1 
                className="font-bold text-white mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)'
                }}
              >
                {devocional.tema}
              </h1>
              <p 
                className="text-white/80"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                {devocional.referencia}
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background.card,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <p 
                className="text-white leading-relaxed italic"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                "{devocional.texto}"
              </p>
            </div>

            {/* Botão de contexto opcional */}
            {devocional.versiculo_contexto && (
              <div className="text-center">
                <button
                  onClick={() => setShowContexto(!showContexto)}
                  className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)'
                  }}
                >
                  {showContexto ? 'Ocultar contexto' : 'Ver contexto'}
                </button>
              </div>
            )}

            {/* Contexto (se ativado) */}
            {showContexto && devocional.versiculo_contexto && (
              <div 
                className="p-4 rounded-xl border border-blue-400/50"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 className="font-semibold text-blue-300 mb-2" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                  📚 Contexto do Versículo
                </h4>
                <p className="text-blue-100 leading-relaxed" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                  {devocional.versiculo_contexto}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ 
                fontFamily: typography.sans,
                fontSize: 'var(--font-size-base, 1rem)'
              }}
            >
              Continuar →
            </button>
          </div>
        )}


        {/* Step 2: PALAVRA VIVA - Reflexão Guiada */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 
                className="font-bold text-white mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)'
                }}
              >
                💡 Palavra Viva
              </h2>
              <p 
                className="text-white/80"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Reflexão e meditação
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background.card,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <p 
                className="text-white leading-relaxed"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                {devocional.palavraViva}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AÇÃO DO DIA - Aplicação Prática */}
        {step === 3 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 
                className="font-bold text-white mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)'
                }}
              >
                🎯 Ação do Dia
              </h2>
              <p 
                className="text-white/80"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Aplicação prática
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl space-y-4"
              style={{
                background: colors.background.card,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Como você pode aplicar esta palavra em sua vida hoje? Que ação prática você pode tomar?"
                className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              />
            </div>

            {/* Botão de sugestão prática opcional */}
            <div className="text-center">
              <button
                onClick={() => setShowSugestao(!showSugestao)}
                className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                {showSugestao ? 'Ocultar sugestão' : 'Ver sugestão prática'}
              </button>
            </div>

            {/* Sugestão prática (se ativada) */}
            {showSugestao && (
              <div 
                className="p-4 rounded-xl border border-green-400/50"
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 className="font-semibold text-green-300 mb-2" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                  💡 Sugestão Prática
                </h4>
                <p className="text-green-100 leading-relaxed" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                  {devocional.acao}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: ORA - Momento de Oração */}
        {step === 4 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 
                className="font-bold text-white mb-2"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)'
                }}
              >
                🙏 Ora
              </h2>
              <p 
                className="text-white/80"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                Comunhão com Deus
              </p>
            </div>
            
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background.card,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(10px)'
              }}
            >
                <p 
                  className="text-white leading-relaxed italic"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'var(--font-size-base, 1rem)'
                  }}
                >
                  {devocional.oracao}
                </p>
              </div>

              {/* Botão de oração livre opcional */}
              <div className="text-center">
                <button
                  onClick={() => setShowOracaoLivre(!showOracaoLivre)}
                  className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)'
                  }}
                >
                  {showOracaoLivre ? 'Ocultar oração livre' : 'Ou ore livremente'}
                </button>
              </div>

              {/* Oração livre (se ativada) */}
              {showOracaoLivre && (
                <div 
                  className="p-4 rounded-xl border border-purple-400/50"
                  style={{
                    background: 'rgba(147, 51, 234, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <h4 className="font-semibold text-purple-300 mb-2" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                    💭 Sua Oração
                  </h4>
                  <p className="text-purple-100 leading-relaxed" style={{ fontSize: 'var(--font-size-base, 1rem)' }}>
                    Feche os olhos por um momento e converse com Deus do seu coração. 
                    Agradeça, peça orientação, ou simplesmente esteja em Sua presença.
                  </p>
                </div>
              )}

            <div className="flex flex-col gap-3">
              {/* Opção de favoritar */}
              <button
                onClick={() => handleSaveFavorite(devocional.texto, 'verse', devocional.referencia)}
                disabled={isFavorited}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl transition-colors"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  background: isFavorited ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'rgba(255, 255, 255, 0.1)',
                  border: isFavorited ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  cursor: isFavorited ? 'default' : 'pointer',
                  opacity: isFavorited ? 0.8 : 1
                }}
              >
                <FiHeart size={18} fill={isFavorited ? '#fff' : 'none'} />
                <span>{isFavorited ? 'Favoritado ✓' : 'Favoritar este devocional'}</span>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                  style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
                >
                  ← Voltar
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
                >
                  ✨ Finalizar Devocional
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal RESPIRA */}
      <ModalRespira
        isOpen={showRespira}
        onClose={closeRespiraModal}
        onContinue={continueRespiraModal}
        onContinueAndDisable={continueAndDisableRespiraModal}
        tema={devocional?.tema}
      />

      {/* Toast de Celebração */}
      <ToastCelebracao
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        titulo={toastData.titulo}
        descricao={toastData.descricao}
        icone={toastData.icone}
      />
      <DailyLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
    </div>
  );
}
