'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useStatsStore } from '@/store/useStatsStore';
import { FiArrowLeft, FiVolume2, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import AchievementModal from '@/components/AchievementModal';
import { getDevotionalOfTheDay, type Devotional } from '@/lib/devotionals';
import { analytics } from '@/lib/analytics';
import { saveDevotionalProgress, updateUserStats, checkAndUnlockAchievements } from '@/lib/database';

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

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    // Carrega devocional do dia
    const devotionalOfDay = getDevotionalOfTheDay();
    setDevocional(devotionalOfDay);
    
    // Track devocional iniciado
    if (devotionalOfDay) {
      analytics.devotionalStarted(devotionalOfDay.tema);
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleComplete = async () => {
    if (user && devocional) {
      const duration = Math.floor((Date.now() - startTime) / 1000); // seconds
      analytics.devotionalCompleted(devocional.tema, duration);
      if (notes) analytics.notesAdded();
      
      try {
        // Salvar progresso no Supabase
        await saveDevotionalProgress({
          userId: user.id,
          devotionalId: devocional.id,
          notes: notes,
          prayer: '', // Pode ser expandido futuramente
          duration: duration,
          completedAt: new Date().toISOString()
        });
        
        // Atualizar stats do usuário
        await updateUserStats(user.id);
        
        // Verificar conquistas novas
        await checkAndUnlockAchievements(user.id);
        
        // Atualizar store local
        await markComplete(user.id, devocional.id, notes);
        
        // Atualizar stats no store
        await refreshAll(user.id);
        
        setCompleted(true);
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        // Fallback para o sistema local
        await markComplete(user.id, devocional.id, notes);
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

  if (!user || !devocional) {
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
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
          <span 
            className="text-sm text-blue-100"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {step}/5
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: Contexto */}
        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center mb-8">
              <span 
                className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-200 rounded-full text-sm font-medium mb-4 border border-yellow-300/30"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.tema}
              </span>
              <h1 
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Bem-vindo ao seu Devocional Diário
              </h1>
              <p 
                className="text-lg text-blue-100 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.contexto}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
              <p 
                className="text-sm text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ⏱️ Tempo estimado: <strong>poucos minutos</strong>
              </p>
            </div>

            <button 
              onClick={handleNext} 
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Começar Devocional
            </button>
          </div>
        )}

        {/* Step 2: Leitura */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h2 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                📖 Leitura
              </h2>
              <p 
                className="text-yellow-200 mb-4"
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
              <button
                onClick={() => speak(devocional.texto, 'versículo')}
                className="mt-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <FiVolume2 size={16} />
                Ouvir
              </button>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 3: Palavra Viva */}
        {step === 3 && (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h2 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                💭 Palavra Viva
              </h2>
              <p 
                className="text-blue-100 leading-relaxed text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.palavraViva}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 4: Ação */}
        {step === 4 && (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h2 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                🎯 Ação
              </h2>
              <p 
                className="text-blue-100 leading-relaxed text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {devocional.acao}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 5: Oração */}
        {step === 5 && (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h2 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                🙏 Oração
              </h2>
              <p 
                className="text-blue-100 leading-relaxed text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
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

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <label 
                htmlFor="notes"
                className="block text-sm font-medium text-blue-100 mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Suas reflexões (opcional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="O que Deus falou ao seu coração hoje?"
                rows={4}
              />
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Finalizar Devocional
            </button>
          </div>
        )}
      </div>
    </div>
  );
}