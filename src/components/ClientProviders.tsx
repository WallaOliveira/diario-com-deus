'use client';

import { AccessibilityProvider } from './AccessibilityProvider';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AccessibilityProvider>
      {children}
    </AccessibilityProvider>
  );
}
