'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/lib/design-system';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para monitoramento (Sentry, etc)
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    >
      <Container maxWidth="md" className="text-center space-y-6">
        {/* Ícone */}
        <div className="text-8xl mb-4">
          😔
        </div>

        {/* Título */}
        <h1 
          className="font-bold text-white mb-4"
          style={{ 
            fontFamily: typography.serif,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: typography.weights.bold,
          }}
        >
          Algo deu errado
        </h1>

        {/* Descrição */}
        <p 
          className="mb-6"
          style={{ 
            fontFamily: typography.sans,
            fontSize: typography.body.lg,
            color: colors.text.whiteMuted,
            lineHeight: '1.7'
          }}
        >
          Ops! Parece que encontramos um problema inesperado. 
          Mas não se preocupe, você pode tentar novamente ou voltar para o início.
        </p>

        {/* Mensagem de erro (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div 
            className="p-4 rounded-lg text-left mb-6"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <p 
              style={{ 
                fontFamily: 'monospace',
                fontSize: typography.body.xs,
                color: '#fca5a5',
              }}
            >
              {error.message}
            </p>
          </div>
        )}

        {/* Código */}
        <div 
          className="inline-block px-4 py-2 rounded-lg mb-8"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: `1px solid ${colors.border}`,
          }}
        >
          <p 
            style={{ 
              fontFamily: 'monospace',
              fontSize: typography.body.sm,
              color: colors.text.gold,
            }}
          >
            Erro 500
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colors.text.gold} 0%, #d4af37 100%)`,
              color: '#1e293b',
              fontFamily: typography.sans,
              fontSize: typography.body.md,
            }}
          >
            Tentar Novamente
          </button>
          
          <Button href="/dashboard" variant="secondary" size="md">
            Voltar ao Início
          </Button>
        </div>

        {/* Versículo Motivacional */}
        <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${colors.border}` }}>
          <p 
            className="italic"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted,
              lineHeight: '1.7'
            }}
          >
            "Ainda que eu ande pelo vale da sombra da morte,<br />
            não temerei mal nenhum, porque tu estás comigo"
          </p>
          <p 
            className="mt-2"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.sm,
              color: colors.text.gold,
            }}
          >
            Salmos 23:4
          </p>
        </div>

        {/* Suporte */}
        <div className="mt-6">
          <p 
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.sm,
              color: colors.text.whiteMuted,
            }}
          >
            Se o problema persistir, por favor{' '}
            <a 
              href="mailto:suporte@diariocomdeus.com.br"
              className="underline hover:opacity-80"
              style={{ color: colors.text.gold }}
            >
              entre em contato
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

