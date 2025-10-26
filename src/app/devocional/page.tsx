'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiBook, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import { colors, typography } from '@/lib/design-system';

export default function DevocionalSelectionPage() {
  const router = useRouter();

  return (
    <div 
      className="min-h-screen"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <header className="bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors">
            <FiArrowLeft size={24} />
          </Link>
          <h1 
            className="ml-4 font-bold"
            style={{
              fontFamily: typography.serif,
              fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
              color: colors.text.white
            }}
          >
            Devocional do Dia
          </h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <p 
          className="text-center mb-8"
          style={{
            fontFamily: typography.sans,
            fontSize: 'var(--font-size-base, 1rem)',
            color: colors.text.whiteMuted
          }}
        >
          Como você gostaria de começar seu momento com Deus?
        </p>

        {/* Opções */}
        <div className="space-y-4">
          {/* Opção 1: Palavra do Dia */}
          <Link
            href="/devocional-do-dia"
            className="block p-6 rounded-xl transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              border: `2px solid ${colors.accent.gold}`,
              cursor: 'pointer'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.gold
              }}>
                <FiBook size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold mb-2"
                  style={{
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.3)',
                    color: colors.text.white
                  }}
                >
                  📜 Palavra do Dia
                </h3>
                <p 
                  style={{
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  Uma palavra diária que Deus tem para você, baseada na Palavra que edifica e alimenta a alma.
                </p>
                <p 
                  className="mt-2 text-sm italic"
                  style={{
                    color: colors.accent.gold
                  }}
                >
                  Alimentando-se da Palavra todos os dias
                </p>
              </div>
            </div>
          </Link>

          {/* Opção 2: Momento Pessoal */}
          <Link
            href="/devocional-emocional"
            className="block p-6 rounded-xl transition-all hover:scale-105"
            style={{
              background: colors.background.card,
              border: `2px solid ${colors.accent.purple}`,
              cursor: 'pointer'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.purple
              }}>
                <FiHeart size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold mb-2"
                  style={{
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.3)',
                    color: colors.text.white
                  }}
                >
                  💙 Momento Pessoal
                </h3>
                <p 
                  style={{
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  Uma palavra específica para o seu coração no momento atual. Compartilhe como está se sentindo e receba uma palavra de Deus especialmente para você.
                </p>
                <p 
                  className="mt-2 text-sm italic"
                  style={{
                    color: colors.accent.purple
                  }}
                >
                  Deus conhece seu coração e tem uma palavra para você agora
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

