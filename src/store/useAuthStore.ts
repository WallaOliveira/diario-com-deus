import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/lib/errors';

interface AuthState {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: getErrorMessage(error.message) };

      set({ user: data.user });
      return {};
    } catch (error: any) {
      return { error: getErrorMessage(error) };
    }
  },

  signUp: async (email: string, password: string, name: string, phone?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone: phone || '',
          },
        },
      });

      if (error) return { error: getErrorMessage(error.message) };

      set({ user: data.user });
      return {};
    } catch (error: any) {
      return { error: getErrorMessage(error) };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  checkUser: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      set({ user: data.session?.user || null, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
}));

