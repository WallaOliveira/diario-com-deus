'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiStar, FiLock, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const EXTRAS_CATALOG = [
  {
    id: 'trilha-maternidade',
    titulo: 'Trilha: Maternidade com Fé',
    descricao: '14 dias de devocionais especiais para mães que buscam equilíbrio entre família e fé',
    preco: 17,
    destaque: false,
    recursos: [
      'Devocionais focados em maternidade',
      'Orações para filhos',
      'Como criar filhos na fé',
      'Equilíbrio família x tempo com Deus',
    ],
    cor: 'from-pink-500 to-rose-500',
  },
  {
    id: 'trilha-casamento',
    titulo: 'Trilha: Casamento Abençoado',
    descricao: '21 dias para fortalecer seu casamento com princípios bíblicos práticos',
    preco: 27,
    destaque: true,
    recursos: [
      'Devocionais para fazer a dois',
      'Comunicação no casamento',
      'Perdão e reconciliação',
      'Intimidade espiritual',
    ],
    cor: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'trilha-proposito',
    titulo: 'Trilha: Descobrindo Propósito',
    descricao: '30 dias para entender o chamado de Deus para sua vida',
    preco: 37,
    destaque: false,
    recursos: [
      'Descobrir seus dons',
      'Ouvir a voz de Deus',
      'Clareza sobre próximos passos',
      'Vencer o medo de falhar',
    ],
    cor: 'from-orange-500 to-red-500',
  },
  {
    id: 'bundle-completo',
    titulo: '🎁 Bundle Completo',
    descricao: 'TODAS as trilhas extras + acesso vitalício a novos conteúdos',
    preco: 97,
    precoOriginal: 147,
    destaque: true,
    recursos: [
      'Todas trilhas extras (atuais e futuras)',
      'Grupo VIP no Telegram',
      'Lives mensais de oração',
      'Suporte prioritário',
    ],
    cor: 'from-yellow-500 to-amber-500',
    badge: 'MELHOR VALOR',
  },
];

const PLANOS_PREMIUM = {
  basico: {
    nome: 'Básico',
    preco: 27,
    recursos: [
      '9 temas principais',
      'Trilha de 7 dias',
      'Progresso visual',
      'Áudio text-to-speech',
    ],
    badge: undefined,
  },
  premium: {
    nome: 'Premium',
    preco: 47,
    recursos: [
      'TUDO do Básico',
      'Todas trilhas (7, 14, 30 dias)',
      'Grupo VIP',
      'Notificações inteligentes',
      'Suporte prioritário',
    ],
    badge: 'MAIS POPULAR',
  },
  vip: {
    nome: 'VIP',
    preco: 97,
    recursos: [
      'TUDO do Premium',
      'Todas trilhas extras',
      'Mentoria 30min',
      'Lives mensais',
      'Conteúdo exclusivo',
    ],
    badge: undefined,
  },
};

export default function ExtrasPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleComprar = (extraId: string, preco: number) => {
    // Aqui você implementaria integração com Stripe/PagSeguro
    alert(`Checkout de ${EXTRAS_CATALOG.find(e => e.id === extraId)?.titulo}\nValor: R$ ${preco}`);
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('checkout_iniciado', { 
        props: { produto: extraId, valor: preco } 
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Conteúdos Extras</h1>
            <p className="text-sm text-gray-600">Aprofunde sua jornada de fé</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiStar size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Leve sua fé para o próximo nível
          </h2>
          <p className="text-lg text-gray-700">
            Trilhas especiais, mentorias e conteúdos exclusivos para transformar 
            áreas específicas da sua vida.
          </p>
        </div>

        {/* Trilhas Extras */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            ✨ Trilhas Especiais
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {EXTRAS_CATALOG.map((extra) => (
              <div
                key={extra.id}
                className={`card hover:shadow-xl transition-all ${
                  extra.destaque ? 'ring-2 ring-primary-500 relative' : ''
                }`}
              >
                {extra.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      {extra.badge}
                    </span>
                  </div>
                )}

                {/* Header colorido */}
                <div className={`bg-gradient-to-r ${extra.cor} -m-6 mb-4 p-6 rounded-t-xl text-white`}>
                  <h4 className="text-xl font-bold mb-2">{extra.titulo}</h4>
                  <p className="text-sm opacity-90">{extra.descricao}</p>
                </div>

                {/* Preço */}
                <div className="mb-4">
                  {extra.precoOriginal && (
                    <span className="text-gray-400 line-through text-sm mr-2">
                      R$ {extra.precoOriginal}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    R$ {extra.preco}
                  </span>
                  <span className="text-gray-600 text-sm ml-1">
                    / uma vez
                  </span>
                </div>

                {/* Recursos */}
                <ul className="space-y-2 mb-6">
                  {extra.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <FiCheck size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleComprar(extra.id, extra.preco)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    extra.destaque
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'btn-secondary'
                  }`}
                >
                  Quero Esta Trilha
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade de Plano */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              💎 Ou faça upgrade para Premium
            </h3>
            <p className="text-purple-100 text-lg mb-8">
              Tenha acesso a TUDO por um preço especial
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(PLANOS_PREMIUM).map(([key, plano]) => (
                <div
                  key={key}
                  className={`bg-white bg-opacity-10 backdrop-blur border-2 ${
                    plano.badge ? 'border-yellow-400' : 'border-white border-opacity-20'
                  } rounded-xl p-6 relative hover:bg-opacity-20 transition-all`}
                >
                  {plano.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                        {plano.badge}
                      </span>
                    </div>
                  )}

                  <h4 className="text-xl font-bold mb-2">{plano.nome}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$ {plano.preco}</span>
                    <span className="text-sm opacity-75">/mês</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    {plano.recursos.map((recurso, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiCheck size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{recurso}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-2 rounded-lg font-medium ${
                      plano.badge
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-purple-900'
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    Escolher Plano
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="card bg-green-50 border-green-200 text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🛡️</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Garantia de 7 Dias
          </h4>
          <p className="text-gray-700">
            Se você não sentir diferença real no seu coração em 7 dias, 
            devolvemos 100% do seu dinheiro. Sem perguntas.
          </p>
        </div>
      </div>
    </div>
  );
}

