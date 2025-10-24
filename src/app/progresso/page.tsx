'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useStatsStore } from '@/store/useStatsStore';
import { FiArrowLeft, FiHeart, FiTrendingUp, FiBookmark } from 'react-icons/fi';
import Link from 'next/link';
import Container from '@/components/Container';
import { FontSizeControls } from '@/components/FontSizeControls';
import { colors, typography, spacing } from '@/lib/design-system';
import { getMotivationalMessage, getProgressLevel, getProgressLevelMessage } from '@/lib/motivational-messages';
import ModalDevocional from '@/components/ModalDevocional';
import Loading from '@/components/Loading';
import { addFavorite, removeFavorite, getUserFavorites } from '@/lib/database';

// 🚧 MODO DESENVOLVIMENTO - Bypass de autenticação
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const mockUser = {
  id: 'dev-user-123',
  email: 'dev@diariocomdeus.com',
  user_metadata: {
    name: 'Desenvolvedor'
  }
};

export default function ProgressoPage() {
  const router = useRouter();
  const { user, loading, checkUser } = useAuthStore();
  const { stats, loadStats } = useStatsStore();
  
  const [emocaoSelecionada, setEmocaoSelecionada] = useState<string>('');
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'calendario' | 'favoritos'>('calendario');
  const [calendarioExpandido, setCalendarioExpandido] = useState(false);
  const [mesAtual, setMesAtual] = useState(new Date());
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [devocionalExpandido, setDevocionalExpandido] = useState<number | null>(null);
  const [modalDevocional, setModalDevocional] = useState<{
    isOpen: boolean;
    devocional: any | null;
  }>({ isOpen: false, devocional: null });
  const [modalFavoritos, setModalFavoritos] = useState(false);

  // Em modo DEV, usar mockUser
  const currentUser = DEV_MODE ? mockUser : user;

  // Mock de devocionais por data
  const devocionaisPorData = {
    '2025-10-14': {
      id: 'dev-2025-10-14',
      title: 'A Fé que Move Montanhas',
      verse: 'A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.',
      reference: 'Hebreus 11:1',
      reflection: 'A fé não é apenas acreditar no que vemos, mas confiar no que não vemos. É a certeza de que Deus está trabalhando mesmo quando não conseguimos perceber.',
      prayer: 'Pai, fortalece minha fé. Ajuda-me a confiar em Ti mesmo quando não vejo respostas imediatas.',
      action: 'Vou praticar a fé hoje, agindo com confiança em Deus mesmo em situações incertas.',
      date: '14 de Outubro, 2025',
      isFavorited: true
    },
    '2025-10-12': {
      id: 'dev-2025-10-12',
      title: 'Deus é Fiel',
      verse: 'Porque para Deus nada é impossível.',
      reference: 'Lucas 1:37',
      reflection: 'Este versículo nos lembra que Deus tem poder sobre todas as coisas. Mesmo quando enfrentamos desafios que parecem impossíveis, Ele pode intervir e transformar nossa situação.',
      prayer: 'Senhor, obrigado por ser um Deus de milagres. Ajuda-me a confiar em Ti mesmo quando as circunstâncias parecem impossíveis.',
      action: 'Hoje, vou entregar uma situação difícil nas mãos de Deus e confiar em Sua fidelidade.',
      date: '12 de Outubro, 2025',
      isFavorited: false
    },
    '2025-10-10': {
      id: 'dev-2025-10-10',
      title: 'Gratidão Transformadora',
      verse: 'Dêem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.',
      reference: '1 Tessalonicenses 5:18',
      reflection: 'A gratidão não é apenas um sentimento, mas uma escolha ativa que transforma nossa perspectiva e nos aproxima de Deus.',
      prayer: 'Senhor, ensina-me a ser grato em todas as situações. Ajuda-me a ver Tuas bênçãos mesmo nos momentos difíceis.',
      action: 'Vou listar 5 coisas pelas quais sou grato hoje e agradecer a Deus por cada uma delas.',
      date: '10 de Outubro, 2025',
      isFavorited: false
    },
    '2025-10-08': {
      id: 'dev-2025-10-08',
      title: 'Paz que Excede',
      verse: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.',
      reference: 'Filipenses 4:7',
      reflection: 'A paz de Deus é diferente da paz do mundo. Ela não depende das circunstâncias, mas da presença de Cristo em nossa vida.',
      prayer: 'Senhor, dá-me a Tua paz que excede todo entendimento. Guarda meu coração e meus pensamentos.',
      action: 'Hoje, vou praticar a gratidão e entregar minhas preocupações a Deus.',
      date: '8 de Outubro, 2025',
      isFavorited: false
    },
    '2025-10-06': {
      id: 'dev-2025-10-06',
      title: 'Amor Incondicional',
      verse: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      reference: 'João 3:16',
      reflection: 'O amor de Deus é incondicional e sacrificial. Ele nos amou primeiro, mesmo quando não merecíamos.',
      prayer: 'Senhor, obrigado pelo Teu amor incondicional. Ajuda-me a amar os outros como Tu me amas.',
      action: 'Hoje, vou demonstrar amor incondicional a alguém que precisa.',
      date: '6 de Outubro, 2025',
      isFavorited: true
    },
    // Devocionais de setembro (mais antigos)
    '2025-09-15': {
      id: 'dev-2025-09-15',
      title: 'Confiança em Deus',
      verse: 'Entrega o teu caminho ao Senhor; confia nele, e ele o fará.',
      reference: 'Salmos 37:5',
      reflection: 'Confiar em Deus significa entregar nossas preocupações e deixar que Ele cuide dos resultados.',
      prayer: 'Pai, ensina-me a confiar completamente em Ti. Ajuda-me a entregar minhas ansiedades.',
      action: 'Hoje, vou praticar a confiança entregando uma situação difícil a Deus.',
      date: '15 de Setembro, 2025',
      isFavorited: false
    },
    '2025-09-12': {
      id: 'dev-2025-09-12',
      title: 'Paciência e Perseverança',
      verse: 'Mas os que esperam no Senhor renovam as suas forças; sobem com asas como águias.',
      reference: 'Isaías 40:31',
      reflection: 'A paciência não é passividade, mas uma força ativa que nos permite esperar no timing perfeito de Deus.',
      prayer: 'Senhor, dá-me paciência para esperar no Teu tempo perfeito.',
      action: 'Vou praticar a paciência hoje, confiando no plano de Deus.',
      date: '12 de Setembro, 2025',
      isFavorited: true
    },
    '2025-09-08': {
      id: 'dev-2025-09-08',
      title: 'Perdão e Liberdade',
      verse: 'Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores.',
      reference: 'Mateus 6:12',
      reflection: 'O perdão é uma escolha que nos liberta da amargura e nos aproxima do coração de Deus.',
      prayer: 'Senhor, ajuda-me a perdoar como Tu me perdoas. Liberta-me da amargura.',
      action: 'Hoje, vou escolher perdoar alguém que me magoou.',
      date: '8 de Setembro, 2025',
      isFavorited: false
    }
  };

  useEffect(() => {
    if (!DEV_MODE) {
    checkUser();
    } else {
      // Em modo DEV, definir loading como false imediatamente
      setDadosCarregados(false);
    }
  }, [checkUser]);

  // Listener para novos favoritos
  useEffect(() => {
    const handleFavoriteAdded = async (event: CustomEvent) => {
      console.log('🔄 Novo favorito detectado:', event.detail);
      // Recarregar favoritos quando um novo for adicionado
      await carregarFavoritosReais();
      console.log('✅ Favoritos recarregados na página de progresso!');
    };

    window.addEventListener('favoriteAdded', handleFavoriteAdded as EventListener);
    
    return () => {
      window.removeEventListener('favoriteAdded', handleFavoriteAdded as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!DEV_MODE && !loading && !user) {
      router.push('/login');
    } else if (currentUser?.id) {
      // Em modo DEV, não carregar dados do Supabase
      if (DEV_MODE) {
        // Simular dados carregados
        setTimeout(() => {
          setDadosCarregados(true);
          carregarFavoritosReais(); // Carregar favoritos reais do database
          carregarEmocaoSelecionada();
        }, 1000);
      } else {
        loadStats(currentUser.id);
        carregarFavoritosReais(); // Carregar favoritos reais do database
        carregarEmocaoSelecionada();
      }
    }
  }, [currentUser, loading, user, router, loadStats]);

  // Carregar favoritos reais do database
  const carregarFavoritosReais = async () => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (!currentUser) return;
    
    try {
      const favoritosReais = await getUserFavorites(currentUser.id);
      if (favoritosReais.success && favoritosReais.favorites) {
        // Converter favoritos do database para o formato do mock
        const favoritosFormatados = favoritosReais.favorites.map((fav: any) => ({
          id: fav.devotional_id || `dev-${fav.id}`,
          title: fav.content?.substring(0, 50) + '...' || 'Devocional Favorito',
          verse: fav.content || '',
          reference: fav.reference || '',
          reflection: 'Reflexão do devocional favorito',
          prayer: 'Oração do devocional favorito',
          action: 'Ação do devocional favorito',
          date: new Date(fav.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
          isFavorited: true
        }));
        
        setFavoritos(favoritosFormatados);
        console.log('Favoritos carregados do database:', favoritosFormatados.length);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const carregarFavoritos = () => {
    // Mock de devocionais favoritos completos
    setFavoritos([
      {
        id: 1,
        title: "Deus é Fiel",
        verse: "Porque para Deus nada é impossível.",
        reference: 'Lucas 1:37',
        reflection: "Este versículo nos lembra que Deus tem poder sobre todas as coisas. Mesmo quando enfrentamos desafios que parecem impossíveis, Ele pode intervir e transformar nossa situação.",
        prayer: "Senhor, obrigado por ser um Deus de milagres. Ajuda-me a confiar em Ti mesmo quando as circunstâncias parecem impossíveis.",
        action: "Hoje, vou entregar uma situação difícil nas mãos de Deus e confiar em Sua fidelidade.",
        notes: "Deus me mostrou hoje que posso confiar Nele mesmo quando tudo parece perdido. Minha ansiedade diminuiu muito depois desta reflexão.",
        date: "15 de Janeiro, 2025",
        trail: null, // Devocional do dia
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: "A Fé que Move Montanhas",
        verse: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
        reference: 'Hebreus 11:1',
        reflection: "A fé não é apenas acreditar no que vemos, mas confiar no que não vemos. É a certeza de que Deus está trabalhando mesmo quando não conseguimos perceber.",
        prayer: "Pai, fortalece minha fé. Ajuda-me a confiar em Ti mesmo quando não vejo respostas imediatas.",
        action: "Vou praticar a fé hoje, agindo com confiança em Deus mesmo em situações incertas.",
        notes: "Este devocional me ajudou a entender que fé não é ausência de dúvidas, mas confiança apesar delas. Muito edificante!",
        date: "14 de Janeiro, 2025",
        trail: {
          name: "7 Dias de Paz Interior",
          day: 3,
          total: 7,
          emoji: "🌿"
        },
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: "Gratidão Transformadora",
        verse: "Dêem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.",
        reference: '1 Tessalonicenses 5:18',
        reflection: "A gratidão não é apenas um sentimento, mas uma escolha ativa que transforma nossa perspectiva e nos aproxima de Deus.",
        prayer: "Senhor, ensina-me a ser grato em todas as situações. Ajuda-me a ver Tuas bênçãos mesmo nos momentos difíceis.",
        action: "Vou listar 5 coisas pelas quais sou grato hoje e agradecer a Deus por cada uma delas.",
        notes: "Este devocional me fez perceber quantas coisas boas acontecem todos os dias que eu não percebo. Vou começar um diário de gratidão!",
        date: "13 de Janeiro, 2025",
        trail: {
          name: "Jornada de Gratidão",
          day: 5,
          total: 7,
          emoji: "✨"
        },
        created_at: new Date().toISOString()
      }
    ]);
  };

  // Filtrar e ordenar favoritos

  // Verificar se um dia tem favoritos
  const diaTemFavoritos = (data: string) => {
    return favoritos.some(favorito => 
      favorito.date.includes(data.split('-')[2]) // Comparar dia
    );
  };

  // Obter favoritos de um dia específico
  const obterFavoritosDoDia = (data: string) => {
    return favoritos.filter(favorito => 
      favorito.date.includes(data.split('-')[2])
    );
  };

  const carregarEmocaoSelecionada = () => {
    const emocao = localStorage.getItem('emocao_selecionada');
    if (emocao) {
      setEmocaoSelecionada(emocao);
    }
  };

  const calcularProgressoSemanal = () => {
    // Mock: calcular quantos dias da semana atual foram completados
    return 4; // 4 de 7 dias
  };

  const calcularProgressoMensal = () => {
    // Mock: calcular quantos dias do mês atual foram completados
    return 12; // 12 de 30 dias
  };

  const gerarHistoricoDias = (dias: number) => {
    return Array.from({ length: dias }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (dias - 1 - i));
      
      // Mock: simular dias completados (últimos 4 dias + alguns aleatórios)
      const isCompleted = i >= dias - 4 || (i % 3 === 0 && i > 0);
      
      return {
        date: day,
        isCompleted,
        weekday: day.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNumber: day.getDate(),
        month: day.toLocaleDateString('pt-BR', { month: 'short' })
      };
    });
  };

  const navegarMes = (direcao: 'anterior' | 'proximo') => {
    const novoMes = new Date(mesAtual);
    if (direcao === 'anterior') {
      novoMes.setMonth(novoMes.getMonth() - 1);
    } else {
      novoMes.setMonth(novoMes.getMonth() + 1);
    }
    setMesAtual(novoMes);
  };

  const gerarCalendarioCompleto = () => {
    const primeiroDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1);
    const ultimoDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0);
    const primeiroDiaSemana = primeiroDiaMes.getDay(); // 0 = domingo, 1 = segunda, etc.
    
    // Ajustar para segunda-feira começar na posição 0
    const primeiroDiaSemanaAjustado = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1;
    
    const dias: any[] = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < primeiroDiaSemanaAjustado; i++) {
      dias.push({ isEmpty: true });
    }
    
    // Adicionar dias do mês atual
    for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
      const dataAtual = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), dia);
  const hoje = new Date();
      const isHoje = dataAtual.toDateString() === hoje.toDateString();
      const isPassado = dataAtual < hoje;
      
      // Mock: simular dias completados (dias pares + alguns aleatórios)
      const isCompleted = (dia % 2 === 0) || (dia % 7 === 0);
      
      // Adicionar devocional para alguns dias específicos
      const dataStr = dataAtual.toISOString().split('T')[0];
      if (devocionaisPorData[dataStr]) {
        // Já existe devocional para esta data
      }
      
      dias.push({
        day: dia,
        date: dataAtual,
        isCompleted,
        isHoje,
        isPassado
      });
    }
    
    return dias;
  };

  // Função para abrir modal de devocional
  const abrirModalDevocional = (data: string) => {
    console.log('Tentando abrir devocional para data:', data);
    console.log('Devocionais disponíveis:', Object.keys(devocionaisPorData));
    
    const devocional = devocionaisPorData[data];
    if (devocional) {
      console.log('Devocional encontrado:', devocional);
      setModalDevocional({
        isOpen: true,
        devocional: devocional
      });
    } else {
      console.log('Nenhum devocional encontrado para a data:', data);
      // Criar um devocional mock para qualquer data clicada
      const dataObj = new Date(data);
      const dataFormatada = dataObj.toLocaleDateString('pt-BR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      
      const devocionalMock = {
        id: `dev-${data}`,
        title: 'Momento com Deus',
        verse: 'Busquem primeiro o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês.',
        reference: 'Mateus 6:33',
        reflection: 'Cada dia é uma oportunidade de buscar a Deus e crescer em nossa fé. Mesmo nos momentos simples, Ele está presente.',
        prayer: 'Senhor, obrigado por este dia. Ajuda-me a buscar-Te em todas as coisas e confiar em Teu amor.',
        action: 'Hoje, vou dedicar um momento especial para agradecer a Deus pelas bênçãos recebidas.',
        date: dataFormatada,
        isFavorited: false
      };
      
      setModalDevocional({
        isOpen: true,
        devocional: devocionalMock
      });
    }
  };

  // Função para favoritar devocional
  const toggleFavoritoDevocional = async (devocional: any) => {
    const currentUser = DEV_MODE ? mockUser : user;
    if (!currentUser) return;
    
    try {
      if (devocional.isFavorited) {
        // Remover favorito
        // TODO: Implementar remoção quando tivermos o ID do favorito
        console.log('Removendo favorito:', devocional.id);
      } else {
        // Adicionar favorito
        const result = await addFavorite({
          userId: currentUser.id,
          devotionalId: devocional.id,
          type: 'verse',
          content: devocional.verse,
          reference: devocional.reference,
          notes: ''
        });
        
        if (result.success) {
          // Atualizar estado do devocional
          const devocionalAtualizado = { ...devocional, isFavorited: true };
          
          // Atualizar dados mock
          const dataKey = devocional.id.split('-').slice(1).join('-');
          devocionaisPorData[dataKey] = devocionalAtualizado;
          
          // Atualizar modal
          setModalDevocional({
            isOpen: true,
            devocional: devocionalAtualizado
          });
          
          // Atualizar lista de favoritos
          setFavoritos(prev => {
            const jaExiste = prev.some(fav => fav.id === devocionalAtualizado.id);
            if (jaExiste) {
              return prev;
            }
            return [...prev, devocionalAtualizado];
          });
          
          // Forçar re-renderização do calendário
          setCalendarioExpandido(prev => prev);
          
          console.log('Favorito adicionado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao favoritar devocional:', error);
    }
  };

  const getEmocaoInfo = (emocao: string) => {
    switch (emocao) {
      case 'ansioso':
        return { emoji: '💙', nome: 'Ansioso(a)', cor: colors.accent.blue };
      case 'grato':
        return { emoji: '🙏', nome: 'Grato(a)', cor: colors.accent.gold };
      case 'cansado':
        return { emoji: '🌙', nome: 'Cansado(a)', cor: colors.accent.purple };
      case 'esperançoso':
        return { emoji: '🌟', nome: 'Esperançoso(a)', cor: colors.accent.yellow };
      default:
        return { emoji: '😊', nome: 'Bem', cor: colors.accent.green };
    }
  };

  if ((!DEV_MODE && loading) || (!DEV_MODE && !dadosCarregados)) {
    return <Loading />;
  }

  if (!DEV_MODE && !user) {
    return <Loading />;
  }

  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: colors.background.primary,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10" style={{
        background: colors.background.card,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" className="py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.text.whiteMuted }}
            >
              <FiArrowLeft size={20} />
            </button>
            
            <div className="flex-1">
              <h1 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: typography.serif,
                  color: colors.text.white,
                  fontWeight: typography.weights.semibold,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)'
                }}
              >
                Minha Jornada
              </h1>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  color: colors.text.whiteMuted
                }}
              >
                Sua jornada espiritual em números
              </p>
            </div>
            
            <FontSizeControls />
          </div>
        </Container>
      </header>

      <Container maxWidth="xl" className="py-6 space-y-6">

        {/* Insights Inteligentes e Estatísticas */}
        {stats && (
          <div className="space-y-4">
            {/* Nível de Progresso */}
            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: `linear-gradient(135deg, ${colors.accent.blue}15 0%, ${colors.accent.purple}15 100%)`,
                border: `1px solid ${colors.accent.blue}40`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-xl">💡</span>
                <h3 
                  className="font-bold"
                  style={{ 
                    fontFamily: typography.serif,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)',
                    color: colors.text.white
                  }}
                >
                  {getProgressLevelMessage(getProgressLevel(stats))}
                </h3>
          </div>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  color: colors.text.whiteMuted,
                  fontStyle: 'italic'
                }}
              >
                {getMotivationalMessage('streak', stats?.streak || 0).insight}
              </p>
      </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-3 gap-3">
              {/* Dias Seguidos */}
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="text-xl mb-1">
                  {getMotivationalMessage('streak', stats?.streak || 0).emoji}
                    </div>
                <div 
                  className="text-sm font-bold mb-1"
                  style={{ color: getMotivationalMessage('streak', stats?.streak || 0).color }}
                >
                  {getMotivationalMessage('streak', stats?.streak || 0).primary}
                  </div>
                </div>

              {/* Esta Semana */}
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="text-xl mb-1">
                  {getMotivationalMessage('weekly', calcularProgressoSemanal()).emoji}
                    </div>
                <div 
                  className="text-sm font-bold mb-1"
                  style={{ color: getMotivationalMessage('weekly', calcularProgressoSemanal()).color }}
                >
                  {getMotivationalMessage('weekly', calcularProgressoSemanal()).primary}
                  </div>
                </div>

              {/* Total */}
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="text-xl mb-1">
                  {getMotivationalMessage('total', stats?.devotionals_completed || 0).emoji}
                    </div>
                <div 
                  className="text-sm font-bold mb-1"
                  style={{ color: getMotivationalMessage('total', stats?.devotionals_completed || 0).color }}
                >
                  {getMotivationalMessage('total', stats?.devotionals_completed || 0).primary}
                  </div>
                  </div>
                </div>
              </div>
        )}

        {/* Meus Momentos com Deus - Seção Unificada */}
        <div 
          className="p-4 sm:p-6 rounded-2xl transform transition-all hover:scale-[1.01] hover:shadow-xl"
          style={{
            background: colors.background.card,
            border: `2px solid ${colors.accent.gold}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)'
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.text.gold
            }}>
              <span className="text-xl sm:text-2xl">🙏</span>
            </div>
            <div>
              <h3 
                className="font-bold mb-1"
                style={{ 
                  fontFamily: typography.serif,
                  fontSize: 'calc(var(--font-size-base, 1rem) * 1.5)',
                  color: colors.text.white
                }}
              >
                Meus Momentos com Deus
              </h3>
              <p 
                style={{ 
                  fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                  color: colors.text.whiteMuted
                }}
              >
                Seu histórico e momentos especiais salvos
              </p>
            </div>
          </div>


          {/* Calendário de Progresso */}
          <div 
            className="bg-white/5 rounded-lg p-3 cursor-pointer transition-all hover:bg-white/10"
            onClick={() => setCalendarioExpandido(!calendarioExpandido)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 
                className="font-semibold"
                style={{ 
                  fontFamily: typography.sans,
                  color: colors.text.white,
                  fontSize: typography.body.md
                }}
              >
                {calendarioExpandido ? 'Calendário Completo' : 'Últimos 7 dias'}
              </h4>
              <div 
                className="text-sm transition-transform"
                style={{ 
                  color: colors.text.whiteMuted,
                  transform: calendarioExpandido ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                ▼
                    </div>
                  </div>

            {!calendarioExpandido ? (
              // Visual compacto - últimos 7 dias
              <div className="grid grid-cols-7 gap-2">
                {gerarHistoricoDias(7).map((day, i) => (
                  <div key={i} className="text-center">
                    <div 
                      className="text-xs mb-1"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      {day.weekday}
              </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                      style={{
                        background: day.isCompleted ? colors.accent.green : 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${day.isCompleted ? colors.accent.green : colors.border}`
                      }}
                    >
                      <span className="text-sm">{day.isCompleted ? '✓' : '○'}</span>
            </div>
                  </div>
                ))}
                </div>
            ) : (
              // Calendário completo
              <div className="space-y-4">
                {/* Cabeçalho com navegação */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navegarMes('anterior');
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: colors.text.whiteMuted }}
                  >
                    ←
                  </button>
                  
                  <h5 
                    className="font-semibold"
                  style={{ 
                      fontFamily: typography.sans,
                      color: colors.text.white,
                      fontSize: typography.body.md
                    }}
                  >
                    {mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h5>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navegarMes('proximo');
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: colors.text.whiteMuted }}
                  >
                    →
                  </button>
                    </div>
                
                {/* Dias da semana */}
                <div className="grid grid-cols-7 gap-1">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia) => (
                    <div 
                      key={dia}
                      className="text-center py-2"
                  style={{ 
                        color: colors.text.whiteMuted,
                        fontSize: 'var(--font-size-base, 1rem)',
                        fontFamily: typography.sans
                  }}
                >
                      {dia}
                  </div>
                  ))}
              </div>

                {/* Dias do calendário */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1">
                  {gerarCalendarioCompleto().map((dia, i) => (
                    <div key={i} className="text-center">
                      {dia.isEmpty ? (
                        <div className="w-10 h-10 sm:w-8 sm:h-8" />
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => {
                              if (dia.isCompleted) {
                                const dataStr = dia.date.toISOString().split('T')[0];
                                abrirModalDevocional(dataStr);
                              }
                            }}
                            className={`
                              w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto text-sm sm:text-xs font-medium
                              transition-all duration-200
                              ${dia.isHoje ? 'ring-2 ring-blue-400' : ''}
                              ${dia.isCompleted ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                            `}
                            style={{
                              background: dia.isCompleted 
                                ? colors.accent.green 
                                : dia.isHoje 
                                  ? colors.accent.blue 
                                  : dia.isPassado 
                                    ? 'rgba(255, 255, 255, 0.1)' 
                                    : 'rgba(255, 255, 255, 0.05)',
                              border: dia.isCompleted 
                                ? `2px solid ${colors.accent.green}` 
                                : dia.isHoje 
                                  ? `2px solid ${colors.accent.blue}` 
                                  : `1px solid ${colors.border}`,
                              color: dia.isCompleted || dia.isHoje 
                                ? colors.text.white 
                                : colors.text.whiteMuted
                            }}
                          >
                            {dia.day}
                          </button>
                          {/* Marcação de favoritos */}
                          {dia.isCompleted && diaTemFavoritos(dia.date.toISOString().split('T')[0]) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const dataStr = dia.date.toISOString().split('T')[0];
                                const favoritosDoDia = obterFavoritosDoDia(dataStr);
                                // Mostrar favoritos do dia em um modal ou navegar para aba de favoritos
                                setAbaAtiva('favoritos');
                                // Filtrar favoritos para mostrar apenas os do dia clicado
                                console.log('Favoritos do dia:', favoritosDoDia);
                              }}
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                              style={{ background: colors.accent.red }}
                              title={`${obterFavoritosDoDia(dia.date.toISOString().split('T')[0]).length} favorito(s) - Clique para ver`}
                            >
                              <span className="text-xs">❤️</span>
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                  ))}
                </div>
                
                {/* Legenda */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ background: colors.accent.green }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      Completo
                    </span>
                    </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full ring-2"
                      style={{ 
                        background: colors.accent.blue,
                        ringColor: colors.accent.blue
                      }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      Hoje
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex items-center justify-center"
                      style={{ background: colors.accent.red }}
                    >
                      <span className="text-xs">❤️</span>
                    </div>
                    <span 
                      className="text-xs"
                      style={{ color: colors.text.whiteMuted }}
                    >
                      Com Favoritos
                    </span>
                  </div>
              </div>
            </div>
          )}

            {!calendarioExpandido && (
              <p 
                className="text-xs text-center mt-3"
                style={{ color: colors.text.whiteMuted }}
              >
                Toque para ver o calendário completo
              </p>
            )}
          </div>
        </div>

        {/* Trilhas Feitas - Seção Secundária */}
        <div 
          className="p-5 rounded-2xl transform transition-all hover:scale-[1.01]"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: colors.text.blue
            }}>
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <h3 
                className="font-bold mb-1"
                              style={{ 
                                fontFamily: typography.serif,
                  fontSize: typography.heading.h3,
                    color: colors.text.white
                              }}
                            >
                Trilhas Feitas
              </h3>
                            <p 
                              style={{ 
                                fontFamily: typography.sans,
                  fontSize: 'var(--font-size-base, 1rem)',
                                color: colors.text.whiteMuted
                              }}
                            >
                Suas jornadas temáticas
                            </p>
                          </div>
              </div>

          {/* Trilhas em andamento */}
          <div className="space-y-3">
            <div 
              className="p-4 rounded-xl flex items-center justify-between relative"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              {/* Badge de Progresso */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse" style={{
                background: colors.accent.green,
                color: 'white',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}>
                3
                      </div>
              
              <div>
                <h4 
                  className="font-semibold mb-1"
                              style={{ 
                    fontFamily: typography.sans,
                    color: colors.text.white,
                    fontSize: typography.body.md
                              }}
                            >
                  🌿 7 Dias de Paz Interior
                            </h4>
                            <p 
                              style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                              }}
                            >
                  Dia 3 de 7 - Continue assim!
                            </p>
                          </div>
              <div 
                className="text-2xl font-bold"
                style={{ color: colors.accent.blue }}
              >
                3/7
                      </div>
                    </div>

            {/* Trilhas completadas */}
            <div 
              className="p-4 rounded-xl flex items-center justify-between relative"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              {/* Badge de Conquista */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{
                background: colors.accent.gold,
                color: 'white',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)'
              }}>
                🏆
              </div>
              
              <div>
                <h4 
                  className="font-semibold mb-1"
                              style={{ 
                    fontFamily: typography.sans,
                    color: colors.text.white,
                    fontSize: typography.body.md
                              }}
                            >
                  ✨ Jornada de Gratidão
                            </h4>
                            <p 
                              style={{ 
                                fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                                color: colors.text.whiteMuted
                              }}
                            >
                  Completada há 2 dias - Parabéns!
                            </p>
                          </div>
              <div className="text-2xl">🎉</div>
                        </div>
                      </div>
              </div>


        {/* Call to Action Fortalecido */}
        {false && (
          <div 
            className="p-6 rounded-2xl"
                              style={{ 
              background: colors.background.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                background: colors.accent.red
              }}>
                <FiBookmark size={24} className="text-white" />
                    </div>
                    <div>
                <h3 
                  className="font-bold mb-1"
                    style={{ 
                      fontFamily: typography.serif,
                    fontSize: typography.heading.h3,
                      color: colors.text.white
                    }}
                  >
                  Devocionais Favoritos
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                      color: colors.text.whiteMuted
                    }}
                  >
                  Devocionais completos que você salvou
                  </p>
                </div>
            </div>

            {/* Filtros visuais */}
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {}}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    false 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  style={{
                    fontSize: 'var(--font-size-base, 1rem)',
                    fontFamily: typography.sans
                  }}
                >
                  📚 Todos
                </button>
                <button
                  onClick={() => setFiltroFavoritos('recentes')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroFavoritos === 'recentes' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  style={{
                    fontSize: 'var(--font-size-base, 1rem)',
                    fontFamily: typography.sans
                  }}
                >
                  🕒 Recentes
                </button>
                <button
                  onClick={() => setFiltroFavoritos('antigos')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroFavoritos === 'antigos' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  style={{
                    fontSize: 'var(--font-size-base, 1rem)',
                    fontFamily: typography.sans
                  }}
                >
                  📖 Antigos
                </button>
                <button
                  onClick={() => {
                    const mesAtualStr = mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                    // Filtrar favoritos do mês atual
                    const favoritosDoMes = favoritos.filter(favorito => 
                      favorito.date.includes(mesAtualStr.split(' ')[0]) // Comparar mês
                    );
                    // Por enquanto, apenas mostrar no console - pode ser expandido depois
                    console.log(`Favoritos de ${mesAtualStr}:`, favoritosDoMes);
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-white/10 text-white/70 hover:bg-white/20"
                  style={{
                    fontSize: 'var(--font-size-base, 1rem)',
                    fontFamily: typography.sans
                  }}
                >
                  📅 Este Mês
                </button>
              </div>
              <p 
                className="mt-2 text-sm"
                style={{ 
                  color: colors.text.whiteMuted,
                  fontSize: 'var(--font-size-base, 1rem)',
                  fontFamily: typography.sans
                }}
              >
                {favoritosFiltrados.length} devocional{favoritosFiltrados.length !== 1 ? 'is' : ''} favorito{favoritosFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-4">
              {favoritosFiltrados.slice(0, 5).map((favorito) => (
                <div 
                  key={favorito.id}
                  className="rounded-xl transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Cabeçalho do devocional - sempre visível */}
                  <div 
                    className="p-4 cursor-pointer transition-all hover:bg-white/5"
                    onClick={() => setDevocionalExpandido(
                      devocionalExpandido === favorito.id ? null : favorito.id
                    )}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⭐</div>
                      <div className="flex-1">
                        <h4 
                          className="font-semibold mb-2"
                          style={{ 
                            fontFamily: typography.serif,
                            color: colors.text.white,
                            fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)'
                          }}
                        >
                          {favorito.title}
                        </h4>
                        <p 
                          className="text-sm mb-2"
                          style={{ 
                            fontFamily: typography.sans,
                            color: colors.text.whiteMuted,
                            fontSize: 'var(--font-size-base, 1rem)'
                          }}
                        >
                          📅 {favorito.date}
                        </p>
                        <div 
                          className="text-sm italic mb-2 p-2 rounded-lg"
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: colors.text.white,
                            fontFamily: typography.serif,
                            fontSize: 'var(--font-size-base, 1rem)'
                          }}
                        >
                          "{favorito.verse}"
                        </div>
                        <p 
                          className="text-xs"
                          style={{ 
                            fontFamily: typography.sans,
                            color: colors.accent.purple,
                            fontSize: 'calc(var(--font-size-base, 1rem) * 0.875)'
                          }}
                        >
                          📖 {favorito.reference}
                        </p>
                      </div>
                    </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: colors.text.whiteMuted,
                            fontFamily: typography.sans
                          }}
                        >
                          Ver devocional
                        </span>
                        <div 
                          className={`transition-transform duration-200 ${
                            devocionalExpandido === favorito.id ? 'rotate-180' : ''
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                    </div>
                    </div>
                    </div>
                  </div>

                  {/* Conteúdo expansível */}
                  {devocionalExpandido === favorito.id && (
                    <div className="px-4 pb-4 space-y-4 border-t border-white/10">

                  {/* Versículo */}
                  <div className="mb-3 p-3 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                    <p 
                      className="mb-1 leading-relaxed"
                      style={{
                      fontFamily: typography.serif,
                        color: colors.text.white,
                        fontSize: typography.body.md,
                        fontStyle: 'italic'
                    }}
                  >
                      "{favorito.verse}"
                    </p>
                  <p 
                      className="text-xs font-medium"
                      style={{
                      fontFamily: typography.sans,
                        color: colors.accent.gold
                      }}
                    >
                      {favorito.reference}
                  </p>
                  </div>

                  {/* Reflexão */}
                  <div className="mb-3">
                    <p 
                      className="text-xs font-medium mb-1"
                      style={{ 
                        fontFamily: typography.sans,
                        color: colors.accent.blue,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Reflexão
                    </p>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        fontFamily: typography.sans,
                        color: colors.text.whiteMuted
                      }}
                    >
                      {favorito.reflection}
                      </p>
                  </div>

                  {/* Oração */}
                  <div className="mb-3">
                    <p 
                      className="text-xs font-medium mb-1"
                      style={{
                        fontFamily: typography.sans,
                        color: colors.accent.purple,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Oração
                    </p>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: typography.sans,
                        color: colors.text.whiteMuted
                      }}
                    >
                      {favorito.prayer}
                    </p>
                    </div>

                  {/* Ação do Dia */}
                  <div>
                    <p 
                      className="text-xs font-medium mb-1"
                      style={{ 
                        fontFamily: typography.sans,
                        color: colors.accent.green,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Ação do Dia
                    </p>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        fontFamily: typography.sans,
                        color: colors.text.whiteMuted
                      }}
                    >
                      {favorito.action}
                    </p>
                    </div>

                  {/* Anotações Pessoais */}
                  {favorito.notes && (
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                      <p 
                        className="text-xs font-medium mb-2"
                      style={{
                          fontFamily: typography.sans,
                          color: colors.accent.purple,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        📝 Suas Anotações
                      </p>
                      <p 
                        className="text-sm leading-relaxed"
                      style={{
                          fontFamily: typography.sans,
                        color: colors.text.white,
                          fontStyle: 'italic'
                      }}
                    >
                        "{favorito.notes}"
                      </p>
                    </div>
                  )}
                </div>
              )}
                  </div>
              ))}
                </div>

            {favoritosFiltrados.length > 5 && (
              <div className="text-center mt-4">
                <p 
                  style={{ 
                    fontFamily: typography.sans,
                    fontSize: 'var(--font-size-base, 1rem)',
                    color: colors.text.whiteMuted
                  }}
                >
                  +{favoritosFiltrados.length - 5} devocionais favoritos adicionais
                      </p>
                  </div>
                  )}
                </div>
              )}

        {/* Call to Action Fortalecido */}
        <div 
          className="p-8 rounded-2xl text-center transform transition-all hover:scale-[1.02] hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.gold}20 0%, ${colors.accent.blue}20 100%)`,
            border: `2px solid ${colors.accent.gold}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 12px 40px rgba(212, 175, 55, 0.3)'
          }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" style={{
            background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.orange} 100%)`,
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)'
          }}>
            <span className="text-4xl">🙏</span>
              </div>

          <h3 
            className="font-bold mb-3"
            style={{ 
              fontFamily: typography.serif,
              fontSize: typography.heading.h2,
              fontWeight: typography.weights.semibold,
              color: colors.text.white,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Continue sua jornada
          </h3>
          <p 
            className="mb-8 text-lg"
            style={{ 
              fontFamily: typography.sans,
              fontSize: typography.body.lg,
              color: colors.text.whiteMuted,
              fontWeight: typography.weights.medium
            }}
          >
            Que tal dedicar alguns minutos para estar com Deus hoje?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link 
              href="/devocional-do-dia"
              className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl"
                    style={{
                background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.orange} 100%)`,
                color: 'white',
                fontFamily: typography.sans,
                fontSize: typography.body.lg,
                fontWeight: typography.weights.bold,
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              ✨ Devocional do Dia
                  </Link>
            
            <Link
              href="/trilhas"
              className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl"
                    style={{
                background: 'transparent',
                border: `3px solid ${colors.accent.gold}`,
                color: colors.accent.gold,
                fontFamily: typography.sans,
                fontSize: typography.body.lg,
                fontWeight: typography.weights.bold,
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)'
              }}
            >
              🗺️ Trilhas Guiadas
            </Link>
                </div>
        </div>
      </Container>

      {/* Modal de Devocional */}
      <ModalDevocional
        isOpen={modalDevocional.isOpen}
        onClose={() => setModalDevocional({ isOpen: false, devocional: null })}
        devocional={modalDevocional.devocional}
        onToggleFavorite={toggleFavoritoDevocional}
      />

      {/* Modal de Favoritos */}
      {modalFavoritos && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ 
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'none'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalFavoritos(false);
            }
          }}
        >
          <div 
            className="rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden"
            style={{
              background: colors.background.card,
              border: `2px solid ${colors.accent.gold}`,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="p-6 border-b" style={{ borderColor: colors.border }}>
              <div className="flex items-center justify-between">
                <h3 
                  className="text-xl font-bold"
                  style={{
                    fontFamily: typography.serif,
                    color: colors.text.white,
                    fontSize: 'calc(var(--font-size-base, 1rem) * 1.25)'
                  }}
                >
                  ❤️ Meus Favoritos
                </h3>
                <button
                  onClick={() => setModalFavoritos(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ color: colors.text.whiteMuted }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Lista de Favoritos */}
            <div className="overflow-y-auto max-h-[70vh]">
              {favoritos.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <div className="text-6xl mb-4">💝</div>
                  <p 
                    style={{
                      fontFamily: typography.sans,
                      fontSize: 'var(--font-size-base, 1rem)',
                      color: colors.text.whiteMuted
                    }}
                  >
                    Nenhum favorito ainda
                  </p>
                  <p 
                    className="text-sm mt-2"
                    style={{
                      fontFamily: typography.sans,
                      fontSize: 'calc(var(--font-size-base, 1rem) * 0.875)',
                      color: colors.text.whiteMuted
                    }}
                  >
                    Marque devocionais como favoritos para vê-los aqui
                  </p>
                </div>
              ) : (
                <div>
                  {(() => {
                    // Organizar favoritos por mês/ano
                    const favoritosPorMes = favoritos.reduce((acc, favorito) => {
                      // Corrigir parsing da data
                      let data;
                      try {
                        if (favorito.date.includes('de')) {
                          const partes = favorito.date.split(' de ');
                          const dia = partes[0];
                          const mesAno = partes[1].split(', ');
                          const mes = mesAno[0];
                          const ano = mesAno[1];
                          
                          const meses = {
                            'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
                            'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
                            'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
                          };
                          
                          data = new Date(`${ano}-${meses[mes]}-${dia.padStart(2, '0')}`);
                        } else {
                          data = new Date(favorito.date);
                        }
                      } catch (e) {
                        data = new Date();
                      }
                      
                      const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
                      const nomeMes = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                      
                      if (!acc[mesAno]) {
                        acc[mesAno] = {
                          nomeMes,
                          favoritos: []
                        };
                      }
                      acc[mesAno].favoritos.push(favorito);
                      return acc;
                    }, {} as any);

                    const mesesOrdenados = Object.keys(favoritosPorMes).sort().reverse();

                    return mesesOrdenados.map((mesAno) => (
                      <div key={mesAno}>
                        {/* Cabeçalho do Mês */}
                        <div 
                          className="sticky top-0 px-6 py-3 border-b"
                          style={{ 
                            background: colors.background.primary,
                            borderColor: colors.border
                          }}
                        >
                          <h4 
                            className="font-semibold"
                            style={{
                              fontFamily: typography.sans,
                              fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)',
                              color: colors.text.white,
                              textTransform: 'capitalize'
                            }}
                          >
                            📅 {favoritosPorMes[mesAno].nomeMes}
                          </h4>
                        </div>

                        {/* Lista de Favoritos do Mês */}
                        <div className="divide-y" style={{ borderColor: colors.border }}>
                          {favoritosPorMes[mesAno].favoritos
                            .sort((a, b) => {
                              let dataA, dataB;
                              try {
                                if (a.date.includes('de')) {
                                  const partesA = a.date.split(' de ');
                                  const diaA = partesA[0];
                                  const mesAnoA = partesA[1].split(', ');
                                  const mesA = mesAnoA[0];
                                  const anoA = mesAnoA[1];
                                  
                                  const meses = {
                                    'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
                                    'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
                                    'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
                                  };
                                  
                                  dataA = new Date(`${anoA}-${meses[mesA]}-${diaA.padStart(2, '0')}`);
                                } else {
                                  dataA = new Date(a.date);
                                }
                                
                                if (b.date.includes('de')) {
                                  const partesB = b.date.split(' de ');
                                  const diaB = partesB[0];
                                  const mesAnoB = partesB[1].split(', ');
                                  const mesB = mesAnoB[0];
                                  const anoB = mesAnoB[1];
                                  
                                  const meses = {
                                    'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
                                    'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
                                    'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
                                  };
                                  
                                  dataB = new Date(`${anoB}-${meses[mesB]}-${diaB.padStart(2, '0')}`);
                                } else {
                                  dataB = new Date(b.date);
                                }
                              } catch (e) {
                                dataA = new Date();
                                dataB = new Date();
                              }
                              
                              return dataB.getTime() - dataA.getTime();
                            })
                            .map((favorito) => (
                            <div
                              key={favorito.id}
                              className="p-4 hover:bg-white/5 cursor-pointer transition-colors"
                              onClick={() => {
                                setModalFavoritos(false);
                                // Abrir o devocional correto
                                const devocionalData = devocionaisPorData[favorito.date];
                                if (devocionalData) {
                                  setModalDevocional({
                                    isOpen: true,
                                    devocional: devocionalData
                                  });
                                }
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">⭐</div>
                                <div className="flex-1">
                                  <h5 
                                    className="font-semibold mb-1"
                                    style={{
                                      fontFamily: typography.serif,
                                      fontSize: 'calc(var(--font-size-base, 1rem) * 1.125)',
                                      color: colors.text.white
                                    }}
                                  >
                                    {favorito.title}
                                  </h5>
                                  <p 
                                    className="text-sm"
                                    style={{
                                      fontFamily: typography.sans,
                                      fontSize: 'var(--font-size-base, 1rem)',
                                      color: colors.text.whiteMuted
                                    }}
                                  >
                                    📅 {favorito.date}
                                  </p>
                                  <p 
                                    className="text-xs mt-1"
                                    style={{
                                      fontFamily: typography.sans,
                                      fontSize: 'calc(var(--font-size-base, 1rem) * 0.875)',
                                      color: colors.accent.purple
                                    }}
                                  >
                                    📖 {favorito.reference}
                                  </p>
                                </div>
                                <div 
                                  className="text-xs px-3 py-1 rounded-full font-medium"
                                  style={{
                                    background: colors.accent.gold,
                                    color: colors.text.white,
                                    fontFamily: typography.sans
                                  }}
                                >
                                  Ver
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}