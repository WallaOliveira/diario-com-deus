'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiHeart, FiTrash2, FiTag } from 'react-icons/fi';
import Link from 'next/link';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import { getUserFavorites, removeFavorite } from '@/lib/database';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';

interface Favorite {
  id: string;
  type: 'verse' | 'quote' | 'prayer';
  content: string;
  reference?: string;
  tags: string[];
  created_at: string;
}

export default function FavoritosPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { toasts, hideToast, showError, success } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      loadFavorites();
    }
  }, [user, loading, router]);

  const loadFavorites = async () => {
    if (!user) return;
    
    try {
      setLoadingFavorites(true);
      const userFavorites = await getUserFavorites(user.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      showError('Erro ao carregar favoritos');
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      success('Favorito removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      showError('Erro ao remover favorito');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'verse': return '📖';
      case 'quote': return '💭';
      case 'prayer': return '🙏';
      default: return '⭐';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'verse': return 'Versículo';
      case 'quote': return 'Citação';
      case 'prayer': return 'Oração';
      default: return 'Favorito';
    }
  };

  if (loading || loadingFavorites) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 transition-colors hover:opacity-80"
              style={{ color: colors.text.whiteMuted }}
            >
              <FiArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: colors.text.gold
              }}>
                <FiHeart size={20} className="text-white" />
              </div>
              <div>
                <h1 
                  className="font-bold text-white"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                    fontWeight: typography.weights.semibold
                  }}
                >
                  Meus Favoritos
                </h1>
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.sm,
                    color: colors.text.whiteMuted
                  }}
                >
                  {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6">
        {favorites.length === 0 ? (
          /* Estado vazio */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto flex items-center justify-center mb-6">
              <FiHeart size={40} className="text-white/60" />
            </div>
            <h2 
              className="text-2xl font-bold text-white mb-4"
              style={{ 
                fontFamily: typography.serif,
                fontWeight: typography.weights.semibold
              }}
            >
              Nenhum favorito ainda
            </h2>
            <p 
              className="text-white/80 mb-8 max-w-md mx-auto"
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.body.md
              }}
            >
              Quando você salvar versículos, citações ou orações, eles aparecerão aqui.
            </p>
            <Link 
              href="/sessao-express"
              className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: typography.sans }}
            >
              Fazer um Devocional
            </Link>
          </div>
        ) : (
          /* Lista de favoritos */
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                style={{
                  background: colors.background.card,
                  borderRadius: '16px',
                  padding: spacing.fixed.cardPadding,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(favorite.type)}</span>
                    <div>
                      <h3 
                        className="font-bold text-white"
                        style={{ 
                          fontFamily: typography.serif,
                          fontSize: typography.heading.h4,
                          fontWeight: typography.weights.semibold
                        }}
                      >
                        {getTypeLabel(favorite.type)}
                      </h3>
                      {favorite.reference && (
                        <p 
                          style={{ 
                            fontFamily: typography.sans,
                            fontSize: typography.body.sm,
                            color: colors.text.gold
                          }}
                        >
                          {favorite.reference}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="p-2 transition-colors hover:opacity-80"
                    style={{ color: colors.text.whiteMuted }}
                    title="Remover favorito"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <p 
                  className="mb-4 leading-relaxed"
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: typography.body.md,
                    color: colors.text.whiteMuted
                  }}
                >
                  "{favorite.content}"
                </p>

                {favorite.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <FiTag size={14} className="text-white/60" />
                    {favorite.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'rgba(212, 175, 55, 0.2)',
                          color: colors.text.gold,
                          fontFamily: typography.sans
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Toast notifications */}
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
