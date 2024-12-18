import * as React from 'react'
import { useLanguage, useTranslation, LanguageSelector } from 'contexts/language-context'
import { Link } from './system/link';

interface HeaderProps {
  subheading?: string
}

export default function Header ({ subheading }: HeaderProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <header className="container section">
      <div className="header">
        <hgroup className="headings flex">
          <Link to="/" className="no-hover no-underline">
            <h1 className={`pageTitle lang-${language}`}> {t("our_politics")} </h1>
          </Link>
          <div className="header--secondary-content">
            <div className="langSelection">
              <LanguageSelector />
            </div>
            {
              subheading ?
                <h2 className="pageSubTitle">{subheading}</h2>
                : null
            }
          </div>
        </hgroup>
      </div>
    </header>
  )
}