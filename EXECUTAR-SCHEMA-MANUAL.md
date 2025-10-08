# 🚀 EXECUTAR SCHEMA MANUALMENTE NO SUPABASE

## 📋 **PASSO A PASSO VISUAL:**

### **1. Acessar Supabase Dashboard:**
```
🌐 https://supabase.com/dashboard/project/csmoqkvdrzpgpcldaqaj
```

### **2. Ir para SQL Editor:**
```
📁 Menu lateral esquerdo → "SQL Editor"
```

### **3. Criar Nova Query:**
```
➕ Clicar em "New query"
```

### **4. Copiar e Colar o Schema:**
```
📄 Copiar TODO o conteúdo do arquivo: supabase/schema.sql
📋 Colar no editor SQL
```

### **5. Executar:**
```
▶️ Clicar no botão "Run" (ou Ctrl+Enter)
```

---

## ✅ **VERIFICAÇÃO:**

### **6. Verificar Tabelas Criadas:**
```
📊 Menu lateral → "Table Editor"
✅ Verificar se aparecem:
   - devotionals
   - user_progress  
   - user_stats
   - user_achievements
   - user_favorites
   - trails
   - user_trail_progress
```

---

## 🎯 **TESTE NO APP:**

### **7. Testar no Browser:**
```
🌐 http://localhost:3002
```

### **8. Fluxo de Teste:**
```
1. Fazer login/registro
2. Ir para Dashboard
3. Ver stats reais aparecerem:
   - 🔥 Streak real
   - 🌱 Nível espiritual
   - ⭐ Momentos com Deus
4. Fazer devocional
5. Ver conquistas aparecerem
6. Favoritar versículo
7. Ver favoritos salvos
```

---

## 🚨 **SE DER ERRO:**

### **Erro de Permissão:**
```
- Verificar se está logado no Supabase
- Verificar se tem permissão no projeto
```

### **Erro de SQL:**
```
- Executar comandos em partes menores
- Verificar sintaxe
- Verificar se tabelas já existem
```

---

## 📞 **ALTERNATIVA RÁPIDA:**

Se não conseguir executar o schema completo, posso criar um **schema mínimo** apenas com as tabelas essenciais para a gamificação funcionar:

```sql
-- Schema mínimo para gamificação
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  total_moments INTEGER DEFAULT 0,
  spiritual_level TEXT DEFAULT 'semente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  achievement_key TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_new BOOLEAN DEFAULT true,
  UNIQUE(user_id, achievement_key)
);

-- RLS
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas stats" ON public.user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar suas stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem inserir suas stats" ON public.user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver suas conquistas" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem inserir suas conquistas" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 🎉 **APÓS EXECUTAR:**

**A gamificação vai aparecer:**
- 📊 **Dashboard** → Stats reais do Supabase
- 🏆 **Conquistas** → Modal com confetes
- ⭐ **Níveis** → 5 níveis espirituais
- 🔥 **Streak** → Sistema completo
- ❤️ **Favoritos** → Sistema funcionando

**Status:** Gamificação 100% ATIVA! 🚀
