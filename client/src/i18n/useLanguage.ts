import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import type { LanguageContextValue } from './LanguageProvider';

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
