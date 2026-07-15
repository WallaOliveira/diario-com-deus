-- ================================================
-- DIÁRIO COM DEUS — SETUP CORRIGIDO E CONSISTENTE
-- ================================================
-- Sistema híbrido: conteúdo no JSON local, IDs (texto) no banco.
-- Corrige a inconsistência UUID vs TEXT que quebrava o app.
-- Rode este arquivo inteiro no Supabase (ou via psql).
-- ================================================

-- Limpa tabelas do app (recomeço limpo). Não mexe em auth.users.
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.user_favorites CASCADE;
DROP TABLE IF EXISTS public.user_achievements CASCADE;
DROP TABLE IF EXISTS public.user_stats CASCADE;
DROP TABLE IF EXISTS public.devotionals CASCADE;

-- ================================================
-- 1. devotionals — IDs mínimos (conteúdo fica no JSON local)
-- ID em TEXTO para casar com o seed ('ansiedade-1', 'trilha-...-dia-1')
-- ================================================
CREATE TABLE public.devotionals (
  id            TEXT PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  theme         TEXT NOT NULL,
  day_number    INTEGER,
  difficulty    TEXT DEFAULT 'iniciante',
  -- Conteúdo (opcional — normalmente vem do JSON local)
  context       JSONB,
  scripture     JSONB,
  living_word   JSONB,
  action        JSONB,
  prayer        JSONB,
  estimated_time INTEGER DEFAULT 7,
  tags          TEXT[],
  keywords      TEXT[],
  is_premium    BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_devotionals_theme ON public.devotionals(theme);
CREATE INDEX idx_devotionals_slug ON public.devotionals(slug);

-- ================================================
-- 2. user_progress — histórico de devocionais completados
-- devotional_id em TEXTO com FK para devotionals (habilita os JOINs)
-- ================================================
CREATE TABLE public.user_progress (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id      TEXT REFERENCES public.devotionals(id) ON DELETE SET NULL,
  completed_at       TIMESTAMPTZ DEFAULT NOW(),
  duration_minutes   INTEGER,
  personal_notes     TEXT,
  personal_prayer    TEXT,
  used_audio         BOOLEAN DEFAULT false,
  completed_all_steps BOOLEAN DEFAULT true,
  device_type        TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_date ON public.user_progress(completed_at);
CREATE INDEX idx_user_progress_devotional ON public.user_progress(devotional_id);

-- ================================================
-- 3. user_stats — gamificação (streak, momentos, nível)
-- ================================================
CREATE TABLE public.user_stats (
  id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                  UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  current_streak           INTEGER DEFAULT 0,
  longest_streak           INTEGER DEFAULT 0,
  last_activity_date       DATE,
  total_moments            INTEGER DEFAULT 0,
  total_minutes            INTEGER DEFAULT 0,
  spiritual_level          TEXT DEFAULT 'semente',
  level_progress           INTEGER DEFAULT 0,
  streak_freezes_available INTEGER DEFAULT 1,
  streak_freeze_used_at    DATE,
  early_bird_count         INTEGER DEFAULT 0,
  night_owl_count          INTEGER DEFAULT 0,
  comeback_count           INTEGER DEFAULT 0,
  favorite_theme           TEXT,
  favorite_time            TEXT,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_user_stats_user ON public.user_stats(user_id);

-- ================================================
-- 4. user_achievements — conquistas (Duolingo style)
-- ================================================
CREATE TABLE public.user_achievements (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_key  TEXT NOT NULL,
  achievement_type TEXT NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  icon             TEXT NOT NULL,
  spiritual_benefit TEXT,
  bible_verse      TEXT,
  educational_text TEXT,
  unlocked_at      TIMESTAMPTZ DEFAULT NOW(),
  is_new           BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_key)
);
CREATE INDEX idx_user_achievements_user ON public.user_achievements(user_id);

-- ================================================
-- 5. user_favorites — versículos/reflexões salvos
-- devotional_id em TEXTO com FK para devotionals
-- ================================================
CREATE TABLE public.user_favorites (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  devotional_id TEXT REFERENCES public.devotionals(id) ON DELETE CASCADE,
  favorite_type TEXT NOT NULL,
  content       TEXT NOT NULL,
  reference     TEXT,
  tags          TEXT[],
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_user_favorites_user ON public.user_favorites(user_id);

-- ================================================
-- FUNÇÃO + TRIGGERS: updated_at automático
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_devotionals_updated BEFORE UPDATE ON public.devotionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_stats_updated BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_favorites_updated BEFORE UPDATE ON public.user_favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
ALTER TABLE public.user_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotionals       ENABLE ROW LEVEL SECURITY;

-- user_progress
CREATE POLICY "progress_select" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_insert" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_update" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- user_stats
CREATE POLICY "stats_select" ON public.user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "stats_insert" ON public.user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stats_update" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);

-- user_achievements
CREATE POLICY "ach_select" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ach_insert" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ach_update" ON public.user_achievements FOR UPDATE USING (auth.uid() = user_id);

-- user_favorites
CREATE POLICY "fav_select" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "fav_insert" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fav_update" ON public.user_favorites FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "fav_delete" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

-- devotionals: leitura pública para usuários autenticados
CREATE POLICY "devotionals_public_read" ON public.devotionals FOR SELECT
  TO authenticated USING (is_active = true);

-- ================================================
-- FIM
-- ================================================
