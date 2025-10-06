'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
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
  'Ansioso(a)', 'Triste', 'Grato(a)', 'Confuso(a)', 
  'Esperançoso(a)', 'Cansado(a)', 'Alegre', 'Com medo'
];

export default function ModoLivrePage() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState<'temas' | 'estado'>('temas');

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const temasFiltrados = TEMAS.filter(tema =>
    tema.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Modo Livre</h1>
            <p className="text-sm text-gray-600">Escolha por tema ou estado do coração</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Explicação */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <h2 className="font-bold text-gray-900 mb-2">💜 Busque conforme sua necessidade</h2>
          <p className="text-sm text-gray-700">
            Escolha um tema específico ou diga como está seu coração hoje. 
            Vamos te guiar com devocionais personalizados.
          </p>
        </div>

        {/* Abas */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setAba('temas')}
            className={`px-6 py-3 font-medium transition-colors ${
              aba === 'temas'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Por Tema
          </button>
          <button
            onClick={() => setAba('estado')}
            className={`px-6 py-3 font-medium transition-colors ${
              aba === 'estado'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Estado do Coração
          </button>
        </div>

        {/* Conteúdo: Por Tema */}
        {aba === 'temas' && (
          <div className="space-y-4">
            {/* Busca */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-field pl-12"
                placeholder="Buscar tema..."
              />
            </div>

            {/* Grid de temas */}
            <div className="grid grid-cols-2 gap-3">
              {temasFiltrados.map((tema) => (
                <Link
                  key={tema.id}
                  href={`/devocional/${tema.id}`}
                  className={`${tema.cor} rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="text-3xl mb-2">{tema.emoji}</div>
                  <p className="font-medium">{tema.nome}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo: Estado do Coração */}
        {aba === 'estado' && (
          <div className="space-y-4">
            <p className="text-center text-gray-700 font-medium">
              Como está seu coração hoje?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {ESTADOS_CORACAO.map((estado) => (
                <Link
                  key={estado}
                  href={`/devocional/estado/${estado.toLowerCase()}`}
                  className="card hover:shadow-md transition-shadow cursor-pointer text-center py-4"
                >
                  <p className="font-medium text-gray-900">{estado}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

