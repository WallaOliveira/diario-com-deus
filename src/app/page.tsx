'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Container from '@/components/Container';
import IOSSafariRedirect from '@/components/IOSSafariRedirect';
import { colors, typography, spacing } from '@/lib/design-system';

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
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Conteúdo principal - Design Ultra Limpo */}
      <Container maxWidth="md" className="text-center space-y-8">
        
        {/* Linha Sutil */}
        <div className="w-15 h-0.5 mx-auto mb-8" style={{ 
          background: colors.text.gold,
          borderRadius: '1px'
        }}></div>

        {/* Título com componente reutilizável */}
        <Title />
        
        {/* Subtítulo Elegante - FLUID TYPOGRAPHY */}
        <p 
          className="italic leading-relaxed mb-6"
          style={{ 
            fontFamily: typography.serif,
            fontWeight: typography.weights.semibold,
            fontStyle: 'italic',
            letterSpacing: typography.letterSpacing.wider,
            color: colors.text.whiteMuted,
            fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
            lineHeight: '1.7'
          }}
        >
          "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho"
        </p>
        

        {/* Botões com componentes reutilizáveis */}
        <div className="space-y-4 w-full max-w-xs mx-auto">
          <Button href="/login" variant="primary" size="lg">
            Começar Agora
          </Button>
          
          <Button href="/registro" variant="secondary" size="md">
            Criar Conta Gratuita
          </Button>
        </div>

        {/* Frase de benefício - mesmo formato da citação bíblica */}
        <p 
          className="italic leading-relaxed mb-6"
          style={{ 
            fontFamily: typography.serif,
            fontWeight: typography.weights.semibold,
            fontStyle: 'italic',
            letterSpacing: typography.letterSpacing.wider,
            color: colors.text.whiteMuted,
            fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
            lineHeight: '1.7'
          }}
        >
          Em poucos minutos, em qualquer lugar,<br className="hidden sm:block" />
          <span style={{ color: colors.text.gold }}> você terá uma transformação real</span>
        </p>
      </Container>

      {/* iOS Safari Redirect */}
      <IOSSafariRedirect />
    </div>
  );
}