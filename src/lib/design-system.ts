/**
 * SISTEMA DE DESIGN - DIÁRIO COM DEUS
 * Identidade visual consistente e responsiva
 */

// ===== CORES =====
export const colors = {
  // Gradientes principais
  background: {
    primary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    card: 'rgba(255,255,255,0.05)',
    cardHover: 'rgba(255,255,255,0.1)',
  },
  
  // Gradientes de texto
  text: {
    gold: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
    blue: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)',
    white: '#ffffff',
    whiteMuted: 'rgba(255, 255, 255, 0.8)',
    whiteSubtle: 'rgba(255, 255, 255, 0.55)',
    whiteFaint: 'rgba(255, 255, 255, 0.4)',
  },
  
  // Elementos
  accent: {
    gold: '#d4af37',
    goldDark: '#b8860b',
    blue: '#93c5fd',
    blueDark: '#60a5fa',
    orange: '#f59e0b',
    orangeDark: '#d97706',
    green: '#10b981',
    greenDark: '#059669',
    red: '#ef4444',
    redDark: '#dc2626',
    purple: '#8b5cf6',
    purpleDark: '#7c3aed',
  },
  
  // Bordas e sombras
  border: 'rgba(255,255,255,0.2)',
  shadow: {
    gold: '0 4px 20px rgba(212, 175, 55, 0.3)',
    goldHover: '0 8px 32px rgba(212, 175, 55, 0.4)',
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
  }
};

// ===== TIPOGRAFIA =====
export const typography = {
  // Famílias
  serif: "'Cormorant Garamond', serif",
  sans: "'Inter', sans-serif",
  
  // Fluid Typography (baseado em PWAs de sucesso)
  title: {
    diario: 'clamp(2.5rem, 6vw, 4rem)',     // Responsivo Diário
    deus: 'clamp(3rem, 7vw, 4.5rem)',       // Responsivo Deus
    com: 'clamp(1rem, 3vw, 1.5rem)',        // Responsivo com
  },
  
  heading: {
    h1: 'clamp(1.75rem, 5vw, 2.5rem)',
    h2: 'clamp(1.5rem, 4vw, 2rem)',
    h3: 'clamp(1.25rem, 3.5vw, 1.75rem)',
  },
  
  body: {
    lg: 'clamp(1.125rem, 3vw, 1.25rem)',    // Subtítulo
    md: 'clamp(1rem, 2.5vw, 1.125rem)',     // Texto normal
    sm: 'clamp(0.875rem, 2vw, 1rem)',       // Caption
  },
  
  // Tamanhos fixos para elementos específicos
  fixed: {
    button: '1rem',
    input: '1rem',
    label: '0.875rem',
  },
  
  // Pesos
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Espaçamento
  letterSpacing: {
    tight: '-0.02em',
    normal: '-0.01em',
    wide: '0.01em',
    wider: '0.02em',
  }
};

// ===== ESPAÇAMENTO RESPONSIVO =====
export const spacing = {
  // Fluid spacing (baseado em PWAs de sucesso)
  fluid: {
    xs: 'clamp(0.5rem, 2vw, 1rem)',
    sm: 'clamp(1rem, 3vw, 1.5rem)',
    md: 'clamp(1.5rem, 4vw, 2rem)',
    lg: 'clamp(2rem, 5vw, 3rem)',
    xl: 'clamp(3rem, 6vw, 4rem)',
    xxl: 'clamp(4rem, 8vw, 6rem)',
  },
  
  // Espaçamento fixo para elementos específicos
  fixed: {
    titleGap: '0.4rem',
    titleMargin: '0.125rem',
    buttonPadding: '1rem 2rem',
    cardPadding: '1.5rem',
    inputPadding: '0.75rem 1rem',
  },
  
  // Container spacing
  container: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  }
};

// ===== COMPONENTES =====
export const components = {
  // Botões
  button: {
    primary: {
      background: colors.text.gold,
      color: '#0f172a',
      borderRadius: '12px',
      padding: spacing.buttonPadding,
      fontWeight: typography.weights.semibold,
      boxShadow: colors.shadow.gold,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: colors.shadow.goldHover,
      }
    },
    
    secondary: {
      background: 'transparent',
      color: colors.text.white,
      border: `2px solid ${colors.text.white}`,
      borderRadius: '12px',
      padding: spacing.buttonPadding,
      fontWeight: typography.weights.semibold,
      transition: 'all 0.3s ease',
    }
  },
  
  // Cards
  card: {
    background: colors.background.card,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    padding: spacing.cardPadding,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: colors.background.cardHover,
      transform: 'translateY(-2px)',
      boxShadow: colors.shadow.card,
    }
  },
  
  // Inputs
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: colors.text.white,
    fontSize: typography.body.mobile,
    fontFamily: typography.sans,
    '&:focus': {
      outline: 'none',
      borderColor: colors.accent.gold,
      boxShadow: `0 0 0 3px ${colors.accent.gold}20`,
    }
  }
};

// ===== BREAKPOINTS OTIMIZADOS (Baseado em dispositivos reais 2024) =====
export const breakpoints = {
  // Mobile
  mobile: '375px',     // iPhone SE
  mobileLg: '414px',   // iPhone Plus/Pro Max
  
  // Tablet
  tablet: '768px',     // iPad
  
  // Laptop
  laptop: '1024px',    // MacBook Air
  
  // Desktop
  desktop: '1440px',   // iMac
  ultraWide: '1920px', // 4K/Ultra-wide
  
  // Aliases para compatibilidade
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ===== UTILITÁRIOS =====
export const utils = {
  // Aplicar gradiente de texto
  textGradient: (gradient: string) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
  
  // Título responsivo
  responsiveTitle: {
    fontSize: { mobile: typography.title.mobile, desktop: typography.title.desktop },
    fontFamily: typography.serif,
    fontWeight: typography.weights.semibold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: 1,
  },
  
  // Container responsivo
  container: {
    maxWidth: '375px',
    margin: '0 auto',
    padding: '0 1.5rem',
    '@media (min-width: 768px)': {
      maxWidth: '768px',
    }
  }
};

export default {
  colors,
  typography,
  spacing,
  components,
  breakpoints,
  utils,
};
