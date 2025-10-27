import devotionalsData from '@/data/devotionals-seed.json';

export interface Devotional {
  id: string;
  tema: string;
  emoji: string;
  tags: string[];
  audiencia: string[];
  contexto: string;
  referencia: string;
  texto: string;
  palavraViva: string;
  acao: string;
  oracao: string;
  versiculo_contexto: string;
  aplicacao_pratica: string;
}

/**
 * Retorna todos os devocionais disponíveis
 */
export function getAllDevotionals(): Devotional[] {
  return devotionalsData as Devotional[];
}

/**
 * Retorna um devocional aleatório
 */
export function getRandomDevotional(): Devotional {
  const devotionals = getAllDevotionals();
  const randomIndex = Math.floor(Math.random() * devotionals.length);
  return devotionals[randomIndex];
}

/**
 * Retorna um devocional por ID
 */
export function getDevotionalById(id: string): Devotional | undefined {
  const devotionals = getAllDevotionals();
  return devotionals.find(d => d.id === id);
}

/**
 * Retorna devocionais por tema
 */
export function getDevotionalsByTema(tema: string): Devotional[] {
  const devotionals = getAllDevotionals();
  return devotionals.filter(d => d.tema.toLowerCase() === tema.toLowerCase());
}

/**
 * Retorna devocionais por tag
 */
export function getDevotionalsByTag(tag: string): Devotional[] {
  const devotionals = getAllDevotionals();
  return devotionals.filter(d => d.tags.includes(tag.toLowerCase()));
}

/**
 * Retorna o devocional do dia (baseado na data para consistência)
 * Mesmo usuário vê mesmo devocional no mesmo dia
 */
export function getDevotionalOfTheDay(emotion?: string): Devotional {
  const devotionals = getAllDevotionals();
  
  // Se tem emoção, filtrar por emoção
  if (emotion) {
    const filteredByEmotion = devotionals.filter(d => {
      // Mapear emoções para tags e tema
      const emotionMap: { [key: string]: string[] } = {
        'ansioso': ['ansiedade', 'ansioso'],
        'solitario': ['solidão', 'solitário', 'sozinho'],
        'culpado': ['culpa', 'culpado', 'pecado'],
        'perdido': ['perdido', 'direção', 'propósito'],
        'cansado': ['cansado', 'descanso', 'esgotado'],
        'inseguro': ['insegurança', 'inseguro', 'confiança'],
        'angustiado': ['angústia', 'angustiado', 'dor'],
        'grato': ['gratidão', 'grato', 'agradecer'],
        'esperançoso': ['esperança', 'esperançoso', 'futuro'],
        'alegre': ['alegria', 'alegre', 'celebração'],
        'amoroso': ['amor', 'amoroso', 'relacionamento'],
        'motivado': ['motivação', 'motivado', 'propósito']
      };
      
      const emotionTags = emotionMap[emotion] || [];
      
      // Verificar se tema ou tags correspondem à emoção
      const temaMatch = d.tema.toLowerCase().includes(emotion.toLowerCase());
      const tagsMatch = d.tags.some(tag => 
        emotionTags.some(eTag => tag.toLowerCase().includes(eTag.toLowerCase()))
      );
      
      return temaMatch || tagsMatch;
    });
    
    // Se encontrou devocional com essa emoção, usar
    if (filteredByEmotion.length > 0) {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
      const index = dayOfYear % filteredByEmotion.length;
      return filteredByEmotion[index];
    }
  }
  
  // Fallback: devocional normal
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % devotionals.length;
  return devotionals[index];
}

/**
 * Busca devocionais por termo (tema, tags, contexto)
 */
export function searchDevotionals(searchTerm: string): Devotional[] {
  const devotionals = getAllDevotionals();
  const term = searchTerm.toLowerCase();
  
  return devotionals.filter(d => 
    d.tema.toLowerCase().includes(term) ||
    d.tags.some(tag => tag.includes(term)) ||
    d.contexto.toLowerCase().includes(term) ||
    d.palavraViva.toLowerCase().includes(term)
  );
}

