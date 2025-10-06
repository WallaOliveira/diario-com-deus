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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fundo azul profundo com gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>

      {/* Raios de luz animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Raio 1 */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent light-ray-1"></div>
        
        {/* Raio 2 */}
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent light-ray-2"></div>
        
        {/* Raio 3 */}
        <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-transparent via-white/40 to-transparent light-ray-3"></div>
        
        {/* Raio 4 */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-100/25 to-transparent light-ray-4"></div>
        
        {/* Raio 5 */}
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent light-ray-5"></div>

        {/* Brilho central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          
          {/* Livro/Bíblia com efeito de luz */}
          <div className="mb-8 relative">
            {/* Brilho por trás do livro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
            </div>
            
            {/* Livro */}
            <div className="relative book-container">
              <div className="w-24 h-32 mx-auto relative transform hover:scale-105 transition-transform duration-500">
                {/* Capa do livro */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 rounded-r-lg shadow-2xl">
                  {/* Detalhes da capa */}
                  <div className="absolute inset-2 border-2 border-amber-400/50 rounded-r-lg"></div>
                  
                  {/* Cruz na capa */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-4xl text-amber-200 drop-shadow-lg">✝️</div>
                  </div>
                </div>
                
                {/* Lombada do livro */}
                <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-r from-amber-900 to-amber-700 rounded-l-sm shadow-xl"></div>
                
                {/* Páginas */}
                <div className="absolute right-0 top-1 bottom-1 w-1 bg-gradient-to-b from-gray-100 via-white to-gray-100"></div>
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg animate-fadeIn">
            Diário com Deus
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 animate-fadeIn leading-relaxed">
            Devocional guiado em 7-10 minutos.<br/>
            <span className="text-blue-200">Sem culpa. Só recomeço.</span>
          </p>

          {/* CTAs */}
          <div className="space-y-4 animate-fadeIn">
            <Link 
              href="/login" 
              className="block bg-white hover:bg-blue-50 text-blue-900 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Entrar
            </Link>
            
            <Link 
              href="/registro" 
              className="block bg-blue-700/50 hover:bg-blue-600/50 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              Criar Conta Gratuita
            </Link>
          </div>

          {/* Benefícios rápidos */}
          <div className="mt-16 grid grid-cols-3 gap-6 text-white/80">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="text-sm">7-10 min</p>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm">No celular</p>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl mb-2">🙏</div>
              <p className="text-sm">Transformador</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lightRay1 {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(0) scaleY(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(10px) scaleY(1.1);
          }
        }

        @keyframes lightRay2 {
          0%, 100% {
            opacity: 0.2;
            transform: translateX(0) scaleY(1);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-15px) scaleY(1.15);
          }
        }

        @keyframes lightRay3 {
          0%, 100% {
            opacity: 0.4;
            transform: translateX(0) scaleY(1);
          }
          50% {
            opacity: 0.7;
            transform: translateX(5px) scaleY(1.2);
          }
        }

        @keyframes lightRay4 {
          0%, 100% {
            opacity: 0.25;
            transform: translateX(0) scaleY(1);
          }
          50% {
            opacity: 0.55;
            transform: translateX(-10px) scaleY(1.1);
          }
        }

        @keyframes lightRay5 {
          0%, 100% {
            opacity: 0.2;
            transform: translateX(0) scaleY(1);
          }
          50% {
            opacity: 0.4;
            transform: translateX(12px) scaleY(1.05);
          }
        }

        @keyframes bookGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.6));
          }
        }

        .light-ray-1 {
          animation: lightRay1 4s ease-in-out infinite;
        }

        .light-ray-2 {
          animation: lightRay2 5s ease-in-out infinite;
        }

        .light-ray-3 {
          animation: lightRay3 3s ease-in-out infinite;
        }

        .light-ray-4 {
          animation: lightRay4 6s ease-in-out infinite;
        }

        .light-ray-5 {
          animation: lightRay5 4.5s ease-in-out infinite;
        }

        .book-container {
          animation: bookGlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
