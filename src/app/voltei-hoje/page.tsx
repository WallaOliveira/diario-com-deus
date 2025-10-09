'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export default function VolteiHojePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-white hover:text-purple-100">
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 text-white space-y-8">
        {/* Hero */}
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
            <FiHeart size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Bem-vindo de volta 💙
          </h1>
          
          <p className="text-xl text-purple-100 leading-relaxed">
            Não importa quanto tempo passou.<br/>
            O que importa é que você está aqui agora.
          </p>
        </div>

        {/* Mensagens de Acolhimento */}
        <div className="space-y-4">
          <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="font-bold mb-2 text-lg">Sem culpa</h3>
            <p className="text-purple-100">
              Deus não está com raiva de você. Ele te recebe de braços abertos, 
              do jeito que você está, pronto para recomeçar.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="font-bold mb-2 text-lg">Só recomeço</h3>
            <p className="text-purple-100">
              Hoje é um novo dia. Uma nova chance. Uma nova página em branco 
              na sua história com Deus.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="font-bold mb-2 text-lg">Vamos juntos</h3>
            <p className="text-purple-100">
              Não precisa ser perfeito. Poucos minutos por dia já são suficientes 
              para transformar seu coração.
            </p>
          </div>
        </div>

        {/* Trilha Especial */}
        <div className="bg-white rounded-xl p-6 shadow-xl text-gray-900">
          <h2 className="text-xl font-bold mb-3">🌅 Trilha de 3 Dias: Recomeço</h2>
          <p className="text-gray-700 mb-4">
            Jornada especial de 3 dias para você retomar sua caminhada com Deus 
            de forma leve, acolhedora e sem pressão.
          </p>
          
          <div className="space-y-2 text-sm text-gray-700 mb-6">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">Dia 1:</span>
              <span>Deus te recebe como você está</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">Dia 2:</span>
              <span>Paz para recomeçar</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">Dia 3:</span>
              <span>Força para continuar</span>
            </div>
          </div>

          <Link href="/devocional-do-dia" className="block btn-primary text-center">
            Começar Agora (7 min)
          </Link>
        </div>

        {/* Frase de Encorajamento */}
        <div className="text-center bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-white border-opacity-20">
          <p className="text-lg italic">
            "O Senhor é compassivo e misericordioso, lento para se irar e cheio de amor."
          </p>
          <p className="text-sm text-purple-200 mt-2">Salmos 103:8</p>
        </div>
      </div>
    </div>
  );
}

