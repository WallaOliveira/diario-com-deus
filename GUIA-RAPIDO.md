# 🚀 Guia Rápido - Ver o App Funcionando

## 📋 Pré-requisitos

Você precisa ter instalado:
- **Node.js** (versão 18 ou superior) → [baixar aqui](https://nodejs.org/)
- Um editor de código (VS Code recomendado)

## ⚡ Instalação em 3 Passos

### 1️⃣ Instalar Dependências

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

Aguarde 2-3 minutos para instalar todas as bibliotecas.

### 2️⃣ Configurar Supabase (Backend Gratuito)

**Opção A - Modo Desenvolvimento (SEM Supabase):**

Para testar rapidamente SEM configurar banco:

```bash
# Crie o arquivo .env.local
cp .env.example .env.local
```

Edite `.env.local` e coloque valores temporários:

```env
NEXT_PUBLIC_SUPABASE_URL=https://temp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=temp-key-123
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **Importante:** Assim a autenticação NÃO vai funcionar, mas você pode ver o design e navegação!

**Opção B - Com Supabase (Completo):**

1. Acesse [supabase.com](https://supabase.com) e crie conta gratuita
2. Clique em "New Project"
3. Escolha nome, senha e região (São Paulo se disponível)
4. Aguarde 2 minutos para criar
5. Vá em **Settings** > **API**
6. Copie:
   - `Project URL` 
   - `anon public` key
7. Cole no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seuprojeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-completa-aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

8. No Supabase, vá em **SQL Editor** e execute:

```sql
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  devotional_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  action_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_completed_at ON user_progress(completed_at);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 3️⃣ Rodar o Projeto

```bash
npm run dev
```

Abra no navegador: **http://localhost:3000**

## 🎉 Pronto!

Você verá:

✅ Tela inicial linda com gradiente  
✅ Login/Registro (se configurou Supabase)  
✅ Dashboard com 4 atalhos  
✅ Sessão Express (devocional guiado)  
✅ Trilhas, Modo Livre, Minha Semana  
✅ Voltei Hoje (recomeço sem culpa)  

## 📱 Testar no Celular

1. No terminal, veja o IP local (algo como `http://192.168.0.10:3000`)
2. No celular, conecte na mesma rede Wi-Fi
3. Abra o navegador e digite o IP
4. Teste instalar como app (adicionar à tela inicial)

## 🆘 Problemas Comuns

**"Cannot find module..."**
→ Rode `npm install` novamente

**"Supabase error"**
→ Verifique se copiou as credenciais certas no `.env.local`

**Página em branco**
→ Abra o console (F12) e veja erros

**Porta 3000 em uso**
→ Rode `npm run dev -- -p 3001` (usa porta 3001)

## 🚀 Próximos Passos

- Ver `README.md` para documentação completa
- Ver `ARCHITECTURE.md` para entender a estrutura
- Ver `TODO.md` para features pendentes

---

**Dúvidas?** Abra uma issue ou me chame! 💙

