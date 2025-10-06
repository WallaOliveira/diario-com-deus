// Analytics tracking - Plausible (GDPR-friendly)

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export const trackEvent = (
  event: string,
  properties?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    try {
      window.plausible(event, { props: properties });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
};

// Eventos pré-definidos
export const analytics = {
  // Auth
  signUp: () => trackEvent('cadastro_concluido'),
  signIn: () => trackEvent('login_realizado'),
  signOut: () => trackEvent('logout'),

  // Devocional
  devotionalStarted: (tema: string) => 
    trackEvent('devocional_iniciado', { tema }),
  devotionalCompleted: (tema: string, tempo: number) => 
    trackEvent('devocional_concluido', { tema, tempo_segundos: tempo }),
  audioPlayed: (tipo: string) => 
    trackEvent('audio_tocado', { tipo }),

  // Progresso
  checkinEmocional: (paz: number, proximidade: number, ansiedade: number) =>
    trackEvent('checkin_emocional', { paz, proximidade, ansiedade }),
  streakAchieved: (dias: number) => 
    trackEvent('streak_alcancado', { dias }),

  // Monetização
  bonusDownload: (item: string) => 
    trackEvent('bonus_download', { item }),
  checkoutStarted: (produto: string, valor: number) =>
    trackEvent('checkout_iniciado', { produto, valor }),
  purchaseCompleted: (produto: string, valor: number) =>
    trackEvent('compra_concluida', { produto, valor }),

  // Engagement
  pageView: (pagina: string) => 
    trackEvent('page_view', { pagina }),
  shareClicked: (tipo: string) => 
    trackEvent('compartilhamento', { tipo }),
};

