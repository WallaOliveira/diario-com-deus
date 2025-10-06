'use client';

import { useState, useEffect, useRef } from 'react';
import { FiX, FiChevronRight, FiChevronLeft, FiHelpCircle } from 'react-icons/fi';

interface TutorialStep {
  title: string;
  description: string;
  targetSelector?: string; // Seletor CSS do elemento a destacar
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: '👋 Bem-vindo ao Diário com Deus!',
    description: 'Vamos fazer um tour interativo pelas funcionalidades. Leva só 1 minuto!',
    position: 'center',
  },
  {
    title: '📖 Sessão Express',
    description: 'Seu devocional diário guiado em 7-10 minutos. Perfeito para começar o dia com paz!',
    targetSelector: '.sessao-express-card',
    position: 'bottom',
  },
  {
    title: '🗺️ Trilhas Guiadas',
    description: 'Jornadas de 7, 14 ou 30 dias sobre temas específicos. Ideal para aprofundar sua fé!',
    targetSelector: '.trilhas-card',
    position: 'bottom',
  },
  {
    title: '💜 Modo Livre',
    description: 'Escolha devocionais por tema ou estado do coração quando precisar de uma palavra específica.',
    targetSelector: '.modo-livre-card',
    position: 'bottom',
  },
  {
    title: '📅 Minha Semana',
    description: 'Acompanhe sua constância semanal e celebre cada conquista na sua jornada.',
    targetSelector: '.minha-semana-card',
    position: 'bottom',
  },
  {
    title: '📈 Progresso Completo',
    description: 'Veja sua transformação com check-ins emocionais e evolução visível!',
    targetSelector: '.progresso-card',
    position: 'top',
  },
  {
    title: '🎁 Bônus Gratuitos',
    description: 'PDFs, wallpapers, playlists e muito mais conteúdo especial sem custo!',
    targetSelector: '.bonus-card',
    position: 'top',
  },
  {
    title: '✨ Pronto para Começar!',
    description: 'Você pode refazer este tutorial a qualquer momento clicando no ícone de ajuda (?) na tela.',
    position: 'center',
  },
];

interface TutorialProps {
  show: boolean;
  onClose: () => void;
}

export default function Tutorial({ show, onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = TUTORIAL_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  // Atualiza a posição do elemento destacado
  useEffect(() => {
    if (!show || !step.targetSelector) {
      setTargetRect(null);
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(step.targetSelector!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        
        // Scroll suave para o elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [show, step, currentStep]);

  // Controla overflow do body
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!show) return null;

  const handleNext = () => {
    if (isLast) {
      handleClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('tutorial_completed', 'true');
    onClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  // Calcula posição da tooltip baseada no elemento destacado
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || step.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const padding = 20;
    const style: React.CSSProperties = {};

    switch (step.position) {
      case 'bottom':
        style.top = `${targetRect.bottom + padding}px`;
        style.left = `${targetRect.left + targetRect.width / 2}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'top':
        style.bottom = `${window.innerHeight - targetRect.top + padding}px`;
        style.left = `${targetRect.left + targetRect.width / 2}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.top = `${targetRect.top + targetRect.height / 2}px`;
        style.right = `${window.innerWidth - targetRect.left + padding}px`;
        style.transform = 'translateY(-50%)';
        break;
      case 'right':
        style.top = `${targetRect.top + targetRect.height / 2}px`;
        style.left = `${targetRect.right + padding}px`;
        style.transform = 'translateY(-50%)';
        break;
    }

    return style;
  };

  return (
    <>
      {/* Overlay com spotlight */}
      <div 
        className="fixed inset-0 transition-all duration-300"
        style={{ zIndex: 9998 }}
        onClick={handleSkip}
      >
        {/* SVG para criar o "recorte" spotlight */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {targetRect && (
                <rect
                  x={targetRect.left - 8}
                  y={targetRect.top - 8}
                  width={targetRect.width + 16}
                  height={targetRect.height + 16}
                  rx="16"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.7)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Borda destacada no elemento */}
        {targetRect && (
          <div
            className="absolute border-4 border-blue-500 rounded-2xl animate-pulse pointer-events-none shadow-xl"
            style={{
              top: `${targetRect.top - 8}px`,
              left: `${targetRect.left - 8}px`,
              width: `${targetRect.width + 16}px`,
              height: `${targetRect.height + 16}px`,
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.4)',
            }}
          />
        )}
      </div>

      {/* Tooltip do tutorial */}
      <div
        ref={tooltipRef}
        className="fixed pointer-events-auto animate-scaleIn"
        style={{
          zIndex: 9999,
          ...getTooltipStyle(),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 mx-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 ml-2"
              title="Fechar tutorial"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Progresso */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">
                Passo {currentStep + 1} de {TUTORIAL_STEPS.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Pular
              </button>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isFirst
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FiChevronLeft size={18} />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg"
            >
              <span>{isLast ? 'Começar!' : 'Próximo'}</span>
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook para gerenciar tutorial
export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Verifica se já viu o tutorial
    const completed = localStorage.getItem('tutorial_completed');
    console.log('Tutorial completed status:', completed);
    if (!completed) {
      // Mostra após 1.5 segundos (para dar tempo de carregar a página)
      setTimeout(() => {
        console.log('Mostrando tutorial...');
        setShowTutorial(true);
      }, 1500);
    }
  }, []);

  const openTutorial = () => {
    console.log('Abrindo tutorial manualmente...');
    setShowTutorial(true);
    // Reseta para não considerar como "completo" ao reabrir manualmente
    localStorage.removeItem('tutorial_completed');
  };
  
  const closeTutorial = () => {
    console.log('Fechando tutorial...');
    setShowTutorial(false);
    localStorage.setItem('tutorial_completed', 'true');
  };

  return { showTutorial, openTutorial, closeTutorial };
}

// Botão de ajuda para reabrir tutorial
export function TutorialButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      title="Ver tutorial novamente"
      style={{ zIndex: 40 }}
    >
      <FiHelpCircle size={24} />
    </button>
  );
}
