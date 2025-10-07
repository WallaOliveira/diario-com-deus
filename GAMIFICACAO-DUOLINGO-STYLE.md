# 🎮 Sistema de Gamificação - Estilo Duolingo

**Diário com Deus**  
Data: Outubro 2025

---

## 🎯 Filosofia: Duolingo Meets Spiritual Journey

### ✅ O que PEGAMOS do Duolingo:

1. **Sequência de dias (Streak)** 🔥
   - Recompensa constância
   - Sentimento de "não quero perder"
   - Visual claro e motivador

2. **Níveis e Progressão** 📊
   - Sensação de evolução
   - Marcos claros
   - Feedback constante

3. **Conquistas (Achievements)** 🏆
   - Celebração de marcos
   - Diversidade de objetivos
   - Badge visual

4. **"Streak Freeze" (Congelamento de Sequência)** ❄️
   - Permite 1 erro sem perder tudo
   - Reduz frustração
   - Incentiva volta

5. **Dashboard Visual** 📈
   - Heatmap de atividade
   - Gráficos motivadores
   - Estatísticas claras

### ❌ O que NÃO PEGAMOS (valores não alinhados):

1. ❌ **Pressão Manipulativa**
   - "Você vai decepcionar a coruja!" → NÃO
   - Notificações agressivas → NÃO
   - Guilt trip → NÃO

2. ❌ **Competição Agressiva**
   - Ligas competitivas → NÃO (ou muito leve)
   - Comparação com outros → NÃO
   - "Você está perdendo" → NÃO

3. ❌ **Paywall para Gamificação**
   - Conquistas = gratuitas para todos
   - Não bloquear progresso com paywall
   - Premium é conteúdo, não mecânica

---

## 🌱 Adaptação Espiritual: Nossa Linguagem

### 🗣️ Glossário: Do Gamer para o Espiritual

| Duolingo (Técnico) | Diário com Deus (Acolhedor) |
|-------------------|------------------------------|
| XP Points | **Momentos com Deus** |
| Level Up | **Sua jornada cresceu!** |
| Streak | **Dias seguidos** / **Sequência** |
| Achievement Unlocked | **Nova conquista da fé!** |
| Leaderboard | **Comunidade em crescimento** (opcional) |
| Streak Freeze | **Graça divina** / **Pausa acolhedora** |
| Daily Goal | **Compromisso diário** |
| Practice | **Revisar promessas** (favoritos) |

### 💬 Tom de Voz nas Notificações:

**❌ Não usar:**
- "Você está perdendo sua sequência!"
- "Última chance antes de perder tudo!"
- "Seus amigos estão na frente"

**✅ Usar:**
- "Deus te espera hoje 💙"
- "Que tal um momento especial agora?"
- "Sua paz está a um devocional de distância 😌"

---

## 🏆 Sistema de Conquistas

### Categorias:

1. **📍 Marcos Iniciais** (Milestones)
   - Primeiro devocional
   - 7, 30, 100, 365 devocionais

2. **🔥 Sequência de Dias** (Streak)
   - 3, 7, 14, 21, 30, 100, 365 dias

3. **📖 Temas Completos** (Theme Mastery)
   - Completou jornada de Ansiedade
   - Completou jornada de Gratidão
   - Completou jornada de Perdão
   - etc.

4. **✨ Especiais** (Special Achievements)
   - Madrugador (antes 7h)
   - Oração da Noite (depois 22h)
   - Mestre do Recomeço (voltou várias vezes)
   - Ouvinte da Palavra (usou áudio)
   - Guardador de Tesouros (fez anotações)

### Exemplo de Conquista:

```typescript
{
  title: '🙏 Primeiro Passo',
  description: 'Você completou seu primeiro momento com Deus!',
  icon: '🙏',
  points: 10, // "momentos"
}
```

---

## 📊 Níveis Espirituais (Spiritual Levels)

### Progressão Natural:

| Nível | Nome | Descrição | Momentos Necessários |
|-------|------|-----------|---------------------|
| 🌱 | **Semente** | Você está plantando sua fé | 0 - 49 |
| 🌿 | **Broto** | Sua fé está brotando! | 50 - 199 |
| 🌳 | **Árvore** | Você criou raízes profundas | 200 - 499 |
| 🌲 | **Bosque** | Sua vida espiritual é um refúgio | 500 - 999 |
| 🏞️ | **Floresta** | Você é uma floresta de fé! | 1000+ |

### Cálculo de Momentos:

- **+10 momentos** = Completar devocional simples
- **+15 momentos** = Madrugador ou noturno
- **+20 momentos** = Devocional com anotações
- **+50 momentos** = Completar tema inteiro
- **+100 momentos** = Completar trilha

---

## 🔥 Sistema de Sequência (Streak)

### Como Funciona:

1. **Devocional Diário = +1 dia**
   - Qualquer devocional conta
   - Não precisa ser no mesmo horário
   - Basta completar antes da meia-noite

2. **Visualização:**
   ```
   🔥 7 dias seguidos com Deus
   
   Dom  Seg  Ter  Qua  Qui  Sex  Sáb
    ✅   ✅   ✅   ✅   ✅   ✅   🔥
   ```

3. **Streak Freeze (Graça Divina):**
   - **1x por semana** = gratuito
   - Se falhar 1 dia, não perde a sequência
   - Reaparece após 7 dias
   - Visual: ❄️ ao lado do 🔥

4. **Recuperação de Sequência:**
   - Perdeu ontem? Pode resgatar por **50 momentos**
   - Disponível por 24h após perder
   - Máximo 1x por mês

### Mensagens:

**Sequência Ativa:**
> "🔥 7 dias seguidos! A constância está transformando você!"

**Sequência em Risco:**
> "😊 Não esqueça seu momento com Deus hoje!"

**Sequência Perdida (sem culpa!):**
> "Sua sequência pausou, mas não tem problema! Cada dia é uma nova chance 🌅"

**Sequência Recuperada:**
> "Você voltou! Isso é o que importa 🙌"

---

## 📈 Dashboard de Progresso

### Elementos Visuais:

1. **Heatmap de Atividade**
   ```
   Jan  Fev  Mar  Abr  Mai  Jun
   ▓▓░░▓▓▓░░░▓▓▓▓░░▓▓▓▓▓▓░░▓
   
   ░ = Nenhum devocional
   ▓ = Devocional feito
   ▓▓ = Múltiplos devocionais
   ```

2. **Estatísticas:**
   - 📊 **127 momentos** com Deus
   - 🔥 **7 dias** seguidos
   - ⏱️ **18 horas** em oração total
   - 🌳 Nível: **Árvore** (57% para Bosque)

3. **Conquistas Recentes:**
   ```
   [🔥] Semana Constante - há 2 dias
   [📖] 30 Devocionais - há 1 semana
   [🌄] Madrugador - há 3 dias
   ```

4. **Temas Favoritos:**
   ```
   😌 Ansiedade ▓▓▓▓▓▓▓ 7/7
   🙌 Gratidão  ▓▓▓▓░░░ 4/7
   💜 Perdão    ▓▓░░░░░ 2/7
   ```

---

## 🎁 Recompensas e Incentivos

### Quando Desbloquear Conquista:

**Modal de Celebração:**
```
┌────────────────────────────┐
│           🎉               │
│                            │
│   Nova Conquista da Fé!    │
│                            │
│   🔥 Semana Constante      │
│                            │
│   7 dias seguidos!         │
│   A constância transforma. │
│                            │
│   +50 momentos             │
│                            │
│   [Continuar Brilhando] 💫 │
└────────────────────────────┘
```

**Animação:**
- Confetes caindo
- Áudio sutil (opcional, desligável)
- Haptic feedback no mobile

### Quando Subir de Nível:

**Modal de Nível:**
```
┌────────────────────────────┐
│           ✨               │
│                            │
│   Sua jornada cresceu!     │
│                            │
│    🌱 Semente → 🌿 Broto   │
│                            │
│   Sua fé está brotando!    │
│   A constância faz você    │
│   crescer.                 │
│                            │
│   [Que lindo! 💚]          │
└────────────────────────────┘
```

---

## 🔔 Notificações (Gentis, Nunca Agressivas)

### Timing:

1. **Lembretes Diários** (configurável)
   - Horário escolhido pelo usuário
   - "Deus te espera hoje 💙"
   - Desligável 100%

2. **Sequência em Risco**
   - Se não fez hoje
   - Envia às 20h (gentil)
   - "Que tal um momento especial hoje?"

3. **Comeback (Volta após 3+ dias)**
   - "Sentimos sua falta! Sem culpa, só acolhimento 💙"

4. **Nova Conquista**
   - "Você desbloqueou: 🔥 Semana Constante!"

### Opt-out Total:

- Usuário pode desligar TUDO
- Sem penalidade
- Sem mensagens manipulativas

---

## 🎯 Métricas de Sucesso

### KPIs da Gamificação:

1. **Taxa de Retenção D7/D30**
   - Meta: 40% D7, 20% D30
   - Com gamificação: esperado +15-20%

2. **Streak Médio**
   - Meta: 5 dias (sem gamificação: 2 dias)
   - Com gamificação: esperado 7-10 dias

3. **Taxa de Comeback**
   - Usuários que voltam após 7+ dias
   - Meta: 25%
   - Com gamificação: esperado 35%

4. **Engajamento com Conquistas**
   - % usuários que veem conquistas desbloqueadas
   - Meta: 80%+

5. **NPS (Net Promoter Score)**
   - Meta: 50+ (excelente)
   - Gamificação deve AUMENTAR, não diminuir

---

## 🚀 Implementação Técnica

### Arquivos Principais:

```
src/lib/achievements.ts          # Sistema de conquistas
src/lib/gamification.ts          # Lógica de streak, níveis, etc
src/components/AchievementModal.tsx  # Modal de celebração
src/components/StreakDisplay.tsx     # Visualização de streak
src/components/LevelProgress.tsx     # Barra de nível
src/app/progresso/page.tsx          # Dashboard completo
```

### Banco de Dados:

```sql
user_stats              # streak, nível, momentos
user_achievements       # conquistas desbloqueadas
user_progress           # histórico de devocionais
```

### Fluxo de Dados:

1. **Usuário completa devocional**
   ↓
2. **Salva em `user_progress`**
   ↓
3. **Atualiza `user_stats`**
   - Incrementa `total_moments`
   - Atualiza `current_streak`
   - Recalcula `spiritual_level`
   ↓
4. **Verifica novas conquistas**
   - `checkNewAchievements()`
   - Salva em `user_achievements`
   ↓
5. **Mostra modais de celebração**
   - Confetes
   - Animações
   - Mensagens motivacionais

---

## 🎨 Design Visual

### Cores da Gamificação:

| Elemento | Cor | Uso |
|----------|-----|-----|
| Streak 🔥 | `#ef4444` | Vermelho/laranja (fogo) |
| Momentos ⭐ | `#fbbf24` | Dourado (estrela) |
| Nível 🌱 | `#22c55e` | Verde (crescimento) |
| Conquista 🏆 | `#8b5cf6` | Roxo (especial) |
| Freeze ❄️ | `#3b82f6` | Azul (gelo) |

### Animações:

- **Confetes:** ao desbloquear conquista
- **Brilho:** ao subir de nível
- **Shake:** ao perder sequência (suave)
- **Pulse:** streak em risco (gentil)

---

## 📱 Mobile-First

### Interações Touch:

- **Swipe left** em conquista = Ver detalhes
- **Long press** em streak = Ver histórico
- **Tap** em nível = Ver progresso detalhado
- **Pull to refresh** no dashboard

### Haptic Feedback:

- Vibração leve ao completar devocional
- Vibração média ao desbloquear conquista
- Vibração forte ao subir de nível

---

## 🧪 A/B Tests Planejados

### Testes Futuros:

1. **Streak Freeze:**
   - A: 1x por semana (gratuito)
   - B: 2x por semana (premium)
   - Hipótese: B aumenta conversão premium

2. **Frequência de Notificações:**
   - A: 1x por dia
   - B: 2x por dia (manhã + noite)
   - Hipótese: A tem melhor NPS

3. **Tom das Mensagens:**
   - A: Acolhedor ("sem culpa")
   - B: Motivacional ("você consegue!")
   - Hipótese: A tem melhor retenção

4. **Visual de Conquistas:**
   - A: Modal fullscreen (atual)
   - B: Toast + página de conquistas
   - Hipótese: B menos intrusivo, melhor UX

---

## 📚 Referências e Inspirações

### Apps Estudados:

1. **Duolingo** ⭐⭐⭐⭐⭐
   - Streak system
   - Níveis e XP
   - Conquistas visuais

2. **Headspace** 🧘
   - Tom calmo e acolhedor
   - Progresso visual suave
   - Sem pressão

3. **Habitica** ⚔️
   - RPG-style progression
   - Personagem que evolui
   - (Não usaremos, mas inspiração)

4. **Apple Fitness** 🏃
   - Anéis de atividade
   - Conquistas mensais
   - Compartilhamento gentil

### O Que Aprendemos:

- ✅ **Duolingo:** Streak funciona (mas sem guilt trip)
- ✅ **Headspace:** Tom importa (acolhimento > competição)
- ✅ **Apple:** Visual limpo motiva
- ❌ **Habitica:** Muito complexo (não é nosso público)

---

## 🎯 Golden Rule da Gamificação

> **"Motivar SEM manipular. Celebrar SEM pressionar. Acolher SEM julgar."**

Toda feature de gamificação deve passar pelo filtro:

1. **Isso ajuda a pessoa crescer espiritualmente?** ✅
2. **Isso gera culpa ou ansiedade?** ❌
3. **Isso alinha com "sem culpa, só recomeço"?** ✅
4. **Isso funciona para nossas personas?** ✅
   - Juliana (mãe ocupada)
   - Rafael (profissional ansioso)
   - Carla (iniciante curiosa)

Se QUALQUER resposta for negativa → NÃO IMPLEMENTAR.

---

**Status**: ✅ PLANEJAMENTO COMPLETO  
**Próximo Passo**: Implementação do backend (Supabase) e frontend  
**Impacto Esperado**: +20% retenção D30, +30% engajamento diário

