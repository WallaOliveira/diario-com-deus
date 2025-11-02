# 🔧 IMPLEMENTAÇÃO: SISTEMA HÍBRIDO (OPÇÃO B)

**Data:** 27 de Outubro de 2025  
**Arquitetura:** Híbrida (IDs no Supabase + Conteúdo no JSON local)

---

## 📋 RESUMO

Implementamos uma **arquitetura híbrida** que:
- ✅ Mantém conteúdo completo no JSON local (dev/teste rápido)
- ✅ Cria IDs mínimos no Supabase para permitir JOINs
- ✅ Permite que Progresso/Calendário funcione corretamente

---

## 🎯 O QUE FOI FEITO

### 1. Arquivo SQL Criado
📄 **`scripts/populate-supabase.sql`**
- 19 devocionais emocionais
- 42 devocionais de trilhas (6 trilhas × 7 dias)
- **Total: 61 registros mínimos no Supabase**

### 2. Estrutura dos Registros

**Campos Mínimos no Supabase:**
```sql
- id: TEXT (ex: "ansiedade-1", "trilha-7-dias-paz-interior-dia-1")
- slug: TEXT (mesmo que id)
- title: TEXT (nome do devocional)
- theme: TEXT (tema/emoção/trilha)
- is_active: BOOLEAN (true)
- difficulty: TEXT ('iniciante')
- day_number: INTEGER (NULL para emocionais, 1-7 para trilhas)
```

**Conteúdo Completo:**
- Permanece em JSON local (`devotionals-seed.json`, `trilhas.ts`)
- App carrega do JSON, salva ID no Supabase

---

## 🚀 COMO IMPLEMENTAR

### Passo 1: Executar SQL no Supabase

1. Abra o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Cole o conteúdo de `scripts/populate-supabase.sql`
4. Execute o script
5. Verifique: `SELECT COUNT(*) FROM devotionals;` → Deve retornar **61**

### Passo 2: Verificar Estrutura da Tabela

Certifique-se que a tabela `devotionals` tem estes campos:
```sql
CREATE TABLE IF NOT EXISTS devotionals (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT,
  theme TEXT,
  is_active BOOLEAN DEFAULT true,
  difficulty TEXT DEFAULT 'iniciante',
  day_number INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Passo 3: Testar Fluxo

1. **Completar um devocional:**
   - Abrir "Devocional do Dia" ou "Momento Pessoal"
   - Completar todos os 4 passos
   - Verificar que salvou no Supabase

2. **Verificar Progresso:**
   - Ir para página "Progresso"
   - Calendário deve mostrar o devocional completado
   - Verificar que o JOIN funciona

3. **Completar trilha:**
   - Iniciar uma trilha
   - Completar um dia
   - Verificar no Progresso

---

## 🔍 MAPEAMENTO DE IDs

### Devocionais Emocionais
| Emoção | ID no Supabase | ID no JSON |
|--------|----------------|------------|
| Ansiedade | `ansiedade-1` | `ansiedade-1` |
| Gratidão | `gratidao-1` | `gratidao-1` |
| Solitário | `solitario-01` | `solitario-01` |
| ... | ... | ... |

**✅ IDs são idênticos** → Não precisa mapear

### Trilhas
| Trilha | ID no Supabase | ID no Código |
|--------|----------------|--------------|
| 7 Dias Paz Interior - Dia 1 | `trilha-7-dias-paz-interior-dia-1` | `trilha-7-dias-paz-interior-dia-1` |
| 7 Dias Gratidão - Dia 1 | `trilha-7-dias-gratidao-dia-1` | `trilha-7-dias-gratidao-dia-1` |
| ... | ... | ... |

**✅ Formato:** `trilha-${params.id}-dia-${diaAtual}`

---

## ⚠️ IMPORTANTE

### IDs Devem Corresponder

O código salva com estes formatos:
- **Devocional emocional:** `devotional.id` (ex: `ansiedade-1`)
- **Devocional do dia:** `devotional.id` (mesmo que emocional)
- **Trilha:** `trilha-${params.id}-dia-${diaAtual}` (ex: `trilha-7-dias-paz-interior-dia-1`)

**Se criar novos devocionais:**
1. Adicionar no JSON local
2. Adicionar registro mínimo no Supabase com mesmo ID

---

## 📊 FLUXO COMPLETO

```
1. Usuário abre Devocional
   ↓
2. App carrega: JSON local (conteúdo completo)
   ↓
3. Usuário completa devocional
   ↓
4. App salva: saveDevotionalProgress({ devotionalId: "ansiedade-1" })
   ↓
5. Supabase salva progresso com devotional_id = "ansiedade-1"
   ↓
6. Usuário vai para Progresso
   ↓
7. App busca: getUserProgress() → JOIN com devotionals
   ↓
8. ✅ SUCESSO: devotionals.id = "ansiedade-1" existe!
   ↓
9. Resultado: Calendário mostra devocional completado
```

---

## ✅ PRÓXIMOS PASSOS

1. ⏳ Executar SQL no Supabase
2. ⏳ Testar completar 1 devocional
3. ⏳ Verificar calendário no Progresso
4. ⏳ Testar trilha completa
5. ⏳ Validar favoritos

---

## 🐛 TROUBLESHOOTING

### Problema: Calendário vazio
**Solução:** Verificar se SQL foi executado corretamente:
```sql
SELECT COUNT(*) FROM devotionals; -- Deve ser 61
```

### Problema: JOIN não funciona
**Solução:** Verificar se IDs correspondem:
```sql
SELECT up.devotional_id, d.id 
FROM user_progress up 
LEFT JOIN devotionals d ON up.devotional_id = d.id 
WHERE d.id IS NULL; -- Deve retornar 0 linhas
```

### Problema: IDs de trilhas não batem
**Solução:** Verificar formato:
- Código salva: `trilha-7-dias-paz-interior-dia-1`
- Supabase deve ter: `trilha-7-dias-paz-interior-dia-1`
- ❌ Não pode ter: `7-dias-paz-interior-dia1` (sem "trilha-", com hífen diferente)

---

**🎉 Sistema Híbrido Pronto!**

