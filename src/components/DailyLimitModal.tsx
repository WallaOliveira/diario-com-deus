'use client';

import { useRouter } from 'next/navigation';
import { FiCheck, FiBook, FiHeart, FiGift } from 'react-icons/fi';
import { colors } from '@/lib/design-system';

interface DailyLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyLimitModal({ isOpen, onClose }: DailyLimitModalProps) {
  const router = useRouter();

  console.log('🎭 DailyLimitModal render:', isOpen ? 'VISIBLE' : 'HIDDEN');

  if (!isOpen) return null;

  const handleExploreTrilhas = () => {
    router.push('/trilhas');
    onClose();
  };

  const handleExploreFavoritos = () => {
    router.push('/favoritos');
    onClose();
  };

  const handleExplorePresentes = () => {
    // TODO: Implementar página de "Presentes para Você"
    router.push('/presentes');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-purple-900/95 rounded-3xl shadow-2xl max-w-md w-full border border-blue-400/30 p-6 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
        
        {/* Conteúdo */}
        <div className="relative z-10">
          {/* Ícone de sucesso */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-400">
              <FiCheck size={32} className="text-green-400" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Você já completou seu momento com Deus hoje!
          </h2>

          {/* Mensagem */}
          <p className="text-center text-blue-100 mb-6">
            Transforme esse momento em ação e continue sua jornada espiritual.
          </p>

          {/* Opções de exploração */}
          <div className="space-y-3 mb-6">
            {/* Trilhas Guiadas */}
            <button
              onClick={handleExploreTrilhas}
              className="w-full flex items-center gap-3 p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl border border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <FiBook className="text-blue-400" size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white text-sm">Explorar Trilhas Guiadas</p>
                <p className="text-xs text-blue-200">Experiências de 7, 14 e 21 dias</p>
              </div>
            </button>

            {/* Favoritos */}
            <button
              onClick={handleExploreFavoritos}
              className="w-full flex items-center gap-3 p-4 bg-pink-600/20 hover:bg-pink-600/30 rounded-xl border border-pink-500/30 transition-all group"
            >
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                <FiHeart className="text-pink-400" size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white text-sm">Revisar Favoritos</p>
                <p className="text-xs text-pink-200">Versículos e reflexões salvos</p>
              </div>
            </button>

            {/* Presentes para Você */}
            <button
              onClick={handleExplorePresentes}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl border border-purple-500/30 transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                <FiGift className="text-purple-300" size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white text-sm">🎁 Presentes para Você</p>
                <p className="text-xs text-purple-200">Bônus, conteúdo exclusivo e ofertas especiais</p>
              </div>
            </button>
          </div>

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all border border-white/20"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

