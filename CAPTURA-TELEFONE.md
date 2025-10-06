# 📱 CAPTURA DE TELEFONE (WhatsApp)

## ✅ IMPLEMENTADO

### **Por que capturar telefone?**

1. **Contato direto** via WhatsApp com testadores
2. **Lembretes** sobre testes e feedback
3. **Suporte** mais rápido e pessoal
4. **Remarketing** futuro (campanhas WhatsApp)
5. **Engajamento** maior que e-mail (98% de abertura vs 20%)

---

## 🔧 **O QUE FOI IMPLEMENTADO**

### **1. Campo no Formulário de Registro**

#### Localização: `/src/app/registro/page.tsx`

**Adicionado:**
- ✅ Campo "WhatsApp" entre Nome e E-mail
- ✅ Máscara automática: `(11) 98765-4321`
- ✅ Validação de 11 dígitos
- ✅ Texto explicativo: "Para te avisar sobre novidades e suporte"
- ✅ Campo obrigatório

**Formato aceito:**
```
(11) 98765-4321
(21) 91234-5678
(85) 99999-8888
```

**Código da máscara:**
```typescript
const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return phone;
};
```

---

### **2. Armazenamento no Supabase**

#### Localização: `/src/store/useAuthStore.ts`

**Como funciona:**
- Telefone salvo em `user_metadata.phone`
- Acessível via: `user.user_metadata?.phone`
- Disponível em todas as páginas após login

**Estrutura no Supabase:**
```json
{
  "id": "uuid-do-usuario",
  "email": "usuario@email.com",
  "user_metadata": {
    "name": "Nome do Usuário",
    "phone": "(11) 98765-4321"
  }
}
```

---

### **3. Exportação de Dados**

**Como exportar lista de WhatsApp dos testadores:**

#### Opção A - Via Supabase Dashboard
1. Acesse: **Supabase → Authentication → Users**
2. Clique em **Export to CSV**
3. Abra o CSV no Excel/Google Sheets
4. Filtre coluna `raw_user_meta_data` → busque `"phone"`

#### Opção B - Via SQL Query
```sql
SELECT 
  email,
  raw_user_meta_data->>'name' as nome,
  raw_user_meta_data->>'phone' as whatsapp,
  created_at
FROM auth.users
ORDER BY created_at DESC;
```

**Resultado:**
```
email              | nome  | whatsapp          | created_at
-------------------|-------|-------------------|-------------------
joao@email.com     | João  | (11) 91234-5678  | 2025-01-06 10:00:00
maria@email.com    | Maria | (11) 98765-4321  | 2025-01-06 10:05:00
```

---

## 📋 **USO PRÁTICO**

### **1. Enviar mensagem via WhatsApp (Manual)**

**Passo a passo:**
1. Exportar lista de telefones (SQL acima)
2. Copiar número sem formatação: `11987654321`
3. Usar link direto:
   ```
   https://wa.me/5511987654321?text=Olá%20João,%20tudo%20bem?
   ```

**Dica:** Use ferramenta para envio em massa:
- [WATI.io](https://wati.io) - R$ 99/mês (5.000 mensagens)
- [Z-API](https://www.z-api.io) - R$ 49/mês (grátis 7 dias)
- Manual mesmo (até 20 pessoas)

---

### **2. Template de mensagem para testadores**

**Após cadastro (24h depois):**
```
Olá, {{nome}}! 👋

Vi que você se cadastrou no Diário com Deus ontem.

Conseguiu testar o app? 

Se tiver qualquer dúvida, é só me chamar aqui! 

🔗 Link do app: 
https://diario-com-deus.vercel.app

🙏 Obrigado!
```

**Lembrete de feedback (3 dias depois):**
```
Oi, {{nome}}! 

Você conseguiu dar uma olhada no Diário com Deus?

Sua opinião é MUITO importante! ❤️

📝 Formulário de feedback:
[LINK DO FORMULÁRIO]

Leva só 3 minutinhos!

Obrigado 🙏
```

---

### **3. Automação futura (opcional)**

**Ferramentas para automatizar:**

#### **a) WhatsApp Business API**
- Custo: R$ 0,10 por mensagem
- Permite automação completa
- Requer aprovação do Facebook
- **Recomendado para:** > 1000 usuários

#### **b) Zapier + WhatsApp**
- Conecta Supabase → WhatsApp
- Automação sem código
- **Recomendado para:** 100-1000 usuários

#### **c) Supabase Edge Functions**
- Código próprio
- Integração com Z-API
- **Recomendado para:** < 100 usuários

**Exemplo de automação:**
```
Novo usuário cadastra → 
Aguarda 1h → 
Envia WhatsApp de boas-vindas → 
Aguarda 24h → 
Envia lembrete de feedback
```

---

## 📊 **MÉTRICAS ESPERADAS**

### **WhatsApp vs E-mail:**

Métrica | WhatsApp | E-mail
--------|----------|--------
Taxa de abertura | **98%** | 20%
Taxa de resposta | **45-60%** | 5-10%
Tempo de resposta | **5 min** | 24h+
Conversão | **3-5x maior** | baseline

---

## 🚀 **PRÓXIMOS PASSOS**

### **MVP (Agora):**
- ✅ Capturar telefone no registro
- ✅ Exportar lista manualmente
- ✅ Enviar mensagens individuais

### **Fase 2 (Com 50+ usuários):**
- [ ] Integrar Z-API para envios automáticos
- [ ] Criar templates de mensagens
- [ ] Disparos programados (1h, 24h, 7 dias)

### **Fase 3 (Com 500+ usuários):**
- [ ] WhatsApp Business API oficial
- [ ] Chatbot para suporte
- [ ] Segmentação por comportamento

---

## ⚠️ **COMPLIANCE & LGPD**

### **Importante:**

1. **Consent is key:**
   - ✅ Texto no registro: "Para te avisar sobre novidades"
   - ✅ Usuário pode escolher não receber (opt-out)
   
2. **Política de Privacidade:**
   - Deixe claro que telefone será usado para:
     - Suporte
     - Novidades do app
     - Lembretes (se ativados)
   
3. **Opt-out fácil:**
   - Sempre inclua: "Responda PARAR para não receber mais"
   
4. **Não venda dados:**
   - NUNCA compartilhe números com terceiros
   - Armazene de forma segura (Supabase RLS)

---

## 🧪 **TESTE AGORA**

### **Passo 1: Criar uma conta de teste**
1. Acesse: `http://localhost:3000/registro`
2. Preencha com dados fictícios:
   - Nome: Teste Silva
   - WhatsApp: **(11) 91234-5678**
   - E-mail: teste@example.com
   - Senha: 123456

### **Passo 2: Verificar no Supabase**
1. Acesse: **Supabase → Authentication → Users**
2. Encontre o usuário `teste@example.com`
3. Expanda `raw_user_meta_data`
4. Confirme que `phone` aparece: `"(11) 91234-5678"`

### **Passo 3: Exportar dados**
1. Vá em: **Supabase → SQL Editor**
2. Cole a query de exportação (acima)
3. Execute
4. Veja nome + telefone listados ✅

---

## 📱 **EXEMPLO DE USO REAL**

### **Cenário: 10 amigos testando**

**Dia 0 - Cadastro:**
```
✅ João    - (11) 91234-5678
✅ Maria   - (11) 98765-4321  
✅ Pedro   - (21) 99999-8888
... (7 mais)
```

**Dia 1 - Lembrete:**
Enviar mensagem manual para quem não testou:
- Pedro: "Oi Pedro! Conseguiu testar o app?"

**Dia 3 - Feedback:**
Enviar formulário para todos:
- Grupo WhatsApp ou mensagem individual

**Resultado esperado:**
- 8-9 de 10 respondem feedback (vs. 3-4 por e-mail)
- Feedback mais rico (áudio, prints)
- Relacionamento mais próximo

---

## ✅ **CHECKLIST**

- [x] Campo WhatsApp no registro
- [x] Máscara automática brasileira
- [x] Salva no `user_metadata`
- [x] Query SQL para exportação
- [x] Documentação de uso
- [x] Templates de mensagens
- [x] Compliance LGPD
- [ ] Testar com usuário real
- [ ] Exportar primeira lista
- [ ] Enviar primeira mensagem

---

**Criado em:** 2025-01-06  
**Status:** Implementado ✅  
**Próximo passo:** Testar cadastro com telefone real

