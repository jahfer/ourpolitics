import { createContext, useContext, useState } from 'react';
import React, { useRef, useEffect } from 'react';
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

export function LanguageSelector({ className = "", darkTheme = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const enRef = useRef<HTMLAnchorElement>(null);
  const frRef = useRef<HTMLAnchorElement>(null);

  const handleToggleLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    // TODO check if element has focus first!!
    if (language === LanguageOption.EN) {
      frRef.current?.focus();
    } else {
      enRef.current?.focus();
    }
  }, [language]);

  return (
    <ul className={`list flex flex-row flex-justify-between select-disabled ${darkTheme ? 'list--dark' : 'list--light'} ${className}`}>
      <li key="lang-toggle-en" className="flex-grow">
        {language === LanguageOption.EN ? (
          <span className="list--item active">English</span>
        ) : (
          <a
            href="#"
            ref={enRef}
            className="list--item"
            onClick={(e) => { e.preventDefault(); handleToggleLanguage(LanguageOption.EN); }}
            tabIndex={0}
          >
            English
          </a>
        )}
      </li>
      <li key="lang-toggle-fr" className="flex-grow">
        {language === LanguageOption.FR ? (
          <span className="list--item active">Français</span>
        ) : (
          <a
            href="#"
            ref={frRef}
            className="list--item"
            onClick={(e) => { e.preventDefault(); handleToggleLanguage(LanguageOption.FR); }}
            tabIndex={0}
          >
            Français
          </a>
        )}
      </li>
    </ul>
  );
}