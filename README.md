# 📖 Diário com Deus - Webapp Devocional

> Devocional guiado em 7-10 minutos para sentir a presença de Deus diariamente. Sem culpa, só recomeço.

## 🚀 Como Rodar o Projeto

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2. Configurar Supabase (Backend Gratuito)

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Crie um novo projeto
3. Vá em **Settings** > **API**
4. Copie:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 3. Criar arquivo `.env.local`

```bash
cp .env.example .env.local
```

Edite `.env.local` e cole suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Criar Tabelas no Supabase

No painel do Supabase, vá em **SQL Editor** e execute:

```sql
-- Tabela de progresso do usuário
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  devotional_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  action_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_completed_at ON user_progress(completed_at);

-- Habilitar Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Política: usuário só acessa próprios dados
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 5. Rodar o Projeto

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador! 🎉

## 📱 Instalar como App no Celular

1. Abra o site no navegador do celular
2. **Android (Chrome)**: Menu > "Adicionar à tela inicial"
3. **iOS (Safari)**: Compartilhar > "Adicionar à Tela de Início"

## 🎯 Funcionalidades Principais

- ✅ Login/Registro seguro
- ✅ Dashboard com 4 atalhos principais
- ✅ Sessão Express (devocional guiado)
- ✅ Trilhas de 7, 14 e 30 dias
- ✅ Modo Livre (por tema/estado)
- ✅ Progresso semanal + streak
- ✅ "Voltei Hoje" (recomeço sem culpa)
- ✅ Área de Conteúdos Extras (upsell)
- ✅ PWA (instalável no celular)

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel (gratuito)
- **PWA**: Nativo (instalável)

## 📦 Deploy (100% Gratuito)

### Vercel (Recomendado)

1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente (.env)
4. Deploy automático! 🚀

## 📚 Estrutura de Pastas

```
diario-com-deus/
├── src/
│   ├── app/                 # Páginas (Next.js 14 App Router)
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── login/           # Login
│   │   ├── registro/        # Registro
│   │   └── ...
│   ├── components/          # Componentes reutilizáveis
│   ├── lib/                 # Configurações (Supabase)
│   └── store/               # Estado global (Zustand)
├── public/                  # Arquivos estáticos
└── README.md
```

## 🎨 Cores do Tema

- **Primary**: Laranja/Vermelho (#cc3f39)
- **Secondary**: Azul (#0ba5e9)
- **Background**: Gradiente suave (laranja → branco → azul)

## 💰 Modelo de Monetização

- **Básico** (R$27): 9 temas + Trilha 7 dias
- **Premium** (R$47): + Áudios + Todas trilhas + Grupo VIP
- **Extras**: Trilhas especiais R$17 cada

## 🔐 Segurança

- Autenticação via Supabase (segura e escalável)
- Row Level Security (RLS) no banco
- HTTPS automático (Vercel)
- Proteção de rotas no cliente

## 📈 Próximos Passos

Ver arquivo `TODO.md` para roadmap completo.

## 🆘 Suporte

Dúvidas? Entre em contato ou abra uma issue no GitHub.

---

Feito com ❤️ e oração para ajudar pessoas a se aproximarem de Deus

