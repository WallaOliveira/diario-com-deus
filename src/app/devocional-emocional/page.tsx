'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import { useRespiraModal } from '@/hooks/useRespiraModal';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import ModalRespira from '@/components/ModalRespira';
import { analytics } from '@/lib/analytics';
import { saveDevotionalProgress, updateUserStats, checkAndUnlockAchievements, addFavorite } from '@/lib/database';
import { getEmotionalSuggestion } from '@/lib/emotional-suggestions';
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

export default function DevocionalEmocionalPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const { markComplete, refreshAll } = useProgressStore();
  const { checkNewAchievements } = useStatsStore();
  
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [emocaoAtual, setEmocaoAtual] = useState<string>('');
  const [suggestion, setSuggestion] = useState<any>(null);
  const [startTime] = useState(Date.now());
  
  // Hook para controlar o modal RESPIRA
  const { showRespira, showRespiraModal, closeRespiraModal, continueRespiraModal } = useRespiraModal();

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    // Carregar emoção do localStorage
    const savedEmotion = localStorage.getItem('emocao_selecionada');
    if (savedEmotion) {
      setEmocaoAtual(savedEmotion);
      const emotionalSuggestion = getEmotionalSuggestion(savedEmotion);
      if (emotionalSuggestion) {
        setSuggestion(emotionalSuggestion);
      }
    }

    // Track devocional emocional iniciado
    if (savedEmotion) {
      analytics.devotionalStarted(`emocional-${savedEmotion}`);
    }

    // Mostrar modal RESPIRA
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
    if (currentUser && suggestion) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      analytics.devotionalCompleted(`emocional-${emocaoAtual}`, duration);
      if (notes) analytics.notesAdded();
      
      try {
        // Salvar progresso no Supabase
        await saveDevotionalProgress({
          userId: currentUser.id,
          devotionalId: `emocional-${emocaoAtual}`,
          notes: notes,
          prayer: '',
          duration: duration,
          completedAt: new Date().toISOString()
        });
        
        // Atualizar stats do usuário
        await updateUserStats(currentUser.id);
        
        // Verificar conquistas novas
        await checkAndUnlockAchievements(currentUser.id);
        
        // Atualizar store local
        await markComplete(currentUser.id, `emocional-${emocaoAtual}`, notes);
        
        // Atualizar stats no store
        await refreshAll(currentUser.id);
        
        // Salvar timestamp de atividade para controle de conquistas
        localStorage.setItem('last_activity_timestamp', Date.now().toString());
        
        setCompleted(true);
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        // Fallback para o sistema local
        await markComplete(currentUser.id, `emocional-${emocaoAtual}`, notes);
        setCompleted(true);
      }
    }
  };

  const handleSaveFavorite = async (content: string, type: 'verse' | 'quote' | 'prayer', reference?: string) => {
    if (!currentUser) return;
    
    try {
      await addFavorite({
        userId: currentUser.id,
        content: content,
        type: type,
        reference: reference,
        tags: [emocaoAtual, 'emocional']
      });
      
      // Atualizar stats
      analytics.notesAdded();
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  if (!suggestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Carregando devocional emocional...</p>
          <Link 
            href="/dashboard"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            ← Voltar ao Dashboard
          </Link>
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
      {/* Header */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </Link>
            
            <h1 
              className="text-lg font-bold"
              style={{ 
                fontFamily: typography.serif,
                color: colors.text.gold
              }}
            >
              {suggestion.emoji} Devocional Especial
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Etapa {step} de 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {!completed ? (
          <div className="space-y-6">
            {/* Etapa 1: Sabedoria */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    📖 Sabedoria
                  </h2>
                  <p className="text-white/80">
                    {suggestion.verse}
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
                    "{suggestion.verseText}"
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Continuar →
                </button>
              </div>
            )}

            {/* Etapa 2: Palavra Viva */}
            {step === 2 && (
              <div className="space-y-6">
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
                    {suggestion.reflection}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3: Ação do Dia */}
            {step === 3 && (
              <div className="space-y-6">
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

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 4: Ora */}
            {step === 4 && (
              <div className="space-y-6">
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
                    {suggestion.prayer}
                  </p>
                </div>

                <button
                  onClick={() => handleSaveFavorite(suggestion.verseText, 'verse', suggestion.verse)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <FiHeart size={18} />
                  <span>Favoritar este devocional</span>
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3.5 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex-[2] bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ✨ Finalizar Devocional
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tela de Conclusão */
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-bold text-white">
              Devocional Concluído!
            </h2>
            <p className="text-white/80 text-lg">
              Que esta palavra especial tenha tocado seu coração hoje.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Voltar ao Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Modal RESPIRA */}
      <ModalRespira
        isOpen={showRespira}
        onClose={closeRespiraModal}
        onContinue={continueRespiraModal}
        tema={suggestion?.title || 'Devocional Especial'}
      />
    </div>
  );
}
