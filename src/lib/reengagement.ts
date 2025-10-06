/**
 * SISTEMA DE REENGAJAMENTO
 * 
 * Estratégias para trazer usuários de volta quando ficam inativos
 */

// ============================================================================
// 1. PUSH NOTIFICATIONS (PWA)
// ============================================================================

/**
 * Solicita permissão para notificações push
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Este navegador não suporta notificações');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Agenda notificação local para usuário inativo
 */
export function scheduleInactivityNotification(daysInactive: number) {
  if (Notification.permission !== 'granted') return;

  let title = '';
  let body = '';
  let icon = '/icon-192.png';

  if (daysInactive === 1) {
    title = '💙 Sentimos sua falta!';
    body = 'Que tal dedicar 5 minutinhos para Deus hoje?';
  } else if (daysInactive === 3) {
    title = '🕊️ Voltar é sempre possível';
    body = 'Sem culpa! Seu devocional está esperando por você.';
  } else if (daysInactive === 7) {
    title = '✨ Recomeçar faz bem';
    body = 'Uma semana sem você... que tal voltar hoje?';
  } else if (daysInactive >= 14) {
    title = '💫 Você é importante para nós!';
    body = 'Sua jornada espiritual importa. Volte quando estiver pronta.';
  }

  // Notificação local (funciona mesmo com app fechado em PWA)
  new Notification(title, {
    body,
    icon,
    badge: '/badge-icon.png',
    tag: 'reengagement',
    requireInteraction: false,
    silent: false,
  });
}

// ============================================================================
// 2. E-MAIL DE REENGAJAMENTO (Backend)
// ============================================================================

/**
 * Templates de e-mail por dias de inatividade
 * (Implementar no backend com Supabase Edge Functions + Resend/SendGrid)
 */
export const EMAIL_TEMPLATES = {
  day1: {
    subject: '💙 Sentimos sua falta, {{name}}',
    preview: 'Seu devocional de hoje está esperando...',
    cta: 'Fazer meu devocional',
    tone: 'leve e acolhedor',
  },
  day3: {
    subject: '🕊️ Voltar é sempre possível',
    preview: 'Sem culpa, sem pressão. Só carinho.',
    cta: 'Recomeçar hoje',
    tone: 'empático e sem pressão',
  },
  day7: {
    subject: '✨ Sua transformação importa',
    preview: 'Uma semana sem você... que tal voltar?',
    cta: 'Retomar minha jornada',
    tone: 'motivacional mas respeitoso',
  },
  day14: {
    subject: '💫 {{name}}, você é especial para nós',
    preview: 'Queremos te ajudar. Como podemos melhorar?',
    cta: 'Dar feedback / Voltar',
    tone: 'cuidadoso, pede feedback',
  },
  day30: {
    subject: '💝 Última mensagem: estamos aqui',
    preview: 'Respeitamos seu tempo. Volte quando sentir.',
    cta: 'Manter minha conta / Excluir',
    tone: 'respeitoso, oferece exclusão',
  },
};

// ============================================================================
// 3. DETECÇÃO DE INATIVIDADE (Client-Side)
// ============================================================================

/**
 * Calcula dias desde o último acesso
 */
export function getDaysSinceLastAccess(): number {
  const lastAccess = localStorage.getItem('last_access_date');
  if (!lastAccess) return 0;

  const lastDate = new Date(lastAccess);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Atualiza data do último acesso
 */
export function updateLastAccessDate() {
  localStorage.setItem('last_access_date', new Date().toISOString());
}

/**
 * Verifica se usuário está inativo e mostra mensagem personalizada
 */
export function checkInactivityStatus(): {
  isInactive: boolean;
  daysInactive: number;
  message: string | null;
} {
  const days = getDaysSinceLastAccess();

  if (days === 0) {
    return { isInactive: false, daysInactive: 0, message: null };
  }

  let message = null;

  if (days === 1) {
    message = 'Que bom ter você de volta! Vamos retomar? 💙';
  } else if (days >= 2 && days <= 6) {
    message = `Você ficou ${days} dias fora. Sem culpa! Que tal recomeçar hoje? 🕊️`;
  } else if (days >= 7 && days <= 13) {
    message = `${days} dias sem você... sentimos sua falta! Use o botão "Voltei Hoje" quando quiser ✨`;
  } else if (days >= 14) {
    message = `Você é especial para nós! ${days} dias é muito tempo. Vamos retomar sua jornada? 💫`;
  }

  return {
    isInactive: days >= 1,
    daysInactive: days,
    message,
  };
}

// ============================================================================
// 4. GAMIFICAÇÃO DE RETORNO
// ============================================================================

/**
 * Bonificações por voltar após inatividade
 */
export function getComebackReward(daysInactive: number): {
  title: string;
  description: string;
  reward: string;
} {
  if (daysInactive >= 14) {
    return {
      title: '🎁 Presente de Boas-Vindas!',
      description: 'Por voltar após 2 semanas, você ganhou:',
      reward: 'Acesso a 1 trilha premium gratuita por 7 dias',
    };
  } else if (daysInactive >= 7) {
    return {
      title: '✨ Bônus de Retorno!',
      description: 'Por recomeçar sua jornada, você ganhou:',
      reward: '3 devocionais premium desbloqueados',
    };
  } else if (daysInactive >= 3) {
    return {
      title: '💙 Que bom ter você de volta!',
      description: 'Pequeno presente por retornar:',
      reward: '1 devocional especial sobre recomeços',
    };
  }

  return {
    title: '☀️ Que bom ter você de volta!',
    description: 'Continue sua sequência!',
    reward: 'Motivação renovada',
  };
}

// ============================================================================
// 5. INTEGRAÇÃO COM SUPABASE (Backend - apenas exemplo)
// ============================================================================

/**
 * Função para executar no backend (Supabase Edge Function ou Cron Job)
 * 
 * Agenda:
 * - Todo dia às 9h da manhã, verificar usuários inativos
 * - Enviar e-mails/push conforme dias de inatividade
 * 
 * Pseudocódigo:
 * 
 * ```typescript
 * // supabase/functions/check-inactive-users/index.ts
 * 
 * export async function checkInactiveUsers() {
 *   const today = new Date();
 *   
 *   // Buscar usuários com último acesso há X dias
 *   const { data: inactiveUsers } = await supabase
 *     .from('user_progress')
 *     .select('user_id, last_devotional_date, user_email, user_name')
 *     .lt('last_devotional_date', daysBefore(today, 1));
 *   
 *   for (const user of inactiveUsers) {
 *     const daysInactive = calculateDays(user.last_devotional_date, today);
 *     
 *     // Enviar e-mail conforme template
 *     if ([1, 3, 7, 14, 30].includes(daysInactive)) {
 *       await sendReengagementEmail(user, daysInactive);
 *     }
 *     
 *     // Registrar tentativa de reengajamento
 *     await supabase.from('reengagement_log').insert({
 *       user_id: user.user_id,
 *       days_inactive: daysInactive,
 *       sent_at: today,
 *     });
 *   }
 * }
 * ```
 */

// ============================================================================
// 6. ESTRATÉGIA DE IMPLEMENTAÇÃO
// ============================================================================

/**
 * FASE 1 - MVP (Implementar agora - grátis)
 * ✅ Detecção de inatividade no client (localStorage)
 * ✅ Mensagem personalizada ao retornar
 * ✅ Notificações push locais (PWA)
 * ✅ Botão "Voltei Hoje" destacado
 * ✅ Gamificação de retorno (bônus visual)
 * 
 * FASE 2 - Crescimento (Implementar com primeiras vendas)
 * 📧 E-mails automáticos (Resend.com - gratuito até 3k/mês)
 * 📊 Dashboard de retenção (Supabase + Plausible)
 * 🔔 Push notifications via Firebase (grátis até 10M/mês)
 * 
 * FASE 3 - Escala (Implementar com > 1000 usuários)
 * 🤖 IA para personalizar mensagens (GPT-4)
 * 📱 SMS para usuários premium (Twilio)
 * 💬 WhatsApp Business API (mensagens automáticas)
 */

export const REENGAGEMENT_STRATEGY = {
  phase1: {
    name: 'MVP - Grátis',
    features: [
      'Detecção de inatividade (localStorage)',
      'Mensagem personalizada ao retornar',
      'Push notifications locais (PWA)',
      'Botão "Voltei Hoje" destacado',
      'Bônus visual por retorno',
    ],
    cost: 'R$ 0/mês',
    effort: '2-3 horas implementação',
  },
  phase2: {
    name: 'Crescimento',
    features: [
      'E-mails automáticos (5 templates)',
      'Dashboard de retenção',
      'Push via Firebase',
      'Segmentação por comportamento',
    ],
    cost: 'R$ 0-50/mês',
    effort: '1-2 semanas implementação',
  },
  phase3: {
    name: 'Escala',
    features: [
      'Personalização por IA',
      'SMS para premium',
      'WhatsApp automático',
      'A/B testing de mensagens',
    ],
    cost: 'R$ 200-500/mês',
    effort: '1 mês implementação',
  },
};

