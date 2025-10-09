# ✅ CHECKLIST COMPLETO - LANÇAMENTO MVP (até 1000 usuários)

**Objetivo**: Lançar PWA "Diário com Deus" com segurança, estabilidade e qualidade para 1000 usuários.

---

## 🎨 FASE 1: FINALIZAR UX/UI (EM ANDAMENTO)
**Prazo estimado**: 1-2 dias

### Dashboard Principal:
- [x] Título "Diário com Deus" com gradiente
- [x] Botões organizados verticalmente
- [x] Remover "Voltei Hoje"
- [x] Renomear "Bônus Gratuitos" → "Presentes para Você"
- [x] "Minha Evolução" já está correto
- [ ] Mover "Devocional Pessoal" para dentro de "Devocional do Dia"
- [ ] Mover "Meus Favoritos" para dentro de "Minha Evolução"

### Páginas Internas:
- [ ] Testar todas as páginas internas (sessao-express, modo-livre, trilhas, etc)
- [ ] Garantir navegação fluida entre páginas
- [ ] Verificar responsividade mobile (iPhone, Android)
- [ ] Testar PWA instalado vs browser

---

## 🔒 FASE 2: SEGURANÇA ESSENCIAL (CRÍTICO)
**Prazo estimado**: 2-3 dias

### 2.1 Supabase - Row Level Security (RLS)
**Status**: 🔴 CRÍTICO - Sem isso, dados de usuários ficam expostos

```sql
-- Aplicar no Supabase SQL Editor:

-- 1. Habilitar RLS em todas as tabelas
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 2. Políticas: usuário só vê seus próprios dados
CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Repetir para todas as tabelas...
```

**Tarefas**:
- [ ] Aplicar RLS em todas as tabelas
- [ ] Criar políticas de SELECT (usuário vê só seus dados)
- [ ] Criar políticas de INSERT/UPDATE (usuário só modifica seus dados)
- [ ] Testar que usuário A não vê dados do usuário B
- [ ] Documentar políticas criadas

### 2.2 Validação de Dados
- [ ] Validar emails no registro
- [ ] Validar comprimento de senhas (min 8 caracteres)
- [ ] Sanitizar inputs de texto (notas, comentários)
- [ ] Limitar tamanho de uploads (se houver)

### 2.3 Remover DEV_MODE
- [ ] Mudar `.env.local`: `NEXT_PUBLIC_DEV_MODE=false`
- [ ] Testar login/registro funcionando
- [ ] Testar recuperação de senha
- [ ] Verificar que não há bypass de autenticação

---

## 📊 FASE 3: MONITORAMENTO (IMPORTANTE)
**Prazo estimado**: 1 dia

### 3.1 Sentry (Monitoramento de Erros)
**Por quê**: Saber quando algo quebra antes dos usuários reclamarem

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Tarefas**:
- [ ] Instalar e configurar Sentry
- [ ] Testar que erros são capturados
- [ ] Configurar alertas por email
- [ ] Adicionar context (userId, página, ação)

### 3.2 Analytics Básico
- [ ] Google Analytics ou Vercel Analytics
- [ ] Eventos principais: registro, login, devocional completo
- [ ] Funil de conversão: visita → registro → primeiro devocional

---

## 🚀 FASE 4: PERFORMANCE (RECOMENDADO)
**Prazo estimado**: 1-2 dias

### 4.1 Otimizações Básicas
- [ ] Comprimir imagens (WebP)
- [ ] Lazy loading de componentes pesados
- [ ] Minificar CSS/JS (Next.js já faz)
- [ ] Verificar Lighthouse score (>90 em todas as métricas)

### 4.2 PWA
- [ ] Testar instalação em iOS (Safari)
- [ ] Testar instalação em Android (Chrome)
- [ ] Verificar ícones de todos os tamanhos
- [ ] Testar modo offline básico
- [ ] Splash screen funcionando

---

## 🧪 FASE 5: TESTES MANUAIS (ESSENCIAL)
**Prazo estimado**: 1 dia

### 5.1 Fluxo Completo (Teste na Ordem)
- [ ] **Registro**: Criar conta nova
- [ ] **Confirmação Email**: Verificar email recebido
- [ ] **Login**: Entrar com a conta criada
- [ ] **Dashboard**: Ver tela inicial
- [ ] **Devocional do Dia**: Completar um devocional
- [ ] **Progresso**: Ver streak atualizado
- [ ] **Conquistas**: Desbloquear primeira conquista
- [ ] **Favoritos**: Salvar um versículo
- [ ] **Modo Livre**: Criar devocional personalizado
- [ ] **Trilhas**: Iniciar uma trilha
- [ ] **Logout**: Sair e entrar novamente

### 5.2 Testes de Edge Cases
- [ ] Senha incorreta (mensagem clara?)
- [ ] Email já cadastrado (mensagem clara?)
- [ ] Internet cai no meio do devocional (salva progresso?)
- [ ] Fechar app e voltar (mantém sessão?)
- [ ] Usar em 2 dispositivos simultâneos (sincroniza?)

### 5.3 Testes Mobile
- [ ] iPhone Safari (iOS 15+)
- [ ] Android Chrome (Android 10+)
- [ ] Teclado virtual não cobre inputs
- [ ] Botões grandes o suficiente (min 44x44px)
- [ ] Scroll suave

---

## 📝 FASE 6: CONTEÚDO E LEGAL (NECESSÁRIO)
**Prazo estimado**: 1 dia

### 6.1 Textos Legais
- [ ] Política de Privacidade (LGPD/GDPR)
- [ ] Termos de Uso
- [ ] Link no rodapé para ambos

### 6.2 Conteúdo
- [ ] Pelo menos 30 devocionais prontos
- [ ] 3 trilhas completas (7 dias cada)
- [ ] Textos revisados (sem erros de português)
- [ ] Versículos bíblicos com referências corretas

---

## 🌐 FASE 7: DEPLOY E INFRAESTRUTURA
**Prazo estimado**: 1 dia

### 7.1 Deploy Vercel/Netlify
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente (Supabase)
- [ ] Domínio personalizado (diariocomdeus.com.br)
- [ ] HTTPS ativado
- [ ] Deploy automático funcionando

### 7.2 Supabase Production
- [ ] Migrar do plan free para Pro (se necessário)
- [ ] Backup automático habilitado
- [ ] Limites de rate ajustados
- [ ] Monitoramento de uso ativado

---

## 📢 FASE 8: LANÇAMENTO SOFT (PRÉ-MVP)
**Prazo estimado**: 3-7 dias

### 8.1 Beta Fechado (10-50 pessoas)
- [ ] Convidar amigos/família
- [ ] Criar grupo WhatsApp/Telegram para feedback
- [ ] Coletar feedback estruturado (formulário)
- [ ] Corrigir bugs críticos identificados

### 8.2 Beta Público (50-200 pessoas)
- [ ] Postar em redes sociais (Instagram, Facebook)
- [ ] Pedir reviews honestos
- [ ] Monitorar Sentry diariamente
- [ ] Responder dúvidas rapidamente

---

## 🎯 FASE 9: LANÇAMENTO OFICIAL MVP (200-1000 pessoas)
**Prazo estimado**: Contínuo

### 9.1 Marketing Inicial
- [ ] Landing page otimizada (SEO)
- [ ] Anúncios pagos (Google Ads, Meta Ads) - opcional
- [ ] Parcerias com igrejas/comunidades
- [ ] Conteúdo orgânico (reels, stories)

### 9.2 Suporte
- [ ] Email de suporte configurado
- [ ] FAQ básico
- [ ] Tempo de resposta < 24h

---

## 📊 MÉTRICAS DE SUCESSO (MVP)

### Técnicas:
- [ ] Uptime > 99%
- [ ] Tempo de carregamento < 3s
- [ ] Taxa de erro < 1%
- [ ] Lighthouse score > 90

### Negócio:
- [ ] Taxa de conversão (visita → registro) > 5%
- [ ] Taxa de ativação (registro → primeiro devocional) > 50%
- [ ] Retenção D7 (volta após 7 dias) > 30%
- [ ] NPS (Net Promoter Score) > 50

---

## ⚠️ BLOQUEADORES PARA LANÇAMENTO

**NÃO LANCE SEM:**
1. ✅ RLS configurado no Supabase
2. ✅ DEV_MODE desativado
3. ✅ Testes manuais completos
4. ✅ Política de Privacidade
5. ✅ Sentry ou similar configurado

**PODE LANÇAR SEM (mas adicione logo):**
- Testes automatizados (pode ser manual no início)
- Analytics avançado (básico é suficiente)
- Otimizações extremas de performance

---

## 🗓️ CRONOGRAMA REALISTA

| Fase | Duração | Quando |
|------|---------|--------|
| 1. UX/UI | 1-2 dias | Agora |
| 2. Segurança | 2-3 dias | Depois UX |
| 3. Monitoramento | 1 dia | Paralelo |
| 4. Performance | 1-2 dias | Paralelo |
| 5. Testes | 1 dia | Após segurança |
| 6. Conteúdo | 1 dia | Paralelo |
| 7. Deploy | 1 dia | Após testes |
| 8. Beta | 3-7 dias | Gradual |
| 9. Lançamento | Contínuo | - |

**Total**: **10-18 dias** (2-3 semanas)

---

## 🎓 PRÓXIMOS PASSOS (AGORA)

1. ✅ Terminar ajustes UX/UI do dashboard
2. ✅ Testar localhost funcionando
3. ✅ Verificar todas as páginas internas
4. ⏭️ Implementar RLS no Supabase
5. ⏭️ Configurar Sentry

---

**Última atualização**: 09/10/2025  
**Status**: 🟡 Fase 1 em andamento (70% completo)

