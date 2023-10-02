import { createContext, useContext } from 'react';
import { LanguageOption, Language } from '../../types/schema';

interface LanguageProviderProps {
  language: Language;
  children: React.ReactNode;
}

export const LanguageContext = createContext<Language>(LanguageOption.EN);

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ language, children }: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}