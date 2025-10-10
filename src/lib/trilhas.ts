/**
 * 📚 SISTEMA DE TRILHAS GUIADAS
 * 
 * Trilhas são jornadas devocionais temáticas de múltiplos dias
 * que seguem a mesma metodologia dos devocionais diários:
 * SABEDORIA → PALAVRA VIVA → AÇÃO DO DIA → ORA
 */

export interface TrilhaDia {
  dia: number;
  titulo: string;
  referencia: string;
  texto: string;
  versiculo_contexto?: string;
  palavraViva: string;
  acao: string;
  oracao: string;
  concluido?: boolean;
  dataConclusao?: string;
  anotacoes?: string;
}

export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  tema: string; // Para categorização
  duracao: number; // número de dias
  icone: string; // emoji
  cor: string; // cor do tema
  dias: TrilhaDia[];
}

export interface TrilhaProgresso {
  trilhaId: string;
  userId: string;
  diaAtual: number;
  diasConcluidos: number[];
  dataInicio: string;
  dataUltimoDia?: string;
  status: 'ativa' | 'pausada' | 'concluida';
}

// ============================================
// 🎯 TRILHA 1: "7 DIAS DE PAZ INTERIOR"
// ============================================
export const TRILHA_PAZ_INTERIOR: Trilha = {
  id: '7-dias-paz-interior',
  titulo: '7 Dias de Paz Interior',
  descricao: 'Transforme ansiedade em paz através de uma jornada guiada de 7 dias com Deus',
  tema: 'Ansiedade e Paz',
  duracao: 7,
  icone: '🕊️',
  cor: '#10b981', // verde paz
  dias: [
    // ============================================
    // DIA 1: "Respire e Confie"
    // ============================================
    {
      dia: 1,
      titulo: 'Respire e Confie',
      referencia: 'Salmo 46:10',
      texto: 'Aquietai-vos e sabei que eu sou Deus; serei exaltado entre os gentios, serei exaltado sobre a terra.',
      versiculo_contexto: 'Este salmo foi escrito em um momento de grande perigo nacional. Os filhos de Coré nos lembram que, mesmo em meio ao caos, Deus é nosso refúgio e fortaleza, socorro bem presente na angústia.',
      palavraViva: 'Deus não está pedindo para você resolver tudo sozinha. Ele está dizendo: "Pare. Respire. Eu cuido de você." A ansiedade vem quando tentamos controlar o que não está em nossas mãos.',
      acao: 'Hoje, quando sentir ansiedade, pare por 30 segundos, respire fundo 3 vezes e repita: "Deus cuida de mim". Faça isso pelo menos 3 vezes ao longo do dia.',
      oracao: 'Pai, ensina-me a parar e confiar em Ti. Quando a ansiedade vier, lembra-me de que Tu estás no controle. Ajuda-me a descansar na Tua paz. Amém.'
    },
    
    // ============================================
    // DIA 2: "Não Se Preocupe"
    // ============================================
    {
      dia: 2,
      titulo: 'Não Se Preocupe',
      referencia: 'Mateus 6:25-26',
      texto: 'Por isso vos digo: Não andeis ansiosos pela vossa vida, quanto ao que haveis de comer ou beber; nem pelo vosso corpo, quanto ao que haveis de vestir. Não é a vida mais do que o alimento, e o corpo mais do que o vestuário? Olhai para as aves do céu, que não semeiam, nem segam, nem ajuntam em celeiros; e vosso Pai celestial as alimenta. Não valeis vós muito mais do que elas?',
      versiculo_contexto: 'Jesus está no meio do Sermão do Monte, ensinando sobre as prioridades do Reino. Ele contrasta a ansiedade humana com a confiança que devemos ter em Deus como Pai.',
      palavraViva: 'Jesus sabia que a preocupação é um dos maiores ladrões da nossa paz. Ele não está dizendo para ser irresponsável, mas para confiar que Deus já sabe do que você precisa.',
      acao: 'Escreva 3 preocupações que estão tirando sua paz hoje. Depois de cada uma, escreva: "Deus cuida disso". Guarde o papel e deixe com Ele.',
      oracao: 'Senhor, ensina-me a confiar como os pássaros do céu e as flores do campo. Ajuda-me a buscar primeiro o Teu reino e a Tua justiça, sabendo que tudo o mais será acrescentado. Amém.'
    },
    
    // ============================================
    // DIA 3: "Paz que Excede"
    // ============================================
    {
      dia: 3,
      titulo: 'Paz que Excede',
      referencia: 'Filipenses 4:6-7',
      texto: 'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplicas, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.',
      versiculo_contexto: 'Paulo escreve esta carta da prisão, enfrentando circunstâncias difíceis. Mesmo assim, ele fala sobre alegria e paz, mostrando que essas não dependem das circunstâncias.',
      palavraViva: 'A paz de Deus não é ausência de problemas, mas presença de Deus no meio deles. É uma paz que não faz sentido para o mundo, mas que sustenta nosso coração.',
      acao: 'Quando surgir uma preocupação hoje, pare e ore sobre ela. Termine sempre agradecendo por 3 coisas boas na sua vida. Observe como a paz vem.',
      oracao: 'Pai, obrigado por me prometer uma paz que vai além do que posso entender. Ensina-me a orar com gratidão e a confiar que Tu guardas meu coração. Amém.'
    },
    
    // ============================================
    // DIA 4: "Castelo Forte"
    // ============================================
    {
      dia: 4,
      titulo: 'Castelo Forte',
      referencia: 'Salmo 91:1-2',
      texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.',
      versiculo_contexto: 'Este salmo é conhecido como "o salmo da proteção". Era cantado pelos israelitas em momentos de perigo, lembrando-os de que Deus é seu refúgio seguro.',
      palavraViva: 'Deus não é apenas um ajudante distante. Ele é seu refúgio pessoal, um lugar seguro onde você pode descansar. Quando se sentir vulnerável, lembre-se: você tem um castelo forte.',
      acao: 'Visualize-se entrando em um lugar seguro e protegido. Pode ser um castelo, uma cabana na montanha ou qualquer lugar que traga paz. Deus é esse lugar para você.',
      oracao: 'Senhor, obrigado por ser meu refúgio seguro. Ensina-me a habitar na Tua presença e a descansar à Tua sombra. Em Ti encontro proteção e paz. Amém.'
    },
    
    // ============================================
    // DIA 5: "Descanso Real"
    // ============================================
    {
      dia: 5,
      titulo: 'Descanso Real',
      referencia: 'Mateus 11:28-30',
      texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração; e encontrareis descanso para as vossas almas.',
      versiculo_contexto: 'Jesus faz este convite logo após agradecer ao Pai por revelar verdades aos simples. É um contraste com os escribas e fariseus que colocavam fardos pesados sobre o povo.',
      palavraViva: 'Jesus não está oferecendo uma vida sem responsabilidades, mas uma vida com Ele. Seu jugo é leve porque Ele carrega conosco. O descanso vem quando paramos de tentar fazer tudo sozinhos.',
      acao: 'Identifique uma responsabilidade que está pesando muito hoje. Entregue-a a Jesus em oração e peça sabedoria para lidar com ela. Observe como o peso diminui.',
      oracao: 'Jesus, estou cansada e sobrecarregada. Ajuda-me a aprender de Ti, que és manso e humilde. Ensina-me a carregar o Teu jugo leve e encontrar descanso para minha alma. Amém.'
    },
    
    // ============================================
    // DIA 6: "Coragem e Paz"
    // ============================================
    {
      dia: 6,
      titulo: 'Coragem e Paz',
      referencia: 'João 14:27',
      texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
      versiculo_contexto: 'Jesus está no cenáculo, na última ceia, sabendo que será crucificado em poucas horas. Mesmo assim, Ele fala de paz aos discípulos que estão prestes a enfrentar grande tribulação.',
      palavraViva: 'A paz de Jesus é diferente da paz do mundo. O mundo oferece paz baseada em circunstâncias. Jesus oferece paz baseada em Sua presença, independente das circunstâncias.',
      acao: 'Quando algo te preocupar hoje, lembre-se: Jesus já te deu Sua paz. Não é algo que você precisa conquistar, mas receber. Abra seu coração para receber essa paz.',
      oracao: 'Senhor, obrigado por me dar Tua paz. Ensina-me a receber essa paz que não depende das circunstâncias, mas da Tua presença. Ajuda-me a não me turbar nem temer. Amém.'
    },
    
    // ============================================
    // DIA 7: "Paz Duradoura"
    // ============================================
    {
      dia: 7,
      titulo: 'Paz Duradoura',
      referencia: 'Isaías 26:3',
      texto: 'Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.',
      versiculo_contexto: 'Este capítulo de Isaías é um cântico de louvor pela salvação de Judá. É um contraste entre a cidade forte de Deus e as cidades dos ímpios que serão destruídas.',
      palavraViva: 'A paz duradoura não vem de controlar as circunstâncias, mas de manter nossa mente firme em Deus. É uma escolha diária de confiar, mesmo quando não entendemos.',
      acao: 'Reflita sobre os últimos 6 dias. Que mudanças você já sentiu? Como você pode continuar mantendo sua mente firme em Deus? Faça um compromisso pessoal.',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado. Ajuda-me a manter minha mente firme em Ti todos os dias. Ensina-me a confiar e a conservar a paz que vem de Ti. Amém.'
    }
  ]
};

// ============================================
// 📚 CATÁLOGO DE TRILHAS
// ============================================
export const TRILHAS_DISPONIVEIS: Trilha[] = [
  TRILHA_PAZ_INTERIOR,
  // Futuras trilhas serão adicionadas aqui
];

// ============================================
// 🔧 FUNÇÕES AUXILIARES
// ============================================

/**
 * Busca uma trilha pelo ID
 */
export function getTrilhaById(id: string): Trilha | undefined {
  return TRILHAS_DISPONIVEIS.find(trilha => trilha.id === id);
}

/**
 * Busca um dia específico de uma trilha
 */
export function getTrilhaDia(trilhaId: string, dia: number): TrilhaDia | undefined {
  const trilha = getTrilhaById(trilhaId);
  if (!trilha) return undefined;
  
  return trilha.dias.find(d => d.dia === dia);
}

/**
 * Calcula o progresso de uma trilha
 */
export function calcularProgressoTrilha(diasConcluidos: number[], totalDias: number): number {
  return Math.round((diasConcluidos.length / totalDias) * 100);
}

/**
 * Verifica se um dia está desbloqueado (lógica sequencial)
 */
export function isDiaDesbloqueado(dia: number, diasConcluidos: number[]): boolean {
  // Dia 1 sempre está desbloqueado
  if (dia === 1) return true;
  
  // Para desbloquear dia N, o dia N-1 deve estar concluído
  return diasConcluidos.includes(dia - 1);
}

/**
 * Retorna o próximo dia disponível
 */
export function getProximoDiaDisponivel(diasConcluidos: number[], totalDias: number): number {
  // Se não completou nenhum, retorna dia 1
  if (diasConcluidos.length === 0) return 1;
  
  // Se completou todos, retorna -1 para indicar que está completa
  if (diasConcluidos.length >= totalDias) return -1;
  
  // Retorna o próximo dia não concluído
  for (let dia = 1; dia <= totalDias; dia++) {
    if (!diasConcluidos.includes(dia)) {
      return dia;
    }
  }
  
  return 1;
}

