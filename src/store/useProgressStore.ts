import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface ProgressState {
  completedToday: boolean;
  streak: number;
  weekProgress: number[];
  loading: boolean;
  fetchProgress: (userId: string) => Promise<void>;
  markComplete: (userId: string, devotionalId: string, notes?: string) => Promise<void>;
  showStreak: boolean;
  toggleStreak: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedToday: false,
  streak: 0,
  weekProgress: [0, 0, 0, 0, 0, 0, 0],
  loading: true,
  showStreak: true,

  fetchProgress: async (userId: string) => {
    try {
      // Buscar progresso dos últimos 7 dias
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .gte('completed_at', weekAgo.toISOString())
        .order('completed_at', { ascending: false });

      if (error) throw error;

      // Calcular streak
      let streak = 0;
      const sortedData = data || [];
      const today_start = new Date(today.setHours(0, 0, 0, 0));
      
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today_start.getTime() - i * 24 * 60 * 60 * 1000);
        const hasProgress = sortedData.some(p => {
          const pDate = new Date(p.completed_at);
          return pDate.toDateString() === checkDate.toDateString();
        });
        
        if (hasProgress) {
          streak++;
        } else if (i > 0) {
          break;
        }
      }

      // Verificar se completou hoje
      const completedToday = sortedData.some(p => {
        const pDate = new Date(p.completed_at);
        return pDate.toDateString() === new Date().toDateString();
      });

      set({ streak, completedToday, loading: false });
    } catch (error) {
      console.error('Error fetching progress:', error);
      set({ loading: false });
    }
  },

  markComplete: async (userId: string, devotionalId: string, notes?: string) => {
    try {
      const { error } = await supabase.from('user_progress').insert({
        user_id: userId,
        devotional_id: devotionalId,
        completed_at: new Date().toISOString(),
        notes,
        action_completed: true,
      });

      if (error) throw error;

      // Atualizar estado local
      await get().fetchProgress(userId);
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  },

  toggleStreak: () => set((state) => ({ showStreak: !state.showStreak })),
}));

