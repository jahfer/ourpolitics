import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import { LanguageOption, Language } from 'types/schema';
import translations from 'support/translations';

const LANGAUGE_STORAGE_KEY: string = "language";

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

export function LanguageProvider({ children }: LanguageProviderProps) {
  let initialLanguage = localStorage.getItem(LANGAUGE_STORAGE_KEY) as Language;

  if (initialLanguage === null) {
    initialLanguage = LanguageOption.EN;
    localStorage.setItem(LANGAUGE_STORAGE_KEY, initialLanguage);
  }

  const [language, setLanguage] = useState<Language>(initialLanguage);
  const value = { language, setLanguage: (language: Language) => {
    localStorage.setItem(LANGAUGE_STORAGE_KEY, language);
    setLanguage(language);
  } };

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

interface LanguageSelectorProps {
  darkTheme?: boolean;
  className?: string;
}

export function LanguageSelector ({ className = "", darkTheme = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <ul className={`list flex flex-row flex-justify-between ${ darkTheme ? 'list--dark' : 'list--light' } ${className}`}>
    {
      (language == LanguageOption.EN) ?
        <>
          <li className="flex-grow">
            <span className="list--item active">English</span>
          </li>
          <li className="flex-grow" onClick={e => { e.preventDefault(); setLanguage(LanguageOption.FR) }}>
            <span className="list--item">Français</span>
          </li>
        </>
        :
        <>
          <li className="flex-grow" onClick={e => { e.preventDefault(); setLanguage(LanguageOption.EN) }}>
            <span className="list--item">English</span>
          </li>
          <li className="flex-grow">
            <span className="list--item active">Français</span>
          </li>
        </>
    }
    </ul>
  )

  // return (language == LanguageOption.EN) ?
  //   <>
  //     <span className="active">
  //       English
  //     </span>
  //     <span> | </span>
  //     <a
  //       href="#"
  //       onClick={e => { e.preventDefault(); setLanguage(LanguageOption.FR) }}>
  //       Français
  //     </a>
  //   </> :
  //   <>
  //     <a
  //       href="#"
  //       onClick={e => { e.preventDefault(); setLanguage(LanguageOption.EN) }}>
  //       English
  //     </a>
  //     <span> | </span>
  //     <span className="active">
  //       Français
  //     </span>
  //   </>
}