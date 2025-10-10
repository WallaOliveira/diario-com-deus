// Sistema de sugestões baseadas em emoção
export interface EmotionalSuggestion {
  title: string;
  description: string;
  verse: string;
  verseText: string;
  reflection: string;
  prayer: string;
  emoji: string;
  color: string;
}

export const EMOTIONAL_SUGGESTIONS: Record<string, EmotionalSuggestion> = {
  ansioso: {
    title: "Paz em Meio à Ansiedade",
    description: "Deus te oferece paz que excede todo entendimento",
    verse: "Filipenses 4:6-7",
    verseText: "Não se preocupem com nada, mas em todas as orações peçam a Deus o que vocês precisam e orem sempre com o coração agradecido. E a paz de Deus, que ninguém consegue entender, guardará o coração e a mente de vocês, pois vocês estão unidos com Cristo Jesus.",
    reflection: "A ansiedade é um sentimento humano natural, mas Deus nos oferece uma paz que vai além da nossa compreensão. Quando entregamos nossas preocupações a Ele, Ele cuida de nós e nos dá a tranquilidade que precisamos.",
    prayer: "Senhor, estou ansioso(a) hoje. Ajuda-me a entregar todas as minhas preocupações a Ti. Dá-me a Tua paz que excede todo entendimento. Confio que Tu cuidas de mim e tens o melhor para minha vida. Em nome de Jesus, amém.",
    emoji: "💙",
    color: "blue"
  },
  
  grato: {
    title: "Cultivando um Coração Grato",
    description: "A gratidão transforma nossa perspectiva e fortalece nossa fé",
    verse: "1 Tessalonicenses 5:18",
    verseText: "Dêem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.",
    reflection: "A gratidão não é apenas um sentimento, é uma escolha. Quando escolhemos ser gratos mesmo nas dificuldades, nossa perspectiva muda e nossa fé se fortalece. Deus se alegra com um coração grato.",
    prayer: "Senhor, obrigado por todas as bênçãos em minha vida. Mesmo nas dificuldades, quero manter um coração grato. Ajuda-me a ver Tuas bênçãos em todos os momentos e a expressar minha gratidão a Ti. Em nome de Jesus, amém.",
    emoji: "🙏",
    color: "yellow"
  },
  
  cansado: {
    title: "Descanso em Deus",
    description: "Jesus oferece descanso para sua alma cansada",
    verse: "Mateus 11:28-30",
    verseText: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu os aliviarei. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e vocês encontrarão descanso para as suas almas. Pois o meu jugo é suave e o meu fardo é leve.",
    reflection: "O cansaço físico e emocional é real, mas Jesus nos convida a encontrar descanso Nele. Não é sobre parar de trabalhar, mas sobre entregar nossos fardos a Ele e aprender a viver com Sua paz.",
    prayer: "Senhor, estou cansado(a) hoje. Ajuda-me a entregar todos os meus fardos a Ti. Dá-me o descanso que só Tu podes oferecer. Ensina-me a confiar em Ti e a viver com Tua paz. Em nome de Jesus, amém.",
    emoji: "🌙",
    color: "purple"
  },
  
  esperançoso: {
    title: "Esperança que Não Desaponta",
    description: "Deus tem planos de esperança e futuro para você",
    verse: "Jeremias 29:11",
    verseText: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
    reflection: "A esperança é um presente de Deus. Mesmo quando não vemos como as coisas vão se resolver, podemos confiar que Ele tem planos bons para nós. Nossa esperança não está nas circunstâncias, mas em Deus.",
    prayer: "Senhor, obrigado pela esperança que Tu me dás. Ajuda-me a confiar nos Teus planos para minha vida, mesmo quando não os entendo. Fortalece minha fé e mantenha minha esperança viva em Ti. Em nome de Jesus, amém.",
    emoji: "🌟",
    color: "gold"
  }
};

export function getEmotionalSuggestion(emotion: string): EmotionalSuggestion | null {
  return EMOTIONAL_SUGGESTIONS[emotion] || null;
}

export function getEmotionalTrilhaSuggestion(emotion: string): string {
  const suggestions = {
    ansioso: "7 Dias de Paz Interior",
    grato: "Jornada de Gratidão (em breve)",
    cansado: "Trilha de Renovação (em breve)",
    esperançoso: "Caminho de Esperança (em breve)"
  };
  
  return suggestions[emotion as keyof typeof suggestions] || "Trilha Personalizada";
}
