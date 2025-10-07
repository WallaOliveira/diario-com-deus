/**
 * Sistema de Conquistas da Fé
 * Gamificação estilo Duolingo, mas com linguagem espiritual e acolhedora
 */

export interface Achievement {
  key: string;
  type: 'milestone' | 'streak' | 'theme' | 'special';
  title: string;
  description: string;
  icon: string;
  requirement: number; // quantos para desbloquear
  points: number; // "momentos" que vale
}

/**
 * Todas as conquistas possíveis
 * Linguagem: acolhedora, sem jargões técnicos
 */
export const ACHIEVEMENTS: Achievement[] = [
  // ========================================
  // MARCOS INICIAIS (Primeiros Passos)
  // ========================================
  {
    key: 'first_devotional',
    type: 'milestone',
    title: '🙏 Primeiro Passo',
    description: 'Você completou seu primeiro momento com Deus!',
    icon: '🙏',
    requirement: 1,
    points: 10,
  },
  {
    key: '7_devotionals',
    type: 'milestone',
    title: '📖 Semana Abençoada',
    description: 'Já são 7 momentos transformadores com Deus!',
    icon: '📖',
    requirement: 7,
    points: 50,
  },
  {
    key: '30_devotionals',
    type: 'milestone',
    title: '🌱 Raiz Profunda',
    description: '30 devocionais! Sua fé está criando raízes fortes.',
    icon: '🌱',
    requirement: 30,
    points: 100,
  },
  {
    key: '100_devotionals',
    type: 'milestone',
    title: '🌳 Árvore Frutífera',
    description: '100 momentos com Deus! Você é uma inspiração!',
    icon: '🌳',
    requirement: 100,
    points: 300,
  },
  {
    key: '365_devotionals',
    type: 'milestone',
    title: '🏆 Ano com Deus',
    description: 'Um ano inteiro de crescimento espiritual!',
    icon: '🏆',
    requirement: 365,
    points: 1000,
  },

  // ========================================
  // SEQUÊNCIA DE DIAS (Streak)
  // ========================================
  {
    key: 'streak_3',
    type: 'streak',
    title: '🔥 Primeiros Passos Firmes',
    description: '3 dias seguidos! A constância transforma.',
    icon: '🔥',
    requirement: 3,
    points: 20,
  },
  {
    key: 'streak_7',
    type: 'streak',
    title: '✨ Semana Constante',
    description: '7 dias sem parar! Você está criando um hábito abençoado.',
    icon: '✨',
    requirement: 7,
    points: 50,
  },
  {
    key: 'streak_14',
    type: 'streak',
    title: '💪 Duas Semanas de Fé',
    description: '14 dias seguidos! Sua disciplina está dando frutos.',
    icon: '💪',
    requirement: 14,
    points: 100,
  },
  {
    key: 'streak_21',
    type: 'streak',
    title: '🌟 Hábito Consolidado',
    description: '21 dias! Cientistas dizem que é um hábito, nós dizemos que é graça.',
    icon: '🌟',
    requirement: 21,
    points: 150,
  },
  {
    key: 'streak_30',
    type: 'streak',
    title: '🔥 Mês com Deus',
    description: '30 dias sem falhar! Você é exemplo de perseverança.',
    icon: '🔥',
    requirement: 30,
    points: 200,
  },
  {
    key: 'streak_100',
    type: 'streak',
    title: '💎 Constância Inabalável',
    description: '100 dias seguidos! Poucos chegam aqui. Você é especial!',
    icon: '💎',
    requirement: 100,
    points: 500,
  },
  {
    key: 'streak_365',
    type: 'streak',
    title: '👑 Ano Sem Falhas',
    description: '365 dias consecutivos! Você é uma lenda viva da fé!',
    icon: '👑',
    requirement: 365,
    points: 2000,
  },

  // ========================================
  // TEMAS ESPECÍFICOS
  // ========================================
  {
    key: 'theme_anxiety_complete',
    type: 'theme',
    title: '😌 Paz na Ansiedade',
    description: 'Completou toda a jornada sobre ansiedade. Que o Senhor te guarde em paz!',
    icon: '😌',
    requirement: 7,
    points: 50,
  },
  {
    key: 'theme_gratitude_complete',
    type: 'theme',
    title: '🙌 Coração Grato',
    description: 'Completou a jornada de gratidão. Um coração grato atrai bênçãos!',
    icon: '🙌',
    requirement: 7,
    points: 50,
  },
  {
    key: 'theme_forgiveness_complete',
    type: 'theme',
    title: '💜 Liberdade no Perdão',
    description: 'Completou a jornada sobre perdão. Você escolheu a liberdade!',
    icon: '💜',
    requirement: 7,
    points: 50,
  },
  {
    key: 'theme_wisdom_complete',
    type: 'theme',
    title: '🦉 Sabedoria que Guia',
    description: 'Completou a jornada de sabedoria. Que ela ilumine seus passos!',
    icon: '🦉',
    requirement: 7,
    points: 50,
  },
  {
    key: 'theme_hope_complete',
    type: 'theme',
    title: '🌅 Esperança que não Falha',
    description: 'Completou a jornada sobre esperança. O melhor está por vir!',
    icon: '🌅',
    requirement: 7,
    points: 50,
  },

  // ========================================
  // CONQUISTAS ESPECIAIS
  // ========================================
  {
    key: 'early_bird',
    type: 'special',
    title: '🌄 Devocional da Madrugada',
    description: 'Você buscou a Deus antes das 7h da manhã. Que lindo compromisso!',
    icon: '🌄',
    requirement: 1,
    points: 15,
  },
  {
    key: 'early_bird_10',
    type: 'special',
    title: '☀️ Madrugador Constante',
    description: '10 vezes antes das 7h! Você realmente prioriza Deus no seu dia.',
    icon: '☀️',
    requirement: 10,
    points: 100,
  },
  {
    key: 'night_owl',
    type: 'special',
    title: '🌙 Oração da Noite',
    description: 'Terminou o dia com Deus (depois das 22h). Que paz para dormir!',
    icon: '🌙',
    requirement: 1,
    points: 15,
  },
  {
    key: 'comeback_hero',
    type: 'special',
    title: '💪 Recomeço sem Culpa',
    description: 'Você parou, mas voltou! Não há condenação, só acolhimento.',
    icon: '💪',
    requirement: 1,
    points: 30,
  },
  {
    key: 'comeback_champion',
    type: 'special',
    title: '🎯 Mestre do Recomeço',
    description: 'Voltou 5 vezes após pausas. Desistir não faz parte do seu vocabulário!',
    icon: '🎯',
    requirement: 5,
    points: 100,
  },
  {
    key: 'audio_lover',
    type: 'special',
    title: '🎧 Ouvinte da Palavra',
    description: 'Usou o áudio em 10 devocionais. A Palavra também entra pelos ouvidos!',
    icon: '🎧',
    requirement: 10,
    points: 50,
  },
  {
    key: 'note_taker',
    type: 'special',
    title: '📝 Guardador de Tesouros',
    description: 'Fez anotações em 10 devocionais. Você está registrando sua jornada!',
    icon: '📝',
    requirement: 10,
    points: 50,
  },
  {
    key: 'prayer_warrior',
    type: 'special',
    title: '🔥 Guerreiro de Oração',
    description: 'Escreveu orações personalizadas em 10 devocionais. Que intimidade com Deus!',
    icon: '🔥',
    requirement: 10,
    points: 50,
  },
  {
    key: 'favorite_collector',
    type: 'special',
    title: '⭐ Colecionador de Promessas',
    description: 'Salvou 20 versículos como favoritos. Você está guardando a Palavra no coração!',
    icon: '⭐',
    requirement: 20,
    points: 75,
  },
  {
    key: 'trail_starter',
    type: 'special',
    title: '🗺️ Explorador de Trilhas',
    description: 'Começou sua primeira trilha devocional. A jornada está só começando!',
    icon: '🗺️',
    requirement: 1,
    points: 25,
  },
  {
    key: 'trail_finisher',
    type: 'special',
    title: '🏁 Completou a Jornada',
    description: 'Terminou uma trilha completa! Você não desiste fácil.',
    icon: '🏁',
    requirement: 1,
    points: 100,
  },
  {
    key: 'trail_master',
    type: 'special',
    title: '🎖️ Mestre das Trilhas',
    description: 'Completou 3 trilhas diferentes! Você é um verdadeiro discípulo.',
    icon: '🎖️',
    requirement: 3,
    points: 300,
  },
];

/**
 * Níveis Espirituais (progressão estilo Duolingo)
 * Linguagem: metáforas naturais e espirituais
 */
export interface SpiritualLevel {
  key: string;
  name: string;
  description: string;
  icon: string;
  minMoments: number; // "momentos" (pontos) necessários
  maxMoments: number;
  color: string;
}

export const SPIRITUAL_LEVELS: SpiritualLevel[] = [
  {
    key: 'semente',
    name: 'Semente',
    description: 'Você está plantando sua fé. Toda grande árvore começa pequena!',
    icon: '🌱',
    minMoments: 0,
    maxMoments: 49,
    color: '#86efac', // verde claro
  },
  {
    key: 'broto',
    name: 'Broto',
    description: 'Sua fé está brotando! A constância faz você crescer.',
    icon: '🌿',
    minMoments: 50,
    maxMoments: 199,
    color: '#4ade80', // verde
  },
  {
    key: 'arvore',
    name: 'Árvore',
    description: 'Você criou raízes profundas. Sua fé está firme!',
    icon: '🌳',
    minMoments: 200,
    maxMoments: 499,
    color: '#22c55e', // verde forte
  },
  {
    key: 'bosque',
    name: 'Bosque',
    description: 'Sua vida espiritual é um refúgio. Você inspira outros!',
    icon: '🌲',
    minMoments: 500,
    maxMoments: 999,
    color: '#16a34a', // verde escuro
  },
  {
    key: 'floresta',
    name: 'Floresta',
    description: 'Você é uma floresta de fé! Sua jornada impacta muitos.',
    icon: '🏞️',
    minMoments: 1000,
    maxMoments: Infinity,
    color: '#15803d', // verde muito escuro
  },
];

/**
 * Calcula o nível espiritual baseado nos "momentos" (pontos)
 */
export function calculateSpiritualLevel(totalMoments: number): SpiritualLevel {
  for (const level of SPIRITUAL_LEVELS) {
    if (totalMoments >= level.minMoments && totalMoments <= level.maxMoments) {
      return level;
    }
  }
  return SPIRITUAL_LEVELS[0]; // fallback: Semente
}

/**
 * Calcula progresso dentro do nível atual (0-100%)
 */
export function calculateLevelProgress(totalMoments: number): number {
  const currentLevel = calculateSpiritualLevel(totalMoments);
  
  if (currentLevel.maxMoments === Infinity) {
    return 100; // nível máximo
  }
  
  const rangeSize = currentLevel.maxMoments - currentLevel.minMoments + 1;
  const progressInRange = totalMoments - currentLevel.minMoments;
  
  return Math.round((progressInRange / rangeSize) * 100);
}

/**
 * Retorna próximo nível
 */
export function getNextLevel(currentLevel: SpiritualLevel): SpiritualLevel | null {
  const currentIndex = SPIRITUAL_LEVELS.findIndex(l => l.key === currentLevel.key);
  
  if (currentIndex === -1 || currentIndex === SPIRITUAL_LEVELS.length - 1) {
    return null; // já está no nível máximo
  }
  
  return SPIRITUAL_LEVELS[currentIndex + 1];
}

/**
 * Verifica quais conquistas foram desbloqueadas
 * Retorna array de conquistas novas
 */
export function checkNewAchievements(
  stats: {
    totalMoments: number;
    currentStreak: number;
    longestStreak: number;
    earlyBirdCount: number;
    nightOwlCount: number;
    comebackCount: number;
    themeCompletions: Record<string, number>;
    audioUsedCount: number;
    notesCount: number;
    prayersCount: number;
    favoritesCount: number;
    trailsStarted: number;
    trailsCompleted: number;
  },
  alreadyUnlocked: string[]
): Achievement[] {
  const newAchievements: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    // Se já desbloqueou, pular
    if (alreadyUnlocked.includes(achievement.key)) {
      continue;
    }

    let shouldUnlock = false;

    // Verificar por tipo
    switch (achievement.type) {
      case 'milestone':
        shouldUnlock = stats.totalMoments >= achievement.requirement;
        break;

      case 'streak':
        shouldUnlock = stats.longestStreak >= achievement.requirement;
        break;

      case 'theme':
        const themeKey = achievement.key.replace('_complete', '').replace('theme_', '');
        shouldUnlock = (stats.themeCompletions[themeKey] || 0) >= achievement.requirement;
        break;

      case 'special':
        if (achievement.key === 'early_bird') {
          shouldUnlock = stats.earlyBirdCount >= 1;
        } else if (achievement.key === 'early_bird_10') {
          shouldUnlock = stats.earlyBirdCount >= 10;
        } else if (achievement.key === 'night_owl') {
          shouldUnlock = stats.nightOwlCount >= 1;
        } else if (achievement.key === 'comeback_hero') {
          shouldUnlock = stats.comebackCount >= 1;
        } else if (achievement.key === 'comeback_champion') {
          shouldUnlock = stats.comebackCount >= 5;
        } else if (achievement.key === 'audio_lover') {
          shouldUnlock = stats.audioUsedCount >= 10;
        } else if (achievement.key === 'note_taker') {
          shouldUnlock = stats.notesCount >= 10;
        } else if (achievement.key === 'prayer_warrior') {
          shouldUnlock = stats.prayersCount >= 10;
        } else if (achievement.key === 'favorite_collector') {
          shouldUnlock = stats.favoritesCount >= 20;
        } else if (achievement.key === 'trail_starter') {
          shouldUnlock = stats.trailsStarted >= 1;
        } else if (achievement.key === 'trail_finisher') {
          shouldUnlock = stats.trailsCompleted >= 1;
        } else if (achievement.key === 'trail_master') {
          shouldUnlock = stats.trailsCompleted >= 3;
        }
        break;
    }

    if (shouldUnlock) {
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}

/**
 * Mensagens motivacionais para diferentes contextos
 * Linguagem: acolhedora, sem pressão
 */
export const MOTIVATIONAL_MESSAGES = {
  // Quando completa um devocional
  completion: [
    'Que momento especial com Deus! 🙏',
    'Sua fé está crescendo! 🌱',
    'Que lindo compromisso com Deus! ✨',
    'Você está criando um hábito abençoado! 💚',
    'A constância transforma! Continue assim! 🔥',
  ],

  // Quando volta após pausa
  comeback: [
    'Que bom ter você de volta! Sem culpa, só acolhimento 💙',
    'Você voltou! Isso é o que importa 🙌',
    'Recomeçar é um ato de coragem! Orgulho de você 💪',
    'Não há condenação aqui. Só amor e recomeço! ❤️',
    'Deus te esperava com saudade! Bem-vindo de volta 🤗',
  ],

  // Quando perde a sequência
  streakLost: [
    'Sua sequência pausou, mas não tem problema! Cada dia é uma nova chance 🌅',
    'Recomeçar faz parte da jornada. Vamos juntos novamente? 💚',
    'Sem culpa! Você ainda é incrível. Vamos continuar? 😊',
    'A vida acontece. O importante é voltar! Estamos aqui 🙏',
  ],

  // Quando atinge novo nível
  levelUp: [
    'Você subiu de nível! Sua jornada está linda! 🎉',
    'Novo nível desbloqueado! Deus está orgulhoso de você! 🌟',
    'Olha só até onde você chegou! Continue brilhando! ✨',
    'Sua fé está cada vez mais forte! Que evolução! 💪',
  ],
};

/**
 * Retorna uma mensagem aleatória do tipo especificado
 */
export function getMotivationalMessage(type: keyof typeof MOTIVATIONAL_MESSAGES): string {
  const messages = MOTIVATIONAL_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

