import { createContext, useContext } from 'react';

interface LanguageProviderProps {
  language: string;
  children: React.ReactNode;
}

export const LanguageContext = createContext("en");

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