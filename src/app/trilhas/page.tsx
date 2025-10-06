'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiClock, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

// Mock de trilhas
const TRILHAS = [
  {
    id: '7-dias-recomeco',
    titulo: '7 Dias de Recomeço',
    descricao: 'Para quem quer (re)começar sua jornada com Deus sem culpa',
    dias: 7,
    progresso: 0,
    cor: 'from-orange-500 to-red-500',
  },
  {
    id: '14-dias-paz-ansiedade',
    titulo: '14 Dias de Paz na Ansiedade',
    descricao: 'Encontre descanso para seu coração em meio às tempestades',
    dias: 14,
    progresso: 0,
    cor: 'from-blue-500 to-indigo-500',
  },
  {
    id: '30-dias-evangelho-joao',
    titulo: '30 Dias no Evangelho de João',
    descricao: 'Conheça Jesus através de passagens selecionadas',
    dias: 30,
    progresso: 0,
    cor: 'from-purple-500 to-pink-500',
  },
];

export default function TrilhasPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Trilhas Guiadas</h1>
            <p className="text-sm text-gray-600">Jornadas de 7, 14 ou 30 dias</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Explicação */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h2 className="font-bold text-gray-900 mb-2">🗺️ O que são Trilhas?</h2>
          <p className="text-sm text-gray-700">
            Trilhas são jornadas guiadas com devocionais sequenciais sobre um tema específico. 
            Cada dia tem um roteiro completo: versículo → reflexão → ação → oração.
          </p>
        </div>

        {/* Lista de Trilhas */}
        <div className="space-y-4">
          {TRILHAS.map((trilha) => (
            <div key={trilha.id} className="card hover:shadow-lg transition-shadow">
              {/* Header colorido */}
              <div className={`bg-gradient-to-r ${trilha.cor} -m-6 mb-4 p-6 rounded-t-xl text-white`}>
                <h3 className="text-xl font-bold mb-2">{trilha.titulo}</h3>
                <p className="text-sm opacity-90">{trilha.descricao}</p>
              </div>

              {/* Detalhes */}
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiClock size={16} />
                    <span>{trilha.dias} dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle size={16} />
                    <span>{trilha.progresso}/{trilha.dias} concluídos</span>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${trilha.cor}`}
                      style={{ width: `${(trilha.progresso / trilha.dias) * 100}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button className="btn-primary w-full">
                  {trilha.progresso === 0 ? 'Começar Trilha' : 'Continuar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mais trilhas */}
        <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-center">
          <h3 className="font-bold text-gray-900 mb-2">✨ Quer mais trilhas?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Acesse trilhas exclusivas sobre maternidade, casamento, trabalho e muito mais
          </p>
          <button className="btn-secondary">
            Ver Trilhas Extras
          </button>
        </div>
      </div>
    </div>
  );
}

