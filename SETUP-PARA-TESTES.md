# 🧪 SETUP PARA TESTES COM AMIGOS

## ✅ PASSO 1: CONFIGURAR SUPABASE (5 minutos)

### 1.1 Criar tabelas necessárias

Vá em: **Supabase Dashboard → SQL Editor → New Query**

Cole e execute este SQL:

```sql
-- Tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  devotional_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  feeling_before TEXT,
  feeling_after TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed_at ON user_progress(completed_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (usuário só vê seus próprios dados)
CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Tabela de devocionais (opcional para MVP)
CREATE TABLE IF NOT EXISTS devotionals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  bible_reference TEXT NOT NULL,
  bible_text TEXT NOT NULL,
  reflection TEXT NOT NULL,
  action TEXT NOT NULL,
  prayer TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir 3 devocionais de exemplo
INSERT INTO devotionals (id, title, theme, bible_reference, bible_text, reflection, action, prayer) VALUES
(
  'ansiedade-1',
  'Paz em meio à ansiedade',
  'Ansiedade',
  'Filipenses 4:6-7',
  'Não andeis ansiosos de coisa alguma; mas em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.',
  'Em momentos de preocupação, a Palavra de Deus nos traz paz. Não é sobre negar a ansiedade, mas sobre entregar ela a Deus e receber Sua paz em troca.',
  'Dedique 2 minutos para orar especificamente sobre uma preocupação que você tem hoje. Entregue ela a Deus e descanse.',
  'Senhor, entrego minhas ansiedades em Tuas mãos. Que Tua paz, que excede todo entendimento, guarde meu coração e minha mente em Cristo Jesus. Amém.'
),
(
  'gratidao-1',
  'O poder da gratidão',
  'Gratidão',
  '1 Tessalonicenses 5:16-18',
  'Alegrai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.',
  'A gratidão transforma nossa perspectiva. Mesmo em dias difíceis, há motivos para agradecer. Deus está presente em cada detalhe.',
  'Liste 3 coisas pelas quais você é grato(a) hoje. Agradeça a Deus por cada uma delas.',
  'Pai, obrigado por Tua presença constante em minha vida. Ajuda-me a enxergar Tuas bênçãos mesmo nos momentos difíceis. Amém.'
),
(
  'proposito-1',
  'Seu propósito em Deus',
  'Propósito',
  'Jeremias 29:11',
  'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
  'Deus tem planos para você. Não são planos de destruição, mas de esperança e futuro. Confie no timing dEle.',
  'Reflita: Onde você sente que Deus está te direcionando? Escreva uma oração pedindo clareza sobre seu propósito.',
  'Senhor, confio que tens planos bons para mim. Mostra-me o caminho e dá-me sabedoria para seguir Tua direção. Amém.'
)
ON CONFLICT (id) DO NOTHING;

-- Sucesso!
SELECT 'Banco de dados configurado com sucesso! ✅' AS status;
```

### 1.2 Verificar configuração de autenticação

Vá em: **Supabase → Authentication → Settings**

Certifique-se que:
- ✅ **Enable Email Confirmations** está **DESLIGADO** (para testes mais rápidos)
- ✅ **Site URL** está configurado (deixe o padrão por enquanto, ajustaremos depois)

---

## ✅ PASSO 2: CONFIGURAR VARIÁVEIS DE AMBIENTE

### 2.1 Criar arquivo `.env.local`

No seu projeto `/tmp/diario-com-deus`, crie/edite o arquivo `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Onde encontrar as chaves:**
1. Vá em: **Supabase Dashboard → Settings → API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** (chave pública) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ✅ PASSO 3: DEPLOY NA VERCEL (5 minutos)

### 3.1 Criar conta na Vercel (se ainda não tiver)

1. Acesse: https://vercel.com
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub** (recomendado)

### 3.2 Subir o projeto para GitHub

**Opção A - Via GitHub Desktop (mais fácil):**
1. Baixe: https://desktop.github.com
2. Abra o GitHub Desktop
3. File → Add Local Repository → Selecione `/tmp/diario-com-deus`
4. Publish Repository → Marque **Private** → Publish

**Opção B - Via Terminal:**
```bash
cd /tmp/diario-com-deus

# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial - Diário com Deus MVP"

# Criar repositório no GitHub e seguir instruções
# Ou use o GitHub CLI:
gh repo create diario-com-deus --private --source=. --remote=origin --push
```

### 3.3 Importar projeto na Vercel

1. Acesse: https://vercel.com/new
2. Clique em **Import Git Repository**
3. Selecione **diario-com-deus**
4. Configure:
   - **Framework Preset:** Next.js ✅ (detectado automaticamente)
   - **Root Directory:** `./` (deixe vazio)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. **Environment Variables** (IMPORTANTE):
   Adicione as 3 variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL = sua_url_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sua_chave_aqui
   NEXT_PUBLIC_SITE_URL = https://seu-app.vercel.app (ajustar depois)
   ```

6. Clique em **Deploy** 🚀

### 3.4 Aguardar build (2-3 minutos)

Você verá logs em tempo real. Quando aparecer:
```
✅ Build Completed
🎉 Deployment Ready
```

Copie o link: `https://diario-com-deus.vercel.app` (ou similar)

### 3.5 Atualizar Site URL no Supabase

1. Vá em: **Supabase → Authentication → URL Configuration**
2. Adicione em **Redirect URLs:**
   ```
   https://seu-app.vercel.app
   https://seu-app.vercel.app/dashboard
   ```

3. Atualize também na Vercel:
   - **Vercel Dashboard → Settings → Environment Variables**
   - Edite `NEXT_PUBLIC_SITE_URL` para `https://seu-app.vercel.app`
   - **Redeploy** (Deployments → ... → Redeploy)

---

## ✅ PASSO 4: TESTAR O APP

### 4.1 Acesse o link do Vercel

Exemplo: `https://diario-com-deus.vercel.app`

### 4.2 Crie sua primeira conta

1. Clique em **Criar Conta**
2. Preencha: nome, email, senha
3. Faça login
4. Complete o onboarding
5. Teste um devocional

### 4.3 Checklist de funcionalidades

- [ ] Criar conta funciona
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Tutorial aparece
- [ ] Sessão Express funciona
- [ ] Botão de ajuda abre
- [ ] Progresso é salvo
- [ ] Logout funciona

---

## ✅ PASSO 5: PREPARAR PARA TESTADORES

### 5.1 Criar documento de instruções

Compartilhe este guia com seus amigos:

```
🙏 DIÁRIO COM DEUS - TESTE BETA

Olá! Você foi convidado(a) para testar o Diário com Deus antes do lançamento oficial.

🔗 LINK DE ACESSO:
https://diario-com-deus.vercel.app

📱 COMO USAR:
1. Clique no link acima
2. Crie sua conta (email + senha)
3. Siga o tutorial inicial
4. Faça pelo menos 1 devocional completo
5. Explore as outras áreas

⏱️ TEMPO NECESSÁRIO:
Aproximadamente 10-15 minutos para testar tudo.

💬 DÊ SEU FEEDBACK:
Após testar, preencha este formulário:
[LINK DO FORMULÁRIO - criar no próximo passo]

🙏 Obrigado por ajudar a melhorar este projeto!
```

### 5.2 Criar formulário de feedback

**Sugestão de perguntas:**

1. **Qual é seu nome?** (texto curto)

2. **Qual seu WhatsApp?** (texto curto)
   - Formato: (11) 98765-4321
   - *Para contato direto sobre melhorias*

3. **O que você achou do design/visual?**
   - [ ] Adorei, está lindo!
   - [ ] Gostei, mas poderia melhorar
   - [ ] Não gostei muito
   - [ ] Precisa de uma reformulação

4. **A navegação foi intuitiva?**
   - [ ] Muito fácil de usar
   - [ ] Fácil, mas tive algumas dúvidas
   - [ ] Confuso em alguns pontos
   - [ ] Muito confuso

5. **O que você achou do conteúdo dos devocionais?**
   - [ ] Muito bom, me tocou
   - [ ] Bom, mas pode melhorar
   - [ ] Regular
   - [ ] Não gostei

6. **Você usaria este app diariamente?**
   - [ ] Com certeza!
   - [ ] Provavelmente sim
   - [ ] Talvez
   - [ ] Não

7. **Quanto você pagaria por uma assinatura mensal?**
   - [ ] R$ 9,90/mês
   - [ ] R$ 19,90/mês
   - [ ] R$ 27,90/mês
   - [ ] Não pagaria

8. **O que você MAIS GOSTOU?** (texto longo)

9. **O que você MENOS GOSTOU?** (texto longo)

10. **Sugestões de melhoria:** (texto longo)

11. **Algo que faltou ou que você esperava encontrar?** (texto longo)

**Criar formulário em:**
- Google Forms (grátis): https://forms.google.com
- Typeform (mais bonito): https://typeform.com (grátis até 100 respostas)
- Tally.so (grátis, simples): https://tally.so

---

## ✅ PASSO 6: COMPARTILHAR COM AMIGOS

### 6.1 Mensagem sugerida (WhatsApp/Email)

```
Olá, [NOME]! 👋

Estou lançando um app de devocionais diários e gostaria muito da sua opinião antes do lançamento oficial.

📱 É um webapp (funciona no navegador, não precisa instalar)

⏱️ Leva só 10-15 minutos para testar

🎁 Você terá acesso gratuito vitalício por ajudar no teste!

🔗 Link para acessar:
https://diario-com-deus.vercel.app

📝 Depois de testar, me dê seu feedback aqui:
[LINK DO FORMULÁRIO]

Sua opinião é MUITO importante para mim! 🙏

Pode ser sincero(a), quero melhorar o máximo possível antes de lançar.

Obrigado!
```

### 6.2 Quantos testadores?

**Recomendado:** 10-20 pessoas
- Diversidade de idade (20-60 anos)
- Diversidade de tech-savviness (iniciantes + experientes)
- Homens e mulheres
- Cristãos praticantes + afastados

---

## ✅ PASSO 7: MONITORAR TESTES

### 7.1 Criar planilha de controle

Nome | WhatsApp | Email | Testou? | Feedback? | Notas
-----|----------|-------|---------|-----------|------
João | (11) 91234-5678 | joao@email.com | ✅ | ✅ | Adorou o design
Maria | (11) 98765-4321 | maria@email.com | ✅ | ❌ | Enviar lembrete WhatsApp
Pedro | (11) 99999-8888 | pedro@email.com | ❌ | ❌ | Não acessou ainda

### 7.2 Acompanhar logs no Supabase

Vá em: **Supabase → Table Editor → user_progress**

Você verá:
- Quantos usuários criaram conta
- Quantos completaram devocionais
- Quais funções estão sendo mais usadas

---

## 🚨 TROUBLESHOOTING

### Erro: "Auth session missing"
**Solução:** Atualizar `NEXT_PUBLIC_SITE_URL` no Vercel e Supabase

### Erro: "Failed to fetch"
**Solução:** Verificar se as keys do Supabase estão corretas

### Build falhou na Vercel
**Solução:** Verificar logs, geralmente é variável de ambiente faltando

### Usuários não conseguem criar conta
**Solução:** 
1. Supabase → Authentication → Settings
2. Desabilitar "Email Confirmations"

---

## ✅ CHECKLIST FINAL

Antes de compartilhar, garanta:

- [ ] App está acessível via link do Vercel
- [ ] Consegue criar conta
- [ ] Consegue fazer login
- [ ] Dashboard carrega
- [ ] Devocional funciona
- [ ] Formulário de feedback criado
- [ ] Mensagem de convite preparada
- [ ] Lista de testadores definida

---

## 🎯 PRÓXIMOS PASSOS (APÓS TESTES)

1. **Compilar feedback** (1-2 dias)
2. **Priorizar melhorias** (urgente vs. opcional)
3. **Implementar ajustes** (1 semana)
4. **Testar novamente** (com mesmas pessoas)
5. **Lançamento oficial** 🚀

---

**Boa sorte com os testes!** 🙏

Se tiver dúvidas, documente tudo para ajustarmos juntos.

