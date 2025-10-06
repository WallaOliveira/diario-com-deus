# 🏗️ Arquitetura do Projeto - Diário com Deus

## 📐 Visão Geral

Webapp moderno de devocional cristão, construído com foco em performance, escalabilidade e experiência mobile-first.

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** (App Router) - Framework React com SSR
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Zustand** - Gerenciamento de estado global
- **React Icons** - Biblioteca de ícones

### Backend & Database
- **Supabase** (PostgreSQL + Auth)
  - Autenticação segura (email/senha)
  - Database PostgreSQL gerenciado
  - Row Level Security (RLS)
  - API automática RESTful

### Deploy & Hospedagem
- **Vercel** - Deploy frontend (gratuito)
- **Supabase** - Backend (500MB free)

### PWA (Progressive Web App)
- **Service Worker** - Cache offline
- **Manifest.json** - Instalável no celular
- **Web Speech API** - Text-to-speech gratuito

## 📁 Estrutura de Pastas

```
diario-com-deus/
│
├── public/                          # Arquivos estáticos
│   ├── manifest.json               # PWA manifest
│   ├── icon-192.png                # Ícone PWA (192x192)
│   └── icon-512.png                # Ícone PWA (512x512)
│
├── src/
│   ├── app/                        # Páginas (Next.js 14 App Router)
│   │   ├── layout.tsx              # Layout global
│   │   ├── page.tsx                # Home (landing)
│   │   ├── globals.css             # Estilos globais
│   │   │
│   │   ├── login/                  # Autenticação
│   │   │   └── page.tsx
│   │   ├── registro/
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/              # Dashboard principal
│   │   │   └── page.tsx
│   │   │
│   │   ├── sessao-express/         # Devocional guiado
│   │   │   └── page.tsx
│   │   ├── trilhas/                # Jornadas de 7/14/30 dias
│   │   │   └── page.tsx
│   │   ├── modo-livre/             # Busca por tema/estado
│   │   │   └── page.tsx
│   │   ├── minha-semana/           # Progresso semanal
│   │   │   └── page.tsx
│   │   └── voltei-hoje/            # Recomeço sem culpa
│   │       └── page.tsx
│   │
│   ├── lib/                        # Configurações e utilitários
│   │   └── supabase.ts             # Cliente Supabase + Types
│   │
│   └── store/                      # Estado global (Zustand)
│       ├── useAuthStore.ts         # Auth (login, logout, user)
│       └── useProgressStore.ts     # Progresso (streak, completedToday)
│
├── .env.example                    # Template de variáveis
├── .env.local                      # Variáveis locais (não commitar)
├── package.json                    # Dependências
├── tsconfig.json                   # Config TypeScript
├── tailwind.config.ts              # Config Tailwind
├── next.config.js                  # Config Next.js
├── README.md                       # Documentação principal
├── GUIA-RAPIDO.md                  # Como rodar rapidamente
└── ARCHITECTURE.md                 # Este arquivo
```

## 🔐 Fluxo de Autenticação

```
1. Usuário acessa / (home)
2. Clica "Entrar" → /login
3. Digita email/senha
4. useAuthStore.signIn() chama Supabase
5. Se sucesso:
   - Supabase retorna session token
   - useAuthStore salva user no state
   - Redireciona para /dashboard
6. Páginas protegidas verificam user:
   - Se null → redireciona /login
   - Se valid → renderiza conteúdo
```

## 📊 Fluxo de Progresso

```
1. Usuário completa devocional
2. useProgressStore.markComplete() salva no Supabase
3. Atualiza:
   - completedToday: true
   - streak: +1 (se sequencial)
4. Dashboard mostra badge de "Concluído hoje"
5. Minha Semana reflete progresso visual
```

## 🗄️ Schema do Banco (Supabase)

### Tabela: `user_progress`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | PK, auto-gerado |
| user_id | UUID | FK → auth.users(id) |
| devotional_id | TEXT | ID do devocional completado |
| completed_at | TIMESTAMP | Data/hora de conclusão |
| notes | TEXT | Anotações opcionais do usuário |
| action_completed | BOOLEAN | Se fez a "Ação do Dia" |
| created_at | TIMESTAMP | Data de criação do registro |

**Políticas RLS:**
- Usuário só acessa próprios registros
- Só pode inserir com seu user_id

### Tabela: `auth.users` (nativa Supabase)

Gerenciada automaticamente pelo Supabase Auth.

## 🎨 Design System

### Cores Principais

```css
Primary (Laranja/Vermelho):
- 600: #cc3f39 (botões, CTAs)
- 700: #ab2f2f (hover)

Secondary (Azul):
- 500: #0ba5e9 (acentos)

Backgrounds:
- Gradiente: from-orange-50 via-white to-blue-50
```

### Componentes Reutilizáveis (CSS)

```css
.btn-primary     → Botão primário (laranja)
.btn-secondary   → Botão secundário (branco)
.card            → Card branco com sombra
.input-field     → Input estilizado
```

## 🚀 Fluxo de Deploy

### Desenvolvimento Local
```bash
npm run dev      # Roda em localhost:3000
```

### Deploy Produção (Vercel)

1. Conecta repositório GitHub
2. Vercel detecta Next.js automaticamente
3. Configura variáveis de ambiente:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_SITE_URL
4. Build automático em cada push
5. URL gerada: `https://seu-app.vercel.app`

## 📱 PWA - Como Funciona

### 1. Manifest.json
Define como app aparece quando instalado:
- Nome, ícones, cor de tema
- `display: "standalone"` (sem barra do navegador)

### 2. Service Worker (Futuro)
- Cache de assets (CSS, JS, imagens)
- Funcionamento offline
- Notificações push

### 3. Web Speech API
- Text-to-speech nativo do browser
- Voz feminina brasileira
- Zero custo de API externa

## 🔊 Sistema de Áudio

### Implementação Atual: Web Speech API

```typescript
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; // Velocidade
    window.speechSynthesis.speak(utterance);
  }
};
```

**Vantagens:**
- ✅ Gratuito
- ✅ Funciona offline
- ✅ Boa qualidade em português

**Desvantagens:**
- ❌ Voz robotizada (mas aceitável)
- ❌ Varia por browser/SO

### Alternativa Futura: ElevenLabs API

Para voz ultra-realista (R$0,006/min):

```typescript
const generateAudio = async (text: string) => {
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/{voice_id}', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return response.blob();
};
```

## 💰 Monetização

### Estrutura de Tiers (Futuro)

```
Básico (R$27):
- 9 temas
- Trilha 7 dias
- Progresso básico

Premium (R$47):
- TUDO do Básico
- Todas trilhas (14, 30 dias)
- Áudios conduzidos
- Grupo VIP

VIP (R$97):
- TUDO do Premium
- Trilhas exclusivas
- Mentoria 30min
```

### Ancoragem de Ofertas

Área **"Conteúdos Extras"** no dashboard:
- Trilhas especiais (Maternidade, Casamento, Luto)
- Livros digitais
- Workshops ao vivo

## 🔒 Segurança

### Proteção de Rotas
Todas páginas internas verificam autenticação:

```typescript
useEffect(() => {
  if (!loading && !user) {
    router.push('/login');
  }
}, [user, loading, router]);
```

### Row Level Security (RLS)
Políticas no Supabase garantem:
- Usuário só vê próprios dados
- Não pode modificar dados de outros

### Variáveis Sensíveis
- `.env.local` não vai pro Git
- Chaves no Vercel são criptografadas

## 📈 Performance

### Otimizações Aplicadas

1. **Next.js 14 App Router**
   - Server Components por padrão
   - Streaming SSR
   - Route prefetching automático

2. **Tailwind CSS**
   - PurgeCSS automático
   - CSS minificado
   - Zero runtime JS

3. **Zustand (State)**
   - Mais leve que Redux (1KB)
   - Re-renders otimizados

4. **Vercel Edge**
   - CDN global
   - Cache agressivo de static assets

### Métricas Alvo

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

## 🧪 Testing (Futuro)

```bash
# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e
```

## 🚧 Próximas Features

Ver `TODO.md` para roadmap completo.

### Curto Prazo (MVP)
- [ ] Seed de conteúdo (63 devocionais)
- [ ] Sistema de busca por referência bíblica
- [ ] Export de progresso (PDF)

### Médio Prazo
- [ ] Notificações push (PWA)
- [ ] Modo escuro
- [ ] Compartilhamento social

### Longo Prazo
- [ ] Planos pagos (Stripe)
- [ ] Comunidade (comentários)
- [ ] App nativo (React Native)

---

**Documentação mantida por:** Desenvolvimento (atualize ao modificar estrutura!)

**Última atualização:** Outubro 2025

