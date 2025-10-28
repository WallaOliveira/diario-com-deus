'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro global:', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div 
          className="min-h-screen flex flex-col items-center justify-center p-6"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          <div className="text-center space-y-6 max-w-md">
            <div className="text-8xl">😔</div>
            <h1 className="text-white font-bold text-3xl">Algo deu errado</h1>
            <p className="text-gray-400">
              Oops! Encontramos um problema inesperado. 
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

