# 📱 USABILIDADE E FUNCIONALIDADES DEFINIDAS - DIÁRIO COM DEUS

**Data**: 09/10/2025  
**Status**: 🟡 Definição estratégica completa - Aguardando implementação  
**Versão**: MVP v1.0

---

## 🎯 VISÃO GERAL

### Propósito do App:
> Criar **habitualidade no devocional** através de 2 formatos complementares (Devocional do Dia + Trilha Guiada) usando a mesma metodologia de 4 passos, com foco em resolver ansiedade e culpa cristã.

### Público Principal:
**MARIA** (70% do foco) - Mulher 28-38 anos, ocupada, ansiosa, quer paz interior em 7 minutos.

### Promessa Central:
**"7 minutos com Deus, todo dia. Paz real, hábito sustentável, sem culpa."**

---

## 🏗️ ARQUITETURA DE INFORMAÇÃO

```
DIÁRIO COM DEUS
│
├── 🏠 LANDING PAGE (Pública)
│   └── Apresentação + CTA "Começar Agora"
│
├── 🔐 LOGIN/REGISTRO (Pública)
│   └── Autenticação simples
│
├── 🎯 ONBOARDING (Primeira vez)
│   ├── Check-in emocional inicial
│   ├── Explicação dos 2 formatos
│   └── Primeiro devocional guiado
│
├── 📊 DASHBOARD (Home interna)
│   ├── Check-in emocional diário
│   ├── Streak visual (protagonista)
│   ├── Devocional do Dia (CTA principal)
│   ├── Recomendação personalizada
│   ├── Trilhas Guiadas
│   ├── Minha Evolução
│   └── Outras opções (colapsadas)
│
├── 📖 DEVOCIONAL DO DIA (Fluxo principal)
│   ├── Passo 1: Lê (+ Respira + Contexto)
│   ├── Passo 2: Reflete (perguntas guiadas)
│   ├── Passo 3: Anota (opcional)
│   ├── Passo 4: Ora (sugestão)
│   └── Conclusão + Feedback
│
├── 🗺️ TRILHAS GUIADAS (Jornadas temáticas)
│   ├── Lista de trilhas (com promessas)
│   ├── Detalhes da trilha
│   ├── Progressão (Dia X/Y)
│   └── Certificado ao completar
│
├── 📈 MINHA EVOLUÇÃO (Gamificação)
│   ├── Streak + Estatísticas
│   ├── Nível espiritual
│   ├── Conquistas desbloqueadas
│   └── Histórico de devocionais
│
├── 💙 VOLTEI HOJE (Recomeço)
│   ├── Modal quando streak quebra
│   ├── Mensagem acolhedora
│   └── Resgate de streak (1x/mês)
│
└── ⚙️ OUTRAS FUNCIONALIDADES
    ├── Meus Favoritos
    ├── Presentes para Você
    └── Configurações
```

---

## 📱 FUNCIONALIDADES DETALHADAS

---

## 1. 🏠 LANDING PAGE

### Objetivo:
Converter visitantes em usuários cadastrados.

### Elementos:
- **Hero Section**:
  - Título: "Diário com Deus" (gradiente)
  - Subtítulo: "7 minutos com Deus, todo dia. Transforme sua vida."
  - CTA: "Começar Agora" (botão dourado)
  
- **Benefícios** (3 cards):
  - 🕐 "7 minutos que cabem na sua rotina"
  - 💙 "Paz interior em meio ao caos"
  - 🔥 "Crie o hábito sem culpa"

- **Como Funciona** (3 passos):
  - 1. Escolha seu formato (Diário ou Trilha)
  - 2. Siga o método guiado (4 passos)
  - 3. Veja seu progresso crescer

- **Social Proof**:
  - "15.000 pessoas já transformaram sua rotina"
  - Depoimentos (futuro)

- **Footer**:
  - Política de Privacidade
  - Termos de Uso
  - Contato

### Status Atual:
✅ **Implementada** - Funcionando e com backup

---

## 2. 🔐 LOGIN/REGISTRO

### Objetivo:
Autenticação rápida e sem fricção.

### Fluxo de Registro:
```
1. Email + Senha + Nome
2. Confirmação por email (Supabase)
3. Redirect para Onboarding
```

### Fluxo de Login:
```
1. Email + Senha
2. Validação
3. Redirect para Dashboard
```

### Recuperação de Senha:
```
1. "Esqueci minha senha"
2. Email com link
3. Redefinir senha
```

### Modo DEV (Temporário):
- `NEXT_PUBLIC_DEV_MODE=true` → Bypass de auth
- `NEXT_PUBLIC_DEV_MODE=false` → Auth normal

### Status Atual:
✅ **Implementada** - Funcionando com Supabase + Modo DEV ativo

---

## 3. 🎯 ONBOARDING (Primeira Vez)

### Objetivo:
Ativar usuário (completar primeiro devocional).

### Fluxo (3 telas):

#### TELA 1: Boas-vindas + Check-in
```
┌─────────────────────────────────────┐
│ Bem-vindo(a), [Nome]! 🙏            │
│                                     │
│ Como você está se sentindo hoje?   │
│                                     │
│ [ ] 😰 Ansioso(a)                   │
│ [ ] 😊 Grato(a)                     │
│ [ ] 😔 Cansado(a)                   │
│ [ ] 🙏 Esperançoso(a)               │
│                                     │
│ [Continuar]                         │
└─────────────────────────────────────┘
```

#### TELA 2: Explicação dos Formatos
```
┌─────────────────────────────────────┐
│ Você tem 2 formas de estar com Deus│
│                                     │
│ 📖 DEVOCIONAL DO DIA                │
│ • Novo conteúdo todo dia            │
│ • 7-10 minutos                      │
│ • Flexível (faça quando quiser)    │
│                                     │
│ 🗺️ TRILHA GUIADA                    │
│ • Jornada temática (7-30 dias)     │
│ • Compromisso diário                │
│ • Transformação específica          │
│                                     │
│ [Entendi, vamos começar!]           │
└─────────────────────────────────────┘
```

#### TELA 3: Primeiro Devocional
```
┌─────────────────────────────────────┐
│ Vamos fazer seu primeiro devocional?│
│                                     │
│ Baseado em como você está           │
│ (Ansioso), escolhemos:              │
│                                     │
│ 📖 "Paz em Meio à Tempestade"       │
│ ⏱️ 7 minutos                         │
│                                     │
│ [Começar agora] ← CTA forte         │
│ [Escolher outro]                    │
└─────────────────────────────────────┘
```

### Após Completar:
```
┌─────────────────────────────────────┐
│ 🎉 Parabéns!                        │
│                                     │
│ Você completou seu primeiro         │
│ momento com Deus!                   │
│                                     │
│ 🔥 Sequência: 1 dia                 │
│                                     │
│ Continue assim e veja sua vida      │
│ transformar 7 minutos por vez.      │
│                                     │
│ [Ir para Dashboard]                 │
└─────────────────────────────────────┘
```

### Status Atual:
❌ **Não implementado** - Precisa criar

---

## 4. 📊 DASHBOARD (Home Interna)

### Objetivo:
Hub central que prioriza MARIA (ansiosa, ocupada, 7 min).

### Layout Proposto:

```
┌─────────────────────────────────────┐
│ 📖 Diário com Deus                  │ ← Título gradiente
│ Olá, Maria! 👋                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Como você está hoje?                │
│ [ ] 😰 Ansiosa  [ ] 😊 Grata        │ ← Check-in diário
│ [ ] 😔 Cansada  [ ] 🙏 Esperançosa  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔥 3 dias seguidos!                 │ ← Streak protagonista
│ Continue assim, você está incrível! │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📖 Devocional do Dia                │ ← CTA principal
│ "Encontre paz em meio ao caos"      │ ← Promessa emocional
│ ⏱️ 7 minutos                         │ ← Tempo claro
│                                     │
│ [Começar agora] ← Botão grande      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 💙 Recomendado para você            │ ← Baseado em check-in
│                                     │
│ Trilha: 7 Dias de Paz Interior      │
│ ⏱️ 7 min/dia • 7 dias               │
│ "Acalme sua mente e coração"        │
│                                     │
│ [Iniciar trilha]                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Outras opções ▼                     │ ← Colapsado
│                                     │
│ 🗺️ Trilhas Guiadas                  │
│ 📈 Minha Evolução                   │
│ 🎁 Presentes para Você              │
└─────────────────────────────────────┘
```

### Regras de Negócio:

1. **Check-in Emocional**:
   - Aparece 1x por dia
   - Salva resposta no banco
   - Influencia recomendação

2. **Recomendação**:
   - Se "Ansioso" → Trilha de Paz
   - Se "Cansado" → Devocional de Descanso
   - Se "Grato" → Devocional de Adoração
   - Se "Esperançoso" → Trilha de Propósito

3. **Streak**:
   - Conta dias consecutivos
   - Atualiza à meia-noite
   - Visual: 🔥 + número

4. **Devocional do Dia**:
   - Muda à meia-noite
   - Pode refazer (mas streak só conta 1x)
   - Mostra tempo estimado

### Status Atual:
🟡 **70% implementado** - Precisa:
- ❌ Check-in emocional
- ❌ Recomendação personalizada
- ❌ Tempo estimado nos cards
- ✅ Streak (existe mas não é protagonista)
- ✅ Botões verticais

---

## 5. 📖 DEVOCIONAL DO DIA (Fluxo Principal)

### Objetivo:
Guiar usuário em 7-10 minutos de devocional estruturado.

### Metodologia (4 Passos):

---

#### PASSO 1: LÊ (3-4 min)

```
┌─────────────────────────────────────┐
│ Passo 1 de 4: Leia                 │ ← Progressão
│                                     │
│ [Mensagem de preparação]            │
│ Respire fundo. Deus quer falar      │
│ com você agora. ❤️                  │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ FILIPENSES 4:6-7                    │ ← Referência
│                                     │
│ "Não andem ansiosos por coisa      │
│ alguma, mas em tudo, pela oração   │
│ e súplicas, e com ação de graças,  │
│ apresentem seus pedidos a Deus.    │
│ E a paz de Deus, que excede todo   │
│ entendimento, guardará o coração   │
│ e a mente de vocês em Cristo       │
│ Jesus."                             │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ 💡 [Entenda o contexto] ← Expansível│
│                                     │
│ [Continuar] ← Botão fixo no rodapé │
└─────────────────────────────────────┘
```

**Se clicar "Entenda o contexto"**:
```
┌─────────────────────────────────────┐
│ 💡 Contexto                         │
│                                     │
│ Paulo escreveu essa carta da       │
│ prisão, mostrando que a paz de     │
│ Deus não depende de circunstâncias │
│ externas. Mesmo preso, ele tinha   │
│ paz porque confiava em Deus.       │
│                                     │
│ [Fechar]                            │
└─────────────────────────────────────┘
```

**Elementos**:
- Mensagem "Respira" (1 frase)
- Texto bíblico (3-7 versículos)
- Referência clara
- Botão "Entenda o contexto" (opcional)
- Progressão visual (1/4)
- Botão "Continuar"

---

#### PASSO 2: REFLETE (2-3 min)

```
┌─────────────────────────────────────┐
│ Passo 2 de 4: Reflita              │
│                                     │
│ Pense nestas perguntas:             │
│                                     │
│ 1️⃣ O que Deus está dizendo         │
│    neste texto?                     │
│                                     │
│ [Espaço para pensar - 30s]         │
│                                     │
│ 2️⃣ O que isso significa para       │
│    minha vida hoje?                 │
│                                     │
│ [Espaço para pensar - 30s]         │
│                                     │
│ 3️⃣ Qual ação prática posso         │
│    tomar?                           │
│                                     │
│ [Espaço para pensar - 30s]         │
│                                     │
│ [Continuar]                         │
└─────────────────────────────────────┘
```

**Elementos**:
- 3 perguntas guiadas
- Não obriga resposta escrita
- Timer visual (opcional - 30s por pergunta)
- Progressão (2/4)

---

#### PASSO 3: ANOTA (1-2 min) - OPCIONAL

```
┌─────────────────────────────────────┐
│ Passo 3 de 4: Anote (opcional)     │
│                                     │
│ Quer registrar algo?                │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ O que mais me tocou...          ││ ← Campo livre
│ │                                 ││
│ │                                 ││
│ │                                 ││
│ └─────────────────────────────────┘│
│                                     │
│ ⭐ [Favoritar versículo]            │
│                                     │
│ [Pular] [Salvar e continuar]       │
└─────────────────────────────────────┘
```

**Elementos**:
- Campo de texto livre
- Botão "Favoritar versículo"
- Pode pular (sem culpa)
- Salva no histórico pessoal

---

#### PASSO 4: ORA (1-2 min)

```
┌─────────────────────────────────────┐
│ Passo 4 de 4: Ore                  │
│                                     │
│ Sugestão de oração:                 │
│                                     │
│ "Pai, obrigado por Sua paz que     │
│ excede todo entendimento. Entrego  │
│ minhas ansiedades a Ti. Guarda     │
│ meu coração e minha mente hoje.    │
│ Em nome de Jesus, amém."            │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ Ou ore com suas próprias palavras: │
│                                     │
│ [1 minuto de silêncio]             │
│ ⏱️ Timer: 60s                       │
│                                     │
│ [Finalizar devocional]              │
└─────────────────────────────────────┘
```

**Elementos**:
- Sugestão de oração (baseada no texto)
- Timer de 1 min (opcional)
- Ou: Gravar áudio da oração (futuro)

---

#### CONCLUSÃO

```
┌─────────────────────────────────────┐
│ 🎉 Devocional Completo!             │
│                                     │
│ Você passou 8 minutos com Deus.    │ ← Tempo real
│                                     │
│ 🔥 Sequência: 4 dias                │
│ ⭐ Momentos com Deus: 12            │
│                                     │
│ "A paz de Deus guardará seu        │
│ coração hoje." - Filipenses 4:7    │
│                                     │
│ [Voltar ao Dashboard]               │
│ [Compartilhar] ← Opcional           │
└─────────────────────────────────────┘
```

**Elementos**:
- Feedback positivo
- Tempo real gasto
- Atualização de streak
- Versículo para levar no dia
- Opção de compartilhar (futuro)

---

### Regras de Negócio:

1. **Cronometragem**:
   - Rastrear tempo real gasto
   - Mostrar no final
   - Meta: 7-10 minutos

2. **Salvamento**:
   - Salva progresso automaticamente
   - Se fechar no meio, pergunta: "Continuar ou recomeçar?"

3. **Streak**:
   - Só conta 1x por dia (mesmo que refaça)
   - Atualiza após conclusão

4. **Anotações**:
   - Salvas no perfil do usuário
   - Privadas (não compartilhadas)
   - Podem ser revisadas depois

### Status Atual:
🔴 **40% implementado** - Precisa refatorar completamente

---

## 6. 🗺️ TRILHAS GUIADAS

### Objetivo:
Jornadas temáticas de 7-30 dias com promessa de transformação específica.

### Lista de Trilhas (MVP):

#### TRILHA 1: "7 Dias de Paz Interior" ⭐ PRIORIDADE
```
┌─────────────────────────────────────┐
│ 💙 7 Dias de Paz Interior           │
│                                     │
│ "Acalme sua mente e coração,       │
│ mesmo em meio ao caos"              │
│                                     │
│ ⏱️ 7 min/dia • 7 dias               │
│ 👥 2.450 pessoas completaram        │
│ ⭐ 4.8/5.0                          │
│                                     │
│ O que você vai aprender:            │
│ • Reconhecer sua ansiedade          │
│ • Entregar preocupações a Deus     │
│ • Renovar sua mente                 │
│ • Viver em paz constante            │
│                                     │
│ [Iniciar trilha]                    │
└─────────────────────────────────────┘
```

**Estrutura**:
- Dia 1: Reconheça sua ansiedade (Filipenses 4:6-7)
- Dia 2: Entregue suas preocupações (1 Pedro 5:7)
- Dia 3: Confie no controle de Deus (Salmo 46)
- Dia 4: Renove sua mente (Romanos 12:2)
- Dia 5: Descanse em Deus (Mateus 11:28-30)
- Dia 6: Pratique gratidão (1 Tessalonicenses 5:16-18)
- Dia 7: Viva em paz (João 14:27)

---

#### TRILHA 2: "21 Dias de Propósito" (Futuro)
```
┌─────────────────────────────────────┐
│ 🎯 21 Dias de Propósito             │
│                                     │
│ "Descubra o plano de Deus          │
│ para sua vida"                      │
│                                     │
│ ⏱️ 10 min/dia • 21 dias             │
│ 🔒 Desbloqueie após 7 dias de streak│
└─────────────────────────────────────┘
```

---

### Durante a Trilha:

```
┌─────────────────────────────────────┐
│ 💙 7 Dias de Paz Interior           │
│                                     │
│ Dia 3 de 7                          │ ← Progressão
│ ████████░░░░░░░░░░░░ 43%            │ ← Barra visual
│                                     │
│ Hoje: "Confie no controle de Deus" │
│ ⏱️ 7 minutos                         │
│                                     │
│ [Continuar trilha]                  │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ Dias completados:                   │
│ ✅ Dia 1: Reconheça sua ansiedade   │
│ ✅ Dia 2: Entregue suas preocupações│
│ 📍 Dia 3: Confie no controle ← Hoje │
│ ⏸️ Dia 4: Renove sua mente          │
│ ⏸️ Dia 5: Descanse em Deus          │
│ ⏸️ Dia 6: Pratique gratidão         │
│ ⏸️ Dia 7: Viva em paz               │
└─────────────────────────────────────┘
```

---

### Se Pular 1 Dia:

```
┌─────────────────────────────────────┐
│ 💙 Você pulou 1 dia da trilha       │
│                                     │
│ Não tem problema! O que você quer?  │
│                                     │
│ [Continuar do Dia 4]                │
│ "Seguir de onde parei"              │
│                                     │
│ [Recomeçar do Dia 1]                │
│ "Quero fazer tudo novamente"        │
│                                     │
│ Sua escolha não afeta seu streak    │
│ de devocionais diários. 🔥          │
└─────────────────────────────────────┘
```

---

### Ao Completar:

```
┌─────────────────────────────────────┐
│ 🎉 Parabéns!                        │
│                                     │
│ Você completou a trilha             │
│ "7 Dias de Paz Interior"            │
│                                     │
│ 🏆 Conquista desbloqueada:          │
│ "Buscador de Paz"                   │
│                                     │
│ 📜 [Baixar certificado]             │
│ 📤 [Compartilhar conquista]         │
│                                     │
│ Próxima trilha recomendada:         │
│ 🎯 "21 Dias de Propósito"           │
│                                     │
│ [Ver outras trilhas]                │
│ [Voltar ao Dashboard]               │
└─────────────────────────────────────┘
```

### Regras de Negócio:

1. **Sequencial**:
   - Só pode fazer 1 dia por vez
   - Não pode pular dias
   - Dia seguinte desbloqueia à meia-noite

2. **Se Pular**:
   - Pergunta: "Continuar ou recomeçar?"
   - Não perde progresso automaticamente

3. **Certificado**:
   - PDF gerado automaticamente
   - Nome do usuário + data + trilha
   - Compartilhável

4. **Pode fazer Devocional + Trilha no mesmo dia**:
   - Mas streak só conta 1x

### Status Atual:
🟡 **50% implementado** - Estrutura existe, falta conteúdo e regras

---

## 7. 📈 MINHA EVOLUÇÃO (Gamificação)

### Objetivo:
Mostrar progresso tangível e motivar continuidade.

### Layout:

```
┌─────────────────────────────────────┐
│ 📈 Minha Evolução                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔥 Sequência Atual                  │
│                                     │
│ 15 dias consecutivos                │ ← Grande e visível
│ Seu melhor: 21 dias                 │
│                                     │
│ 🛟 Você tem 1 resgate disponível    │
│    este mês                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🌳 Nível Espiritual                 │
│                                     │
│ Nível 2: Crescendo                  │
│ ████████████░░░░░░░░ 60%            │
│                                     │
│ Próximo nível: Maduro (30 dias)    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⭐ Estatísticas                     │
│                                     │
│ • Momentos com Deus: 45             │
│ • Devocionais completos: 40         │
│ • Trilhas completadas: 2            │
│ • Versículos favoritados: 12        │
│ • Anotações feitas: 28              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🏆 Conquistas (8/20)                │
│                                     │
│ ✅ Primeira Semana                  │
│ ✅ Buscador de Paz                  │
│ ✅ Escriba Fiel (50 anotações)      │
│ ✅ Maratonista (3 trilhas)          │
│                                     │
│ 🔒 Coração de Adorador (30 dias)    │
│ 🔒 Guia Espiritual (365 dias)       │
│                                     │
│ [Ver todas]                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📅 Calendário (Últimos 30 dias)    │
│                                     │
│ S  T  Q  Q  S  S  D                 │
│ ✅ ✅ ✅ ❌ ✅ ✅ ✅                  │
│ ✅ ✅ ✅ ✅ ✅ ✅ ✅                  │
│ ✅ ✅ ✅ ✅ ✅ ✅ ✅                  │
│ ✅ ✅ ✅ ✅ ✅ ✅ ✅                  │
│ ✅ ✅ ✅ ✅                          │
└─────────────────────────────────────┘
```

### Níveis Espirituais:

| Nível | Nome | Dias | Ícone |
|-------|------|------|-------|
| 1 | Iniciante | 0-7 | 🌱 |
| 2 | Crescendo | 8-30 | 🌿 |
| 3 | Maduro | 31-90 | 🌳 |
| 4 | Sábio | 91-365 | 🌲 |
| 5 | Guia | 365+ | 🏞️ |

### Conquistas:

| Conquista | Condição | Ícone |
|-----------|----------|-------|
| Primeira Semana | 7 dias consecutivos | 🔥 |
| Buscador de Paz | Completou trilha de Paz | 💙 |
| Escriba Fiel | 50 anotações | 📝 |
| Maratonista | 3 trilhas completadas | 🏃 |
| Coração de Adorador | 30 dias consecutivos | ❤️ |
| Dedicado | Devocional + Trilha 10x | 💪 |
| Guia Espiritual | 365 dias consecutivos | 🏞️ |

### Resgate de Streak:

```
┌─────────────────────────────────────┐
│ 💔 Seu streak quebrou                │
│                                     │
│ Você tinha 15 dias consecutivos.    │
│                                     │
│ 🛟 Quer usar seu resgate?           │
│    (1 disponível este mês)          │
│                                     │
│ [Sim, resgatar streak]              │
│ "Manter meus 15 dias"               │
│                                     │
│ [Não, recomeçar do zero]            │
│ "Começar nova sequência"            │
└─────────────────────────────────────┘
```

### Status Atual:
🟡 **70% implementado** - Base existe, falta:
- ❌ Resgate de streak
- ❌ Calendário visual
- ❌ Conquistas específicas

---

## 8. 💙 VOLTEI HOJE (Recomeço sem Culpa)

### Objetivo:
Acolher usuário que voltou após período inativo (3+ dias).

### Quando Aparece:
- Usuário não fez devocional por 3+ dias
- Abre o app

### Modal:

```
┌─────────────────────────────────────┐
│ 💙 Que bom ter você de volta!       │
│                                     │
│ Faz 5 dias que você não vem aqui.  │
│ Mas não tem problema! Deus te      │
│ esperou com amor. ❤️                │
│                                     │
│ Recomeçar não é falhar.             │
│ É ter coragem de tentar de novo.   │
│                                     │
│ 🎁 Bônus de retorno:                │
│ • Wallpaper exclusivo               │
│ • Devocional especial "Recomeço"   │
│                                     │
│ [Fazer devocional agora]            │
│ [Ver meu progresso]                 │
└─────────────────────────────────────┘
```

### Página Dedicada (`/voltei-hoje`):

```
┌─────────────────────────────────────┐
│ 💙 Voltei Hoje                      │
│                                     │
│ "Não importa quantas vezes você    │
│ caia. O que importa é que você     │
│ levante mais uma vez."              │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ Você não está sozinho(a):           │
│                                     │
│ • 15.000 pessoas já recomeçaram     │
│ • 80% mantêm novo streak de 7+ dias │
│ • Deus não desistiu de você         │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ Devocional especial:                │
│ "O Amor que Não Desiste"            │
│ ⏱️ 7 minutos                         │
│                                     │
│ [Começar agora]                     │
└─────────────────────────────────────┘
```

### Regras de Negócio:

1. **Gatilho**:
   - 3+ dias sem devocional
   - Primeira abertura do app após inatividade

2. **Bônus**:
   - Wallpaper exclusivo
   - Devocional especial temático
   - Não perde conquistas antigas

3. **Streak**:
   - Recomeça do zero (mas pode usar resgate se tiver)

### Status Atual:
❌ **Não integrado** - Página existe mas não é usada automaticamente

---

## 9. ⚙️ OUTRAS FUNCIONALIDADES

### 9.1 Meus Favoritos

```
┌─────────────────────────────────────┐
│ ❤️ Meus Favoritos                   │
│                                     │
│ Versículos e citações salvos        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ "Não andem ansiosos por coisa      │
│ alguma..."                          │
│ - Filipenses 4:6-7                  │
│                                     │
│ 📅 Salvo em 05/10/2025              │
│ 📖 Devocional: "Paz em Tempestade" │
│                                     │
│ [Compartilhar] [Remover]            │
└─────────────────────────────────────┘
```

**Status**: ✅ Implementado

---

### 9.2 Presentes para Você

```
┌─────────────────────────────────────┐
│ 🎁 Presentes para Você              │
│                                     │
│ PDFs, wallpapers e recursos grátis  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📱 Wallpapers                       │
│ • Versículos para tela de bloqueio  │
│ • 10 designs disponíveis            │
│ [Baixar]                            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📄 Guias em PDF                     │
│ • Como orar efetivamente            │
│ • Plano de leitura bíblica anual    │
│ [Baixar]                            │
└─────────────────────────────────────┘
```

**Status**: ✅ Implementado (estrutura)

---

### 9.3 Configurações

```
┌─────────────────────────────────────┐
│ ⚙️ Configurações                    │
└─────────────────────────────────────┘

• 🔔 Notificações
  └─ Lembrete diário: 07:00
  └─ Trilha: Ativado

• 🎨 Aparência
  └─ Tema: Escuro (padrão)
  └─ Tamanho da fonte: Médio

• 👤 Perfil
  └─ Nome: Maria Silva
  └─ Email: maria@email.com
  └─ [Alterar senha]

• 📊 Dados
  └─ [Exportar meu histórico]
  └─ [Excluir minha conta]

• ℹ️ Sobre
  └─ Versão: 1.0.0
  └─ Política de Privacidade
  └─ Termos de Uso
  └─ [Sair]
```

**Status**: 🟡 Parcial

---

## 📊 RESUMO DE STATUS

| Funcionalidade | Status | Prioridade |
|----------------|--------|------------|
| Landing Page | ✅ 100% | Baixa (já pronto) |
| Login/Registro | ✅ 100% | Baixa (já pronto) |
| Onboarding | ❌ 0% | 🔴 Alta |
| Dashboard | 🟡 70% | 🔴 Alta |
| Devocional do Dia | 🔴 40% | 🔴 Crítica |
| Trilhas Guiadas | 🟡 50% | 🟡 Média |
| Minha Evolução | 🟡 70% | 🟡 Média |
| Voltei Hoje | ❌ 0% | 🟡 Média |
| Favoritos | ✅ 80% | 🟢 Baixa |
| Presentes | ✅ 80% | 🟢 Baixa |
| Configurações | 🟡 60% | 🟢 Baixa |

---

## 🎯 PRÓXIMOS PASSOS (Amanhã - Dia 2)

### Manhã (3-4h):
1. ✅ Refatorar Dashboard (check-in + recomendação)
2. ✅ Começar refatoração Devocional do Dia (4 passos)

### Tarde (3-4h):
3. ✅ Completar fluxo Devocional (botão contexto + reflexões)
4. ✅ Criar primeiro devocional completo

### Noite (2h):
5. ✅ Estruturar trilha "7 Dias de Paz Interior"
6. ✅ Commit e documentação

---

**Está claro?** Quer revisar algo específico? 🤔

