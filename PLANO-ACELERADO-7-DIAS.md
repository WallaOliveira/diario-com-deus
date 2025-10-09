# ⚡ PLANO ACELERADO - MVP EM 7 DIAS

**Objetivo**: Lançar MVP funcional e seguro o mais rápido possível, cortando tudo que não é crítico.

---

## 📅 DIA 1 (HOJE) - UX/UI FINAL
**Tempo**: 2-4 horas

- [x] Título gradiente ✅
- [x] Botões verticais ✅
- [x] Remover "Voltei Hoje" ✅
- [x] Renomear para "Presentes para Você" ✅
- [ ] **Decidir**: Mover Devocional Pessoal + Favoritos (sim/não?)
  - **Sugestão**: PULAR por agora, fazer depois do lançamento
  - **Por quê**: Não é crítico, pode testar com usuários se faz sentido

### ⚡ Ação Rápida:
- [ ] Testar todas as páginas internas (30 min)
- [ ] Verificar mobile básico (15 min)

**Status**: 🟢 80% completo

---

## 📅 DIA 2 - SEGURANÇA CRÍTICA
**Tempo**: 3-4 horas

### RLS Supabase (ÚNICO BLOQUEADOR REAL)
```sql
-- Copiar e colar no Supabase SQL Editor (10 min):

-- Habilitar RLS
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (usuário só vê seus dados)
CREATE POLICY "Users own data" ON user_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own data" ON user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own data" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Conquistas: todos lêem, sistema escreve
CREATE POLICY "Everyone reads achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Users own achievements" ON user_achievements FOR ALL USING (auth.uid() = user_id);
```

### Remover DEV_MODE
- [ ] `.env.local`: `NEXT_PUBLIC_DEV_MODE=false`
- [ ] Testar login/registro (20 min)

**Status**: 🔴 Crítico - Sem isso não pode lançar

---

## 📅 DIA 3 - CONTEÚDO MÍNIMO
**Tempo**: 4-6 horas

### Prioridade Máxima:
- [ ] **10 devocionais prontos** (mínimo para testar)
- [ ] **1 trilha de 7 dias completa** (para validar conceito)
- [ ] Revisar textos (sem erros gritantes)

### Textos Legais (COPIAR TEMPLATES):
- [ ] Política de Privacidade (usar template LGPD - 30 min)
- [ ] Termos de Uso (usar template - 30 min)
- [ ] Colocar links no rodapé (10 min)

**Onde pegar templates**: 
- https://www.privacypolicies.com/
- https://www.termsofservicegenerator.net/

**Status**: 🟡 Importante mas rápido de resolver

---

## 📅 DIA 4 - TESTES + AJUSTES
**Tempo**: 3-4 horas

### Teste o Fluxo Completo:
- [ ] Registro → Email → Login → Devocional → Ver progresso (30 min)
- [ ] Testar em 2 dispositivos: Desktop + Mobile (30 min)
- [ ] Pedir 2-3 amigos testarem (dar acesso beta)

### Corrigir Bugs Críticos:
- [ ] Só o que IMPEDE de usar (crashes, erros graves)
- [ ] **IGNORAR**: Bugs estéticos, pequenos UX issues

**Status**: 🟡 Necessário mas focado

---

## 📅 DIA 5 - DEPLOY + DOMÍNIO
**Tempo**: 2-3 horas

### Deploy Vercel (Mais Rápido):
```bash
# 1. Push para GitHub (se ainda não está)
git add .
git commit -m "MVP pronto para deploy"
git push

# 2. Conectar no Vercel (5 min)
# - Ir em vercel.com
# - Conectar repo GitHub
# - Adicionar variáveis de ambiente (.env.local)
# - Deploy automático
```

### Domínio:
- [ ] Comprar domínio (Registro.br - R$ 40/ano) - 15 min
- [ ] Conectar no Vercel - 10 min
- [ ] HTTPS automático (Vercel faz sozinho)

**Status**: 🟢 Simples e rápido

---

## 📅 DIA 6 - BETA FECHADO (10 PESSOAS)
**Tempo**: Monitoramento contínuo

### Mini Lançamento:
- [ ] Convidar 10 pessoas próximas
- [ ] Criar grupo WhatsApp "Beta Diário com Deus"
- [ ] Pedir feedback honesto
- [ ] Estar disponível para suporte rápido

### O que observar:
- ✅ Conseguem criar conta?
- ✅ Conseguem completar devocional?
- ✅ App não quebra?
- ✅ Dúvidas principais?

**Status**: 🟢 Validação rápida

---

## 📅 DIA 7 - AJUSTES FINAIS + LANÇAMENTO SOFT
**Tempo**: 3-4 horas

### Manhã:
- [ ] Corrigir 2-3 bugs principais do beta (se houver)
- [ ] Preparar posts para redes sociais

### Tarde:
- [ ] **LANÇAR** para 50-100 pessoas:
  - Instagram story
  - WhatsApp status
  - Facebook post
  - Grupos de igreja/comunidade

### Monitoramento:
- [ ] Responder dúvidas rapidamente
- [ ] Anotar bugs (mas não desesperar)

**Status**: 🎯 Go Live!

---

## ❌ O QUE ESTAMOS CORTANDO (FAZER DEPOIS)

### Não vamos fazer AGORA (economiza 7-10 dias):
- ❌ Sentry/Monitoramento avançado (fazer na semana 2)
- ❌ Analytics detalhado (fazer na semana 2)
- ❌ Testes automatizados (fazer conforme cresce)
- ❌ Otimizações extremas de performance (já está bom)
- ❌ Features complexas (submenu, etc)
- ❌ Marketing agressivo (começar orgânico)

### Por quê cortar?
- ✅ **RLS + Conteúdo + Deploy** = 80% do que precisa
- ✅ Resto é "nice to have", não bloqueador
- ✅ Melhor lançar rápido e iterar do que perfeição demorada
- ✅ Usuários reais > planejamento excessivo

---

## 🎯 CRITÉRIOS MÍNIMOS PARA LANÇAR

### ✅ DEVE TER (Bloqueadores):
1. ✅ RLS configurado (segurança)
2. ✅ 10 devocionais funcionais
3. ✅ Login/Registro funcionando
4. ✅ 1 trilha completa
5. ✅ Política de Privacidade
6. ✅ Deploy online
7. ✅ Testado por 3+ pessoas

### ⚠️ PODE TER DEPOIS (Não bloqueadores):
- Sentry
- Analytics avançado
- 100 devocionais
- Todas as features planejadas
- Design perfeito
- Testes automatizados

---

## 📊 CRONOGRAMA REALISTA

| Dia | Foco | Horas | Status |
|-----|------|-------|--------|
| 1 (Hoje) | UX final + testes | 3h | 🟢 80% |
| 2 | Segurança RLS | 3h | 🔴 Crítico |
| 3 | Conteúdo + Legal | 5h | 🟡 |
| 4 | Testes + Bugs | 3h | 🟡 |
| 5 | Deploy | 2h | 🟢 |
| 6 | Beta 10 pessoas | - | 🟢 |
| 7 | Lançamento 100 | 3h | 🎯 |

**Total de trabalho**: ~19 horas (distribuídas em 7 dias)

---

## ⚡ DECISÕES RÁPIDAS AGORA

### Pergunta 1: Devocional Pessoal + Favoritos
**Opção A**: Fazer submenu agora (+2 horas)  
**Opção B**: Deixar como está, lançar, ajustar depois  

**Recomendação**: **Opção B** - Ganhar 2 horas, lançar mais rápido

### Pergunta 2: Quantos Devocionais?
**Opção A**: 30 devocionais (+10 horas de trabalho)  
**Opção B**: 10 devocionais bons (+3 horas)  

**Recomendação**: **Opção B** - MVP é sobre validação, não quantidade

### Pergunta 3: Sentry Agora?
**Opção A**: Configurar Sentry agora (+2 horas)  
**Opção B**: Adicionar semana que vem  

**Recomendação**: **Opção B** - Com 100 usuários, bugs aparecerão naturalmente

---

## 🚀 PRÓXIMA AÇÃO (AGORA)

1. **Você decide**: Fazer ou não os 2 últimos ajustes UX? (submenu)
2. **Eu**: Finalizo UX conforme decidir (30 min)
3. **Amanhã**: Começamos segurança RLS (Dia 2)

---

## 💰 CUSTOS ESTIMADOS MVP

- Domínio: R$ 40/ano
- Vercel: R$ 0 (plan free até 100GB)
- Supabase: R$ 0 (plan free até 500MB)
- **Total**: **R$ 40** para começar

Quando crescer:
- Vercel Pro: $20/mês
- Supabase Pro: $25/mês
- **Total**: ~R$ 250/mês (após 1000+ usuários)

---

**Última atualização**: 09/10/2025 (Noite)  
**Status**: 🟢 Plano acelerado pronto  
**Prazo**: **7 dias** para MVP ao vivo  
**Próximo passo**: Decisão sobre UX submenu

