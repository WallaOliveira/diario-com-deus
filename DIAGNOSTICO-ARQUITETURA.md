# 🔍 DIAGNÓSTICO DE ARQUITETURA

**Data:** 27 de Outubro de 2025  
**Problema:** Devocionais não aparecem no Progresso/Calendário

---

## ❌ PROBLEMA IDENTIFICADO

Nossa arquitetura atual **TEM UM CONFLITO FUNDAMENTAL**:

### 🔴 CONFLITO: Fonte de Dados vs. Banco de Dados

```
DEVCIONAL DO DIA / EMOCIONAL:
├── 📄 Carrega: JSON local (devotionals-seed.json, devotionals.ts)
├── 💾 Salva: Supabase (user_progress com devotional_id)
└── ❌ PROBLEMA: IDs não batem → Supabase não encontra o devocional!

TRILHAS:
├── 📄 Carrega: Local (trilhas.ts)
├── 💾 Salva: Supabase (com ID tipo "trilha-paz-1")
└── ❌ PROBLEMA: IDs não existem no Supabase → Progresso vazio!

PROGRESSO (Calendário):
├── 🔍 Busca: Supabase (user_progress + JOIN com devotionals)
└── ❌ RESULTADO: Sem dados porque devocionais não estão no Supabase!
```

---

## 📊 FLUXO ATUAL (QUEBRADO)

```
1. Usuário abre Devocional do Dia
   ↓
2. App carrega: getDevotionalOfTheDay() → JSON local (ID: "ansiedade-1")
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
8. ❌ FALHA: Tabela devotionals está VAZIA no Supabase!
   ↓
9. Resultado: Calendário vazio, sem registros
```

---

## ✅ SOLUÇÃO: DUAS OPÇÕES

### **OPÇÃO A: Tudo no Supabase (RECOMENDADO para produção)** ⭐

**Vantagens:**
- ✅ Dados centralizados
- ✅ Facilita analytics
- ✅ RLS (Row Level Security) funciona
- ✅ Backup automático
- ✅ Escalável

**O Que Fazer:**
1. Popular Supabase com 71 devocionais
2. Modificar código para buscar do Supabase
3. Manter JSON apenas como seed/backup

**Código a Mudar:**
- `getDevotionalOfTheDay()` → Buscar do Supabase
- `getDevotionalsByTema()` → Buscar do Supabase
- `getTrilhaDia()` → Buscar do Supabase ou híbrido

---

### **OPÇÃO B: Sistema Híbrido (Mais rápido para MVP)** ⚡

**Vantagens:**
- ✅ Implementação rápida
- ✅ Não precisa migrar todo código
- ✅ Mantém JSON para dev/teste

**O Que Fazer:**
1. Criar tabela "devotionals" no Supabase apenas para IDs
2. Mapear IDs locais → IDs Supabase
3. Popular 71 registros mínimos (só ID + slug)

**Estrutura Mínima:**
```sql
CREATE TABLE devotionals_minimal (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  theme TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Exemplo de registro:
INSERT INTO devotionals_minimal VALUES 
  ('ansiedade-1', 'ansiedade-1', 'ansiedade', true);
```

**Código a Mudar:**
- Manter chamadas locais para conteúdo
- Salvar com ID local (já funciona!)
- JOIN na página de Progresso com tabela mínima

---

## 🎯 RECOMENDAÇÃO FINAL

Para **MVP rápido**: **OPÇÃO B**  
Para **Produção escalável**: **OPÇÃO A**

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Decidir: Opção A ou B
2. ⏳ Popular Supabase
3. ⏳ Testar fluxo completo
4. ⏳ Validar calendário

---

**Status:** Aguardando decisão sobre arquitetura

