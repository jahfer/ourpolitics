import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import { LanguageOption, Language } from '../../types/schema';
import translations from '../../support/translations';

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

type TranslationContextType = {
  t: (key: string, ...args: any[]) => string
}

export const TranslationContext = createContext<TranslationContextType>({
  t: (key: string) => key
});

export function useTranslation() {
  return useContext(TranslationContext);
}

export function LanguageProvider({ defaultLanguage, children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const value = { language, setLanguage };

  const t = (key: string, ...args: any[]) => {
    const translation = translations[key];
    if (typeof translation === "function") {
      return translation(...args)[language];
    } else {
      return (translation?.[language]) || `?("${key}")`
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      <TranslationContext.Provider value={{ t }}>
        {children}
      </TranslationContext.Provider>
    </LanguageContext.Provider>
  );
}