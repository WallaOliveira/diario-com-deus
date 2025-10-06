import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanType = 'free' | 'trial' | 'monthly' | 'annual';

interface SubscriptionState {
  plan: PlanType;
  trialEndsAt: string | null;
  monthlyDevotionalCount: number;
  subscriptionEndsAt: string | null;
  
  // Actions
  startTrial: () => void;
  upgradeToPlan: (plan: 'monthly' | 'annual') => void;
  incrementDevotionalCount: () => void;
  resetMonthlyCount: () => void;
  canAccessContent: () => boolean;
  daysLeftInTrial: () => number;
  isTrialActive: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      plan: 'free',
      trialEndsAt: null,
      monthlyDevotionalCount: 0,
      subscriptionEndsAt: null,

      startTrial: () => {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 7);
        
        set({
          plan: 'trial',
          trialEndsAt: trialEnd.toISOString(),
        });
      },

      upgradeToPlan: (plan: 'monthly' | 'annual') => {
        const subscriptionEnd = new Date();
        
        if (plan === 'monthly') {
          subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
        } else {
          subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
        }

        set({
          plan,
          subscriptionEndsAt: subscriptionEnd.toISOString(),
          trialEndsAt: null,
        });
      },

      incrementDevotionalCount: () => {
        set((state) => ({
          monthlyDevotionalCount: state.monthlyDevotionalCount + 1,
        }));
      },

      resetMonthlyCount: () => {
        set({ monthlyDevotionalCount: 0 });
      },

      canAccessContent: () => {
        const state = get();
        
        // Trial ou pagos = acesso total
        if (state.plan === 'trial' || state.plan === 'monthly' || state.plan === 'annual') {
          return true;
        }

        // Gratuito: máximo 5 devocionais/mês
        return state.monthlyDevotionalCount < 5;
      },

      daysLeftInTrial: () => {
        const state = get();
        if (!state.trialEndsAt) return 0;

        const now = new Date();
        const end = new Date(state.trialEndsAt);
        const diff = end.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        return days > 0 ? days : 0;
      },

      isTrialActive: () => {
        const state = get();
        if (state.plan !== 'trial' || !state.trialEndsAt) return false;

        const now = new Date();
        const end = new Date(state.trialEndsAt);
        return now < end;
      },
    }),
    {
      name: 'subscription-storage',
    }
  )
);

