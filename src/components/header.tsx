import * as React from 'react'
import { useLanguage, useTranslation } from 'contexts/language-context'
import { LanguageOption } from 'types/schema';
import { Link } from './system/link';

function LanguageSelector () {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="langSelection">
      <a
        href="#"
        onClick={e => { e.preventDefault(); setLanguage(LanguageOption.EN) }}
        className={language == LanguageOption.EN ? "active" : ""}>
        EN
      </a>
      <span> | </span>
      <a
        href="#"
        onClick={e => { e.preventDefault(); setLanguage(LanguageOption.FR) }}
        className={language == LanguageOption.FR ? "active" : ""}>
        FR
      </a>
    </div>
  )
}

interface HeaderProps {
  subheading?: string
}

export default function Header ({ subheading }: HeaderProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <header className="container section">
      <div className="header">
        <LanguageSelector />
        <hgroup className="headings flex">
          <Link to="/" className="no-hover">
            <h1 className={`pageTitle lang-${language}`}> {t("our_politics")} </h1>
          </Link>
          {
            subheading ?
              <h2 className="pageSubTitle">{subheading}</h2>
              : null
          }
        </hgroup>
      </div>
    </header>
  )
}