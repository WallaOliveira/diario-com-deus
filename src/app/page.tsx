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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
      
      {/* Estrelas de fundo */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
      </div>

      {/* Raios de luz GRANDES saindo do livro */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Raio principal central - mais largo */}
        <div className="light-beam beam-center"></div>
        
        {/* Raios laterais esquerdos */}
        <div className="light-beam beam-left-1"></div>
        <div className="light-beam beam-left-2"></div>
        <div className="light-beam beam-left-3"></div>
        
        {/* Raios laterais direitos */}
        <div className="light-beam beam-right-1"></div>
        <div className="light-beam beam-right-2"></div>
        <div className="light-beam beam-right-3"></div>
        
        {/* Raios adicionais para mais densidade */}
        <div className="light-beam beam-extra-1"></div>
        <div className="light-beam beam-extra-2"></div>
      </div>

      {/* Partículas de luz flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          
          {/* Livro sagrado com luz emanando */}
          <div className="mb-12 relative">
            {/* Brilho intenso por trás */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl glow-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 rounded-full blur-2xl glow-pulse-fast"></div>
            
            {/* Container do livro */}
            <div className="relative book-3d">
              {/* Livro aberto */}
              <div className="book-wrapper">
                {/* Página esquerda */}
                <div className="book-page book-page-left">
                  <div className="book-content">
                    <div className="book-lines"></div>
                  </div>
                </div>
                
                {/* Centro/Lombada */}
                <div className="book-spine"></div>
                
                {/* Página direita */}
                <div className="book-page book-page-right">
                  <div className="book-content">
                    <div className="book-lines"></div>
                  </div>
                </div>
                
                {/* Cruz dourada no centro */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="text-6xl text-yellow-300 drop-shadow-2xl animate-pulse">✝️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Título com efeito de brilho */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl title-glow">
            Diário com Deus
          </h1>
          
          <p className="text-2xl text-blue-100 mb-4 drop-shadow-lg">
            Devocional guiado em 7-10 minutos
          </p>
          
          <p className="text-lg text-blue-200/80 mb-10 italic">
            "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho"
          </p>

          {/* CTAs com efeito de luz */}
          <div className="space-y-4">
            <Link 
              href="/login" 
              className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 text-blue-950 font-bold py-5 px-10 rounded-xl shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-105 text-lg"
            >
              ✨ Entrar Agora
            </Link>
            
            <Link 
              href="/registro" 
              className="block bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium py-5 px-10 rounded-xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-105 text-lg"
            >
              Criar Conta Gratuita
            </Link>
          </div>

          {/* Benefícios */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-white/90">
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl mb-3 drop-shadow-lg">⏱️</div>
              <p className="text-sm font-medium">Apenas 7-10 minutos</p>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl mb-3 drop-shadow-lg">📱</div>
              <p className="text-sm font-medium">Em qualquer lugar</p>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl mb-3 drop-shadow-lg">💙</div>
              <p className="text-sm font-medium">Transformação real</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Estrelas de fundo */
        .stars, .stars2 {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          box-shadow: 
            ${Array.from({ length: 50 }, () => 
              `${Math.random() * 2000}px ${Math.random() * 1000}px #fff`
            ).join(',')};
          animation: twinkle 3s infinite;
        }

        .stars2 {
          animation: twinkle 4s infinite;
          animation-delay: 1s;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Raios de luz dramáticos */
        .light-beam {
          position: absolute;
          bottom: 50%;
          left: 50%;
          width: 120px;
          height: 150vh;
          background: linear-gradient(to top, 
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 247, 200, 0.3) 20%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 247, 200, 0.3) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          transform-origin: bottom center;
          filter: blur(3px);
          opacity: 0.7;
        }

        .beam-center {
          animation: beam-pulse 4s ease-in-out infinite;
        }

        .beam-left-1 {
          transform: translateX(-50%) rotate(-25deg);
          animation: beam-pulse 3.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .beam-left-2 {
          transform: translateX(-50%) rotate(-45deg);
          width: 100px;
          animation: beam-pulse 4.2s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .beam-left-3 {
          transform: translateX(-50%) rotate(-65deg);
          width: 80px;
          animation: beam-pulse 3.8s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        .beam-right-1 {
          transform: translateX(-50%) rotate(25deg);
          animation: beam-pulse 3.7s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .beam-right-2 {
          transform: translateX(-50%) rotate(45deg);
          width: 100px;
          animation: beam-pulse 4.1s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        .beam-right-3 {
          transform: translateX(-50%) rotate(65deg);
          width: 80px;
          animation: beam-pulse 3.9s ease-in-out infinite;
          animation-delay: 0.9s;
        }

        .beam-extra-1 {
          transform: translateX(-50%) rotate(-15deg);
          width: 90px;
          animation: beam-pulse 4.3s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .beam-extra-2 {
          transform: translateX(-50%) rotate(15deg);
          width: 90px;
          animation: beam-pulse 4.4s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes beam-pulse {
          0%, 100% {
            opacity: 0.4;
            filter: blur(3px);
          }
          50% {
            opacity: 0.8;
            filter: blur(2px);
          }
        }

        /* Partículas flutuantes */
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        /* Brilho pulsante */
        .glow-pulse {
          animation: glow 3s ease-in-out infinite;
        }

        .glow-pulse-fast {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        /* Livro 3D */
        .book-3d {
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .book-wrapper {
          position: relative;
          width: 300px;
          height: 200px;
          margin: 0 auto;
          transform-style: preserve-3d;
          animation: float-book 6s ease-in-out infinite;
        }

        @keyframes float-book {
          0%, 100% {
            transform: translateY(0) rotateX(10deg);
          }
          50% {
            transform: translateY(-20px) rotateX(15deg);
          }
        }

        .book-page {
          position: absolute;
          width: 140px;
          height: 200px;
          background: linear-gradient(to bottom, #fef9e7, #f9e79f);
          border: 2px solid #d4ac6e;
          box-shadow: 
            inset 0 0 30px rgba(255, 255, 255, 0.5),
            0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .book-page-left {
          left: 0;
          border-radius: 10px 0 0 10px;
          transform: rotateY(-5deg);
          transform-origin: right center;
        }

        .book-page-right {
          right: 0;
          border-radius: 0 10px 10px 0;
          transform: rotateY(5deg);
          transform-origin: left center;
        }

        .book-spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 200px;
          background: linear-gradient(to right, #8b6914, #d4ac6e, #8b6914);
          box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 10px 30px rgba(0, 0, 0, 0.4);
          z-index: 2;
        }

        .book-content {
          padding: 20px 15px;
          height: 100%;
          overflow: hidden;
        }

        .book-lines {
          width: 100%;
          height: 100%;
          background-image: repeating-linear-gradient(
            transparent,
            transparent 18px,
            rgba(139, 105, 20, 0.3) 18px,
            rgba(139, 105, 20, 0.3) 20px
          );
        }

        /* Título com brilho */
        .title-glow {
          animation: title-shine 3s ease-in-out infinite;
        }

        @keyframes title-shine {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.3),
              0 0 30px rgba(255, 255, 255, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(255, 255, 255, 0.8),
              0 0 40px rgba(255, 255, 255, 0.5),
              0 0 60px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  );
}
