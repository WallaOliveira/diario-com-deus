# 👀 Como Visualizar o App AGORA

## ⚡ Modo Rápido (5 minutos)

Execute estes comandos no terminal:

```bash
cd /tmp/diario-com-deus

npm install

# Cria config temporária (sem autenticação real)
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key-for-demo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

npm run dev
```

✅ Abra no navegador: **http://localhost:3000**

---

## 📱 O que você verá:

### ✅ Funcionando PERFEITAMENTE:
- **Landing page** (linda, com gradiente)
- **Design de todas as páginas**
- **Navegação entre telas**
- **Sessão Express** (devocional de 5 steps)
- **Áudio text-to-speech** (funciona!)
- **Trilhas, Modo Livre, Minha Semana**
- **Voltei Hoje** (página roxa linda)
- **Responsive** (funciona no celular)

### ⚠️ NÃO funciona (sem Supabase real):
- Login/registro (redirect para erro)
- Progresso real salvo no banco
- Streak persistente

---

## 🎯 Para VER TUDO funcionando (15 minutos)

### 1. Criar conta Supabase (gratuita)

1. Acesse [supabase.com](https://supabase.com)
2. Clique "Start your project"
3. Login com GitHub (mais rápido)
4. "New Project"
   - Nome: diario-com-deus
   - Database Password: (escolha uma senha forte)
   - Region: South America (São Paulo)
5. Aguarde 2 minutos (ele cria o banco)

### 2. Copiar credenciais

1. No Supabase, vá em **Settings** (ícone engrenagem)
2. **API** no menu lateral
3. Copie:
   - **Project URL** (algo como `https://abcd1234.supabase.co`)
   - **anon public** key (longa string que começa com `eyJ...`)

### 3. Configurar no app

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seuprojeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (sua chave completa)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Criar tabela

No Supabase:
1. Vá em **SQL Editor**
2. Cole este código:

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

3. Clique "Run"

### 5. Rodar o app

```bash
npm run dev
```

Agora **TUDO funciona**:
- ✅ Criar conta
- ✅ Login
- ✅ Salvar progresso
- ✅ Streak persistente
- ✅ Histórico de devocionais

---

## 📱 Ver no Celular

1. No terminal, veja o IP local:
   ```
   Local:   http://localhost:3000
   Network: http://192.168.0.15:3000  ← Use este
   ```

2. No celular:
   - Conecte na mesma rede Wi-Fi
   - Abra o navegador
   - Digite o IP (ex: `192.168.0.15:3000`)

3. Teste instalar:
   - **Android**: Menu (3 pontos) > "Adicionar à tela inicial"
   - **iOS**: Botão Compartilhar > "Adicionar à Tela de Início"

---

## 🎨 Quer Mudar Cores?

Edite `tailwind.config.ts`:

```typescript
primary: {
  600: '#cc3f39',  // ← Sua cor aqui (hex)
}
```

Salve e o app atualiza automaticamente!

---

## 🆘 Problemas?

### "Cannot find module..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
# Depois acesse: http://localhost:3001
```

### "Supabase error"
- Verifique se copiou as credenciais certas
- Verifique se executou o SQL
- Tente criar conta no app (vai aparecer erro específico)

### Ainda com dúvida?
Veja **README.md** ou **GUIA-RAPIDO.md**

---

## 🎉 Pronto!

Agora você tem um **webapp devocional profissional** rodando localmente!

**Próximo passo:** Criar os 63 devocionais (ver TODO.md)

---

Bom trabalho! 💙

