'use client';

import { useState, useEffect } from 'react';

export function useRespiraModal() {
  const [showRespira, setShowRespira] = useState(false);

  // Função para verificar se o usuário desabilitou o modal
  const isRespiraModalDisabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('respira_modal_disabled') === 'true';
  };

  // Função para verificar se já mostrou o modal hoje
  const shouldShowRespiraModal = () => {
    // 🚧 MODO TESTE - Sempre mostrar o modal
    if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
      return true;
    }
    
    if (typeof window === 'undefined') return false;
    
    // Se o usuário desabilitou o modal, não mostrar
    if (isRespiraModalDisabled()) {
      return false;
    }
    
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('respira_modal_shown');
    
    return lastShown !== today;
  };

  // Função para marcar que o modal foi mostrado hoje
  const markRespiraModalAsShown = () => {
    if (typeof window === 'undefined') return;
    
    const today = new Date().toDateString();
    localStorage.setItem('respira_modal_shown', today);
  };

  // Função para desabilitar o modal permanentemente
  const disableRespiraModal = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('respira_modal_disabled', 'true');
  };

  // Função para reabilitar o modal (útil para configurações)
  const enableRespiraModal = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('respira_modal_disabled');
  };

  // Função para mostrar o modal (se ainda não foi mostrado hoje)
  const showRespiraModal = () => {
    if (shouldShowRespiraModal()) {
      setShowRespira(true);
    }
  };

  // Função para fechar o modal e marcar como mostrado
  const closeRespiraModal = () => {
    setShowRespira(false);
    markRespiraModalAsShown();
  };

  // Função para continuar e fechar o modal
  const continueRespiraModal = () => {
    setShowRespira(false);
    markRespiraModalAsShown();
  };

  // Função para continuar e desabilitar o modal
  const continueAndDisableRespiraModal = () => {
    setShowRespira(false);
    markRespiraModalAsShown();
    disableRespiraModal();
  };

  return {
    showRespira,
    showRespiraModal,
    closeRespiraModal,
    continueRespiraModal,
    continueAndDisableRespiraModal,
    shouldShowRespiraModal,
    isRespiraModalDisabled,
    enableRespiraModal
  };
}
