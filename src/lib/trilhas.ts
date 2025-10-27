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
// 🎯 TRILHA 2: "7 DIAS DE GRATIDÃO" (Desejo)
// ============================================
export const TRILHA_GRATIDAO: Trilha = {
  id: '7-dias-gratidao',
  titulo: '7 Dias de Gratidão',
  descricao: 'Transforme sua perspectiva através de uma jornada guiada de gratidão',
  tema: 'Gratidão',
  duracao: 7,
  icone: '🙏',
  cor: '#f59e0b',
  dias: [
    {
      dia: 1,
      titulo: 'Gratidão Transforma Perspectiva',
      referencia: '1 Tessalonicenses 5:18',
      texto: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.',
      versiculo_contexto: 'Paulo estava escrevendo para igreja perseguida. Sem casa, sem segurança. Ainda assim diz: "Em TUDO, dê graças." Não "por tudo estar bom", mas "AINDA QUE seja difícil, agradeça QUE DEUS ESTÁ AQUI."',
      palavraViva: 'Gratidão não é sobre circunstâncias perfeitas. É reconhecer que Deus está presente, mesmo em meio ao caos.',
      acao: 'Escreva 3 coisas específicas pelas quais você É grato hoje (pode ser café quente, saúde para acordar, um sorriso). Pense em cada uma por 30 segundos.',
      oracao: 'Senhor, obrigado(a) por [3 coisas específicas]. Perdoa-me por reclamar tanto e focar no que falta. Ajuda-me a ter olhos gratos que enxergam Tuas bênçãos todos os dias. Amém.'
    },
    {
      dia: 2,
      titulo: 'Gratidão em Tempos Difíceis',
      referencia: 'Filipenses 4:6-7',
      texto: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, COM AÇÕES DE GRAÇAS.',
      versiculo_contexto: 'Paulo está preso, incerto do futuro. Mas ele diz: "com AÇÕES DE GRAÇAS." Antes mesmo de ter a resposta, agradeça. Gratidão VEM ANTES da solução.',
      palavraViva: 'Posso agradecer ANTES da solução. Gratidão é atitude, não resultado de circunstâncias boas.',
      acao: 'Há alguma situação difícil? Antes de orar pedindo, ORE AGRADECENDO: "Obrigado, Deus, por estar aqui COMIGO nessa situação." Gratidão primeiro, petição depois.',
      oracao: 'Deus, estou em [situação difícil]. Mas primeiro quero AGRADECER. Obrigado(a) por Tua presença. Por não me deixar sozinho. Depois peço direção. Amém.'
    },
    {
      dia: 3,
      titulo: 'Este é o Dia do Senhor',
      referencia: 'Salmos 118:24',
      texto: 'Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.',
      versiculo_contexto: '"Este é o dia que FEZ o Senhor." Hoje não é acidente. Deus CRIOU este dia para você. Pode ser difícil, mas ainda é criaÇÃO de Deus.',
      palavraViva: 'Este dia foi CRIADO por Deus para mim. Não é acidente. Por isso sou grato, mesmo nos desafios.',
      acao: 'Ao acordar, ANTES de ver redes sociais ou notícias ruins, diga: "Este é o dia que o SENHOR fez. Sou grato por isso!" Agora sim, comece o dia.',
      oracao: 'Deus, este é o dia que TU fizeste. Não é acidente que eu estou vivo. Sou grato por mais 24 horas. Vou viver com alegria e gratidão. Amém.'
    },
    {
      dia: 4,
      titulo: 'Lembrar é Agradecer',
      referencia: 'Salmos 103:2',
      texto: 'Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.',
      versiculo_contexto: 'Davi chama sua alma para LEMBRAR os benefícios de Deus. Gratidão nasce da memória. Quando você lembra o que Deus já fez, agradece.',
      palavraViva: 'Quando lembro do que Deus JÁ fez, nasce gratidão. Benefícios passados geram esperança para o futuro.',
      acao: 'Faça uma lista de 5 coisas que Deus JÁ fez na sua vida (pode ser proteção, provisão, cura, direção). Agora, agradeça por CADA uma especificamente.',
      oracao: 'Senhor, obrigado(a) por [liste 5 coisas específicas que Ele já fez]. Lembrar Teus benefícios me enche de gratidão. Amém.'
    },
    {
      dia: 5,
      titulo: 'Gratidão nos Relacionamentos',
      referencia: '1 Coríntios 1:4',
      texto: 'Sempre dou graças ao meu Deus por vós, pela graça de Deus que vos foi dada em Cristo Jesus.',
      versiculo_contexto: 'Paulo dá graças PELAS PESSOAS. Gratidão não é só por bens materiais, mas pelas pessoas que Deus colocou em nossa vida.',
      palavraViva: 'Posso agradecer pelas pessoas que Deus colocou na minha vida. Relacionamentos são presentes.',
      acao: 'Hoje, envie uma mensagem de gratidão para 2 pessoas que Deus colocou na sua vida. Diga: "Obrigado(a) por [razão específica]. Sou grato(a) por você."',
      oracao: 'Senhor, obrigado(a) pelas pessoas que colocaste na minha vida: [mencione 3 pessoas]. Cada uma delas é presente Teu. Amém.'
    },
    {
      dia: 6,
      titulo: 'Gratidão É Escolha',
      referencia: 'Colossenses 3:15',
      texto: 'E a paz de Cristo, para a qual também fostes chamados em um corpo, domine em vosso coração; e sede agradecidos.',
      versiculo_contexto: 'Paulo diz "SEDE agradecidos" - imperativo, ordem. Gratidão não é sentimento, é ESCOLHA. Escolha ser grato HOJE.',
      palavraViva: 'Gratidão é ESCOLHA diária, não sentimento. Escolho ser grato hoje, independente das circunstâncias.',
      acao: 'Escreva: "Hoje EU ESCOLHO ser grato(a)." Coloque em local visível. Cada vez que ver, repita em voz alta.',
      oracao: 'Deus, hoje EU ESCOLHO ser grato(a). Não por circunstâncias, mas porque TU estás presente. Transforma minha perspectiva. Amém.'
    },
    {
      dia: 7,
      titulo: 'Gratidão Duradoura',
      referencia: 'Salmos 136:1',
      texto: 'Dai graças ao Senhor, porque ele é bom; porque a sua misericórdia dura para sempre.',
      versiculo_contexto: 'Este salmo repete 26 vezes: "A sua misericórdia dura para sempre." Gratidão duradoura vem de lembrar da misericórdia eterna de Deus.',
      palavraViva: 'A misericórdia de Deus dura PARA SEMPRE. Por isso minha gratidão não pode acabar. É eterna como Ele é.',
      acao: 'Reflita sobre os 6 dias anteriores. Que mudanças você já sentiu em sua perspectiva? Como você pode continuar sendo grato? Faça um compromisso pessoal.',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado sobre gratidão. A misericórdia de Deus dura para sempre, e minha gratidão também será constante. Amém.'
    }
  ]
};

// ============================================
// 🎯 TRILHA 3: "7 DIAS DE PERDÃO" (Dor)
// ============================================
export const TRILHA_PERDAO: Trilha = {
  id: '7-dias-perdao',
  titulo: '7 Dias de Perdão',
  descricao: 'Liberte-se da mágoa através de uma jornada guiada de perdão',
  tema: 'Perdão',
  duracao: 7,
  icone: '💙',
  cor: '#ef4444',
  dias: [
    {
      dia: 1,
      titulo: 'Perdão É Liberdade',
      referencia: 'Efésios 4:31-32',
      texto: 'Longe de vós toda amargura, e cólera, e ira, e gritaria, e blasfêmia, e bem assim toda malícia. Antes, sede uns para com os outros benignos, compassivos, perdoando-vos uns aos outros, como também Deus, em Cristo, vos perdoou.',
      versiculo_contexto: 'Guardar mágoa é como beber veneno e esperar que o outro morra. Perdoar não é dizer que o que aconteceu foi certo, mas é se libertar do peso que você está carregando.',
      palavraViva: 'Perdoar é me libertar, não é dizer que o outro estava certo. Você merece essa liberdade.',
      acao: 'Pense em alguém que te magoou. Você não precisa falar com essa pessoa hoje. Apenas diga mentalmente ou em voz alta: "[Nome], eu escolho te perdoar. Eu me liberto dessa mágoa. Deus, ajuda-me a curar."',
      oracao: 'Pai, é tão difícil perdoar [pessoa/situação]. Meu coração ainda dói. Mas eu escolho te obedecer e me libertar dessa prisão. Ajuda-me a perdoar como Tu me perdoaste. Amém.'
    },
    {
      dia: 2,
      titulo: 'Deus Me Perdoou Primeiro',
      referencia: 'Romanos 5:8',
      texto: 'Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.',
      versiculo_contexto: 'Deus não te perdoou porque você mereceu. Você era PECADOR. Ele te perdoou POR AMOR. Amor incondicional gera perdão.',
      palavraViva: 'Deus me perdoou quando eu era pecador. Antes de eu fazer algo bom. Por isso, posso perdoar também.',
      acao: 'Liste 3 coisas pelas quais você foi perdoado(a) por Deus (pecados que confessou). Agora, reconheça: se Ele me perdoou isso, posso perdoar [situação].',
      oracao: 'Senhor, Tu me perdoaste quando eu era pecador. Não esperaste eu merecer. Eu mereço perdoar também. Me dá força. Amém.'
    },
    {
      dia: 3,
      titulo: 'Perdão É Processo',
      referencia: 'Mateus 18:21-22',
      texto: 'Então Pedro, aproximando-se dele, disse: Senhor, até quantas vezes pecará meu irmão contra mim, e eu lhe hei de perdoar? Até sete vezes? Respondeu-lhe Jesus: Não te digo até sete vezes, mas até setenta vezes sete.',
      versiculo_contexto: 'Jesus não está dizendo para perdoar 490 vezes. Ele está dizendo: perdão é ILIMITADO. Toda vez que a mágoa voltar, perdoe de novo.',
      palavraViva: 'Se a mágoa voltar 100 vezes, perdoo 100 vezes. Perdão é processo contínuo, não evento único.',
      acao: 'Se a mágoa voltar hoje, não se culpe. Apenas diga de novo: "Eu escolho perdoar." Perdão é escolha diária.',
      oracao: 'Pai, a mágoa voltou de novo. Mas eu ESCOLHO perdoar de novo. Toda vez que ela voltar, vou perdoar. Amém.'
    },
    {
      dia: 4,
      titulo: 'Perdão Não É Esquecer',
      referencia: 'Josué 1:9',
      texto: 'Não to mandei eu? Sê forte e corajoso; não temas, nem te espantes; porque o Senhor, teu Deus, é contigo por onde quer que andares.',
      versiculo_contexto: 'Perdoar NÃO é esquecer o que aconteceu. É escolher não deixar isso te controlar. Deus te dá força para isso.',
      palavraViva: 'Eu posso perdoar sem esquecer. Perdão é escolher não ser controlado(a) pelo passado.',
      acao: 'Escreva: "Eu perdoo, mas não preciso esquecer. Não vou deixar essa lembrança me controlar." Coloque em lugar visível.',
      oracao: 'Deus, perdoo [pessoa/situação]. Não preciso esquecer, mas escolho não deixar isso me controlar. Tu me tens força para isso. Amém.'
    },
    {
      dia: 5,
      titulo: 'Perdão É Decisão, Não Sentimento',
      referencia: 'Colossenses 3:13',
      texto: 'Suportai-vos uns aos outros, perdoai-vos mutuamente, caso alguém tenha motivo de queixa contra outrem. Assim como o Senhor vos perdoou, assim também perdoai vós.',
      versiculo_contexto: 'Paulo NÃO diz "sinta vontade de perdoar." Ele diz "PERDOAI." Imperativo. Perdão é DECISÃO, não sentimento.',
      palavraViva: 'Eu DECIDO perdoar, mesmo sem sentir vontade. Perdão é decisão, não sentimento.',
      acao: 'Hoje, DECIDA perdoar [pessoa/situação]. Não espere sentir vontade. Escolha perdoar AGORA, mesmo que não sinta.',
      oracao: 'Pai, hoje eu DECIDO perdoar [pessoa/situação]. Não sinto vontade, mas escolho te obedecer. Me dá força para isso. Amém.'
    },
    {
      dia: 6,
      titulo: 'Perdão Liberta Você',
      referencia: 'Salmos 103:3',
      texto: 'É ele quem perdoa todas as tuas iniquidades e quem sara todas as tuas enfermidades.',
      versiculo_contexto: 'Deus não só perdoa SUA culpa. Ele SARA SUAS feridas. Perdão + cura. Você não precisa carregar machucados.',
      palavraViva: 'Deus não só me perdoa. Ele SARA minhas feridas. Perdão completo + cura completa. Sou livre.',
      acao: 'Escreva numa folha as feridas que você está carregando. Depois, queime ou jogue fora. Diga: "Deus sarou isso. Sou livre."',
      oracao: 'Senhor, Tu não só perdoas, Tu SÁRAS. Toma essas feridas. Sá-me completamente. Sou livre porque Tu saraste. Amém.'
    },
    {
      dia: 7,
      titulo: 'Seguindo em Frente',
      referencia: 'Filipenses 3:13-14',
      texto: 'Irmãos, quanto a mim, não julgo que o haja alcançado; mas uma coisa faço e, esquecendo-me daquilo para trás e avançando para as que estão diante de mim, prossigo para o alvo.',
      versiculo_contexto: 'Paulo perdoou seu passado e seguiu em frente. "Esquecendo-me daquilo para trás" - não ficou preso no passado.',
      palavraViva: 'Perdoei. Agora sigo em frente. Não fico preso(a) no passado. O futuro de Deus para mim é melhor.',
      acao: 'Reflita sobre os 6 dias anteriores. O que você aprendeu sobre perdão? Faça um compromisso: "Não ficarei preso(a) no passado. Seguirei em frente."',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado sobre perdão. Perdoei. Sarei. Agora sigo em frente para o alvo que tens para mim. Amém.'
    }
  ]
};

// ============================================
// 🎯 TRILHA 4: "7 DIAS DE ESPERANÇA" (Desejo)
// ============================================
export const TRILHA_ESPERANCA: Trilha = {
  id: '7-dias-esperanca',
  titulo: '7 Dias de Esperança',
  descricao: 'Renove sua esperança através de uma jornada guiada com Deus',
  tema: 'Esperança',
  duracao: 7,
  icone: '✨',
  cor: '#8b5cf6',
  dias: [
    {
      dia: 1,
      titulo: 'Planos de Deus São Bons',
      referencia: 'Jeremias 29:11',
      texto: 'Eu é que sei que pensamentos tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que desejais.',
      versiculo_contexto: 'Israel estava exilado em terra estranha. Aparentemente tudo perdido. Mas Deus diz: "EU SEI OS PENSAMENTOS para vocês. São BONS. Tenho PLANO de PAZ." Você não está perdido. Deus tem PLANO.',
      palavraViva: 'Deus tem pensamentos BONS sobre mim. Planos de PAZ, não de mal. Por isso sou esperançoso.',
      acao: 'Escreva numa nota: "Deus tem plano BOM para mim. Planos de paz. Tenho esperança." Coloque em local visível. Cada vez que ver, leia em voz alta.',
      oracao: 'Senhor, às vezes perco esperança. Mas Tu disseste que tens pensamentos BONS sobre mim. Planos de PAZ. Renova minha esperança hoje. Sou esperançoso(a) por causa de TI. Amém.'
    },
    {
      dia: 2,
      titulo: 'Esperança Não Envergonha',
      referencia: 'Romanos 5:5',
      texto: 'E a esperança não envergonha, porque o amor de Deus é derramado em nosso coração pelo Espírito Santo que nos foi dado.',
      versiculo_contexto: 'Esperança cristã não ENVERGONHA. Por que? Porque é baseada no AMOR de Deus, não em expectativas humanas. Amor de Deus = esperança garantida.',
      palavraViva: 'Minha esperança não me envergonhará porque é baseada no AMOR de Deus, não em expectativas humanas.',
      acao: 'Quando a dúvida vier, repita: "Minha esperança é baseada no amor de Deus, não em circunstâncias. Não me envergonhará."',
      oracao: 'Deus, Tu me amas. Por isso tenho esperança. Amor de Deus = esperança garantida. Obrigado(a) por isso. Amém.'
    },
    {
      dia: 3,
      titulo: 'O Amanhã Pertence a Deus',
      referencia: 'Lamentações 3:22-24',
      texto: 'As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã; grande é a tua fidelidade. A minha porção é o Senhor, diz a minha alma; por isso, terei esperança nele.',
      versiculo_contexto: 'Jeremias escreveu isso em LAMENTAÇÕES - livro de dor profunda. Mesmo assim, ele diz: "grande é a TUA fidelidade." Misericórdia RENOVA cada manhã. Novos começos.',
      palavraViva: 'Misericórdia de Deus RENOVA cada manhã. Por isso, tenho esperança. Amanhã será novo.',
      acao: 'Escreva: "Amanhã será novo. Misericórdia de Deus se renova toda manhã. Por isso tenho esperança."',
      oracao: 'Senhor, misericórdia é grande. Renova TODA manhã. Por isso tenho esperança para amanhã. Amém.'
    },
    {
      dia: 4,
      titulo: 'Esperança Vive na Promessa',
      referencia: 'Hebreus 6:18-19',
      texto: 'Para que, mediante duas coisas imutáveis, segundo as quais é impossível que Deus minta, tenhamos forte consolação, nós outros, que nos refugiamos em lançar mão da esperança proposta, a qual temos por âncora da alma.',
      versiculo_contexto: 'Esperança cristã é ÂNCORA. Não é otimismo. É PROMESSA imutável de Deus. Ele NÃO pode mentir. Então espero com confiança.',
      palavraViva: 'Minha esperança é ÂNCORA firme. Baseada em promessa de Deus que não pode mentir. Por isso espero confiante.',
      acao: 'Escreva 3 promessas de Deus que te dão esperança (pode ser salvação, cuidado, direção). Agora, acredite que Ele vai cumprir.',
      oracao: 'Pai, Tu prometeste [promessa específica]. Não pode mentir. Por isso tenho esperança. Âncora firme. Amém.'
    },
    {
      dia: 5,
      titulo: 'Esperança Quando Tudo Parece Perdido',
      referencia: 'Isaías 40:31',
      texto: 'Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.',
      versiculo_contexto: 'Esperar em Deus NÃO é passividade. É FONTE DE FORÇAS. "Renovarão suas forças" - esperança te dá vigor, não te enfraquece.',
      palavraViva: 'Esperar em Deus me dá FORÇAS. Não me enfraquece. Renovação vem de esperar NEle.',
      acao: 'Quando se sentir fraco(a), pare. Diga: "Espero em Deus. Ele me dá forças." Sente-se. Espere. Forças virão.',
      oracao: 'Senhor, estou fraco(a). Mas espero em TI. Renova minhas forças. Dá-me vigor como águia. Amém.'
    },
    {
      dia: 6,
      titulo: 'Esperança Para o Futuro',
      referencia: 'Salmo 27:13-14',
      texto: 'Creio que verei a bondade do Senhor na terra dos viventes. Espera no Senhor, anima-te; tem bom ânimo, e espera no Senhor.',
      versiculo_contexto: 'Davi estava em perigo. Fugindo de inimigos. Mas ele CRÊ: "verei a bondade do Senhor." Esperança baseada em FÉ, não em circunstâncias.',
      palavraViva: 'EU CREIO que verei a bondade de Deus. Por isso espero. Fé alimenta esperança.',
      acao: 'Escreva: "EU CREIO que verei bondade de Deus. Por isso espero." Coloque onde possa ver. Credo alimenta esperança.',
      oracao: 'Senhor, EU CREIO que verei Tua bondade. Não depende de circunstâncias, depende de TI. Espero animado(a). Amém.'
    },
    {
      dia: 7,
      titulo: 'Esperança Duradoura',
      referencia: 'Salmos 71:5',
      texto: 'Pois tu és a minha esperança, ó Senhor Deus; és a minha confiança desde a minha mocidade.',
      versiculo_contexto: 'Davi diz que Deus É sua esperança. Não é algo que tem, é Alguém. Quando Deus É sua esperança, ela nunca acaba.',
      palavraViva: 'Deus É minha esperança. Não é algo temporário. É RELACIONAMENTO eterno. Esperança que nunca falha.',
      acao: 'Reflita sobre os 6 dias anteriores. Como sua esperança mudou? Que mudanças você já sentiu? Faça um compromisso pessoal.',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado sobre esperança. Deus, TU ÉS minha esperança. Não dependo de circunstâncias. Amém.'
    }
  ]
};

// ============================================
// 🎯 TRILHA 5: "7 DIAS DE ALEGRIA" (Desejo)
// ============================================
export const TRILHA_ALEGRIA: Trilha = {
  id: '7-dias-alegria',
  titulo: '7 Dias de Alegria',
  descricao: 'Descubra alegria plena na presença de Deus através de uma jornada guiada',
  tema: 'Alegria',
  duracao: 7,
  icone: '😊',
  cor: '#10b981',
  dias: [
    {
      dia: 1,
      titulo: 'Alegria na Presença de Deus',
      referencia: 'Salmos 16:11',
      texto: 'Tu me farás ver os caminhos da vida; na tua presença há plenitude de alegria, à tua mão direita há delícias perpetuamente.',
      versiculo_contexto: 'Na presença de Deus há PLENITUDE de alegria. Não "felicidade temporária", mas alegria COMPLETA. À mão direita de Deus há DELÍCIAS para sempre.',
      palavraViva: 'Na presença de Deus, há alegria PLENA. Não temporária, mas COMPLETA. Delícias PERPETUAMENTE.',
      acao: 'Reserve 5 minutos hoje para sentir a presença de Deus. Respire, feche os olhos, imagina Ele bem perto. Agora, SENTA essa alegria que vem da presença dEle.',
      oracao: 'Deus, na Tua presença há PLENITUDE de alegria. Não temporária, completa. À Tua mão direita, delícias para sempre. Me dá mais de Tua presença hoje para sentir essa alegria. Amém.'
    },
    {
      dia: 2,
      titulo: 'Alegria Verdadeira',
      referencia: 'João 15:11',
      texto: 'Tenho-vos dito isto para que a minha alegria permaneça em vós, e a vossa alegria seja completa.',
      versiculo_contexto: 'Jesus quer que SUA alegria permaneça em VOCÊ. Alegria dEle = alegria completa. Não é imitação, é receber a alegria DELE.',
      palavraViva: 'Alegria verdadeira vem de ter a alegria de Cristo EM MIM. Não é minha, é DELE permanecendo em mim.',
      acao: 'Hoje, peça para a alegria de Cristo permanecer em você. "Jesus, dá-me TUA alegria. Que ela permaneça em mim."',
      oracao: 'Jesus, eu quero TUA alegria permanecendo em mim. Não alegria minha, TUA. Completa. Permanente. Amém.'
    },
    {
      dia: 3,
      titulo: 'Alegria É Decisão',
      referencia: 'Filipenses 4:4',
      texto: 'Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!',
      versiculo_contexto: 'Paulo diz "alegrai-vos" DUAS VEZES. Quando estava PRESO. Alegria não depende de circunstâncias. É DECISÃO.',
      palavraViva: 'Escolho me alegrar SEMPRE em Deus. Não depende de circunstâncias. É decisão diária.',
      acao: 'Escreva: "EU ESCOLHO me alegrar em Deus hoje." Coloque em local visível. Quando ver, escolha alegria.',
      oracao: 'Deus, HOJE eu escolho me alegrar em TI. Não porque está tudo bem, mas porque TU estás presente. Alegria é decisão. Amém.'
    },
    {
      dia: 4,
      titulo: 'Alegria No Senhor É Fortaleza',
      referencia: 'Neemias 8:10',
      texto: 'E não vos entristeçais, porque a alegria do Senhor é a vossa força.',
      versiculo_contexto: 'Alegria de Deus É FORÇA. Não é sentimento vazio. Alegria dEle te fortalece para enfrentar o dia.',
      palavraViva: 'Alegria de Deus É minha força. Não dependo de circunstâncias boas. Alegria dEle me fortalece.',
      acao: 'Quando se sentir fraco(a), pare. Peça alegria de Deus. "Senhor, dá-me TUA alegria. Ela é minha força."',
      oracao: 'Deus, TUA alegria é minha força. Não preciso de circunstâncias boas. TUA alegria me fortalece. Amém.'
    },
    {
      dia: 5,
      titulo: 'Alegria em Servir',
      referencia: 'Salmos 100:2',
      texto: 'Servi ao Senhor com alegria; apresentai-vos diante dele com cântico.',
      versiculo_contexto: 'Servir a Deus COM ALEGRIA. Não por obrigação, mas com prazer. Alegria vem de servir NEle.',
      palavraViva: 'Servo a Deus COM ALEGRIA. Não por obrigação, mas porque amo Ele. Alegria vem de servir.',
      acao: 'Hoje, faça UMA tarefa "com alegria" para Deus (pode ser servir alguém, trabalhar bem, amar alguém difícil). Observe como alegria vem.',
      oracao: 'Senhor, eu quero te servir COM ALEGRIA. Não por obrigação, mas porque te amo. Alegria vem de servir TE. Amém.'
    },
    {
      dia: 6,
      titulo: 'Alegria É Contagiante',
      referencia: 'Provérbios 17:22',
      texto: 'O coração alegre é bom remédio, mas o espírito abatido seca os ossos.',
      versiculo_contexto: 'Alegria é REMÉDIO. Espírito abatido mata aos poucos. Coração alegre faz bem para você E para quem está perto.',
      palavraViva: 'Alegria é remédio. Espírito abatido mata. Escolho alegria para eu E para quem está perto.',
      acao: 'Hoje, compartilhe alegria com alguém. Faça algo gentil. Sorria. Alegria é contagiante.',
      oracao: 'Deus, alegria é remédio. Faz bem para mim E para quem está perto. Me dá alegria para contagiar outros. Amém.'
    },
    {
      dia: 7,
      titulo: 'Alegria Eterna',
      referencia: '1 Pedro 1:8',
      texto: 'Amais a quem não haveis visto; nele credes, embora, por enquanto, não o vejais, exultando com alegria indizível e cheia de glória.',
      versiculo_contexto: 'Alegria cristã é "INSEGÍVEL". Não tem palavras. "Cheia de glória". Alegria eterna, não temporária.',
      palavraViva: 'Alegria em Cristo é INSEGÍVEL. Indescritível. Cheia de glória. Eterna.',
      acao: 'Reflita sobre os 6 dias anteriores. Como sua alegria mudou? Que mudanças você já sentiu? Faça um compromisso pessoal.',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado sobre alegria. Alegria em Cristo é insegível. Cheia de glória. Eterna. Amém.'
    }
  ]
};

// ============================================
// 🎯 TRILHA 6: "7 DIAS DE CORAGEM" (Dor)
// ============================================
export const TRILHA_CORAGEM: Trilha = {
  id: '7-dias-coragem',
  titulo: '7 Dias de Coragem',
  descricao: 'Encontre coragem para avançar através de uma jornada guiada com Deus',
  tema: 'Coragem',
  duracao: 7,
  icone: '💪',
  cor: '#f59e0b',
  dias: [
    {
      dia: 1,
      titulo: 'Coragem Vem de Deus',
      referencia: 'Josué 1:9',
      texto: 'Não to mandei eu? Sê forte e corajoso; não temas, nem te espantes; porque o Senhor, teu Deus, é contigo por onde quer que andares.',
      versiculo_contexto: 'Deus MANDOU você. Ele está COMIGO. Por isso tenho CORAGEM para avançar. Motivação vem de saber que Ele está comigo.',
      palavraViva: 'Deus me MANDOU. Ele está COMIGO. Por isso tenho CORAGEM para avançar. Sou corajoso(a).',
      acao: 'Há algo que precisa fazer? Avance COM CORAGEM. Deus está contigo. Não temas.',
      oracao: 'Deus, mandaste-me. Estás COMIGO. Por isso tenho CORAGEM. Avanço corajoso(a) porque Tu estás comigo. Amém.'
    },
    {
      dia: 2,
      titulo: 'Não Temas',
      referencia: 'Isaías 41:10',
      texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
      versiculo_contexto: 'Deus fala "NÃO TEMAS" porque ELE está contigo, fortalece, ajuda e sustenta. Coragem vem de reconhecer que Ele é MAIOR que meu medo.',
      palavraViva: 'Não temo porque Deus está comigo, me fortalece, ajuda e sustenta. Coragem vem reconhecendo que Ele é MAIOR.',
      acao: 'Quando sentir medo hoje, pare. Diga: "Deus está comigo, me fortalece. Não temo." Depois, dê um passo adiante.',
      oracao: 'Deus, quando medo vier, lembra-me que TU estás comigo, me fortaleces, ajudas e sustenta. Por isso não temo. Amém.'
    },
    {
      dia: 3,
      titulo: 'Coragem Para Falar',
      referencia: 'Atos 4:13',
      texto: 'Ao verem a intrepidez de Pedro e de João, como sabiam que eram homens iletrados e sem cultura, maravilhavam-se e reconheciam que haviam estado com Jesus.',
      versiculo_contexto: 'Pedro tinha tanto medo que negou Jesus 3 vezes. Depois, foi CORAJOSO a ponto de líderes ficarem surpresos. O que mudou? Esteve COM JESUS. Presença dEle = coragem.',
      palavraViva: 'Estar COM Jesus me dá coragem. Pedro mudou completamente depois de estar com Ele. Coragem vem de Sua presença.',
      acao: 'Hoje, gaste 10 minutos ESTANDO com Jesus (oração, leitura, silêncio). Observe como coragem cresce.',
      oracao: 'Jesus, estar CONTIGO me dá coragem. Pedro mudou depois de estar contigo. Me dá TUA presença. Amém.'
    },
    {
      dia: 4,
      titulo: 'Coragem Em Falhas',
      referencia: 'Provérbios 24:16',
      texto: 'Porque sete vezes cairá o justo e tornará a levantar-se; mas os ímpios tropeçarão no mal.',
      versiculo_contexto: 'Justo cai 7 VEZES e se levanta. Perdão para falhar. Coragem para tentar de novo. Não é sobre perfeição, é sobre persistência.',
      palavraViva: 'Se cair, me levanto de novo. 7 vezes se for preciso. Coragem vem de não desistir, não de perfeição.',
      acao: 'Se falhou ontem, tente de novo HOJE. Coragem não é não falhar, é não desistir.',
      oracao: 'Senhor, se falhei ontem, hoje tento de novo. Dá-me coragem para não desistir. 7 vezes se for preciso. Amém.'
    },
    {
      dia: 5,
      titulo: 'Coragem Para Confiar',
      referencia: 'Provérbios 3:5-6',
      texto: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
      versiculo_contexto: 'Coragem vem de CONFIANÇA, não de certeza absoluta. "Reconhece-o" em TODOS os caminhos. Ele endireita conforme você caminha.',
      palavraViva: 'Confio em Deus de TODO coração. Não preciso certeza absoluta. Ele endireita enquanto caminho.',
      acao: 'Há algo incerto hoje? Dê um passo confiando que Deus vai endireitar. Coragem = confiança.',
      oracao: 'Senhor, não tenho certeza absoluta, mas confio em TI. Reconheço-Te em todos os caminhos. Endireitas enquanto caminho. Amém.'
    },
    {
      dia: 6,
      titulo: 'Coragem De Cristo',
      referencia: '2 Timóteo 1:7',
      texto: 'Porque Deus não nos tem dado espírito de covardia, mas de fortaleza, e de amor, e de moderação.',
      versiculo_contexto: 'Deus NÃO nos deu espírito de medo/covardia. Deu FORTALEZA, AMOR e MODOÇÃO. Espírito que dEle é corajoso.',
      palavraViva: 'Deus me deu espírito de FORTALEZA, não de medo. Espírito que dEle é corajoso, não covarde.',
      acao: 'Quando medo vier, repita: "Deus me deu espírito de fortaleza. Não sou covarde. Sou corajoso(a)."',
      oracao: 'Deus, Tu me deste espírito de FORTALEZA. Não de medo. Portanto, tenho coragem. Amém.'
    },
    {
      dia: 7,
      titulo: 'Coragem Duradoura',
      referencia: 'Salmos 27:1',
      texto: 'O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a fortaleza da minha vida; de quem me recearei?',
      versiculo_contexto: 'Deus É luz, salvação E fortaleza. Por isso não tenho MEDO de ninguém. Coragem duradoura vem de saber que Ele É nossa luz, salvação e força.',
      palavraViva: 'Deus É minha luz, salvação E fortaleza. Por isso não temo. Coragem duradoura vem dessa verdade.',
      acao: 'Reflita sobre os 6 dias anteriores. Que mudanças você já sentiu? Como sua coragem cresceu? Faça um compromisso pessoal.',
      oracao: 'Pai, obrigado por estes 7 dias de aprendizado sobre coragem. Tu ÉS minha luz, salvação e fortaleza. Por isso tenho coragem duradoura. Amém.'
    }
  ]
};

// ============================================
// 📚 CATÁLOGO DE TRILHAS
// ============================================
export const TRILHAS_DISPONIVEIS: Trilha[] = [
  TRILHA_PAZ_INTERIOR,
  TRILHA_GRATIDAO,
  TRILHA_PERDAO,
  TRILHA_ESPERANCA,
  TRILHA_ALEGRIA,
  TRILHA_CORAGEM,
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

