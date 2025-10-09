# ✅ CHECKLIST DETALHADO - DIA 2

**Data**: 10/10/2025  
**Objetivo**: Implementar bases críticas do MVP  
**Tempo estimado**: 6-8 horas  
**Foco**: Validação + Implementação inicial

---

## 🌅 MANHÃ (3-4 horas)

### BLOCO 1: Validação de Conteúdo (1h)

#### ✅ ANTES DE ABRIR O CÓDIGO:

- [ ] **Ler devocional como usuário** (10 min)
  - Abrir `CONTEUDO-DEVOCIONAL-01.md`
  - Ler como se fosse MARIA
  - Cronometrar tempo real
  - Anotar: o que funciona? o que não?

- [ ] **Ajustar conteúdo** (20 min)
  - Corrigir pontos que não funcionaram
  - Refinar linguagem
  - Garantir tom acolhedor

- [ ] **Enviar para 3 pessoas** (30 min)
  - Criar Google Doc com `TEMPLATE-VALIDACAO-DEVOCIONAL.md`
  - Enviar para 3 "Marias" (WhatsApp)
  - Pedir feedback até amanhã de manhã
  - **Link do Doc**: _____________

**✅ Checkpoint**: Validação enviada, feedback chegando amanhã

---

### BLOCO 2: Setup Supabase (1-1.5h)

#### ✅ CRIAR TABELAS:

- [ ] **Abrir Supabase Dashboard**
  - URL: https://supabase.com/dashboard
  - Projeto: diario-com-deus

- [ ] **Executar SQL** (copiar de `SPECS-TECNICAS-IMPLEMENTACAO.md`)
  ```sql
  -- Copiar e colar no SQL Editor:
  1. CREATE TABLE devotionals...
  2. CREATE TABLE trails...
  3. CREATE TABLE trail_days...
  4. CREATE TABLE user_trail_progress...
  5. CREATE TABLE user_devotional_history...
  ```

- [ ] **Aplicar RLS** (Row Level Security)
  ```sql
  -- Copiar e colar políticas de segurança
  ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
  CREATE POLICY...
  (todas as políticas do documento)
  ```

- [ ] **Testar tabelas**
  - Inserir 1 devocional manualmente
  - Verificar se RLS funciona
  - Tentar acessar como usuário diferente

**✅ Checkpoint**: Tabelas criadas, RLS funcionando

---

### BLOCO 3: Seed Data (30 min)

#### ✅ INSERIR DADOS DE TESTE:

- [ ] **Criar arquivo** `scripts/seed-devotionals.ts`
  - Copiar estrutura de `SPECS-TECNICAS-IMPLEMENTACAO.md`
  - Adicionar devocional "Paz em Meio à Tempestade"

- [ ] **Executar seed**
  ```bash
  npx ts-node scripts/seed-devotionals.ts
  ```

- [ ] **Verificar no Supabase**
  - Table Editor → devotionals
  - Ver se devocional aparece
  - Conferir dados JSON

**✅ Checkpoint**: 1 devocional no banco

---

## 🌞 TARDE (3-4 horas)

### BLOCO 4: Componente Check-in Emocional (1h)

#### ✅ CRIAR COMPONENTE:

- [ ] **Criar arquivo** `src/components/CheckInEmocional.tsx`
  - Copiar código de `SPECS-TECNICAS-IMPLEMENTACAO.md`
  - Ajustar estilos para design system
  - Adicionar animações sutis

- [ ] **Testar componente isolado**
  - Criar página de teste temporária
  - Verificar responsividade
  - Testar cliques

- [ ] **Commit**
  ```bash
  git add src/components/CheckInEmocional.tsx
  git commit -m "feat: Adiciona componente Check-in Emocional"
  ```

**✅ Checkpoint**: Componente funcionando

---

### BLOCO 5: Refatorar Dashboard (1.5h)

#### ✅ ADICIONAR CHECK-IN:

- [ ] **Editar** `src/app/dashboard/page.tsx`
  - Importar CheckInEmocional
  - Adicionar estado `const [emocao, setEmocao] = useState('')`
  - Posicionar no topo (após header)
  - Salvar emoção no localStorage (temporário)

- [ ] **Testar**
  - Abrir http://localhost:3000/dashboard
  - Clicar em cada emoção
  - Verificar se salva

- [ ] **Commit**
  ```bash
  git add src/app/dashboard/page.tsx
  git commit -m "feat: Adiciona check-in emocional no dashboard"
  ```

**✅ Checkpoint**: Check-in funcionando no dashboard

---

#### ✅ ADICIONAR RECOMENDAÇÃO:

- [ ] **Criar** `src/lib/recommendations.ts`
  - Copiar função `getRecommendation`
  - Mapear emoção → trilha/devocional

- [ ] **Criar** `src/components/RecomendacaoPersonalizada.tsx`
  - Copiar código das specs
  - Conectar com função de recomendação
  - Estilizar

- [ ] **Adicionar ao Dashboard**
  - Importar RecomendacaoPersonalizada
  - Passar `emocao` como prop
  - Posicionar após streak

- [ ] **Testar**
  - Escolher "Ansiosa" → Ver trilha de paz
  - Escolher "Grata" → Ver devocional de gratidão
  - Escolher "Cansada" → Ver devocional de descanso

- [ ] **Commit**
  ```bash
  git add src/lib/recommendations.ts src/components/RecomendacaoPersonalizada.tsx src/app/dashboard/page.tsx
  git commit -m "feat: Adiciona recomendação personalizada baseada em emoção"
  ```

**✅ Checkpoint**: Recomendação funcionando

---

### BLOCO 6: Começar Fluxo Devocional (1h)

#### ✅ CRIAR PASSO 1 (LÊ):

- [ ] **Criar** `src/components/devocional/PassoLe.tsx`
  - Copiar código das specs
  - Ajustar estilos
  - Testar botão "Entenda contexto"

- [ ] **Criar página** `src/app/devocional/[id]/page.tsx`
  - Buscar devocional do Supabase por ID
  - Renderizar PassoLe
  - Adicionar navegação entre passos

- [ ] **Testar**
  - Navegar para `/devocional/[id-do-devocional]`
  - Ver texto bíblico
  - Clicar "Entenda contexto"
  - Botão "Continuar"

- [ ] **Commit**
  ```bash
  git add src/components/devocional/ src/app/devocional/
  git commit -m "feat: Implementa Passo 1 (Lê) do fluxo devocional"
  ```

**✅ Checkpoint**: Passo 1 funcionando

---

## 🌙 NOITE (1-2 horas)

### BLOCO 7: Testes e Ajustes (1h)

#### ✅ TESTE COMPLETO:

- [ ] **Fluxo Dashboard**
  - Login
  - Ver check-in emocional
  - Escolher emoção
  - Ver recomendação
  - Clicar em "Devocional do Dia"

- [ ] **Fluxo Devocional (Passo 1)**
  - Ver texto bíblico
  - Clicar "Entenda contexto"
  - Ler contexto
  - Botão "Continuar"

- [ ] **Responsividade**
  - Testar em mobile (DevTools)
  - Testar em tablet
  - Verificar quebras de layout

- [ ] **Anotar bugs**
  - Criar lista de bugs encontrados
  - Priorizar (crítico/médio/baixo)

**✅ Checkpoint**: Testes completos, bugs anotados

---

### BLOCO 8: Documentação e Commit Final (30 min)

#### ✅ DOCUMENTAR DIA:

- [ ] **Criar** `PROGRESSO-DIA-2.md`
  - O que foi feito
  - O que funcionou
  - O que não funcionou
  - Bugs encontrados
  - Próximos passos

- [ ] **Atualizar** `CHECKLIST-MVP-LANCAMENTO.md`
  - Marcar itens concluídos
  - Ajustar estimativas

- [ ] **Commit final**
  ```bash
  git add .
  git commit -m "docs: Progresso Dia 2 - Check-in, recomendação e Passo 1"
  git push origin feature/landing-page-epica
  ```

**✅ Checkpoint**: Dia 2 completo e documentado

---

## 📊 MÉTRICAS DE SUCESSO DO DIA

### ✅ Deve ter ao final do dia:

- [x] 3 pessoas testando devocional (feedback amanhã)
- [x] Tabelas criadas no Supabase com RLS
- [x] 1 devocional no banco
- [x] Check-in emocional funcionando
- [x] Recomendação personalizada funcionando
- [x] Passo 1 do devocional funcionando
- [x] 0 erros críticos no console
- [x] Tudo commitado e documentado

---

## ⚠️ SE ALGO DER ERRADO

### Problema: Supabase não conecta
**Solução**:
1. Verificar `.env.local`
2. Conferir se variáveis estão corretas
3. Testar conexão manualmente

### Problema: RLS bloqueia tudo
**Solução**:
1. Desabilitar RLS temporariamente para testar
2. Verificar políticas uma por uma
3. Testar com usuário autenticado

### Problema: Componente não renderiza
**Solução**:
1. Verificar imports
2. Checar console do browser
3. Testar componente isolado

### Problema: Ficou sem tempo
**Solução**:
1. Priorizar: Check-in + Recomendação (crítico)
2. Deixar Passo 1 para Dia 3
3. Não tem problema, ajustar cronograma

---

## 🎯 PREPARAÇÃO PARA DIA 3

### Amanhã de manhã:

- [ ] **Ler feedback** das 3 pessoas
- [ ] **Ajustar devocional** baseado em feedback
- [ ] **Continuar** implementação dos Passos 2, 3, 4

### Se feedback for negativo:

- [ ] **Pausar implementação**
- [ ] **Refazer devocional**
- [ ] **Testar novamente**
- [ ] **Só depois continuar código**

---

## 💡 LEMBRETES IMPORTANTES

### ✅ FAZER:
- Commits pequenos e frequentes
- Testar cada mudança antes da próxima
- Documentar decisões importantes
- Pedir ajuda se travar (ChatGPT, Claude)

### ❌ NÃO FAZER:
- Mudar 10 coisas de uma vez
- Commitar sem testar
- Ignorar erros no console
- Trabalhar mais de 8 horas (descansar!)

---

## 🚀 MOTIVAÇÃO

Você está construindo algo que vai **realmente ajudar pessoas**.

MARIA está ansiosa agora. Ela precisa deste app.

Cada linha de código que você escreve hoje está **um passo mais perto** de dar paz para ela.

**Foco. Disciplina. Excelência.**

Vamos lá! 💪

---

**Hora de começar**: ___:___  
**Hora de terminar**: ___:___  
**Tempo total**: _____ horas

**Status ao final**: [ ] Completo [ ] Parcial [ ] Precisa continuar amanhã

