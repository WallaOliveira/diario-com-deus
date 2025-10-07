'use client';

import { colors, typography } from '@/lib/design-system';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function Loading({ 
  message = 'Carregando...', 
  size = 'md',
  fullScreen = false 
}: LoadingProps) {
  const sizes = {
    sm: { spinner: 'h-8 w-8', text: typography.body.sm },
    md: { spinner: 'h-12 w-12', text: typography.body.md },
    lg: { spinner: 'h-16 w-16', text: typography.body.lg },
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div 
        className={`${sizes[size].spinner} animate-spin rounded-full border-b-2`}
        style={{ borderColor: colors.text.gold }}
      />
      
      {/* Mensagem */}
      <p 
        className="text-center"
        style={{ 
          fontFamily: typography.sans,
          fontSize: sizes[size].text,
          color: colors.text.whiteMuted,
        }}
      >
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}

/**
 * Loading inline para seções
 */
export function LoadingInline({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg" style={{
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${colors.border}`,
    }}>
      <div 
        className="h-6 w-6 animate-spin rounded-full border-b-2"
        style={{ borderColor: colors.text.gold }}
      />
      <p style={{ 
        fontFamily: typography.sans,
        fontSize: typography.body.sm,
        color: colors.text.whiteMuted,
      }}>
        {message}
      </p>
    </div>
  );
}

/**
 * Loading skeleton (para listas)
 */
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-16 rounded-lg animate-pulse"
          style={{
            background: 'rgba(255,255,255,0.05)',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Loading dots (três pontinhos animados)
 */
export function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            background: colors.text.gold,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

