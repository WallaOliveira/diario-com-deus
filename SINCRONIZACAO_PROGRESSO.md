# 📋 PLANO DE SINCRONIZAÇÃO DA PÁGINA PROGRESSO

## Objetivo
Sincronizar a página de progresso com dados reais do Supabase, mostrando:
- Devocionais feitos em cada data
- Se o devocional foi favoritado
- Trilhas completadas

## Funcionalidades Já Criadas ✅
- `getUserProgress(userId)` - Busca todos os devocionais completados pelo usuário
- `getUserFavoritesList(userId)` - Busca todos os favoritos do usuário

## Implementação em Etapas

### ETAPA 1: Substituir Mock por Dados Reais
**Arquivo:** `src/app/progresso/page.tsx`

**Modificações:**
1. Importar as funções:
   ```typescript
   import { getUserProgress, getUserFavoritesList } from '@/lib/database';
   ```

2. Adicionar estados para dados reais:
   ```typescript
   const [progressoReal, setProgressoReal] = useState<any[]>([]);
   const [favoritosReais, setFavoritosReais] = useState<any[]>([]);
   ```

3. Criar useEffect para carregar dados:
   ```typescript
   useEffect(() => {
     const carregarDados = async () => {
       if (!currentUser) return;
       
       // Buscar progresso
       const progress = await getUserProgress(currentUser.id);
       setProgressoReal(progress);
       
       // Buscar favoritos
       const favoritos = await getUserFavoritesList(currentUser.id);
       setFavoritosReais(favoritos);
     };
     
     carregarDados();
   }, [currentUser]);
   ```

### ETAPA 2: Transformar Dados em Formato de Calendário
**Arquivo:** `src/app/progresso/page.tsx`

**Criar função helper:**
```typescript
const transformarDadosParaCalendario = (progresso: any[]) => {
  const devocionaisPorData: Record<string, any> = {};
  
  progresso.forEach(item => {
    const dataCompleta = new Date(item.completed_at);
    const ano = dataCompleta.getFullYear();
    const mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
    const dia = String(dataCompleta.getDate()).padStart(2, '0');
    const chave = `${ano}-${mes}-${dia}`;
    
    // Verificar se foi favoritado
    const isFavorited = favoritosReais.some(
      fav => fav.devotional_id === item.devotional_id
    );
    
    devocionaisPorData[chave] = {
      id: item.devotional_id,
      title: item.devotionals?.tema || item.devotionals?.tema || 'Devocional',
      verse: item.devotionals?.texto || item.personal_notes || '',
      reference: item.devotionals?.referencia || '',
      date: dataCompleta.toLocaleDateString('pt-BR'),
      isFavorited: isFavorited,
      type: item.devotional_id.startsWith('trilha-') ? 'trail' : 'devotional'
    };
  });
  
  return devocionaisPorData;
};
```

### ETAPA 3: Integrar com o Calendário Existente
**Modificações no useEffect que renderiza o calendário:**

```typescript
const devocionaisCalendario = progressoReal.length > 0 
  ? transformarDadosParaCalendario(progressoReal)
  : devocionaisPorData; // fallback para mock
```

### ETAPA 4: Adicionar Indicadores Visuais
**No calendário, identificar:**
- Data com devocional: cor verde
- Data com devocional favoritado: ícone de coração
- Data com trilha: ícone de trilha

### ETAPA 5: Modal ao Clicar na Data
**Expandir o modal existente para mostrar:**
- Título do devocional
- Referência bíblica
- Versículo completo
- Reflexão/Ação/Oração
- Se é favoritado ou não

### ETAPA 6: Aba de Favoritos
**Substituir mock por dados reais:**
```typescript
const favoritosExibidos = favoritosReais.map(fav => ({
  ...fav.devotionals,
  favoritedAt: fav.created_at,
  id: fav.id
}));
```

## Testes Necessários
1. ✅ Verificar se dados são carregados corretamente
2. ✅ Verificar se calendário exibe datas corretas
3. ✅ Verificar se indicadores de favorito aparecem
4. ✅ Verificar se modal abre com dados corretos
5. ✅ Verificar se trilhas aparecem no calendário

## Dados Necessários no Supabase
- ✅ `user_progress` table
- ✅ `user_favorites` table
- ✅ `devotionals` table

## Próximos Passos
1. Implementar ETAPA 1
2. Testar e validar
3. Implementar ETAPA 2
4. Testar e validar
5. Continuar até ETAPA 6

