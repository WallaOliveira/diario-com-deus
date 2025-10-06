'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiGift, FiDownload, FiHeadphones, FiBook } from 'react-icons/fi';
import Link from 'next/link';

const BONUS_ITEMS = [
  {
    id: 'guia-oracao',
    icon: '📖',
    titulo: 'Guia Prático de Oração',
    descricao: 'PDF com 10 modelos de oração para diferentes situações',
    tipo: 'PDF',
    disponivel: true,
    badge: 'Gratuito',
  },
  {
    id: 'wallpapers',
    icon: '🎨',
    titulo: 'Pack de Wallpapers',
    descricao: '15 papéis de parede com versículos para celular',
    tipo: 'ZIP',
    disponivel: true,
    badge: 'Gratuito',
  },
  {
    id: 'playlist-adoracao',
    icon: '🎵',
    titulo: 'Playlist de Adoração',
    descricao: 'Músicas selecionadas para momentos com Deus',
    tipo: 'Spotify',
    disponivel: true,
    badge: 'Gratuito',
  },
  {
    id: 'diario-gratidao',
    icon: '📔',
    titulo: 'Diário de Gratidão',
    descricao: 'Template para imprimir e anotar 3 gratidões por dia',
    tipo: 'PDF',
    disponivel: true,
    badge: 'Gratuito',
  },
  {
    id: 'meditacao-guiada',
    icon: '🧘‍♀️',
    titulo: 'Meditação Bíblica Guiada',
    descricao: 'Áudio de 10 min para meditar em Salmos 23',
    tipo: 'MP3',
    disponivel: false,
    badge: 'Em breve',
  },
  {
    id: 'plano-leitura',
    icon: '📚',
    titulo: 'Plano de Leitura Anual',
    descricao: 'Leia a Bíblia inteira em 1 ano (checklist imprimível)',
    tipo: 'PDF',
    disponivel: true,
    badge: 'Gratuito',
  },
];

export default function BonusPage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const handleDownload = (bonusId: string) => {
    // Aqui você implementaria o download real
    // Por enquanto, só mostra uma mensagem
    alert(`Download de ${BONUS_ITEMS.find(b => b.id === bonusId)?.titulo} iniciado!`);
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('bonus_download', { props: { item: bonusId } });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Bônus Gratuitos</h1>
            <p className="text-sm text-gray-600">Conteúdo extra para sua jornada</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
              <FiGift size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Presentes especiais para você! 🎁
              </h2>
              <p className="text-purple-100">
                Materiais gratuitos para aprofundar sua fé e transformar seu dia a dia.
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Bônus */}
        <div className="space-y-4">
          {BONUS_ITEMS.map((bonus) => (
            <div
              key={bonus.id}
              className={`card hover:shadow-lg transition-shadow ${
                !bonus.disponivel ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
                  {bonus.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {bonus.titulo}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bonus.disponivel
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {bonus.badge}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {bonus.descricao}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      {bonus.tipo === 'PDF' && <FiBook size={14} />}
                      {bonus.tipo === 'MP3' && <FiHeadphones size={14} />}
                      {bonus.tipo === 'ZIP' && <FiDownload size={14} />}
                      {bonus.tipo === 'Spotify' && '🎵'}
                      {bonus.tipo}
                    </span>

                    {bonus.disponivel ? (
                      <button
                        onClick={() => handleDownload(bonus.id)}
                        className="btn-primary px-4 py-2 text-sm"
                      >
                        <FiDownload size={16} className="inline mr-2" />
                        Baixar
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn-secondary px-4 py-2 text-sm opacity-50 cursor-not-allowed"
                      >
                        Em breve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para Extras */}
        <div className="card bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <h3 className="font-bold text-gray-900 mb-2">✨ Quer ainda mais?</h3>
          <p className="text-sm text-gray-700 mb-4">
            Na área de <strong>Extras</strong> você encontra trilhas especiais, 
            mentorias e conteúdos exclusivos para aprofundar ainda mais sua fé.
          </p>
          <Link href="/extras" className="btn-primary inline-block">
            Ver Extras Premium
          </Link>
        </div>
      </div>
    </div>
  );
}

