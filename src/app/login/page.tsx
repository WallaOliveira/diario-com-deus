'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { analytics } from '@/lib/analytics';
import { colors, typography, spacing } from '@/lib/design-system';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toasts, hideToast, showError, success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      showError(result.error);
      setLoading(false);
    } else {
      analytics.signIn();
      success('Login realizado com sucesso!');
      setTimeout(() => router.push('/dashboard'), 1000);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md" className="animate-fadeIn">
        {/* Header com Nova Identidade */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg" style={{
              background: colors.text.gold
            }}>
              <span className="text-3xl text-white">📖</span>
            </div>
          </Link>
          
          {/* Título com fonte da LP */}
          <h1 
            className="mb-2"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: typography.heading.h1,
              color: colors.text.white,
              letterSpacing: '-0.02em'
            }}
          >
            Bem-vindo de volta
          </h1>
          
          <p 
            style={{ 
              fontFamily: typography.sans,
              fontWeight: typography.weights.normal,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted
            }}
          >
            Entre para continuar sua jornada
          </p>
        </div>

        {/* Form com Sistema de Design */}
        <form onSubmit={handleSubmit} className="space-y-6" style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>

          <div>
            <label htmlFor="email" className="block mb-2" style={{ 
              fontFamily: typography.sans,
              fontSize: typography.fixed.label,
              fontWeight: typography.weights.medium,
              color: colors.text.whiteMuted
            }}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl outline-none transition-all focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 hover:bg-white/12"
              placeholder="seu@email.com"
              required
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid rgba(255,255,255,0.2)`,
                padding: '1rem 1.25rem',
                fontFamily: typography.sans,
                fontSize: typography.body.md,
                color: colors.text.white,
                borderRadius: '12px',
                minHeight: '56px'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2" style={{ 
              fontFamily: typography.sans,
              fontSize: typography.fixed.label,
              fontWeight: typography.weights.medium,
              color: colors.text.whiteMuted
            }}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl outline-none transition-all focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 hover:bg-white/12"
              placeholder="••••••••"
              required
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid rgba(255,255,255,0.2)`,
                padding: '1rem 1.25rem',
                fontFamily: typography.sans,
                fontSize: typography.body.md,
                color: colors.text.white,
                borderRadius: '12px',
                minHeight: '56px'
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="text-center" style={{ 
            fontFamily: typography.sans,
            fontSize: typography.body.sm,
            color: colors.text.whiteMuted
          }}>
            Não tem uma conta?{' '}
            <Link href="/registro" className="hover:underline font-medium" style={{
              color: colors.accent.gold
            }}>
              Crie uma agora
            </Link>
          </p>
        </form>
      </Container>

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}