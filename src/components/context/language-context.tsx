import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import { LanguageOption, Language } from '../../types/schema';

interface LanguageProviderProps {
  defaultLanguage: Language;
  children: React.ReactNode;
}

type LanguageContextType = {
  language: Language,
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  language: LanguageOption.EN,
  setLanguage: () => {}
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ defaultLanguage, children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const value = { language, setLanguage };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}