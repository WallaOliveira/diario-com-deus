import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

