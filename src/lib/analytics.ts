/**
 * Analytics simples e privacy-friendly
 * 
 * Para usar com Plausible (recomendado):
 * 1. Crie conta em plausible.io
 * 2. Adicione o domínio
 * 3. Substitua 'YOUR_DOMAIN' abaixo
 * 4. Adicione o script no layout.tsx
 * 
 * Alternativa PostHog também disponível
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, any> }) => void;
    posthog?: any;
  }
}

type EventProperties = {
  [key: string]: string | number | boolean;
};

/**
 * Track page view (automatic with Plausible)
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;
  
  // Plausible auto-tracks page views
  // PostHog manual tracking if needed
  if (window.posthog) {
    window.posthog.capture('$pageview', { url });
  }
}

/**
 * Track custom event
 * Ex: trackEvent('devocional_completo', { tema: 'Ansiedade', duracao: 420 })
 */
export function trackEvent(eventName: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return;
  
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties || {} });
  }
  
  // PostHog
  if (window.posthog) {
    window.posthog.capture(eventName, properties);
  }
  
  // Fallback: console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties);
  }
}

/**
 * Eventos pré-definidos para facilitar tracking
 */
export const analytics = {
  // Auth
  signUp: () => trackEvent('signup'),
  signIn: () => trackEvent('signin'),
  signOut: () => trackEvent('signout'),
  
  // Devocionais
  devotionalStarted: (theme: string) => trackEvent('devocional_iniciado', { tema: theme }),
  devotionalCompleted: (theme: string, duration: number) => 
    trackEvent('devocional_completo', { tema: theme, duracao_segundos: duration }),
  devotionalAbandoned: (theme: string, step: number) => 
    trackEvent('devocional_abandonado', { tema: theme, passo: step }),
  
  // Engagement
  streakAchieved: (days: number) => trackEvent('sequencia_conquistada', { dias: days }),
  notesAdded: () => trackEvent('notas_adicionadas'),
  audioPlayed: (content: string) => trackEvent('audio_reproduzido', { conteudo: content }),
  
  // PWA
  pwaInstalled: () => trackEvent('pwa_instalado'),
  pwaPromptShown: () => trackEvent('pwa_prompt_exibido'),
  pwaPromptAccepted: () => trackEvent('pwa_prompt_aceito'),
  pwaPromptDismissed: () => trackEvent('pwa_prompt_recusado'),
  
  // Onboarding
  onboardingCompleted: () => trackEvent('onboarding_completo'),
  onboardingSkipped: () => trackEvent('onboarding_pulado'),
  
  // Content
  bonusContentViewed: (title: string) => trackEvent('conteudo_bonus_visualizado', { titulo: title }),
  trailStarted: (trailName: string) => trackEvent('trilha_iniciada', { trilha: trailName }),
  
  // Monetization (futuro)
  checkoutStarted: (plan: string) => trackEvent('checkout_iniciado', { plano: plan }),
  subscriptionCreated: (plan: string) => trackEvent('assinatura_criada', { plano: plan }),
};

/**
 * Identifica usuário (para analytics que suportam)
 */
export function identifyUser(userId: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return;
  
  // PostHog
  if (window.posthog) {
    window.posthog.identify(userId, properties);
  }
  
  // Plausible não precisa de identificação (privacy-first)
}

/**
 * Reset user identification (sign out)
 */
export function resetUser() {
  if (typeof window === 'undefined') return;
  
  // PostHog
  if (window.posthog) {
    window.posthog.reset();
  }
}
