/**
 * SISTEMA DE DESIGN - DIÁRIO COM DEUS
 * Identidade visual consistente e responsiva
 */

// ===== CORES =====
export const colors = {
  // Gradientes principais - Sistema unificado
  background: {
    primary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    secondary: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
    card: 'rgba(255,255,255,0.05)',
    cardHover: 'rgba(255,255,255,0.1)',
    cardActive: 'rgba(255,255,255,0.15)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  
  // Gradientes de texto - Hierarquia clara
  text: {
    gold: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
    blue: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    white: '#ffffff',
    whiteMuted: 'rgba(255, 255, 255, 0.8)',
    whiteSubtle: 'rgba(255, 255, 255, 0.6)',
    whiteFaint: 'rgba(255, 255, 255, 0.4)',
    whiteDisabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Elementos - Cores semânticas
  accent: {
    gold: '#d4af37',
    goldDark: '#b8860b',
    goldLight: '#f4d03f',
    blue: '#93c5fd',
    blueDark: '#60a5fa',
    blueLight: '#bfdbfe',
    orange: '#f59e0b',
    orangeDark: '#d97706',
    green: '#10b981',
    greenDark: '#059669',
    greenLight: '#34d399',
    red: '#ef4444',
    redDark: '#dc2626',
    redLight: '#f87171',
    purple: '#8b5cf6',
    purpleDark: '#7c3aed',
    purpleLight: '#a78bfa',
    pink: '#ec4899',
    pinkDark: '#db2777',
  },
  
  // Estados interativos
  interactive: {
    hover: 'rgba(255, 255, 255, 0.1)',
    active: 'rgba(255, 255, 255, 0.2)',
    focus: 'rgba(212, 175, 55, 0.3)',
    disabled: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Bordas e sombras - Sistema consistente
  border: 'rgba(255,255,255,0.2)',
  borderLight: 'rgba(255,255,255,0.1)',
  borderDark: 'rgba(255,255,255,0.3)',
  
  shadow: {
    gold: '0 4px 20px rgba(212, 175, 55, 0.3)',
    goldHover: '0 8px 32px rgba(212, 175, 55, 0.4)',
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
    cardHover: '0 8px 32px rgba(0, 0, 0, 0.15)',
    dropdown: '0 10px 40px rgba(0, 0, 0, 0.5)',
    button: '0 2px 8px rgba(0, 0, 0, 0.2)',
    buttonHover: '0 4px 16px rgba(0, 0, 0, 0.3)',
  }
};

// ===== TIPOGRAFIA =====
export const typography = {
  // Famílias - Fontes simples e legíveis para todas as idades
  serif: "'Georgia', serif", // Fonte serif simples e legível
  sans: "'system-ui', -apple-system, 'Segoe UI', Roboto, sans-serif", // Fontes do sistema
  
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
    button: 'var(--font-size-base, 1rem)',
    input: 'var(--font-size-base, 1rem)',
    label: 'calc(var(--font-size-base, 1rem) * 0.875)',
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
  // Botões - Sistema unificado
  button: {
    primary: {
      background: colors.text.gold,
      color: '#0f172a',
      borderRadius: '12px',
      padding: spacing.fixed.buttonPadding,
      fontWeight: typography.weights.semibold,
      fontSize: typography.fixed.button,
      fontFamily: typography.sans,
      boxShadow: colors.shadow.button,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: colors.shadow.buttonHover,
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
      }
    },
    
    secondary: {
      background: 'transparent',
      color: colors.text.white,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: spacing.fixed.buttonPadding,
      fontWeight: typography.weights.semibold,
      fontSize: typography.fixed.button,
      fontFamily: typography.sans,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        background: colors.interactive.hover,
        borderColor: colors.accent.gold,
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      }
    },
    
    ghost: {
      background: 'transparent',
      color: colors.text.whiteMuted,
      border: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      fontWeight: typography.weights.medium,
      fontSize: typography.body.sm,
      fontFamily: typography.sans,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: colors.interactive.hover,
        color: colors.text.white,
      }
    }
  },
  
  // Cards - Sistema consistente
  card: {
    base: {
      background: colors.background.card,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      padding: spacing.fixed.cardPadding,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    
    hover: {
      background: colors.background.cardHover,
      transform: 'translateY(-2px)',
      boxShadow: colors.shadow.cardHover,
    },
    
    active: {
      background: colors.background.cardActive,
      transform: 'translateY(-1px)',
    }
  },
  
  // Inputs - Sistema unificado
  input: {
    base: {
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: spacing.fixed.inputPadding,
      color: colors.text.white,
      fontSize: typography.fixed.input,
      fontFamily: typography.sans,
      transition: 'all 0.2s ease',
      '&:focus': {
        outline: 'none',
        borderColor: colors.accent.gold,
        boxShadow: `0 0 0 3px ${colors.accent.gold}20`,
        background: 'rgba(255,255,255,0.08)',
      },
      '&::placeholder': {
        color: colors.text.whiteFaint,
      }
    }
  },
  
  // Dropdown/Menu
  dropdown: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    backdropFilter: 'blur(20px)',
    boxShadow: colors.shadow.dropdown,
    padding: '0.25rem',
    minWidth: '160px',
  },
  
  // Ícones - Tamanhos padronizados
  icon: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
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

// ===== ANIMAÇÕES =====
export const animations = {
  // Durações padronizadas
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s',
  },
  
  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Transições padrão
  transition: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 0.3s ease',
    colors: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  },
  
  // Keyframes personalizados
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    },
    fadeOut: {
      '0%': { opacity: 1, transform: 'translateY(0)' },
      '100%': { opacity: 0, transform: 'translateY(-10px)' }
    },
    slideIn: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' }
    },
    slideOut: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(100%)' }
    },
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: 0 },
      '100%': { transform: 'scale(1)', opacity: 1 }
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' }
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' }
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 }
    },
    bounce: {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
      '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
      '70%': { transform: 'translate3d(0, -15px, 0)' },
      '90%': { transform: 'translate3d(0, -4px, 0)' }
    }
  }
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
    fontSize: { mobile: typography.title.diario, desktop: typography.title.deus },
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
  },
  
  // Helpers de animação
  animation: {
    fadeIn: `fadeIn ${animations.duration.normal} ${animations.easing.cubic}`,
    fadeOut: `fadeOut ${animations.duration.normal} ${animations.easing.cubic}`,
    slideIn: `slideIn ${animations.duration.normal} ${animations.easing.cubic}`,
    slideOut: `slideOut ${animations.duration.normal} ${animations.easing.cubic}`,
    scaleIn: `scaleIn ${animations.duration.normal} ${animations.easing.bounce}`,
    float: `float 3s ${animations.easing.easeInOut} infinite`,
    shimmer: `shimmer 2s ${animations.easing.easeInOut} infinite`,
    pulse: `pulse 2s ${animations.easing.easeInOut} infinite`,
    bounce: `bounce 1s ${animations.easing.easeInOut} infinite`,
  },
  
  // Estados de hover/active
  interactive: {
    hover: {
      transform: 'translateY(-2px)',
      transition: animations.transition.transform,
    },
    active: {
      transform: 'translateY(0)',
      transition: animations.transition.fast,
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px ${colors.accent.gold}30`,
      transition: animations.transition.fast,
    }
  }
};

export default {
  colors,
  typography,
  spacing,
  components,
  breakpoints,
  animations,
  utils,
};
