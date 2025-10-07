'use client';

import { useState } from 'react';
import { FiX, FiSmartphone, FiDownload, FiCheckCircle } from 'react-icons/fi';

interface PWAInstallGuideProps {
  show: boolean;
  onClose: () => void;
}

export default function PWAInstallGuide({ show, onClose }: PWAInstallGuideProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FiSmartphone size={28} />
                Como Instalar o App
              </h2>
              <p className="text-blue-100 text-sm">
                Acesso rápido, funciona offline, notificações e muito mais!
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              title="Fechar"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
              activeTab === 'ios'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            📱 iPhone / iPad
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
              activeTab === 'android'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            🤖 Android
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {activeTab === 'ios' ? (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  ⚠️ <strong>Importante:</strong> No iPhone/iPad, a instalação <strong>só funciona no Safari</strong> (não funciona no Chrome nem em outros navegadores). Se você está vendo isso em outro navegador, abra o Safari primeiro!
                </p>
              </div>

              <div className="space-y-4">
                <StepCard
                  number={1}
                  title="Toque no ícone de Compartilhar"
                  description="Procure o ícone de compartilhar (quadrado com seta para cima ⬆️) na barra inferior ou superior do Safari"
                  icon="⬆️"
                />

                <StepCard
                  number={2}
                  title="Role para baixo e selecione 'Adicionar à Tela de Início'"
                  description="Você vai ver várias opções. Role até encontrar essa opção com o ícone ➕"
                  icon="➕"
                />

                <StepCard
                  number={3}
                  title="Confirme o nome e toque em 'Adicionar'"
                  description="O app 'Diário com Deus' aparecerá na sua tela inicial como um app nativo!"
                  icon="✅"
                />
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Pronto!</h4>
                    <p className="text-sm text-green-800">
                      Agora você pode abrir o app direto da tela inicial, como qualquer outro aplicativo!
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <p className="text-sm text-green-900 font-medium">
                  ✨ <strong>Dica:</strong> Use o <strong>Chrome</strong> ou <strong>Samsung Internet</strong> para melhor experiência!
                </p>
              </div>

              <div className="space-y-4">
                <StepCard
                  number={1}
                  title="Toque nos 3 pontinhos (⋮)"
                  description="Procure o menu de opções no canto superior direito do Chrome"
                  icon="⋮"
                />

                <StepCard
                  number={2}
                  title="Selecione 'Instalar app' ou 'Adicionar à tela inicial'"
                  description="O texto pode variar dependendo do seu navegador e versão do Android"
                  icon="📲"
                />

                <StepCard
                  number={3}
                  title="Confirme 'Instalar' ou 'Adicionar'"
                  description="O app 'Diário com Deus' aparecerá na sua tela inicial ou gaveta de apps!"
                  icon="✅"
                />
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>💡 Alternativa:</strong> Alguns Androids mostram automaticamente um banner na parte inferior da tela perguntando se você quer instalar. Basta tocar em <strong>"Instalar"</strong>!
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Pronto!</h4>
                    <p className="text-sm text-green-800">
                      Agora você pode abrir o app direto da tela inicial, como qualquer outro aplicativo!
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Benefícios */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              Por que instalar?
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Acesso ultra-rápido:</strong> Abra como app nativo, sem precisar abrir o navegador</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Funciona offline:</strong> Seus devocionais salvos ficam disponíveis sem internet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Notificações:</strong> Receba lembretes diários para não perder seu momento com Deus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Leve e eficiente:</strong> Ocupa menos espaço que apps tradicionais da loja</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Sempre atualizado:</strong> Atualizações automáticas sem precisar ir na loja de apps</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Entendi, vamos começar! 🙏
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para cada passo
function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Hook para controlar o guia de instalação
export function usePWAInstallGuide() {
  const [showGuide, setShowGuide] = useState(false);

  const openGuide = () => setShowGuide(true);
  const closeGuide = () => setShowGuide(false);

  return { showGuide, openGuide, closeGuide };
}

