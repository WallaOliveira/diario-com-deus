'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { FiArrowLeft, FiTrendingUp, FiHeart, FiSmile, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CheckInEmocional {
  data: string;
  paz: number; // 1-10
  proximidade: number; // 1-10
  ansiedade: number; // 1-10
}

export default function ProgressoPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const { streak, fetchProgress } = useProgressStore();
  
  const [mostrarCheckin, setMostrarCheckin] = useState(false);
  const [checkinsAnteriores, setCheckinsAnteriores] = useState<CheckInEmocional[]>([]);
  
  // Check-in do dia
  const [paz, setPaz] = useState(5);
  const [proximidade, setProximidade] = useState(5);
  const [ansiedade, setAnsiedade] = useState(5);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      fetchProgress(user.id);
      carregarCheckins();
    }
  }, [user, router, fetchProgress]);

  const carregarCheckins = () => {
    // Carregar do localStorage (em produção viria do Supabase)
    const saved = localStorage.getItem('checkins_emocionais');
    if (saved) {
      setCheckinsAnteriores(JSON.parse(saved));
    }
  };

  const salvarCheckin = () => {
    const novoCheckin: CheckInEmocional = {
      data: new Date().toISOString(),
      paz,
      proximidade,
      ansiedade,
    };

    const novosCheckins = [...checkinsAnteriores, novoCheckin];
    setCheckinsAnteriores(novosCheckins);
    localStorage.setItem('checkins_emocionais', JSON.stringify(novosCheckins));
    
    setMostrarCheckin(false);

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('checkin_emocional', {
        props: { paz, proximidade, ansiedade }
      });
    }
  };

  const calcularEvolucao = () => {
    if (checkinsAnteriores.length < 2) return null;

    const primeiro = checkinsAnteriores[0];
    const ultimo = checkinsAnteriores[checkinsAnteriores.length - 1];

    return {
      paz: ultimo.paz - primeiro.paz,
      proximidade: ultimo.proximidade - primeiro.proximidade,
      ansiedade: primeiro.ansiedade - ultimo.ansiedade, // Invertido (menos ansiedade é melhor)
    };
  };

  const evolucao = calcularEvolucao();

  // Calcular dias da semana para "Minha Semana"
  const hoje = new Date();
  const inicioSemana = startOfWeek(hoje, { locale: ptBR });
  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));

  // Mock de progresso (em produção viria do banco)
  const progressoDias = [true, true, false, true, false, false, false];

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
            <h1 className="text-xl font-bold text-gray-900">Meu Progresso</h1>
            <p className="text-sm text-gray-600">Sua transformação visível</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* CTA Check-in */}
        {!mostrarCheckin && (
          <button
            onClick={() => setMostrarCheckin(true)}
            className="card w-full text-left bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <FiHeart className="text-primary-600" />
                  Como está seu coração hoje?
                </h3>
                <p className="text-sm text-gray-600">
                  Faça um check-in emocional rápido (30 segundos)
                </p>
              </div>
              <div className="text-3xl">😊</div>
            </div>
          </button>
        )}

        {/* Formulário de Check-in */}
        {mostrarCheckin && (
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              Check-in Emocional 💜
            </h3>
            
            {/* Paz */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  🕊️ Nível de Paz
                </label>
                <span className="text-xl font-bold text-primary-600">{paz}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paz}
                onChange={(e) => setPaz(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Muito agitado</span>
                <span>Muito em paz</span>
              </div>
            </div>

            {/* Proximidade com Deus */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  ✨ Proximidade com Deus
                </label>
                <span className="text-xl font-bold text-primary-600">{proximidade}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={proximidade}
                onChange={(e) => setProximidade(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Distante</span>
                <span>Muito próximo</span>
              </div>
            </div>

            {/* Ansiedade */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  😰 Nível de Ansiedade
                </label>
                <span className="text-xl font-bold text-primary-600">{ansiedade}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={ansiedade}
                onChange={(e) => setAnsiedade(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Nada ansioso</span>
                <span>Muito ansioso</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={salvarCheckin} className="btn-primary flex-1">
                Salvar Check-in
              </button>
              <button
                onClick={() => setMostrarCheckin(false)}
                className="btn-secondary px-4"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Evolução (Antes vs Depois) */}
        {evolucao && (
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiTrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  🎉 Sua Evolução
                </h3>
                <p className="text-sm text-gray-600">
                  Desde {format(new Date(checkinsAnteriores[0].data), "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Paz */}
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${
                  evolucao.paz > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {evolucao.paz > 0 ? '+' : ''}{evolucao.paz}
                </div>
                <p className="text-xs text-gray-600">Paz</p>
              </div>

              {/* Proximidade */}
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${
                  evolucao.proximidade > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {evolucao.proximidade > 0 ? '+' : ''}{evolucao.proximidade}
                </div>
                <p className="text-xs text-gray-600">Proximidade</p>
              </div>

              {/* Ansiedade */}
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${
                  evolucao.ansiedade > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {evolucao.ansiedade > 0 ? '+' : ''}{evolucao.ansiedade}
                </div>
                <p className="text-xs text-gray-600">↓ Ansiedade</p>
              </div>
            </div>

            {(evolucao.paz > 0 || evolucao.proximidade > 0 || evolucao.ansiedade > 0) && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-green-900 font-medium">
                  💚 Você está crescendo! Continue assim!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-700 mb-1">
              {streak}
            </div>
            <p className="text-sm text-gray-600">Dias seguidos</p>
          </div>

          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {checkinsAnteriores.length}
            </div>
            <p className="text-sm text-gray-600">Check-ins</p>
          </div>

          <div className="card text-center">
            <div className="text-3xl font-bold text-green-700 mb-1">
              {Math.round((streak / 7) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Meta semanal</p>
          </div>
        </div>

        {/* Minha Semana */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">📅 Minha Semana</h3>
          
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

          <div className="mt-4 text-center">
            <Link 
              href="/sessao-express" 
              className="btn-primary inline-block"
            >
              Fazer Devocional de Hoje
            </Link>
          </div>
        </div>

        {/* Histórico de Check-ins */}
        {checkinsAnteriores.length > 0 && (
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">📊 Histórico</h3>
            <div className="space-y-3">
              {checkinsAnteriores.slice(-5).reverse().map((checkin, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(checkin.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-gray-600">
                      🕊️ {checkin.paz}
                    </span>
                    <span className="text-gray-600">
                      ✨ {checkin.proximidade}
                    </span>
                    <span className="text-gray-600">
                      😰 {checkin.ansiedade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {checkinsAnteriores.length === 0 && (
          <div className="card bg-blue-50 border-blue-200 text-center">
            <div className="text-4xl mb-3">📈</div>
            <h4 className="font-bold text-gray-900 mb-2">
              Comece a acompanhar sua evolução
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              Faça check-ins regulares para ver como sua vida espiritual está transformando seu coração.
            </p>
            <button
              onClick={() => setMostrarCheckin(true)}
              className="btn-primary"
            >
              Fazer Primeiro Check-in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

