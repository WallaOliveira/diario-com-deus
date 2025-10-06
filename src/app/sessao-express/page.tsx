'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { FiArrowLeft, FiVolume2, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import Confetti from '@/components/Confetti';

// Mock de devocional (em produção virá do banco)
const DEVOCIONAL_EXEMPLO = {
  id: 'ansiedade-1',
  tema: 'Ansiedade',
  contexto: 'Quando a ansiedade toma conta, Deus nos convida a descansar Nele.',
  referencia: 'Filipenses 4:6-7',
  texto: '"Não andeis ansiosos de coisa alguma; mas em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças."',
  palavraViva: 'Deus cuida de mim. Posso entregar minhas preocupações a Ele.',
  acao: 'Respire fundo 3 vezes e diga em voz alta: "Deus, eu confio em Ti com essa situação."',
  oracao: 'Pai, eu entrego a Ti minha ansiedade. Sei que Tu cuidas de mim. Enche meu coração com Tua paz que excede todo entendimento. Em nome de Jesus, amém.',
};

export default function SessaoExpressPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const { markComplete } = useProgressStore();
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

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
    if (user) {
      await markComplete(user.id, DEVOCIONAL_EXEMPLO.id, notes);
      setCompleted(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!user) return null;

  if (completed) {
    return (
      <>
        <Confetti show={true} />
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="text-center animate-fadeIn">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiCheck size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">🎉 Parabéns!</h2>
            <p className="text-lg text-gray-700 mb-2">Você completou seu devocional de hoje!</p>
            <p className="text-sm text-gray-600">Deus sorri com você 💙</p>
            <div className="mt-6">
              <div className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                +1 dia de constância ✨
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600">{step}/5</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: Contexto */}
        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                {DEVOCIONAL_EXEMPLO.tema}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Bem-vindo à sua Sessão Express
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {DEVOCIONAL_EXEMPLO.contexto}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-900">
                ⏱️ Tempo estimado: <strong>7-10 minutos</strong>
              </p>
            </div>

            <button onClick={handleNext} className="btn-primary w-full">
              Começar Devocional
            </button>
          </div>
        )}

        {/* Step 2: Leitura */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📖 Leitura</h2>
              <p className="text-primary-600 font-medium mb-6">{DEVOCIONAL_EXEMPLO.referencia}</p>
              
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-primary-200 rounded-xl p-6">
                <p className="text-lg text-gray-800 leading-relaxed italic">
                  {DEVOCIONAL_EXEMPLO.texto}
                </p>
              </div>

              <button
                onClick={() => speakText(DEVOCIONAL_EXEMPLO.texto)}
                className="mt-4 btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FiVolume2 size={20} />
                Ouvir versículo
              </button>
            </div>

            <button onClick={handleNext} className="btn-primary w-full">
              Continuar
            </button>
          </div>
        )}

        {/* Step 3: Palavra Viva */}
        {step === 3 && (
          <div className="animate-fadeIn space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💎 Palavra Viva</h2>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 text-center">
                <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                  "{DEVOCIONAL_EXEMPLO.palavraViva}"
                </p>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Dica:</strong> Leia esta frase em voz alta 3 vezes. Deixe ela entrar no seu coração.
                </p>
              </div>

              <button
                onClick={() => speakText(DEVOCIONAL_EXEMPLO.palavraViva)}
                className="mt-4 btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FiVolume2 size={20} />
                Ouvir Palavra Viva
              </button>
            </div>

            <button onClick={handleNext} className="btn-primary w-full">
              Continuar
            </button>
          </div>
        )}

        {/* Step 4: Ação do Dia */}
        {step === 4 && (
          <div className="animate-fadeIn space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Ação do Dia</h2>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {DEVOCIONAL_EXEMPLO.acao}
                </p>
                
                <div className="mt-6 pt-6 border-t border-green-200">
                  <p className="text-sm text-gray-600 mb-3">
                    ⏱️ Leva apenas 2 minutos
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                    <span className="text-gray-700">Fiz a ação do dia</span>
                  </label>
                </div>
              </div>
            </div>

            <button onClick={handleNext} className="btn-primary w-full">
              Continuar
            </button>
          </div>
        )}

        {/* Step 5: Oração */}
        {step === 5 && (
          <div className="animate-fadeIn space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🙏 Oração</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {DEVOCIONAL_EXEMPLO.oracao}
                </p>
              </div>

              <button
                onClick={() => speakText(DEVOCIONAL_EXEMPLO.oracao)}
                className="mt-4 btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FiVolume2 size={20} />
                Ouvir oração
              </button>

              {/* Anotações opcionais */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Anotações (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field min-h-[100px] resize-none"
                  placeholder="O que Deus falou com você hoje?"
                />
              </div>
            </div>

            <button onClick={handleComplete} className="btn-primary w-full">
              Concluir Devocional 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

