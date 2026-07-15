'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import { useRespiraModal } from '@/hooks/useRespiraModal';
import { FiArrowLeft, FiCheck, FiHeart, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
// AchievementModal removido
import ModalRespira from '@/components/ModalRespira';
import ToastCelebracao from '@/components/ToastCelebracao';
import { getTrilhaById, getTrilhaDia, type TrilhaDia } from '@/lib/trilhas';
import { analytics } from '@/lib/analytics';
import { saveDevotionalProgress, updateUserStats, checkAndUnlockAchievements, addFavorite } from '@/lib/database';
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

export default function TrilhaDinamicaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { markComplete } = useProgressStore();
  const { refreshAll } = useStatsStore();
  
  // Estados principais
  const [diaAtual, setDiaAtual] = useState(1);
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [diasConcluidos, setDiasConcluidos] = useState<number[]>([]);
  const [startTime] = useState(Date.now());
  
  // Estados de visibilidade
  const [showContexto, setShowContexto] = useState(false);
  const [showSugestao, setShowSugestao] = useState(false);
  const [showOracaoLivre, setShowOracaoLivre] = useState(false);
  
  // Toast de celebração
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ titulo: '', descricao: '', icone: '' });
  
  // Hook para controlar o modal RESPIRA
  const { showRespira, showRespiraModal, closeRespiraModal, continueRespiraModal, continueAndDisableRespiraModal } = useRespiraModal();

  // Dados da trilha usando params.id
  console.log('🔍 ID da trilha recebido:', params.id);
  const trilha = getTrilhaById(params.id);
  console.log('📚 Trilha encontrada:', trilha?.titulo);
  const diaData = getTrilhaDia(params.id, diaAtual);
  console.log('📖 Dia carregado:', diaData?.titulo);

  useEffect(() => {
    if (!DEV_MODE) {
      checkUser();
    }
  }, [checkUser]);

  useEffect(() => {
    if (!DEV_MODE && !loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Carregar progresso do localStorage (temporário - depois virá do Supabase)
    const savedProgress = localStorage.getItem(`trilha-${params.id}-progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setDiasConcluidos(progress.diasConcluidos || []);
      setDiaAtual(progress.diaAtual || 1);
    }

    // Mostrar modal RESPIRA apenas se não foi mostrado hoje
    showRespiraModal();

    // Track início da trilha
    if (diaData) {
      analytics.devotionalStarted(`Trilha: ${trilha?.titulo} - Dia ${diaAtual}`);
    }
  }, [params.id]);

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
    if (currentUser && diaData && trilha) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      analytics.devotionalCompleted(`Trilha: ${trilha.titulo} - Dia ${diaAtual}`, duration);
      if (notes) analytics.notesAdded();
      
      try {
        // Salvar progresso no Supabase
        await saveDevotionalProgress({
          userId: currentUser.id,
          devotionalId: `trilha-${params.id}-dia-${diaAtual}`,
          durationMinutes: duration,
          personalNotes: notes,
          personalPrayer: '',
          usedAudio: false,
          completedAllSteps: true
        });
        
        // Atualizar stats do usuário
        await updateUserStats(currentUser.id);
        
        // Verificar conquistas novas
        await checkAndUnlockAchievements(currentUser.id);
        
        // Atualizar progresso local
        const novosDiasConcluidos = [...diasConcluidos, diaAtual];
        setDiasConcluidos(novosDiasConcluidos);
        
        // Salvar no localStorage
        const progressData = {
          diasConcluidos: novosDiasConcluidos,
          diaAtual: diaAtual < trilha.duracao ? diaAtual + 1 : diaAtual,
          dataUltimaAtualizacao: new Date().toISOString()
        };
        localStorage.setItem(`trilha-${params.id}-progress`, JSON.stringify(progressData));
        
        // Atualizar store local
        await markComplete(currentUser.id, `trilha-${params.id}-dia-${diaAtual}`, notes);
        
        // Atualizar stats no store
        await refreshAll(currentUser.id);
        
        // Salvar timestamp de atividade para controle de conquistas
        localStorage.setItem('last_activity_timestamp', Date.now().toString());
        
        // Mostrar toast de celebração
        const isUltimoDia = diaAtual === 7;
        setToastData({
          titulo: isUltimoDia ? '🎉 Trilha completa!' : `🌿 Dia ${diaAtual} concluído`,
          descricao: isUltimoDia 
            ? 'Parabéns! Você completou toda a trilha de Paz Interior.' 
            : 'Continue sua jornada! Cada dia é uma nova graça.',
          icone: isUltimoDia ? '🏆' : '✨'
        });
        setShowToast(true);
        
        setCompleted(true);
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        setCompleted(true);
      }
    }
  };

  const handleProximoDia = () => {
    if (trilha && diaAtual < trilha.duracao) {
      setDiaAtual(diaAtual + 1);
      setStep(1);
      setNotes('');
      setCompleted(false);
      setShowContexto(false);
      setShowSugestao(false);
      setShowOracaoLivre(false);
    } else {
      router.push('/trilhas');
    }
  };

  const handleSaveFavorite = async (content: string, type: 'verse' | 'reflection' | 'prayer', reference?: string) => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (!currentUser) return;
    
    try {
      await addFavorite({
        userId: currentUser.id,
        devotionalId: `trilha-${params.id}-dia-${diaAtual}`,
        type,
        content,
        reference,
        notes: ''
      });
      
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  // Tela de conclusão do dia
  if (completed) {
    const isUltimoDia = trilha ? diaAtual === trilha.duracao : false;
    
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <Confetti show={true} />
        <div className="text-center space-y-6 animate-fadeIn max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
            <FiCheck size={40} className="text-white" />
          </div>
          
          <h1 
            className="text-4xl font-bold text-white"
            style={{ fontFamily: typography.sans }}
          >
            {isUltimoDia ? '🎉 Parabéns!' : '✨ Dia Completo!'}
          </h1>
          
          <p 
            className="text-xl text-blue-100"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {isUltimoDia 
              ? 'Você completou a trilha "7 Dias de Paz Interior"! Que Deus continue te abençoando com Sua paz.'
              : `Você completou o Dia ${diaAtual}! Continue sua jornada amanhã.`
            }
          </p>

          {!isUltimoDia && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <p className="text-blue-100 text-sm mb-2">Progresso da Trilha:</p>
              <div className="flex items-center gap-2">
                {trilha && Array.from({ length: trilha.duracao }, (_, i) => i + 1).map((dia) => (
                  <div
                    key={dia}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      diasConcluidos.includes(dia) || dia === diaAtual
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white/50'
                    }`}
                  >
                    {diasConcluidos.includes(dia) || dia === diaAtual ? '✓' : dia}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!isUltimoDia && (
              <button
                onClick={handleProximoDia}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Ir para Dia {diaAtual + 1}
              </button>
            )}
            
            <Link
              href="/trilhas"
              className="inline-block bg-white/10 text-white border border-white/20 font-semibold py-3.5 px-8 rounded-xl transition-all hover:bg-white/20"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isUltimoDia ? 'Ver Outras Trilhas' : 'Voltar às Trilhas'}
            </Link>
          </div>
        </div>
        
        {/* Sistema de conquistas removido */}
      </div>
    );
  }

  const currentUser = DEV_MODE ? mockUser : user;
  
  if (!currentUser) {
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
          <p className="mt-4 text-white">Carregando trilha...</p>
        </div>
      </div>
    );
  }
  
  if (!trilha) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <div className="text-center">
          <p className="text-white text-xl mb-4">Trilha não encontrada</p>
          <p className="text-white/60 mb-6">ID: {params.id}</p>
          <Link 
            href="/trilhas"
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            Voltar às Trilhas
          </Link>
        </div>
      </div>
    );
  }
  
  if (!diaData) {
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
          <p className="mt-4 text-white">Carregando dia...</p>
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
      {/* Header com progresso */}
      <header className="bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/trilhas" className="text-blue-100 hover:text-white transition-colors">
              <FiArrowLeft size={24} />
            </Link>
            <div className="text-center flex-1 mx-4">
              <p 
                className="text-xs text-blue-200 mb-1"
                style={{ fontSize: 'var(--font-size-base, 1rem)' }}
              >
                {trilha.icone} {trilha.titulo}
              </p>
              <p 
                className="text-sm font-bold text-white"
                style={{ fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)' }}
              >
                Dia {diaAtual} de {trilha.duracao} - {diaData.titulo}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="text-sm text-blue-100"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'var(--font-size-base, 1rem)' }}
              >
                {step}/4
              </span>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{ 
                background: trilha ? `linear-gradient(135deg, ${trilha.cor} 0%, #10b981 100%)` : 'linear-gradient(135deg, #10b981 0%, #10b981 100%)',
                width: `${(step / 4) * 100}%` 
              }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: Leitura Bíblica */}
        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <h2 
                className="text-2xl font-bold text-white mb-2"
                style={{ fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)' }}
              >
                📖 {diaData.titulo}
              </h2>
              <p 
                className="text-white/80"
                style={{ fontSize: 'var(--font-size-base, 1rem)' }}
              >
                {diaData.referencia}
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
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                "{diaData.texto}"
              </p>
            </div>

            {/* Botão de contexto opcional */}
            {diaData.versiculo_contexto && (
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
            {showContexto && diaData.versiculo_contexto && (
              <div 
                className="p-4 rounded-xl border border-blue-400/50"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 
                  className="font-semibold text-blue-300 mb-2"
                  style={{ fontSize: 'var(--font-size-base, 1rem)' }}
                >
                  📚 Contexto do Versículo
                </h4>
                <p 
                  className="text-blue-100 leading-relaxed"
                  style={{ fontSize: 'var(--font-size-base, 1rem)' }}
                >
                  {diaData.versiculo_contexto}
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
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                {diaData.palavraViva}
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
                <h4 
                  className="font-semibold text-green-300 mb-2"
                  style={{ fontSize: 'var(--font-size-base, 1rem)' }}
                >
                  💡 Sugestão Prática
                </h4>
                <p 
                  className="text-green-100 leading-relaxed"
                  style={{ fontSize: 'var(--font-size-base, 1rem)' }}
                >
                  {diaData.acao}
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
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)'
                }}
              >
                {diaData.oracao}
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

              <button
                onClick={() => handleSaveFavorite(diaData.texto, 'verse', diaData.referencia)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors mb-4"
                style={{ fontFamily: typography.sans }}
              >
                <FiHeart size={18} />
                <span>Favoritar esse Devocional</span>
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
                ✨ Finalizar Dia {diaAtual}
              </button>
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
        tema={`${trilha.icone} Dia ${diaAtual}: ${diaData.titulo}`}
      />

      {/* Toast de Celebração */}
      <ToastCelebracao
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        titulo={toastData.titulo}
        descricao={toastData.descricao}
        icone={toastData.icone}
      />
    </div>
  );
}

