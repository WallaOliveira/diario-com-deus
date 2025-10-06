'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import { format, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MinhaSemanePage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const { streak, showStreak, toggleStreak, fetchProgress } = useProgressStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      fetchProgress(user.id);
    }
  }, [user, router, fetchProgress]);

  if (!user) return null;

  // Calcular dias da semana
  const hoje = new Date();
  const inicioSemana = startOfWeek(hoje, { locale: ptBR });
  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));

  // Mock de progresso (em produção vem do banco)
  const progressoDias = [true, true, false, true, false, false, false];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Minha Semana</h1>
            <p className="text-sm text-gray-600">Seu progresso semanal</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Streak */}
        {showStreak && (
          <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">🔥 Sua sequência</p>
                <p className="text-4xl font-bold text-primary-700">{streak} dias</p>
              </div>
              <button
                onClick={toggleStreak}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                <FiEyeOff size={16} />
                Ocultar
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Continue assim! Cada dia com Deus fortalece sua fé.
            </p>
          </div>
        )}

        {!showStreak && (
          <button
            onClick={toggleStreak}
            className="card bg-gray-50 w-full text-left hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Mostrar minha sequência</p>
              <FiEye size={20} className="text-gray-600" />
            </div>
          </button>
        )}

        {/* Progresso da Semana */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📅 Esta Semana</h2>
          
          <div className="grid grid-cols-7 gap-2">
            {diasSemana.map((dia, index) => {
              const concluido = progressoDias[index];
              const ehHoje = format(dia, 'dd/MM') === format(hoje, 'dd/MM');

              return (
                <div
                  key={index}
                  className={`text-center p-3 rounded-lg border-2 ${
                    concluido
                      ? 'bg-green-50 border-green-500'
                      : ehHoje
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${
                    concluido ? 'text-green-700' : ehHoje ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {format(dia, 'EEE', { locale: ptBR })}
                  </p>
                  <p className={`text-lg font-bold ${
                    concluido ? 'text-green-700' : ehHoje ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    {format(dia, 'd')}
                  </p>
                  {concluido && (
                    <FiCheckCircle className="text-green-500 mx-auto mt-1" size={16} />
                  )}
                  {ehHoje && !concluido && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full mx-auto mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Concluído</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded"></div>
              <span className="text-gray-600">Hoje</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span className="text-gray-600">Pendente</span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <p className="text-3xl font-bold text-primary-700 mb-1">3</p>
            <p className="text-sm text-gray-600">Dias esta semana</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-blue-700 mb-1">21</p>
            <p className="text-sm text-gray-600">Total de dias</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-green-700 mb-1">{streak}</p>
            <p className="text-sm text-gray-600">Sequência atual</p>
          </div>
        </div>

        {/* Insights */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">💡 Insights da Semana</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>✨ Você tem buscado Deus 3x esta semana. Parabéns!</p>
            <p>📈 Isso é 20% a mais que na semana passada.</p>
            <p>🎯 Continue assim para alcançar sua meta de 5 dias/semana.</p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/sessao-express" className="block btn-primary text-center">
          Fazer Devocional de Hoje
        </Link>
      </div>
    </div>
  );
}

