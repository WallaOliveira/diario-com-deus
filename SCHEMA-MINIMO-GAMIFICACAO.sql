-- ================================================
-- SCHEMA MÍNIMO PARA GAMIFICAÇÃO FUNCIONAR
-- ================================================
-- Execute este SQL no Supabase Dashboard
-- ================================================

-- 1. TABELA: user_stats (estatísticas do usuário)
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Sequência (Streak - Duolingo style)
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  
  -- "Pontos" (chamamos de "Momentos com Deus")
  total_moments INTEGER DEFAULT 0,
  total_minutes INTEGER DEFAULT 0,
  
  -- Nível espiritual (progression)
  spiritual_level TEXT DEFAULT 'iniciante',
  level_progress INTEGER DEFAULT 0,
  
  -- Recuperação de sequência (Streak Freeze)
  streak_freezes_available INTEGER DEFAULT 1,
  streak_freeze_used_at DATE,
  
  -- Conquistas especiais
  early_bird_count INTEGER DEFAULT 0,
  night_owl_count INTEGER DEFAULT 0,
  comeback_count INTEGER DEFAULT 0,
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA: user_achievements (conquistas desbloqueadas)
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Identificação da conquista
  achievement_key TEXT NOT NULL,
  achievement_type TEXT NOT NULL,
  
  -- Informações visuais
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  
  -- Conteúdo educativo
  spiritual_benefit TEXT,
  bible_verse TEXT,
  educational_text TEXT,
  
  -- Desbloqueio
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_new BOOLEAN DEFAULT true,
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint: cada conquista uma vez por usuário
  UNIQUE(user_id, achievement_key)
);

-- 3. TABELA: user_favorites (favoritos)
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id UUID,
  
  -- Tipo do favorito
  favorite_type TEXT NOT NULL,
  
  -- Conteúdo salvo
  content TEXT NOT NULL,
  reference TEXT,
  
  -- Organização
  tags TEXT[],
  notes TEXT,
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA: user_progress (progresso dos devocionais)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id UUID,
  
  -- Informações da sessão
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_minutes INTEGER,
  
  -- Conteúdo gerado pelo usuário
  personal_notes TEXT,
  personal_prayer TEXT,
  
  -- Engajamento
  used_audio BOOLEAN DEFAULT false,
  completed_all_steps BOOLEAN DEFAULT true,
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA: devotionals (conteúdo dos devocionais)
CREATE TABLE IF NOT EXISTS public.devotionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  
  -- Categorização
  theme TEXT NOT NULL,
  day_number INTEGER,
  difficulty TEXT DEFAULT 'iniciante',
  
  -- Conteúdo (estrutura dos 5 passos)
  context JSONB NOT NULL,
  scripture JSONB NOT NULL,
  living_word JSONB NOT NULL,
  action JSONB NOT NULL,
  prayer JSONB NOT NULL,
  
  -- Metadados
  estimated_time INTEGER DEFAULT 7,
  tags TEXT[],
  keywords TEXT[],
  
  -- Controle
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- ÍNDICES PARA PERFORMANCE
-- ================================================

CREATE INDEX IF NOT EXISTS idx_user_stats_user ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_devotionals_theme ON public.devotionals(theme);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Ativar RLS nas tabelas
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policies para user_stats
CREATE POLICY "Usuários podem ver suas próprias stats"
  ON public.user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias stats"
  ON public.user_stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias stats"
  ON public.user_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies para user_achievements
CREATE POLICY "Usuários podem ver suas próprias conquistas"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias conquistas"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies para user_favorites
CREATE POLICY "Usuários podem ver seus próprios favoritos"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios favoritos"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios favoritos"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios favoritos"
  ON public.user_favorites FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies para user_progress
CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Devotionals são públicos (todos podem ler)
CREATE POLICY "Devocionais são públicos"
  ON public.devotionals FOR SELECT
  TO authenticated
  USING (is_active = true);

-- ================================================
-- FUNÇÃO PARA ATUALIZAR updated_at
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_user_stats_updated_at 
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_favorites_updated_at 
  BEFORE UPDATE ON public.user_favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devotionals_updated_at 
  BEFORE UPDATE ON public.devotionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- COMENTÁRIOS
-- ================================================

COMMENT ON TABLE public.user_stats IS 'Estatísticas, sequência (streak) e níveis espirituais (Iniciante → Crescendo → Maduro → Sábio → Guia)';
COMMENT ON TABLE public.user_achievements IS 'Conquistas desbloqueadas (estilo Duolingo)';
COMMENT ON TABLE public.user_favorites IS 'Versículos e reflexões salvos como favoritos';
COMMENT ON TABLE public.user_progress IS 'Histórico de devocionais completados pelos usuários';
COMMENT ON TABLE public.devotionals IS 'Conteúdo dos devocionais (contexto, leitura, reflexão, ação, oração)';

-- ================================================
-- FIM DO SCHEMA MÍNIMO
-- ================================================

