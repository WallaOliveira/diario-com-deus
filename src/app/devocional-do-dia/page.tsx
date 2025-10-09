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
            <div className="text-center mb-8">
              <h1 
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                📖 Sabedoria
              </h1>
              <p 
                className="text-lg text-blue-100 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Leia com atenção. Deus tem uma palavra especial para você hoje.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <p 
                className="text-yellow-200 mb-4 font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.referencia}
              </p>
              <p 
                className="text-blue-100 leading-relaxed text-lg italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {devocional.texto}
              </p>
            </div>

            {/* Botão de contexto */}
            {devocional.versiculo_contexto && (
              <div className="text-center">
                <button
                  onClick={() => setShowContexto(!showContexto)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>{showContexto ? 'Ocultar' : 'Ver'} contexto</span>
                  <span className={`transition-transform ${showContexto ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              </div>
            )}

            {/* Contexto (condicional) */}
            {showContexto && devocional.versiculo_contexto && (
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30 animate-fadeIn">
                <p 
                  className="text-blue-100 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <strong>Contexto:</strong> {devocional.versiculo_contexto}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continuar
            </button>
          </div>
        )}


        {/* Step 2: PALAVRA VIVA - Reflexão Guiada */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center mb-8">
              <h1 
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                💡 Palavra Viva
              </h1>
              <p 
                className="text-lg text-blue-100 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                O que Deus está dizendo para você através desta palavra
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <p 
                className="text-white text-lg leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.palavraViva}
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
                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AÇÃO DO DIA - Aplicação Prática */}
        {step === 3 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center mb-8">
              <h1 
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                🎯 Ação do Dia
              </h1>
              <p 
                className="text-lg text-blue-100 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Como você vai viver essa palavra hoje?
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              {/* Ação prática sugerida */}
              <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/30 mb-6">
                <h3 
                  className="text-green-100 font-semibold mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  💡 Sugestão prática:
                </h3>
                <p 
                  className="text-green-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {devocional.acao}
                </p>
              </div>

              {/* Campo de anotações opcional */}
              <div>
                <label 
                  htmlFor="notes"
                  className="block text-sm font-medium text-blue-100 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Seu compromisso pessoal (opcional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Hoje eu vou... O que mais me tocou foi... Minha ação será..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  rows={4}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
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
                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 4: ORA - Momento de Oração */}
        {step === 4 && (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h2 
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                🙏 Ora
              </h2>
              
              <div className="space-y-6">
                {/* Oração sugerida */}
                <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                  <h3 
                    className="text-blue-100 font-semibold mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    💬 Oração Sugerida:
                  </h3>
                  <p 
                    className="text-blue-100 leading-relaxed text-lg italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {devocional.oracao}
                  </p>
                  <button
                    onClick={() => speak(devocional.oracao, 'oração')}
                    className="mt-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <FiVolume2 size={16} />
                    Ouvir Oração
                  </button>
                </div>

                {/* Opção de oração livre */}
                <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-400/30">
                  <h3 
                    className="text-purple-100 font-semibold mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    💭 Ou ore livremente:
                  </h3>
                  <p 
                    className="text-purple-200 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Feche os olhos por um momento e converse com Deus do seu coração. 
                    Agradeça, peça orientação, ou simplesmente esteja em Sua presença.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Opção de favoritar */}
              <button
                onClick={() => handleSaveFavorite(devocional.texto, 'verse', devocional.referencia)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <FiHeart size={18} />
                <span>Favoritar este devocional</span>
              </button>

              {/* Botões de navegação */}
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
    </div>
  );
}