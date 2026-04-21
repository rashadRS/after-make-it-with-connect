'use client';

import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { FavoritesProvider } from './FavoritesContext';
import { SoundProvider } from './SoundContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <SoundProvider>{children}</SoundProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
