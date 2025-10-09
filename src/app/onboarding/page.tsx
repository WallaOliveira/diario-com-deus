'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiHeart, FiCheckCircle } from 'react-icons/fi';

const ESTADOS_CORACAO = [
  { emoji: '😰', texto: 'Ansioso(a)', valor: 'ansioso' },
  { emoji: '😔', texto: 'Triste', valor: 'triste' },
  { emoji: '🙏', texto: 'Grato(a)', valor: 'grato' },
  { emoji: '🤔', texto: 'Confuso(a)', valor: 'confuso' },
  { emoji: '😨', texto: 'Com medo', valor: 'com-medo' },
  { emoji: '😊', texto: 'Alegre', valor: 'alegre' },
  { emoji: '😴', texto: 'Cansado(a)', valor: 'cansado' },
  { emoji: '🌅', texto: 'Esperançoso(a)', valor: 'esperancoso' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const [step, setStep] = useState(1);
  const [estadoEscolhido, setEstadoEscolhido] = useState('');
  const [queroHabito, setQueroHabito] = useState(false);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const handleEstadoClick = (estado: string) => {
    setEstadoEscolhido(estado);
    setTimeout(() => setStep(2), 500);
  };

  const handleContinuar = () => {
    if (step === 2) {
      setStep(3);
    }
  };

  const handleFinalizar = () => {
    // Salvar preferências do usuário
    localStorage.setItem('onboarding_completo', 'true');
    localStorage.setItem('estado_inicial', estadoEscolhido);
    localStorage.setItem('quer_habito', queroHabito.toString());
    
    // Redirecionar para primeiro devocional
    router.push('/devocional-do-dia');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Step 1: Como está seu coração? */}
        {step === 1 && (
          <div className="animate-fadeIn text-center text-white">
            <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart size={40} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Olá, {user.user_metadata?.name}! 💙
            </h1>
            
            <p className="text-xl mb-8 text-purple-100">
              Antes de começar, me conta:<br/>
              <strong>Como está seu coração hoje?</strong>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
              {ESTADOS_CORACAO.map((estado) => (
                <button
                  key={estado.valor}
                  onClick={() => handleEstadoClick(estado.valor)}
                  className="bg-white bg-opacity-10 backdrop-blur hover:bg-opacity-20 border-2 border-white border-opacity-30 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-2">{estado.emoji}</div>
                  <p className="text-sm font-medium">{estado.texto}</p>
                </button>
              ))}
            </div>

            <p className="text-sm text-purple-200 mt-6">
              Sem julgamento. Só queremos te ajudar melhor 💜
            </p>
          </div>
        )}

        {/* Step 2: Devocional personalizado */}
        {step === 2 && (
          <div className="animate-fadeIn bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Perfeito! Preparei algo especial para você
              </h2>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-800 mb-4">
                📖 <strong>Seu primeiro devocional:</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Preparei um devocional de <strong>7 minutos</strong> especialmente 
                para quem está se sentindo <strong>{ESTADOS_CORACAO.find(e => e.valor === estadoEscolhido)?.texto.toLowerCase()}</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Você vai encontrar um versículo perfeito para esse momento, 
                uma reflexão prática e uma ação simples de 2 minutos.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                💡 <strong>Dica:</strong> Encontre um lugar tranquilo, 
                respire fundo 3 vezes e abra seu coração para Deus.
              </p>
            </div>

            <button onClick={handleContinuar} className="btn-primary w-full text-lg">
              Começar Meu Primeiro Devocional 🙏
            </button>
          </div>
        )}

        {/* Step 3: Criar hábito? */}
        {step === 3 && (
          <div className="animate-fadeIn bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Quer criar um novo hábito comigo?
              </h2>
              <p className="text-gray-700">
                A constância transforma. Que tal fazermos juntos por 7 dias?
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Trilha: 7 Dias de Recomeço
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Devocionais guiados de poucos minutos/dia</li>
                  <li>• Sem culpa se perder um dia (é só voltar!)</li>
                  <li>• Progresso visual para você acompanhar</li>
                  <li>• Lembrete diário no horário que escolher</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="quero-habito"
                  checked={queroHabito}
                  onChange={(e) => setQueroHabito(e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <label htmlFor="quero-habito" className="text-gray-700 cursor-pointer">
                  <strong>Sim, quero fazer os próximos 7 dias com Deus!</strong>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFinalizar}
                className="btn-primary w-full text-lg"
              >
                {queroHabito ? 'Começar Jornada de 7 Dias 🚀' : 'Começar Agora'}
              </button>
              
              {!queroHabito && (
                <button
                  onClick={handleFinalizar}
                  className="btn-secondary w-full text-sm"
                >
                  Pular (fazer só 1 devocional hoje)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-all ${
                s === step
                  ? 'bg-white w-16'
                  : s < step
                  ? 'bg-white bg-opacity-70'
                  : 'bg-white bg-opacity-20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

