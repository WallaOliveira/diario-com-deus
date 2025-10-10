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
import AchievementModal from '@/components/AchievementModal';
import ModalRespira from '@/components/ModalRespira';
import { getDevotionalOfTheDay, type Devotional } from '@/lib/devotionals';
import { analytics } from '@/lib/analytics';
import { saveDevotionalProgress, updateUserStats, checkAndUnlockAchievements, addFavorite } from '@/lib/database';
import { getEmotionalSuggestion, getEmotionalTrilhaSuggestion } from '@/lib/emotional-suggestions';
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
  const { refreshAll, newAchievements, clearNewAchievements } = useStatsStore();
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [devocional, setDevocional] = useState<Devotional | null>(null);
  const [startTime] = useState(Date.now());
  const [showContexto, setShowContexto] = useState(false);
  const [showSugestao, setShowSugestao] = useState(false);
  const [showOracaoLivre, setShowOracaoLivre] = useState(false);
  const [emocaoAtual, setEmocaoAtual] = useState<string>('');
  const [showEmotionalSuggestion, setShowEmotionalSuggestion] = useState(false);
  
  // Hook para controlar o modal RESPIRA
  const { showRespira, showRespiraModal, closeRespiraModal, continueRespiraModal } = useRespiraModal();

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    // Carrega devocional do dia
    const devotionalOfDay = getDevotionalOfTheDay();
    setDevocional(devotionalOfDay);
    
    // Track devocional iniciado
    if (devotionalOfDay) {
      analytics.devotionalStarted(devotionalOfDay.tema);
    }

    // Carregar emoção do localStorage
    const savedEmotion = localStorage.getItem('emocao_selecionada');
    if (savedEmotion) {
      setEmocaoAtual(savedEmotion);
    }

    // Mostrar modal RESPIRA apenas se não foi mostrado hoje
    showRespiraModal();
  }, []);

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
          notes: notes,
          prayer: '', // Pode ser expandido futuramente
          duration: duration,
          completedAt: new Date().toISOString()
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
        
        // Mostrar sugestão emocional se houver emoção selecionada
        if (emocaoAtual) {
          setShowEmotionalSuggestion(true);
        }
        
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

  const handleSaveFavorite = async (content: string, type: 'verse' | 'quote' | 'prayer', reference?: string) => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (!currentUser) return;
    
    try {
      await addFavorite({
        userId: currentUser.id,
        type,
        content,
        reference,
        tags: [devocional?.tema || 'geral']
      });
      
      // Aqui você pode adicionar um toast de sucesso
      console.log('Favorito salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  if (completed) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)'
        }}
      >
        <Confetti />
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

  const currentUser = DEV_MODE ? mockUser : user;
  
  if (!currentUser || !devocional) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)'
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
        background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)'
      }}
    >
      {/* Confetti quando completar */}
      {completed && <Confetti />}

      {/* Header com Nova Identidade */}
      <header className="bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors">
            <FiArrowLeft size={24} />
          </Link>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
          <span 
            className="text-sm text-blue-100"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {step}/4
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: LÊ - Leitura Bíblica (RESPIRA agora é modal) */}
        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                📖 Sabedoria
              </h2>
              <p className="text-white/80">
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
                className="text-white leading-relaxed italic text-lg"
                style={{ fontFamily: typography.serif }}
              >
                "{devocional.texto}"
              </p>
            </div>

            {/* Botão de contexto opcional */}
            {devocional.versiculo_contexto && (
              <div className="text-center">
                <button
                  onClick={() => setShowContexto(!showContexto)}
                  className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm"
                  style={{ fontFamily: typography.sans }}
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
                <h4 className="font-semibold text-blue-300 mb-2">
                  📚 Contexto do Versículo
                </h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {devocional.versiculo_contexto}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: typography.sans }}
            >
              Continuar →
            </button>
          </div>
        )}


        {/* Step 2: PALAVRA VIVA - Reflexão Guiada */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                💡 Palavra Viva
              </h2>
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
                style={{ fontFamily: typography.sans }}
              >
                {devocional.palavraViva}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                style={{ fontFamily: typography.sans }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: typography.sans }}
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
              <h2 className="text-2xl font-bold text-white mb-2">
                🎯 Ação do Dia
              </h2>
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
                style={{ fontFamily: typography.sans }}
              />
            </div>

            {/* Botão de sugestão prática opcional */}
            <div className="text-center">
              <button
                onClick={() => setShowSugestao(!showSugestao)}
                className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm"
                style={{ fontFamily: typography.sans }}
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
                <h4 className="font-semibold text-green-300 mb-2">
                  💡 Sugestão Prática
                </h4>
                <p className="text-green-100 text-sm leading-relaxed">
                  {devocional.acao}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                style={{ fontFamily: typography.sans }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: typography.sans }}
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
              <h2 className="text-2xl font-bold text-white mb-2">
                🙏 Ora
              </h2>
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
                  style={{ fontFamily: typography.serif }}
                >
                  {devocional.oracao}
                </p>
              </div>

              {/* Botão de oração livre opcional */}
              <div className="text-center">
                <button
                  onClick={() => setShowOracaoLivre(!showOracaoLivre)}
                  className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm"
                  style={{ fontFamily: typography.sans }}
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
                  <h4 className="font-semibold text-purple-300 mb-2">
                    💭 Sua Oração
                  </h4>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Feche os olhos por um momento e converse com Deus do seu coração. 
                    Agradeça, peça orientação, ou simplesmente esteja em Sua presença.
                  </p>
                </div>
              )}

            <div className="flex flex-col gap-3">
              {/* Opção de favoritar */}
              <button
                onClick={() => handleSaveFavorite(devocional.texto, 'verse', devocional.referencia)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                style={{ fontFamily: typography.sans }}
              >
                <FiHeart size={18} />
                <span>Favoritar este devocional</span>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                  style={{ fontFamily: typography.sans }}
                >
                  ← Voltar
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: typography.sans }}
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
        tema={devocional?.tema}
      />

      {/* Modal de Sugestão Emocional */}
      {showEmotionalSuggestion && emocaoAtual && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            {(() => {
              const suggestion = getEmotionalSuggestion(emocaoAtual);
              const trilhaSuggestion = getEmotionalTrilhaSuggestion(emocaoAtual);
              
              if (!suggestion) return null;
              
              return (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{suggestion.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {suggestion.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {suggestion.description}
                    </p>
                  </div>

                  {/* Versículo */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      📖 {suggestion.verse}
                    </h4>
                    <p className="text-gray-700 italic leading-relaxed">
                      "{suggestion.verseText}"
                    </p>
                  </div>

                  {/* Reflexão */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      💭 Reflexão
                    </h4>
                    <p className="text-blue-700 leading-relaxed">
                      {suggestion.reflection}
                    </p>
                  </div>

                  {/* Oração */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      🙏 Oração
                    </h4>
                    <p className="text-purple-700 leading-relaxed italic">
                      {suggestion.prayer}
                    </p>
                  </div>

                  {/* Sugestão de Trilha */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      🗺️ Recomendação
                    </h4>
                    <p className="text-orange-700 text-sm">
                      Que tal continuar sua jornada com a trilha <strong>"{trilhaSuggestion}"</strong>?
                    </p>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowEmotionalSuggestion(false)}
                      className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Fechar
                    </button>
                    <Link
                      href="/trilhas"
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all font-medium text-center"
                      onClick={() => setShowEmotionalSuggestion(false)}
                    >
                      Ver Trilhas
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