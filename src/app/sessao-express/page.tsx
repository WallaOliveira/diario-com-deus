'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessaoExpressRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect permanente para a nova rota
    router.replace('/devocional-do-dia');
  }, [router]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)'
      }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white">Redirecionando para o Devocional do Dia...</p>
      </div>
    </div>
  );
}