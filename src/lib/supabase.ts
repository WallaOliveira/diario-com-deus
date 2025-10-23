import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Configuração com persistência automática de sessão
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Mantém sessão persistente no localStorage
    autoRefreshToken: true, // Atualiza token automaticamente antes de expirar
    detectSessionInUrl: true, // Detecta sessão na URL (para magic links)
    storageKey: 'diario-com-deus-auth', // Chave customizada no localStorage
  }
});

// Types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  devotional_id: string;
  completed_at: string;
  notes?: string;
  action_completed: boolean;
}

export interface Devotional {
  id: string;
  title: string;
  theme: string;
  context: string;
  scripture_ref: string;
  scripture_text: string;
  palavra_viva: string;
  action: string;
  prayer: string;
  order: number;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  devotionals: Devotional[];
}

