/**
 * Store Zustand - Stats e Gamificação
 * Gerencia stats do usuário, conquistas e progresso
 */

import { create } from 'zustand';
import { getUserStats, getUserAchievements, checkAndUnlockAchievements, markAchievementsAsSeen } from '@/lib/database';
import type { UserStats, UserAchievement } from '@/lib/database';

interface StatsState {
  // Estado
  stats: UserStats | null;
  achievements: UserAchievement[];
  newAchievements: UserAchievement[];
  loading: boolean;
  error: string | null;

  // Ações
  loadStats: (userId: string) => Promise<void>;
  loadAchievements: (userId: string) => Promise<void>;
  checkNewAchievements: (userId: string) => Promise<void>;
  clearNewAchievements: (userId: string) => Promise<void>;
  refreshAll: (userId: string) => Promise<void>;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  achievements: [],
  newAchievements: [],
  loading: false,
  error: null,

  /**
   * Carregar stats do usuário
   */
  loadStats: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const stats = await getUserStats(userId);
      set({ stats, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Carregar conquistas do usuário
   */
  loadAchievements: async (userId: string) => {
    try {
      const achievements = await getUserAchievements(userId);
      
      // Separar novas conquistas
      const newAchievements = achievements.filter(a => a.is_new);
      
      set({ achievements, newAchievements });
    } catch (error: any) {
      console.error('Erro ao carregar conquistas:', error);
    }
  },

  /**
   * Verificar se há novas conquistas
   */
  checkNewAchievements: async (userId: string) => {
    try {
      await checkAndUnlockAchievements(userId);
      
      // Recarregar conquistas
      await get().loadAchievements(userId);
    } catch (error: any) {
      console.error('Erro ao verificar conquistas:', error);
    }
  },

  /**
   * Limpar lista de novas conquistas (após mostrar modal)
   */
  clearNewAchievements: async (userId: string) => {
    const { newAchievements } = get();
    
    // Marcar como "vistas" no banco
    if (newAchievements.length > 0) {
      const achievementIds = newAchievements.map(a => a.id);
      await markAchievementsAsSeen(userId, achievementIds);
      
      // Recarregar conquistas para atualizar is_new
      await get().loadAchievements(userId);
    }
    
    set({ newAchievements: [] });
  },

  /**
   * Atualizar tudo (stats + conquistas)
   */
  refreshAll: async (userId: string) => {
    await Promise.all([
      get().loadStats(userId),
      get().loadAchievements(userId),
    ]);
  },
}));

