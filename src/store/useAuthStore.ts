import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/lib/errors';

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

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
    // 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
    if (DEV_MODE) {
      const mockUser = {
        id: 'dev-user-123',
        email: email,
        user_metadata: {
          name: 'Usuário Teste',
          phone: '(11) 99999-9999'
        }
      };
      set({ user: mockUser });
      return {};
    }

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
    // 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
    if (DEV_MODE) {
      set({ user: null, loading: false });
      return;
    }

    try {
      const { data } = await supabase.auth.getSession();
      set({ user: data.session?.user || null, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
}));

