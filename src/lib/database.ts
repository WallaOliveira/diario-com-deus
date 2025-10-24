/**
 * Funções de Banco de Dados - Supabase
 * Conecta o frontend com todas as tabelas
 */

import { supabase } from './supabase';
// Sistema de conquistas removido

// ================================================
// TYPES
// ================================================

export interface Devotional {
  id: string;
  slug: string;
  title: string;
  theme: string;
  day_number: number | null;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  context: {
    title: string;
    text: string;
  };
  scripture: {
    reference: string;
    text: string;
  };
  living_word: {
    title: string;
    text: string;
  };
  action: {
    title: string;
    text: string;
  };
  prayer: {
    title: string;
    text: string;
  };
  estimated_time: number;
  tags: string[];
  keywords: string[];
  is_premium: boolean;
}

export interface UserProgress {
  id: string;
  user_id: string;
  devotional_id: string;
  completed_at: string;
  duration_minutes: number;
  personal_notes?: string;
  personal_prayer?: string;
  used_audio: boolean;
  completed_all_steps: boolean;
  device_type?: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  total_moments: number;
  total_minutes: number;
  spiritual_level: string;
  level_progress: number;
  streak_freezes_available: number;
  streak_freeze_used_at?: string;
  early_bird_count: number;
  night_owl_count: number;
  comeback_count: number;
  favorite_theme?: string;
  favorite_time?: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_key: string;
  achievement_type: string;
  title: string;
  description: string;
  icon: string;
  unlocked_at: string;
  is_new: boolean;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  devotional_id: string;
  favorite_type: 'verse' | 'reflection' | 'prayer';
  content: string;
  reference?: string;
  tags?: string[];
  notes?: string;
  created_at: string;
}

// ================================================
// DEVOTIONALS
// ================================================

/**
 * Buscar devocional por slug
 */
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Erro ao buscar devocional:', error);
    return null;
  }

  return data;
}

/**
 * Buscar devocional aleatório por tema
 */
export async function getRandomDevotionalByTheme(theme: string): Promise<Devotional | null> {
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .eq('theme', theme)
    .eq('is_active', true);

  if (error || !data || data.length === 0) {
    console.error('Erro ao buscar devocional:', error);
    return null;
  }

  // Retorna um aleatório
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

/**
 * Buscar devocional do dia (rotativo)
 */
export async function getDevotionalOfTheDay(): Promise<Devotional | null> {
  // Lógica: usa o dia do ano para rotacionar os devocionais
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .eq('is_active', true)
    .order('id');

  if (error || !data || data.length === 0) {
    console.error('Erro ao buscar devocional do dia:', error);
    return null;
  }

  const index = dayOfYear % data.length;
  return data[index];
}

/**
 * Buscar todos os devocionais de um tema
 */
export async function getDevotionalsByTheme(theme: string): Promise<Devotional[]> {
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .eq('theme', theme)
    .eq('is_active', true)
    .order('day_number');

  if (error) {
    console.error('Erro ao buscar devocionais:', error);
    return [];
  }

  return data || [];
}

/**
 * Buscar por keywords (busca)
 */
export async function searchDevotionals(query: string): Promise<Devotional[]> {
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .or(`title.ilike.%${query}%,keywords.cs.{${query}}`)
    .eq('is_active', true)
    .limit(20);

  if (error) {
    console.error('Erro na busca:', error);
    return [];
  }

  return data || [];
}

// ================================================
// USER PROGRESS
// ================================================

/**
 * Salvar progresso de devocional completado
 */
export async function saveDevotionalProgress(data: {
  userId: string;
  devotionalId: string;
  durationMinutes: number;
  personalNotes?: string;
  personalPrayer?: string;
  usedAudio: boolean;
  completedAllSteps: boolean;
}): Promise<{ success: boolean; progressId?: string; error?: string }> {
  const { data: progress, error } = await supabase
    .from('user_progress')
    .insert({
      user_id: data.userId,
      devotional_id: data.devotionalId,
      duration_minutes: data.durationMinutes,
      personal_notes: data.personalNotes,
      personal_prayer: data.personalPrayer,
      used_audio: data.usedAudio,
      completed_all_steps: data.completedAllSteps,
      device_type: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar progresso:', error);
    return { success: false, error: error.message };
  }

  // Atualizar stats do usuário
  await updateUserStats(data.userId);

  return { success: true, progressId: progress.id };
}

/**
 * Buscar histórico de devocionais do usuário
 */
export async function getUserDevotionalHistory(
  userId: string,
  limit = 50
): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }

  return data || [];
}

/**
 * Verificar se usuário já fez devocional hoje
 */
export async function userCompletedToday(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { data, error } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', userId)
    .gte('completed_at', `${today}T00:00:00`)
    .lte('completed_at', `${today}T23:59:59`)
    .limit(1);

  if (error) {
    console.error('Erro ao verificar devocional de hoje:', error);
    return false;
  }

  return (data?.length || 0) > 0;
}

// ================================================
// USER STATS
// ================================================

/**
 * Buscar ou criar stats do usuário
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = not found (ok criar novo)
    console.error('Erro ao buscar stats:', error);
    return null;
  }

  if (!data) {
    // Criar novo stats
    const { data: newStats, error: createError } = await supabase
      .from('user_stats')
      .insert({
        user_id: userId,
        current_streak: 0,
        longest_streak: 0,
        total_moments: 0,
        total_minutes: 0,
        spiritual_level: 'semente',
        level_progress: 0,
        streak_freezes_available: 1,
      })
      .select()
      .single();

    if (createError) {
      console.error('Erro ao criar stats:', createError);
      return null;
    }

    return newStats;
  }

  return data;
}

/**
 * Atualizar stats do usuário (após completar devocional)
 */
export async function updateUserStats(userId: string): Promise<void> {
  // 1. Buscar stats atuais
  const stats = await getUserStats(userId);
  if (!stats) return;

  // 2. Buscar último progresso
  const { data: lastProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(1)
    .single();

  if (!lastProgress) return;

  // 3. Calcular nova streak
  const today = new Date().toISOString().split('T')[0];
  const lastDate = stats.last_activity_date || '';
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  let newStreak = stats.current_streak;
  let comebackCount = stats.comeback_count;

  if (lastDate === yesterday) {
    // Continuou a sequência
    newStreak = stats.current_streak + 1;
  } else if (lastDate === today) {
    // Já fez hoje (não mudar streak)
    newStreak = stats.current_streak;
  } else {
    // Quebrou a sequência
    if (stats.current_streak > 0) {
      comebackCount = stats.comeback_count + 1; // Registra comeback
    }
    newStreak = 1; // Começa nova sequência
  }

  // 4. Calcular early bird / night owl
  const hour = new Date(lastProgress.completed_at).getHours();
  const earlyBirdCount = hour < 7 ? stats.early_bird_count + 1 : stats.early_bird_count;
  const nightOwlCount = hour >= 22 ? stats.night_owl_count + 1 : stats.night_owl_count;

  // 5. Calcular novo nível
  const totalMoments = stats.total_moments + 10; // +10 por devocional
  const level = calculateSpiritualLevel(totalMoments);
  const levelProgress = calculateLevelProgress(totalMoments);

  // 6. Atualizar no banco
  const { error } = await supabase
    .from('user_stats')
    .update({
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, stats.longest_streak),
      last_activity_date: today,
      total_moments: totalMoments,
      total_minutes: stats.total_minutes + (lastProgress.duration_minutes || 0),
      spiritual_level: level.key,
      level_progress: levelProgress,
      early_bird_count: earlyBirdCount,
      night_owl_count: nightOwlCount,
      comeback_count: comebackCount,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao atualizar stats:', error);
  }

  // 7. Verificar novas conquistas
  await checkAndUnlockAchievements(userId);
}

// ================================================
// ACHIEVEMENTS
// ================================================

/**
 * Verificar e desbloquear novas conquistas
 */
export async function checkAndUnlockAchievements(userId: string): Promise<void> {
  const stats = await getUserStats(userId);
  if (!stats) return;

  // Buscar conquistas já desbloqueadas
  const { data: unlocked } = await supabase
    .from('user_achievements')
    .select('achievement_key')
    .eq('user_id', userId);

  const unlockedKeys = unlocked?.map(a => a.achievement_key) || [];

  // Buscar histórico para calcular estatísticas adicionais
  const history = await getUserDevotionalHistory(userId, 1000);
  
  const themeCompletions: Record<string, number> = {};
  let audioUsedCount = 0;
  let notesCount = 0;
  let prayersCount = 0;

  history.forEach(p => {
    // Contar temas (precisaria join com devotionals, simplificado aqui)
    if (p.used_audio) audioUsedCount++;
    if (p.personal_notes) notesCount++;
    if (p.personal_prayer) prayersCount++;
  });

  // Buscar favoritos
  const { data: favorites } = await supabase
    .from('user_favorites')
    .select('id')
    .eq('user_id', userId);

  // Verificar novas conquistas
  const newAchievements = checkNewAchievements(
    {
      totalMoments: stats.total_moments,
      currentStreak: stats.current_streak,
      longestStreak: stats.longest_streak,
      earlyBirdCount: stats.early_bird_count,
      nightOwlCount: stats.night_owl_count,
      comebackCount: stats.comeback_count,
      themeCompletions,
      audioUsedCount,
      notesCount,
      prayersCount,
      favoritesCount: favorites?.length || 0,
      trailsStarted: 0, // TODO: implementar trilhas
      trailsCompleted: 0,
    },
    unlockedKeys
  );

  // Salvar novas conquistas
  for (const achievement of newAchievements) {
    await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_key: achievement.key,
        achievement_type: achievement.type,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
      });
  }
}

/**
 * Buscar conquistas do usuário
 */
export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar conquistas:', error);
    return [];
  }

  return data || [];
}

/**
 * Marcar conquistas como "vistas" (não são mais "novas")
 */
export async function markAchievementsAsSeen(userId: string, achievementIds: string[]): Promise<void> {
  const { error } = await supabase
    .from('user_achievements')
    .update({ is_new: false })
    .eq('user_id', userId)
    .in('id', achievementIds);

  if (error) {
    console.error('Erro ao marcar conquistas como vistas:', error);
  }
}

// ================================================
// FAVORITES
// ================================================

/**
 * Adicionar favorito
 */
export async function addFavorite(data: {
  userId: string;
  devotionalId: string;
  type: 'verse' | 'reflection' | 'prayer';
  content: string;
  reference?: string;
  notes?: string;
}): Promise<{ success: boolean; favoriteId?: string; error?: string }> {
  const { data: favorite, error } = await supabase
    .from('user_favorites')
    .insert({
      user_id: data.userId,
      devotional_id: data.devotionalId,
      favorite_type: data.type,
      content: data.content,
      reference: data.reference,
      notes: data.notes,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar favorito:', error);
    return { success: false, error: error.message };
  }

  return { success: true, favoriteId: favorite.id };
}

/**
 * Remover favorito
 */
export async function removeFavorite(favoriteId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('user_favorites')
    .delete()
    .eq('id', favoriteId);

  if (error) {
    console.error('Erro ao remover favorito:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Buscar favoritos do usuário
 */
export async function getUserFavorites(userId: string): Promise<UserFavorite[]> {
  const { data, error } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }

  return data || [];
}

// ================================================
// STREAK MANAGEMENT
// ================================================

/**
 * Usar "Graça Divina" (Streak Freeze)
 */
export async function useStreakFreeze(userId: string): Promise<{ success: boolean; error?: string }> {
  const stats = await getUserStats(userId);
  if (!stats) return { success: false, error: 'Stats não encontrados' };

  if (stats.streak_freezes_available <= 0) {
    return { success: false, error: 'Sem graças disponíveis' };
  }

  const today = new Date().toISOString().split('T')[0];

  const { error } = await supabase
    .from('user_stats')
    .update({
      streak_freezes_available: stats.streak_freezes_available - 1,
      streak_freeze_used_at: today,
      last_activity_date: today, // Mantém a sequência
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao usar streak freeze:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Recuperar sequência perdida (custo: 50 momentos)
 */
export async function recoverLostStreak(userId: string): Promise<{ success: boolean; error?: string }> {
  const stats = await getUserStats(userId);
  if (!stats) return { success: false, error: 'Stats não encontrados' };

  if (stats.total_moments < 50) {
    return { success: false, error: 'Momentos insuficientes (precisa 50)' };
  }

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { error } = await supabase
    .from('user_stats')
    .update({
      total_moments: stats.total_moments - 50,
      last_activity_date: yesterday, // Reseta para ontem
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao recuperar streak:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

