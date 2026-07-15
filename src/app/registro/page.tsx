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

export default function RegistroPage() {
  const router = useRouter();
  const { signUp } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toasts, hideToast, showError, success } = useToast();

  // Formatar telefone (BR)
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      showError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await signUp(email, password, name, phone);

    if (result.error) {
      showError(result.error);
      setLoading(false);
    } else if (result.needsConfirmation) {
      // Supabase exige confirmação de e-mail antes de entrar
      analytics.signUp();
      success('Conta criada! Confirme seu e-mail para entrar.');
      setTimeout(() => router.push('/login'), 2500);
    } else {
      // Já está logado — vai direto para o app
      analytics.signUp();
      success('Conta criada com sucesso!');
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
          
          {/* Título responsivo */}
          <h1 
            className="mb-2"
            style={{ 
              fontFamily: typography.sans,
              fontWeight: typography.weights.semibold,
              fontSize: typography.heading.h1,
              color: colors.text.white
            }}
          >
            Crie sua conta gratuita
          </h1>
          
          <p 
            style={{ 
              fontFamily: typography.sans,
              fontWeight: typography.weights.normal,
              fontSize: typography.body.md,
              color: colors.text.whiteMuted
            }}
          >
            Junte-se a milhares de pessoas em sua jornada de fé
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
            <label htmlFor="name" className="block mb-2" style={{ 
              fontFamily: typography.sans,
              fontSize: typography.fixed.label,
              fontWeight: typography.weights.medium,
              color: colors.text.whiteMuted
            }}>
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl outline-none transition-all focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 hover:bg-white/12"
              placeholder="Seu nome completo"
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
            <label htmlFor="phone" className="block mb-2" style={{ 
              fontFamily: typography.sans,
              fontSize: typography.fixed.label,
              fontWeight: typography.weights.medium,
              color: colors.text.whiteMuted
            }}>
              Telefone (opcional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full rounded-xl outline-none transition-all focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 hover:bg-white/12"
              placeholder="(11) 99999-9999"
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
            <p 
              className="mt-1"
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.body.sm,
                color: colors.text.whiteMuted
              }}
            >
              Para lembretes personalizados via WhatsApp
            </p>
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
              placeholder="Mínimo 6 caracteres"
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
            disabled={loading}
            variant="primary"
            size="lg"
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
          <p className="text-center" style={{ 
            fontFamily: typography.sans,
            fontSize: typography.body.sm,
            color: colors.text.whiteMuted
          }}>
            Já tem uma conta?{' '}
            <Link href="/login" className="hover:underline font-medium" style={{
              color: colors.accent.gold
            }}>
              Fazer login
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