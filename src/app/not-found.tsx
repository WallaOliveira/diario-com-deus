'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/lib/design-system';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function NotFound() {
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
          😕
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
          Página não encontrada
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
          Parece que você se perdeu no caminho. Não se preocupe, isso acontece! 
          Vamos te levar de volta para casa.
        </p>

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
            Erro 404
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/dashboard" variant="primary" size="lg">
            Voltar ao Início
          </Button>
          
          <Button href="/sessao-express" variant="secondary" size="md">
            Fazer um Devocional
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
            "Lâmpada para os meus pés é a tua palavra<br />
            e luz para o meu caminho"
          </p>
          <p 
            className="mt-2"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.sm,
              color: colors.text.gold,
            }}
          >
            Salmos 119:105
          </p>
        </div>
      </Container>
    </div>
  );
}

