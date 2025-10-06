# 📋 TODO - Diário com Deus

## ✅ Concluído

- [x] Estrutura base do projeto (Next.js 14 + TypeScript + Tailwind)
- [x] Sistema de autenticação (login/registro)
- [x] Dashboard com 4 atalhos principais
- [x] Página Sessão Express (devocional guiado em 5 steps)
- [x] Página Trilhas (7/14/30 dias)
- [x] Página Modo Livre (por tema/estado)
- [x] Página Minha Semana (progresso visual)
- [x] Página Voltei Hoje (recomeço sem culpa)
- [x] Sistema de progresso (streak, completedToday)
- [x] Web Speech API (text-to-speech gratuito)
- [x] PWA manifest.json
- [x] Design responsivo mobile-first
- [x] Documentação (README, GUIA-RAPIDO, ARCHITECTURE)

## 🚀 MVP - Prioridade Máxima

### Conteúdo
- [ ] Criar seed de 63 devocionais (9 temas × 7 passagens)
  - [ ] Ansiedade (7 devocionais)
  - [ ] Gratidão (7 devocionais)
  - [ ] Perdão (7 devocionais)
  - [ ] Sabedoria (7 devocionais)
  - [ ] Esperança (7 devocionais)
  - [ ] Família (7 devocionais)
  - [ ] Trabalho (7 devocionais)
  - [ ] Consolo (7 devocionais)
  - [ ] Decisão (7 devocionais)

- [ ] Criar 3 trilhas completas:
  - [ ] 7 Dias de Recomeço
  - [ ] 14 Dias de Paz na Ansiedade
  - [ ] 30 Dias no Evangelho de João

### Funcionalidades Essenciais
- [ ] Conectar devocionais reais (atualmente são mocks)
- [ ] Sistema de busca por referência bíblica
- [ ] Melhorar sistema de progresso (conectar com banco real)
- [ ] Adicionar loading states em todas páginas
- [ ] Error handling (páginas de erro 404, 500)

### PWA Completo
- [ ] Service Worker (cache offline)
- [ ] Notificações push (lembretes diários)
- [ ] Ícones PWA (192x192 e 512x512)
- [ ] Splash screen personalizada
- [ ] Install prompt customizado

### Testing
- [ ] Testar em iPhone (Safari)
- [ ] Testar em Android (Chrome)
- [ ] Testar instalação PWA
- [ ] Testar Web Speech API em diferentes browsers

## 📈 Versão 1.1 - Pós-Launch

### UX Improvements
- [ ] Onboarding (tour guiado no primeiro acesso)
- [ ] Feedback visual ao completar devocional (confetes/animação)
- [ ] Modo escuro
- [ ] Escolha de voz (masculina/feminina) no áudio
- [ ] Velocidade ajustável do áudio (0.8x, 1x, 1.2x)

### Social & Community
- [ ] Compartilhar "Palavra Viva" no Instagram Stories (card bonito)
- [ ] Compartilhar progresso ("7 dias com Deus!")
- [ ] Versículos favoritos (salvar e revisitar)
- [ ] Histórico de devocionais concluídos

### Analytics
- [ ] Google Analytics ou Plausible
- [ ] Rastrear: tempo no app, taxa de conclusão, temas mais acessados
- [ ] Dashboard admin para métricas

## 💰 Versão 2.0 - Monetização

### Sistema de Pagamento
- [ ] Integração Stripe (para Brasil)
- [ ] 3 tiers: Básico (R$27), Premium (R$47), VIP (R$97)
- [ ] Página de checkout
- [ ] Gerenciamento de assinatura (cancelar, trocar plano)
- [ ] Webhook Stripe → atualizar acesso do usuário

### Conteúdo Premium
- [ ] Trilha: Maternidade com Fé (14 dias)
- [ ] Trilha: Casamento Abençoado (21 dias)
- [ ] Trilha: Luto e Consolo (14 dias)
- [ ] Trilha: Finanças com Sabedoria (7 dias)
- [ ] Áudios conduzidos (voz profissional gravada)

### Área de Membros
- [ ] Grupo VIP (WhatsApp ou Telegram)
- [ ] Lives mensais (YouTube/Zoom)
- [ ] Material extra (PDFs, wallpapers, cards)

## 🎯 Versão 3.0 - Escala

### Gamificação
- [ ] Badges/conquistas ("7 dias seguidos!", "30 devocionais completos")
- [ ] Níveis (Iniciante → Comprometido → Constante → Fiel)
- [ ] Desafios semanais

### IA Personalizada
- [ ] Oração personalizada via IA (baseada em situação do usuário)
- [ ] Sugestão de devocional baseada em histórico
- [ ] Chatbot de oração (conversa com IA treinada em teologia)

### Comunidade
- [ ] Fórum/comentários por devocional
- [ ] Grupos de oração (conectar usuários)
- [ ] Testemunhos (usuários compartilham histórias)

### App Nativo
- [ ] React Native (iOS + Android)
- [ ] Notificações push nativas (mais confiáveis)
- [ ] Offline-first (sincronização inteligente)
- [ ] Widgets (versículo do dia na tela inicial)

## 🛠️ Melhorias Técnicas

### Performance
- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Otimizar bundle size
- [ ] Implementar ISR (Incremental Static Regeneration)

### SEO
- [ ] Meta tags dinâmicas por página
- [ ] Open Graph (preview bonito em redes sociais)
- [ ] Sitemap.xml
- [ ] Schema.org markup (structured data)

### DevOps
- [ ] CI/CD (GitHub Actions)
- [ ] Testes automatizados (unit + E2E)
- [ ] Monitoring (Sentry para erros)
- [ ] Backup automático do banco

### Segurança
- [ ] Rate limiting (evitar spam)
- [ ] CAPTCHA no registro
- [ ] 2FA (autenticação dois fatores)
- [ ] Logs de auditoria

## 📝 Conteúdo & Marketing

### Blog/SEO Content
- [ ] "Como fazer devocional matinal" (artigo)
- [ ] "7 versículos sobre ansiedade" (artigo)
- [ ] Landing page específica por tema
- [ ] Depoimentos em vídeo

### Email Marketing
- [ ] Sequência de boas-vindas (3 emails)
- [ ] Lembrete diário (se não fez devocional)
- [ ] Email de reengajamento (se parou de usar)

### Parcerias
- [ ] Kit de divulgação para influencers
- [ ] Programa de afiliados (20% comissão)
- [ ] Parcerias com igrejas (licença corporativa)

## 🐛 Bugs Conhecidos

- [ ] (nenhum no momento)

## 💡 Ideias para Avaliar

- [ ] Modo "Família" (devocionais para fazer com filhos)
- [ ] Versão em espanhol (mercado latino-americano)
- [ ] Plano vitalício (one-time payment de R$497)
- [ ] Certificado de conclusão (30 dias seguidos)
- [ ] Integração com apps de meditação (Calm, Headspace)

---

**Como usar este TODO:**
- Mova itens de baixo para cima conforme prioridade mudar
- Marque [x] quando concluir
- Adicione novos itens conforme surgirem

**Próxima revisão:** Após cada sprint/milestone

