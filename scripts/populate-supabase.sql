-- ============================================
-- POPULAR DADOS MÍNIMOS NO SUPABASE
-- Sistema Híbrido: IDs no Supabase, conteúdo no JSON local
-- ============================================
-- INSTRUÇÕES:
-- 1. Execute este SQL no Supabase SQL Editor
-- 2. Isso criará IDs mínimos para permitir JOINs funcionarem
-- 3. Conteúdo completo permanece no JSON local

-- DEVOCIONAIS EMOCIONAIS (19)
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('ansiedade-1', 'ansiedade-1', 'Ansiedade', 'ansiedade', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('gratidao-1', 'gratidao-1', 'Gratidão', 'gratidão', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('perdao-1', 'perdao-1', 'Perdão', 'perdão', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('sabedoria-1', 'sabedoria-1', 'Sabedoria', 'sabedoria', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('esperanca-1', 'esperanca-1', 'Esperança', 'esperança', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('familia-1', 'familia-1', 'Família', 'família', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trabalho-1', 'trabalho-1', 'Trabalho', 'trabalho', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('consolo-1', 'consolo-1', 'Consolo', 'consolo', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('decisao-1', 'decisao-1', 'Decisão', 'decisão', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('ansioso-01', 'ansioso-01', 'Ansioso', 'ansioso', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('solitario-01', 'solitario-01', 'Solitário', 'solitário', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('culpado-01', 'culpado-01', 'Culpado', 'culpado', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('grato-02', 'grato-02', 'Grato', 'grato', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('alegre-01', 'alegre-01', 'Alegre', 'alegre', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('esperancoso-01', 'esperancoso-01', 'Esperançoso', 'esperançoso', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('motivado-01', 'motivado-01', 'Motivado', 'motivado', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('amoroso-01', 'amoroso-01', 'Amoroso', 'amoroso', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('cansado-01', 'cansado-01', 'Cansado', 'cansado', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('perdido-01', 'perdido-01', 'Perdido', 'perdido', true, 'iniciante', NULL, NOW()) ON CONFLICT (id) DO NOTHING;

-- TRILHAS GUIADAS (42 devocionais)
-- Formato usado no código: trilha-${params.id}-dia-${diaAtual}
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-1', 'trilha-7-dias-paz-interior-dia-1', 'Trilha: 7 Dias de Paz Interior - Dia 1', '7-dias-paz-interior', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-2', 'trilha-7-dias-paz-interior-dia-2', 'Trilha: 7 Dias de Paz Interior - Dia 2', '7-dias-paz-interior', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-3', 'trilha-7-dias-paz-interior-dia-3', 'Trilha: 7 Dias de Paz Interior - Dia 3', '7-dias-paz-interior', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-4', 'trilha-7-dias-paz-interior-dia-4', 'Trilha: 7 Dias de Paz Interior - Dia 4', '7-dias-paz-interior', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-5', 'trilha-7-dias-paz-interior-dia-5', 'Trilha: 7 Dias de Paz Interior - Dia 5', '7-dias-paz-interior', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-6', 'trilha-7-dias-paz-interior-dia-6', 'Trilha: 7 Dias de Paz Interior - Dia 6', '7-dias-paz-interior', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-paz-interior-dia-7', 'trilha-7-dias-paz-interior-dia-7', 'Trilha: 7 Dias de Paz Interior - Dia 7', '7-dias-paz-interior', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-1', 'trilha-7-dias-gratidao-dia-1', 'Trilha: 7 Dias de Gratidão - Dia 1', '7-dias-gratidao', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-2', 'trilha-7-dias-gratidao-dia-2', 'Trilha: 7 Dias de Gratidão - Dia 2', '7-dias-gratidao', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-3', 'trilha-7-dias-gratidao-dia-3', 'Trilha: 7 Dias de Gratidão - Dia 3', '7-dias-gratidao', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-4', 'trilha-7-dias-gratidao-dia-4', 'Trilha: 7 Dias de Gratidão - Dia 4', '7-dias-gratidao', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-5', 'trilha-7-dias-gratidao-dia-5', 'Trilha: 7 Dias de Gratidão - Dia 5', '7-dias-gratidao', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-6', 'trilha-7-dias-gratidao-dia-6', 'Trilha: 7 Dias de Gratidão - Dia 6', '7-dias-gratidao', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-gratidao-dia-7', 'trilha-7-dias-gratidao-dia-7', 'Trilha: 7 Dias de Gratidão - Dia 7', '7-dias-gratidao', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-1', 'trilha-7-dias-perdao-dia-1', 'Trilha: 7 Dias de Perdão - Dia 1', '7-dias-perdao', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-2', 'trilha-7-dias-perdao-dia-2', 'Trilha: 7 Dias de Perdão - Dia 2', '7-dias-perdao', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-3', 'trilha-7-dias-perdao-dia-3', 'Trilha: 7 Dias de Perdão - Dia 3', '7-dias-perdao', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-4', 'trilha-7-dias-perdao-dia-4', 'Trilha: 7 Dias de Perdão - Dia 4', '7-dias-perdao', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-5', 'trilha-7-dias-perdao-dia-5', 'Trilha: 7 Dias de Perdão - Dia 5', '7-dias-perdao', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-6', 'trilha-7-dias-perdao-dia-6', 'Trilha: 7 Dias de Perdão - Dia 6', '7-dias-perdao', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-perdao-dia-7', 'trilha-7-dias-perdao-dia-7', 'Trilha: 7 Dias de Perdão - Dia 7', '7-dias-perdao', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-1', 'trilha-7-dias-esperanca-dia-1', 'Trilha: 7 Dias de Esperança - Dia 1', '7-dias-esperanca', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-2', 'trilha-7-dias-esperanca-dia-2', 'Trilha: 7 Dias de Esperança - Dia 2', '7-dias-esperanca', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-3', 'trilha-7-dias-esperanca-dia-3', 'Trilha: 7 Dias de Esperança - Dia 3', '7-dias-esperanca', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-4', 'trilha-7-dias-esperanca-dia-4', 'Trilha: 7 Dias de Esperança - Dia 4', '7-dias-esperanca', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-5', 'trilha-7-dias-esperanca-dia-5', 'Trilha: 7 Dias de Esperança - Dia 5', '7-dias-esperanca', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-6', 'trilha-7-dias-esperanca-dia-6', 'Trilha: 7 Dias de Esperança - Dia 6', '7-dias-esperanca', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-esperanca-dia-7', 'trilha-7-dias-esperanca-dia-7', 'Trilha: 7 Dias de Esperança - Dia 7', '7-dias-esperanca', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-1', 'trilha-7-dias-alegria-dia-1', 'Trilha: 7 Dias de Alegria - Dia 1', '7-dias-alegria', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-2', 'trilha-7-dias-alegria-dia-2', 'Trilha: 7 Dias de Alegria - Dia 2', '7-dias-alegria', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-3', 'trilha-7-dias-alegria-dia-3', 'Trilha: 7 Dias de Alegria - Dia 3', '7-dias-alegria', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-4', 'trilha-7-dias-alegria-dia-4', 'Trilha: 7 Dias de Alegria - Dia 4', '7-dias-alegria', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-5', 'trilha-7-dias-alegria-dia-5', 'Trilha: 7 Dias de Alegria - Dia 5', '7-dias-alegria', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-6', 'trilha-7-dias-alegria-dia-6', 'Trilha: 7 Dias de Alegria - Dia 6', '7-dias-alegria', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-alegria-dia-7', 'trilha-7-dias-alegria-dia-7', 'Trilha: 7 Dias de Alegria - Dia 7', '7-dias-alegria', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-1', 'trilha-7-dias-coragem-dia-1', 'Trilha: 7 Dias de Coragem - Dia 1', '7-dias-coragem', true, 'iniciante', 1, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-2', 'trilha-7-dias-coragem-dia-2', 'Trilha: 7 Dias de Coragem - Dia 2', '7-dias-coragem', true, 'iniciante', 2, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-3', 'trilha-7-dias-coragem-dia-3', 'Trilha: 7 Dias de Coragem - Dia 3', '7-dias-coragem', true, 'iniciante', 3, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-4', 'trilha-7-dias-coragem-dia-4', 'Trilha: 7 Dias de Coragem - Dia 4', '7-dias-coragem', true, 'iniciante', 4, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-5', 'trilha-7-dias-coragem-dia-5', 'Trilha: 7 Dias de Coragem - Dia 5', '7-dias-coragem', true, 'iniciante', 5, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-6', 'trilha-7-dias-coragem-dia-6', 'Trilha: 7 Dias de Coragem - Dia 6', '7-dias-coragem', true, 'iniciante', 6, NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO devotionals (id, slug, title, theme, is_active, difficulty, day_number, created_at) VALUES ('trilha-7-dias-coragem-dia-7', 'trilha-7-dias-coragem-dia-7', 'Trilha: 7 Dias de Coragem - Dia 7', '7-dias-coragem', true, 'iniciante', 7, NOW()) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RESUMO
-- ============================================
-- TOTAL: 19 devocionais emocionais + 42 devocionais de trilhas = 61 registros
-- NOTA: Devocionais do dia usam os mesmos IDs dos emocionais
-- 
-- VERIFICAÇÃO:
-- SELECT COUNT(*) FROM devotionals; -- Deve retornar 61
-- 
-- TESTE:
-- SELECT * FROM devotionals WHERE theme LIKE '7-dias%' ORDER BY theme, day_number;

