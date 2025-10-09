# 🔧 ESPECIFICAÇÕES TÉCNICAS - IMPLEMENTAÇÃO

**Data**: 09/10/2025  
**Para**: Dia 2-5 (Implementação)  
**Objetivo**: Guia técnico completo para implementar devocional + trilhas

---

## 📊 ARQUITETURA DE DADOS

### 1. TABELAS SUPABASE (Schema)

#### Tabela: `devotionals`
```sql
CREATE TABLE devotionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(200) NOT NULL,
  tema VARCHAR(100),
  tags TEXT[],
  tempo_estimado INTEGER DEFAULT 7, -- minutos
  texto_biblico JSONB NOT NULL, -- {referencia, versao, conteudo}
  mensagem_respira TEXT NOT NULL,
  contexto TEXT,
  reflexoes JSONB NOT NULL, -- array de perguntas
  oracao_sugerida TEXT NOT NULL,
  versiculo_destaque TEXT NOT NULL,
  persona_alvo VARCHAR(50), -- 'maria', 'joao', 'ana'
  dor_resolve VARCHAR(100),
  desejo_atende VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela: `trails` (Trilhas)
```sql
CREATE TABLE trails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT NOT NULL,
  promessa TEXT NOT NULL,
  duracao_dias INTEGER NOT NULL,
  tempo_por_dia INTEGER DEFAULT 7,
  tema VARCHAR(100),
  nivel_dificuldade VARCHAR(20) DEFAULT 'iniciante', -- iniciante, intermediario, avancado
  ordem_exibicao INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  total_completados INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela: `trail_days` (Dias da Trilha)
```sql
CREATE TABLE trail_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trail_id UUID REFERENCES trails(id) ON DELETE CASCADE,
  dia_numero INTEGER NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  devotional_id UUID REFERENCES devotionals(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(trail_id, dia_numero)
);
```

#### Tabela: `user_trail_progress` (Progresso do Usuário)
```sql
CREATE TABLE user_trail_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trail_id UUID REFERENCES trails(id) ON DELETE CASCADE,
  dia_atual INTEGER DEFAULT 1,
  dias_completados INTEGER[] DEFAULT '{}',
  data_inicio DATE NOT NULL,
  data_conclusao DATE,
  status VARCHAR(20) DEFAULT 'em_andamento', -- em_andamento, completada, abandonada
  tempo_total_minutos INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, trail_id)
);
```

#### Tabela: `user_devotional_history` (Histórico)
```sql
CREATE TABLE user_devotional_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  devotional_id UUID REFERENCES devotionals(id),
  trail_id UUID REFERENCES trails(id), -- NULL se for devocional do dia
  dia_trilha INTEGER, -- NULL se for devocional do dia
  tempo_gasto_minutos INTEGER,
  anotacoes TEXT,
  versiculos_favoritados TEXT[],
  completado_em TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 ROW LEVEL SECURITY (RLS)

### Políticas de Segurança:

```sql
-- Devotionals: Todos leem, só admin escreve
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read devotionals"
  ON devotionals FOR SELECT
  USING (true);

-- Trails: Todos leem, só admin escreve
ALTER TABLE trails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read trails"
  ON trails FOR SELECT
  USING (true);

-- Trail Days: Todos leem, só admin escreve
ALTER TABLE trail_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read trail days"
  ON trail_days FOR SELECT
  USING (true);

-- User Trail Progress: Usuário só vê/edita seus dados
ALTER TABLE user_trail_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trail progress"
  ON user_trail_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trail progress"
  ON user_trail_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trail progress"
  ON user_trail_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- User Devotional History: Usuário só vê/edita seus dados
ALTER TABLE user_devotional_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own devotional history"
  ON user_devotional_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own devotional history"
  ON user_devotional_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 📁 ESTRUTURA DE ARQUIVOS (Next.js)

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx ← Refatorar (check-in + recomendação)
│   ├── devocional/
│   │   ├── [id]/
│   │   │   └── page.tsx ← Novo (fluxo 4 passos)
│   │   └── page.tsx ← Lista de devocionais
│   └── trilhas/
│       ├── [id]/
│       │   ├── page.tsx ← Detalhes da trilha
│       │   └── dia/[numero]/page.tsx ← Dia específico
│       └── page.tsx ← Lista de trilhas
│
├── components/
│   ├── devocional/
│   │   ├── PassoLe.tsx ← Novo
│   │   ├── PassoReflete.tsx ← Novo
│   │   ├── PassoAnota.tsx ← Novo
│   │   ├── PassoOra.tsx ← Novo
│   │   └── ProgressBar.tsx ← Barra 1/4, 2/4...
│   ├── CheckInEmocional.tsx ← Novo
│   ├── RecomendacaoPersonalizada.tsx ← Novo
│   └── CertificadoTrilha.tsx ← Novo
│
├── lib/
│   ├── devotionals.ts ← Funções de devocional
│   ├── trails.ts ← Funções de trilhas
│   ├── recommendations.ts ← Lógica de recomendação
│   └── timer.ts ← Cronômetro
│
└── types/
    ├── devotional.ts ← Tipos TypeScript
    └── trail.ts ← Tipos TypeScript
```

---

## 🎨 COMPONENTES PRINCIPAIS

### 1. CheckInEmocional.tsx

```typescript
'use client';

import { useState } from 'react';

interface CheckInEmocionalProps {
  onSelect: (emocao: string) => void;
}

export default function CheckInEmocional({ onSelect }: CheckInEmocionalProps) {
  const emocoes = [
    { id: 'ansiosa', emoji: '😰', label: 'Ansiosa' },
    { id: 'grata', emoji: '😊', label: 'Grata' },
    { id: 'cansada', emoji: '😔', label: 'Cansada' },
    { id: 'esperancosa', emoji: '🙏', label: 'Esperançosa' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">
        Como você está se sentindo hoje?
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {emocoes.map((emocao) => (
          <button
            key={emocao.id}
            onClick={() => onSelect(emocao.id)}
            className="p-4 rounded-xl border-2 hover:border-gold transition"
          >
            <span className="text-3xl">{emocao.emoji}</span>
            <p className="mt-2">{emocao.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

### 2. PassoLe.tsx

```typescript
'use client';

import { useState } from 'react';

interface PassoLeProps {
  mensagemRespira: string;
  textoBiblico: {
    referencia: string;
    conteudo: string;
  };
  contexto?: string;
  onContinuar: () => void;
}

export default function PassoLe({
  mensagemRespira,
  textoBiblico,
  contexto,
  onContinuar
}: PassoLeProps) {
  const [mostrarContexto, setMostrarContexto] = useState(false);

  return (
    <div className="space-y-6">
      {/* Progressão */}
      <div className="text-sm text-muted">Passo 1 de 4: Leia</div>

      {/* Mensagem Respira */}
      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {mensagemRespira}
        </p>
      </div>

      {/* Texto Bíblico */}
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold text-gold">
          {textoBiblico.referencia}
        </h3>
        <p className="text-lg leading-relaxed italic">
          "{textoBiblico.conteudo}"
        </p>
      </div>

      {/* Contexto (expansível) */}
      {contexto && (
        <div>
          <button
            onClick={() => setMostrarContexto(!mostrarContexto)}
            className="flex items-center gap-2 text-gold hover:opacity-80"
          >
            💡 {mostrarContexto ? 'Ocultar' : 'Entenda o contexto'}
          </button>
          {mostrarContexto && (
            <div className="mt-3 p-4 bg-gold/10 rounded-xl border border-gold/30">
              <p className="leading-relaxed">{contexto}</p>
            </div>
          )}
        </div>
      )}

      {/* Botão Continuar */}
      <button
        onClick={onContinuar}
        className="w-full py-4 bg-gold text-dark font-semibold rounded-xl hover:opacity-90 transition"
      >
        Continuar
      </button>
    </div>
  );
}
```

---

### 3. RecomendacaoPersonalizada.tsx

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getRecommendation } from '@/lib/recommendations';

interface RecomendacaoProps {
  emocao: string;
  userId: string;
}

export default function RecomendacaoPersonalizada({ emocao, userId }: RecomendacaoProps) {
  const [recomendacao, setRecomendacao] = useState<any>(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const rec = await getRecommendation(emocao, userId);
      setRecomendacao(rec);
    };
    fetchRecommendation();
  }, [emocao, userId]);

  if (!recomendacao) return null;

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-500/30">
      <h3 className="text-sm text-muted mb-2">💙 Recomendado para você</h3>
      <h2 className="text-2xl font-serif font-semibold mb-2">
        {recomendacao.titulo}
      </h2>
      <p className="text-muted mb-4">{recomendacao.promessa}</p>
      <div className="flex items-center gap-4 text-sm text-muted mb-4">
        <span>⏱️ {recomendacao.tempo} min/dia</span>
        <span>• {recomendacao.duracao} dias</span>
      </div>
      <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition">
        Iniciar trilha
      </button>
    </div>
  );
}
```

---

## 🔧 FUNÇÕES AUXILIARES

### lib/recommendations.ts

```typescript
export async function getRecommendation(emocao: string, userId: string) {
  const recomendacoes = {
    ansiosa: {
      type: 'trail',
      id: 'paz_interior_7d',
      titulo: 'Trilha: 7 Dias de Paz Interior',
      promessa: 'Acalme sua mente e coração',
      tempo: 7,
      duracao: 7
    },
    cansada: {
      type: 'devotional',
      id: 'descanso_em_deus',
      titulo: 'Devocional: Descanse em Deus',
      promessa: 'Encontre descanso verdadeiro',
      tempo: 7,
      duracao: 1
    },
    grata: {
      type: 'devotional',
      id: 'gratidao_transforma',
      titulo: 'Devocional: Gratidão que Transforma',
      promessa: 'Cultive um coração grato',
      tempo: 7,
      duracao: 1
    },
    esperancosa: {
      type: 'trail',
      id: 'proposito_21d',
      titulo: 'Trilha: 21 Dias de Propósito',
      promessa: 'Descubra o plano de Deus',
      tempo: 10,
      duracao: 21
    }
  };

  return recomendacoes[emocao as keyof typeof recomendacoes] || recomendacoes.ansiosa;
}
```

---

### lib/timer.ts

```typescript
export class DevotionalTimer {
  private startTime: number = 0;
  private endTime: number = 0;

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.endTime = Date.now();
  }

  getMinutes(): number {
    const milliseconds = this.endTime - this.startTime;
    return Math.round(milliseconds / 1000 / 60);
  }

  reset() {
    this.startTime = 0;
    this.endTime = 0;
  }
}
```

---

## 🎯 LÓGICA DE NEGÓCIO

### Regras de Streak:

```typescript
// lib/streak.ts

export async function updateStreak(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  const stats = await getUserStats(userId);
  
  const lastDevotional = stats.last_devotional_date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = stats.streak;

  if (lastDevotional === yesterdayStr) {
    // Continuou a sequência
    newStreak = stats.streak + 1;
  } else if (lastDevotional !== today) {
    // Quebrou a sequência
    newStreak = 1;
  }
  // Se lastDevotional === today, já fez hoje, não muda

  await updateUserStats(userId, {
    streak: newStreak,
    last_devotional_date: today,
    total_devotionals: stats.total_devotionals + 1
  });

  return newStreak;
}
```

---

### Regras de Trilha:

```typescript
// lib/trails.ts

export async function canProgressTrail(userId: string, trailId: string): Promise<boolean> {
  const progress = await getUserTrailProgress(userId, trailId);
  
  if (!progress) return true; // Pode iniciar

  const today = new Date().toISOString().split('T')[0];
  const lastCompleted = progress.updated_at.split('T')[0];

  // Só pode avançar 1 dia por dia
  return lastCompleted !== today;
}

export async function completeTrailDay(userId: string, trailId: string, diaNumero: number) {
  const progress = await getUserTrailProgress(userId, trailId);
  
  const diasCompletados = [...progress.dias_completados, diaNumero];
  const diaAtual = diaNumero + 1;

  await updateUserTrailProgress(userId, trailId, {
    dia_atual: diaAtual,
    dias_completados: diasCompletados,
    updated_at: new Date().toISOString()
  });

  // Se completou todos os dias
  const trail = await getTrail(trailId);
  if (diasCompletados.length === trail.duracao_dias) {
    await completeTrail(userId, trailId);
  }
}
```

---

## 📊 SEED DATA (Para testar)

### Script: `seed-devotionals.ts`

```typescript
import { supabase } from '@/lib/supabase';

const devotionals = [
  {
    titulo: "Paz em Meio à Tempestade",
    tema: "ansiedade",
    tags: ["paz", "ansiedade", "confiança"],
    tempo_estimado: 7,
    texto_biblico: {
      referencia: "Filipenses 4:6-7",
      versao: "NVI",
      conteudo: "Não andem ansiosos por coisa alguma..."
    },
    mensagem_respira: "Respire fundo. Deus sabe que você está ansiosa...",
    contexto: "Paulo escreveu essa carta da prisão...",
    reflexoes: [
      "O que Deus está dizendo neste texto?",
      "O que isso significa para minha vida hoje?",
      "Qual ação prática posso tomar?"
    ],
    oracao_sugerida: "Pai, obrigado porque Tu sabes...",
    versiculo_destaque: "A paz de Deus, que excede todo entendimento...",
    persona_alvo: "maria",
    dor_resolve: "ansiedade_sobrecarga",
    desejo_atende: "paz_interior"
  }
  // ... mais devocionais
];

async function seedDevotionals() {
  for (const dev of devotionals) {
    const { error } = await supabase
      .from('devotionals')
      .insert(dev);
    
    if (error) console.error('Erro:', error);
    else console.log('✅ Devocional inserido:', dev.titulo);
  }
}

seedDevotionals();
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Dia 2 (Amanhã):
- [ ] Criar tabelas no Supabase
- [ ] Aplicar RLS
- [ ] Seed data (1 devocional)
- [ ] Componente CheckInEmocional
- [ ] Componente RecomendacaoPersonalizada
- [ ] Refatorar Dashboard

### Dia 3:
- [ ] Componente PassoLe
- [ ] Componente PassoReflete
- [ ] Componente PassoAnota
- [ ] Componente PassoOra
- [ ] Fluxo completo funcionando

### Dia 4:
- [ ] Seed trilha completa
- [ ] Lógica de progressão
- [ ] Página de detalhes da trilha
- [ ] Certificado de conclusão

### Dia 5:
- [ ] Testes completos
- [ ] Ajustes de UX
- [ ] Deploy staging

---

**Tudo pronto para implementar! 🚀**

