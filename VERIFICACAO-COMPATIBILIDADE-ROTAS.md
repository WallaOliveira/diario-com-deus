# 🔍 Sistema de Verificação de Compatibilidade de Rotas

## 📋 **CHECKLIST ANTES DE QUALQUER MUDANÇA DE ROTA:**

### ✅ **1. Verificar Links Existentes**
```bash
grep -r "nome-da-rota" src/ --include="*.tsx" --include="*.ts" --include="*.js"
```

### ✅ **2. Verificar Componentes**
- [ ] Links no dashboard
- [ ] Navegação entre páginas
- [ ] Botões de ação
- [ ] Redirecionamentos
- [ ] Componentes de tutorial
- [ ] Páginas de erro (404)

### ✅ **3. Verificar Arquivos de Rota**
- [ ] Pasta existe em `src/app/`
- [ ] Arquivo `page.tsx` presente
- [ ] Redirecionamentos funcionando
- [ ] Sem conflitos de nome

### ✅ **4. Testar Funcionalidade**
- [ ] Link funciona no dashboard
- [ ] Redirecionamento automático
- [ ] Sem erros 404
- [ ] Navegação fluida

## 🚨 **ROTAS ATUALIZADAS:**

### **✅ CONCLUÍDO - `/sessao-express` → `/devocional-do-dia`**
- [x] Pasta criada: `src/app/devocional-do-dia/`
- [x] Arquivo copiado: `page.tsx`
- [x] Redirect criado: `/sessao-express` → `/devocional-do-dia`
- [x] Links atualizados em 8 arquivos:
  - `src/app/dashboard/page.tsx`
  - `src/app/minha-semana/page.tsx`
  - `src/app/favoritos/page.tsx`
  - `src/app/voltei-hoje/page.tsx`
  - `src/app/progresso/page.tsx` (2 ocorrências)
  - `src/app/onboarding/page.tsx`
  - `src/app/not-found.tsx`
  - `src/components/Tutorial.tsx`

## 🎯 **PRÓXIMAS VERIFICAÇÕES RECOMENDADAS:**

### **Páginas que podem precisar de atualização:**
- [ ] `/trilhas` - verificar consistência
- [ ] `/extras` - verificar consistência  
- [ ] `/bonus` - verificar consistência
- [ ] `/favoritos` - verificar consistência
- [ ] `/progresso` - verificar consistência

## 🔧 **COMANDOS ÚTEIS:**

### **Buscar todas as rotas:**
```bash
find src/app -name "page.tsx" -type f | sed 's|src/app/||' | sed 's|/page.tsx||' | sort
```

### **Verificar links quebrados:**
```bash
grep -r "href=" src/ --include="*.tsx" | grep -v "http"
```

### **Verificar redirecionamentos:**
```bash
grep -r "router.push\|router.replace" src/ --include="*.tsx"
```

## 📝 **NOTAS:**
- Sempre fazer backup antes de mudanças
- Testar em localhost após mudanças
- Documentar todas as alterações
- Manter consistência entre URL e interface
