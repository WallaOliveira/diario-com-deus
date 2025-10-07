-- ================================================
-- DIÁRIO COM DEUS - DATABASE SCHEMA
-- ================================================
-- Supabase PostgreSQL Schema
-- Data: Outubro 2025
-- ================================================

-- ================================================
-- 1. TABELA: devotionals
-- Armazena todos os devocionais do app
-- ================================================

CREATE TABLE IF NOT EXISTS public.devotionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação
  slug TEXT UNIQUE NOT NULL, -- Ex: "ansiedade-dia-1"
  title TEXT NOT NULL, -- Ex: "Quando o amanhã te assusta"
  
  -- Categorização
  theme TEXT NOT NULL, -- Ex: "ansiedade", "gratidao", "perdao"
  day_number INTEGER, -- 1-7 (para trilhas de 7 dias)
  difficulty TEXT DEFAULT 'iniciante', -- iniciante, intermediario, avancado
  
  -- Conteúdo (estrutura dos 5 passos)
  context JSONB NOT NULL, -- { title, text }
  scripture JSONB NOT NULL, -- { reference, text }
  living_word JSONB NOT NULL, -- { title, text }
  action JSONB NOT NULL, -- { title, text }
  prayer JSONB NOT NULL, -- { title, text }
  
  -- Metadados
  estimated_time INTEGER DEFAULT 7, -- minutos
  tags TEXT[], -- ["mãe", "trabalho", "ansiedade"]
  keywords TEXT[], -- para busca: ["medo", "preocupação"]
  
  -- Controle
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_devotionals_theme ON public.devotionals(theme);
CREATE INDEX IF NOT EXISTS idx_devotionals_slug ON public.devotionals(slug);
CREATE INDEX IF NOT EXISTS idx_devotionals_day ON public.devotionals(day_number);
CREATE INDEX IF NOT EXISTS idx_devotionals_tags ON public.devotionals USING GIN(tags);


-- ================================================
-- 2. TABELA: user_progress
-- Histórico de devocionais completados
-- ================================================

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id UUID REFERENCES public.devotionals(id) ON DELETE SET NULL,
  
  -- Informações da sessão
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_minutes INTEGER, -- tempo real que levou
  
  -- Conteúdo gerado pelo usuário
  personal_notes TEXT, -- anotações pessoais
  personal_prayer TEXT, -- oração personalizada
  
  -- Engajamento
  used_audio BOOLEAN DEFAULT false,
  completed_all_steps BOOLEAN DEFAULT true,
  
  -- Metadados
  device_type TEXT, -- mobile, desktop, tablet
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_date ON public.user_progress(completed_at);
CREATE INDEX IF NOT EXISTS idx_user_progress_devotional ON public.user_progress(devotional_id);

-- Constraint: um devocional por dia por usuário
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_progress_unique_daily 
ON public.user_progress(user_id, devotional_id, DATE(completed_at));


-- ================================================
-- 3. TABELA: user_stats
-- Estatísticas e "pontos" do usuário (gamificação)
-- ================================================

CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Sequência (Streak - Duolingo style)
  current_streak INTEGER DEFAULT 0, -- dias seguidos
  longest_streak INTEGER DEFAULT 0, -- recorde pessoal
  last_activity_date DATE, -- para calcular streak
  
  -- "Pontos" (chamamos de "Momentos com Deus")
  total_moments INTEGER DEFAULT 0, -- total de devocionais completos
  total_minutes INTEGER DEFAULT 0, -- tempo total de oração/devocional
  
  -- Nível espiritual (progression)
  spiritual_level TEXT DEFAULT 'semente', -- semente, broto, arvore, bosque, floresta
  level_progress INTEGER DEFAULT 0, -- 0-100% até próximo nível
  
  -- Recuperação de sequência (Streak Freeze - Duolingo)
  streak_freezes_available INTEGER DEFAULT 1, -- quantas "graças" tem
  streak_freeze_used_at DATE, -- quando usou última vez
  
  -- Conquistas especiais
  early_bird_count INTEGER DEFAULT 0, -- devocionais antes das 7h
  night_owl_count INTEGER DEFAULT 0, -- devocionais depois das 22h
  comeback_count INTEGER DEFAULT 0, -- vezes que voltou após pausa
  
  -- Preferências descobertas
  favorite_theme TEXT, -- tema mais feito
  favorite_time TEXT, -- horário preferido
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_stats_user ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_streak ON public.user_stats(current_streak DESC);


-- ================================================
-- 4. TABELA: user_achievements
-- Conquistas desbloqueadas (badges/achievements)
-- ================================================

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Identificação da conquista
  achievement_key TEXT NOT NULL, -- Ex: "first_devotional", "7_day_streak"
  achievement_type TEXT NOT NULL, -- milestone, streak, theme, special
  
  -- Informações visuais
  title TEXT NOT NULL, -- "Primeiro Passo"
  description TEXT NOT NULL, -- "Você completou seu primeiro devocional!"
  icon TEXT NOT NULL, -- emoji ou nome do ícone
  
  -- Desbloqueio
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_new BOOLEAN DEFAULT true, -- para mostrar badge "novo"
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint: cada conquista uma vez por usuário
  UNIQUE(user_id, achievement_key)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_key ON public.user_achievements(achievement_key);
CREATE INDEX IF NOT EXISTS idx_user_achievements_new ON public.user_achievements(is_new) WHERE is_new = true;


-- ================================================
-- 5. TABELA: user_favorites
-- Versículos e reflexões favoritos
-- ================================================

CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id UUID REFERENCES public.devotionals(id) ON DELETE CASCADE,
  
  -- Tipo do favorito
  favorite_type TEXT NOT NULL, -- verse, reflection, prayer
  
  -- Conteúdo salvo
  content TEXT NOT NULL,
  reference TEXT, -- Ex: "João 3:16" (para versículos)
  
  -- Organização
  tags TEXT[], -- tags personalizadas do usuário
  notes TEXT, -- notas pessoais sobre o favorito
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_type ON public.user_favorites(favorite_type);
CREATE INDEX IF NOT EXISTS idx_user_favorites_devotional ON public.user_favorites(devotional_id);


-- ================================================
-- 6. TABELA: trails (Trilhas devocionais)
-- Jornadas guiadas de 7, 14 ou 30 dias
-- ================================================

CREATE TABLE IF NOT EXISTS public.trails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificação
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL, -- "7 Dias de Recomeço"
  subtitle TEXT, -- "Sem culpa, só acolhimento"
  
  -- Descrição
  description TEXT NOT NULL,
  what_you_will_learn TEXT[], -- array de benefícios
  
  -- Configuração
  duration_days INTEGER NOT NULL, -- 7, 14, 30
  theme TEXT NOT NULL,
  difficulty TEXT DEFAULT 'iniciante',
  
  -- Visual
  icon TEXT DEFAULT '📖',
  color TEXT DEFAULT '#3b82f6',
  cover_image_url TEXT,
  
  -- Conteúdo
  devotional_ids UUID[] NOT NULL, -- array ordenado de devotional IDs
  
  -- Controle
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_trails_slug ON public.trails(slug);
CREATE INDEX IF NOT EXISTS idx_trails_duration ON public.trails(duration_days);


-- ================================================
-- 7. TABELA: user_trail_progress
-- Progresso do usuário em trilhas
-- ================================================

CREATE TABLE IF NOT EXISTS public.user_trail_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trail_id UUID REFERENCES public.trails(id) ON DELETE CASCADE NOT NULL,
  
  -- Progresso
  current_day INTEGER DEFAULT 1, -- dia atual na trilha
  completed_days INTEGER[] DEFAULT '{}', -- array de dias completados
  is_completed BOOLEAN DEFAULT false,
  
  -- Datas
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE,
  
  -- Controle
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint: uma trilha ativa por vez por usuário
  UNIQUE(user_id, trail_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_trail_progress_user ON public.user_trail_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trail_progress_trail ON public.user_trail_progress(trail_id);


-- ================================================
-- FUNCTIONS: Funções auxiliares
-- ================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_devotionals_updated_at BEFORE UPDATE ON public.devotionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_favorites_updated_at BEFORE UPDATE ON public.user_favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trails_updated_at BEFORE UPDATE ON public.trails
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_trail_progress_updated_at BEFORE UPDATE ON public.user_trail_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- Usuários só veem seus próprios dados
-- ================================================

-- Ativar RLS nas tabelas
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trail_progress ENABLE ROW LEVEL SECURITY;

-- Policies para user_progress
CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

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

-- Policies para user_trail_progress
CREATE POLICY "Usuários podem ver seu próprio progresso em trilhas"
  ON public.user_trail_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso em trilhas"
  ON public.user_trail_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso em trilhas"
  ON public.user_trail_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Devotionals e Trails são públicos (todos podem ler)
CREATE POLICY "Devocionais são públicos"
  ON public.devotionals FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Trilhas são públicas"
  ON public.trails FOR SELECT
  TO authenticated
  USING (is_active = true);


-- ================================================
-- VIEWS: Visualizações úteis
-- ================================================

-- View: Progresso diário agregado
CREATE OR REPLACE VIEW public.daily_stats AS
SELECT 
  user_id,
  DATE(completed_at) as date,
  COUNT(*) as devotionals_completed,
  SUM(duration_minutes) as total_minutes,
  BOOL_OR(used_audio) as used_audio_at_least_once
FROM public.user_progress
GROUP BY user_id, DATE(completed_at);

-- View: Top temas por usuário
CREATE OR REPLACE VIEW public.user_favorite_themes AS
SELECT 
  up.user_id,
  d.theme,
  COUNT(*) as times_completed,
  RANK() OVER (PARTITION BY up.user_id ORDER BY COUNT(*) DESC) as rank
FROM public.user_progress up
JOIN public.devotionals d ON up.devotional_id = d.id
GROUP BY up.user_id, d.theme;


-- ================================================
-- COMENTÁRIOS: Documentação das tabelas
-- ================================================

COMMENT ON TABLE public.devotionals IS 'Conteúdo dos devocionais (contexto, leitura, reflexão, ação, oração)';
COMMENT ON TABLE public.user_progress IS 'Histórico de devocionais completados pelos usuários';
COMMENT ON TABLE public.user_stats IS 'Estatísticas, sequência (streak) e nível espiritual do usuário';
COMMENT ON TABLE public.user_achievements IS 'Conquistas desbloqueadas (estilo Duolingo)';
COMMENT ON TABLE public.user_favorites IS 'Versículos e reflexões salvos como favoritos';
COMMENT ON TABLE public.trails IS 'Trilhas devocionais (jornadas de 7, 14 ou 30 dias)';
COMMENT ON TABLE public.user_trail_progress IS 'Progresso do usuário em trilhas específicas';

-- ================================================
-- FIM DO SCHEMA
-- ================================================

