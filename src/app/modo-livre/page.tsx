'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiSearch, FiHeart } from 'react-icons/fi';
import Container from '@/components/Container';
import { colors, typography, spacing } from '@/lib/design-system';
import Link from 'next/link';

// Mock de temas
const TEMAS = [
  { id: 'ansiedade', nome: 'Ansiedade', emoji: '😰', cor: 'bg-blue-100 text-blue-700' },
  { id: 'gratidao', nome: 'Gratidão', emoji: '🙏', cor: 'bg-yellow-100 text-yellow-700' },
  { id: 'perdao', nome: 'Perdão', emoji: '💙', cor: 'bg-purple-100 text-purple-700' },
  { id: 'sabedoria', nome: 'Sabedoria', emoji: '🦉', cor: 'bg-indigo-100 text-indigo-700' },
  { id: 'esperanca', nome: 'Esperança', emoji: '🌅', cor: 'bg-orange-100 text-orange-700' },
  { id: 'familia', nome: 'Família', emoji: '👨‍👩‍👧‍👦', cor: 'bg-green-100 text-green-700' },
  { id: 'trabalho', nome: 'Trabalho', emoji: '💼', cor: 'bg-gray-100 text-gray-700' },
  { id: 'consolo', nome: 'Consolo', emoji: '🤗', cor: 'bg-pink-100 text-pink-700' },
  { id: 'decisao', nome: 'Decisão', emoji: '🤔', cor: 'bg-cyan-100 text-cyan-700' },
];

const ESTADOS_CORACAO = [
  { nome: 'Ansioso(a)', emoji: '😰', descricao: 'Preciso de paz' },
  { nome: 'Triste', emoji: '😢', descricao: 'Preciso de consolo' },
  { nome: 'Grato(a)', emoji: '🙏', descricao: 'Quero louvar' },
  { nome: 'Confuso(a)', emoji: '🤔', descricao: 'Preciso de direção' },
  { nome: 'Esperançoso(a)', emoji: '🌅', descricao: 'Quero renovar fé' },
  { nome: 'Cansado(a)', emoji: '😴', descricao: 'Preciso de descanso' },
  { nome: 'Alegre', emoji: '😊', descricao: 'Quero celebrar' },
  { nome: 'Com medo', emoji: '😨', descricao: 'Preciso de coragem' }
];

export default function ModoLivrePage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState<'temas' | 'estado'>('temas');

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!user) return null;

  const temasFiltrados = TEMAS.filter(tema =>
    tema.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Header com Nova Identidade */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="transition-colors hover:opacity-80" style={{ color: colors.text.whiteMuted }}>
              <FiArrowLeft size={24} />
            </Link>
            <div>
              <h1 
                className="font-bold"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.heading.h2,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                Devocional Pessoal
              </h1>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.sm,
                  color: colors.text.whiteMuted
                }}
              >
                Conforme sua necessidade
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">
        {/* Explicação com Nova Identidade */}
        <div style={{
          background: colors.background.card,
          borderRadius: '16px',
          padding: spacing.fixed.cardPadding,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            }}>
              <FiHeart size={24} className="text-white" />
            </div>
            <div>
              <h2 
                className="font-bold mb-2"
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.heading.h3,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.white
                }}
              >
                💜 Busque conforme sua necessidade
              </h2>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: typography.body.md,
                  color: colors.text.whiteMuted,
                  lineHeight: '1.6'
                }}
              >
                Escolha um tema específico ou diga como está seu coração hoje. 
                Vamos te guiar com devocionais personalizados.
              </p>
            </div>
          </div>
        </div>

        {/* Abas com Nova Identidade */}
        <div className="flex gap-2" style={{ borderBottom: `1px solid ${colors.border}` }}>
          <button
            onClick={() => setAba('temas')}
            className={`px-6 py-3 font-medium transition-colors ${
              aba === 'temas'
                ? 'border-b-2'
                : 'hover:opacity-80'
            }`}
            style={{
              color: aba === 'temas' ? colors.text.gold : colors.text.whiteMuted,
              borderBottomColor: aba === 'temas' ? colors.text.gold : 'transparent',
              fontFamily: typography.sans,
              fontSize: typography.body.md
            }}
          >
            Por Tema
          </button>
          <button
            onClick={() => setAba('estado')}
            className={`px-6 py-3 font-medium transition-colors ${
              aba === 'estado'
                ? 'border-b-2'
                : 'hover:opacity-80'
            }`}
            style={{
              color: aba === 'estado' ? colors.text.gold : colors.text.whiteMuted,
              borderBottomColor: aba === 'estado' ? colors.text.gold : 'transparent',
              fontFamily: typography.sans,
              fontSize: typography.body.md
            }}
          >
            Estado do Coração
          </button>
        </div>

        {/* Conteúdo: Por Tema */}
        {aba === 'temas' && (
          <div className="space-y-4">
            {/* Busca com Nova Identidade */}
            <div className="relative">
              <FiSearch 
                className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                size={20} 
                style={{ color: colors.text.whiteMuted }}
              />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none"
                style={{
                  background: colors.background.card,
                  borderColor: colors.border,
                  color: colors.text.white,
                  fontFamily: typography.sans,
                  fontSize: typography.body.md,
                  borderRadius: '12px',
                  minHeight: '56px'
                }}
                placeholder="Buscar tema..."
                onFocus={(e) => {
                  e.target.style.borderColor = colors.text.gold;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                }}
              />
            </div>

            {/* Grid de temas com Nova Identidade */}
            <div className="grid grid-cols-2 gap-4">
              {temasFiltrados.map((tema) => (
                <Link
                  key={tema.id}
                  href={`/devocional/${tema.id}`}
                  className="group transition-all hover:scale-105"
                  style={{
                    background: colors.background.card,
                    borderRadius: '16px',
                    padding: spacing.fixed.cardPadding,
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{tema.emoji}</div>
                    <p 
                      className="font-medium"
                      style={{ 
                        fontFamily: typography.sans,
                        fontSize: typography.heading.h3,
                        fontWeight: typography.weights.semibold,
                        color: colors.text.white
                      }}
                    >
                      {tema.nome}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo: Estado do Coração */}
        {aba === 'estado' && (
          <div className="space-y-6">
            <p 
              className="text-center font-medium"
              style={{ 
                fontFamily: typography.sans,
                fontSize: typography.heading.h3,
                fontWeight: typography.weights.semibold,
                color: colors.text.white
              }}
            >
              Como está seu coração hoje?
            </p>

            <div className="grid grid-cols-1 gap-4">
              {ESTADOS_CORACAO.map((estado) => (
                <Link
                  key={estado.nome}
                  href={`/devocional/estado/${estado.nome.toLowerCase()}`}
                  className="group transition-all hover:scale-105"
                  style={{
                    background: colors.background.card,
                    borderRadius: '16px',
                    padding: spacing.fixed.cardPadding,
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{estado.emoji}</div>
                    <div className="flex-1">
                      <p 
                        className="font-medium mb-1"
                        style={{ 
                          fontFamily: typography.sans,
                          fontSize: typography.heading.h3,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.white
                        }}
                      >
                        {estado.nome}
                      </p>
                      <p 
                        style={{ 
                          fontFamily: typography.sans,
                          fontSize: typography.body.sm,
                          color: colors.text.whiteMuted
                        }}
                      >
                        {estado.descricao}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

