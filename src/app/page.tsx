'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-fadeIn">
        {/* Logo/Ícone */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <span className="text-4xl">✝️</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Diário com Deus
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Devocional guiado em 7-10 minutos.<br/>
          Sem culpa. Só recomeço.
        </p>

        {/* CTAs */}
        <div className="space-y-4">
          <Link href="/login" className="block btn-primary">
            Entrar
          </Link>
          
          <Link href="/registro" className="block btn-secondary">
            Criar Conta Gratuita
          </Link>
        </div>

        {/* Benefícios rápidos */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <div className="text-2xl mb-2">⏱️</div>
            <p>7-10 min</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📱</div>
            <p>No celular</p>
          </div>
          <div>
            <div className="text-2xl mb-2">💡</div>
            <p>Prático</p>
          </div>
        </div>
      </div>
    </div>
  );
}

