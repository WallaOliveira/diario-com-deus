'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { FiCheck, FiStar, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

const PREMIUM_FEATURES = [
  {
    icon: '✨',
    titulo: 'Devocionais Ilimitados',
    descricao: 'Quantos você quiser, quando quiser. Sem limites!',
  },
  {
    icon: '🗺️',
    titulo: 'Todas as Trilhas',
    descricao: '7, 14, 30 dias + trilhas especiais exclusivas',
  },
  {
    icon: '🎧',
    titulo: 'Áudios Conduzidos',
    descricao: 'Voz suave te guiando em cada devocional',
  },
  {
    icon: '💬',
    titulo: 'Grupo VIP',
    descricao: 'Comunidade exclusiva no Telegram com outras mulheres de fé',
  },
  {
    icon: '📺',
    titulo: 'Lives de Oração',
    descricao: '2x por mês - tire dúvidas e ore junto com a gente',
  },
  {
    icon: '💙',
    titulo: 'Suporte Prioritário',
    descricao: 'Resposta rápida sempre que precisar',
  },
];

export default function TrialPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { startTrial, isTrialActive } = useSubscriptionStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleStartTrial = () => {
    startTrial();
    router.push('/dashboard');
  };

  if (!user) return null;

  // Se já tem trial ativo, redireciona
  if (isTrialActive()) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center text-white mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur rounded-full mb-6 animate-float">
            <FiStar size={40} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Experimente Premium<br/>
            <span className="text-yellow-300">Grátis por 7 dias</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-6 max-w-2xl mx-auto">
            Acesso COMPLETO a tudo por uma semana inteira.<br/>
            Sem pedir cartão. Sem pegadinhas. ❤️
          </p>

          <div className="inline-block bg-white bg-opacity-20 backdrop-blur px-6 py-3 rounded-full">
            <p className="text-lg font-medium">
              Depois, apenas <span className="text-yellow-300 font-bold">R$47/mês</span> se quiser continuar
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {PREMIUM_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-3xl p-6 hover:bg-opacity-60 transition-all animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div className="text-white">
                  <h3 className="text-lg font-bold mb-1">{feature.titulo}</h3>
                  <p className="text-purple-100 text-sm">{feature.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center mb-8 animate-scaleIn">
          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              🎁 OFERTA ESPECIAL PARA VOCÊ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              7 Dias Grátis para<br/>
              Transformar seu Coração
            </h2>
            <p className="text-lg text-gray-600">
              Cancele quando quiser. Sem compromisso. Só experimentar! 💜
            </p>
          </div>

          <button
            onClick={handleStartTrial}
            className="btn-primary text-xl py-5 px-12 w-full md:w-auto hover-lift"
          >
            Começar Meus 7 Dias Grátis
          </button>

          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiCheck className="text-green-600" size={20} />
              <span>Sem cartão</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheck className="text-green-600" size={20} />
              <span>Cancele a qualquer momento</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheck className="text-green-600" size={20} />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>

        {/* Testimonials simulados */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              nome: 'Juliana',
              texto: 'Esses 7 dias mudaram minha rotina! Agora não consigo ficar sem.',
              avatar: '👩',
            },
            {
              nome: 'Camila',
              texto: 'Finalmente achei algo que cabe na minha rotina corrida com os filhos.',
              avatar: '👩‍🦱',
            },
            {
              nome: 'Ana Paula',
              texto: 'O grupo VIP é incrível! Conheci mulheres que me inspiram todo dia.',
              avatar: '👩‍🦰',
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-bold">{testimonial.nome}</p>
                  <div className="flex text-yellow-300">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-purple-100">{testimonial.texto}</p>
            </div>
          ))}
        </div>

        {/* FAQ rápido */}
        <div className="glass rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h3>
          <div className="space-y-4">
            <details className="cursor-pointer">
              <summary className="font-medium text-lg mb-2">Preciso colocar cartão?</summary>
              <p className="text-purple-100 text-sm pl-4">
                Não! Você começa grátis e só decide se quer continuar depois dos 7 dias.
              </p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-medium text-lg mb-2">E se eu não gostar?</summary>
              <p className="text-purple-100 text-sm pl-4">
                É só não fazer nada! Seu acesso volta para o plano gratuito automaticamente.
              </p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-medium text-lg mb-2">Posso cancelar depois?</summary>
              <p className="text-purple-100 text-sm pl-4">
                Sim! Cancele quando quiser, sem burocracia. Somos transparentes sempre.
              </p>
            </details>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-white hover:text-purple-200 text-sm">
            ← Voltar para o dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

