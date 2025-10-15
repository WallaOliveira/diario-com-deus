/**
 * SISTEMA DE MENSAGENS MOTIVACIONAIS E INSIGHTS INTELIGENTES
 * Melhora engagement e motiva usuários com dados zerados
 */

import { colors } from './design-system';

// Tipos para diferentes estados
export type StatType = 'streak' | 'weekly' | 'total' | 'reflections' | 'favorites';
export type ProgressLevel = 'beginner' | 'growing' | 'consistent' | 'advanced';

export interface MotivationalData {
  primary: string;
  secondary: string;
  emoji: string;
  color: string;
  cta?: string;
  insight?: string;
}

/**
 * Gera mensagem motivacional baseada no tipo e valor da estatística
 */
export const getMotivationalMessage = (
  statType: StatType, 
  value: number, 
  additionalData?: any
): MotivationalData => {
  
  // Mensagens para valores zerados (principais)
  if (value === 0) {
    switch (statType) {
      case 'streak':
        return {
          primary: "🌟 Comece hoje!",
          secondary: "Seu primeiro dia te espera",
          emoji: "🌱",
          color: colors.accent.gold,
          cta: "Fazer Devocional",
          insight: "O primeiro passo é sempre o mais importante"
        };
      
      case 'total':
        return {
          primary: "📖 Sua jornada começa aqui",
          secondary: "Deus tem algo especial para você",
          emoji: "✨",
          color: colors.accent.blue,
          cta: "Começar Agora",
          insight: "Cada devocional é um encontro com Deus"
        };
      
      case 'reflections':
        return {
          primary: "✍️ Que tal escrever?",
          secondary: "Suas reflexões são valiosas",
          emoji: "💭",
          color: colors.accent.purple,
          cta: "Primeira Reflexão",
          insight: "Escrever ajuda a guardar no coração"
        };
      
      case 'favorites':
        return {
          primary: "⭐ Salve versículos",
          secondary: "Crie sua biblioteca de versículos",
          emoji: "📚",
          color: colors.accent.red,
          cta: "Ver Versículos",
          insight: "Versículos favoritos são tesouros para sempre"
        };
      
      case 'weekly':
        return {
          primary: "📅 Esta semana é sua!",
          secondary: "7 dias de bênçãos te esperam",
          emoji: "🗓️",
          color: colors.accent.green,
          cta: "Começar Semana",
          insight: "Uma semana de devocionais transforma vidas"
        };
    }
  }

  // Mensagens para valores positivos (insights inteligentes)
  return getPositiveInsight(statType, value, additionalData);
};

/**
 * Gera insights inteligentes para valores positivos
 */
const getPositiveInsight = (
  statType: StatType, 
  value: number, 
  additionalData?: any
): MotivationalData => {
  
  switch (statType) {
    case 'streak':
      if (value === 1) {
        return {
          primary: "🎉 Primeiro dia!",
          secondary: "Você começou sua jornada",
          emoji: "🌱",
          color: colors.accent.green,
          insight: "Continue assim! O hábito se forma com constância"
        };
      } else if (value >= 7) {
        return {
          primary: `${value} dias seguidos!`,
          secondary: "Que constância incrível!",
          emoji: "🔥",
          color: colors.accent.orange,
          insight: "Você está criando um hábito abençoado"
        };
      } else {
        return {
          primary: `${value} dias seguidos!`,
          secondary: "Continue crescendo!",
          emoji: "📈",
          color: colors.accent.blue,
          insight: "Cada dia fortalece sua fé"
        };
      }
    
    case 'weekly':
      const percentage = Math.round((value / 7) * 100);
      return {
        primary: `${value}/7 dias`,
        secondary: `${percentage}% da semana completa!`,
        emoji: percentage >= 70 ? "🎯" : "📊",
        color: percentage >= 70 ? colors.accent.green : colors.accent.blue,
        insight: percentage >= 70 
          ? "Excelente semana! Você está no caminho certo"
          : `${7 - value} dias restantes para completar a semana`
      };
    
    case 'total':
      return {
        primary: `${value} devocionais`,
        secondary: "Momentos preciosos com Deus",
        emoji: "🙏",
        color: colors.accent.gold,
        insight: value >= 10 
          ? "Que jornada abençoada! Continue assim"
          : "Cada devocional é uma semente plantada"
      };
    
    case 'reflections':
      return {
        primary: `${value} reflexões`,
        secondary: "Pensamentos guardados no coração",
        emoji: "💭",
        color: colors.accent.purple,
        insight: value >= 5 
          ? "Suas reflexões mostram crescimento espiritual"
          : "Que bom ver você refletindo sobre a Palavra"
      };
    
    case 'favorites':
      return {
        primary: `${value} versículos`,
        secondary: "Versículos salvos na sua biblioteca",
        emoji: "⭐",
        color: colors.accent.red,
        insight: value >= 3 
          ? "Sua biblioteca de versículos está crescendo"
          : "Continue salvando versículos que te inspiram"
      };
  }
};

/**
 * Determina o nível de progresso do usuário
 */
export const getProgressLevel = (stats: any): ProgressLevel => {
  const total = stats?.devotionals_completed || 0;
  const streak = stats?.streak || 0;
  
  if (total === 0) return 'beginner';
  if (total < 7) return 'growing';
  if (total < 30) return 'consistent';
  return 'advanced';
};

/**
 * Gera mensagem de nível de progresso
 */
export const getProgressLevelMessage = (level: ProgressLevel): string => {
  switch (level) {
    case 'beginner':
      return "🌱 Iniciante - Sua jornada espiritual está começando";
    case 'growing':
      return "🌿 Crescendo - Você está desenvolvendo o hábito";
    case 'consistent':
      return "🌳 Consistente - Sua fé está sendo fortalecida";
    case 'advanced':
      return "🏆 Avançado - Que exemplo de dedicação!";
  }
};
