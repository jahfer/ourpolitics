import * as React from 'react'
import { useLanguage, useTranslation, LanguageSelector } from 'contexts/language-context'
import { Link } from './system/link';
import { useSettings } from 'contexts/settings-context';
import { Setting } from 'components/settings';

interface HeaderProps {
  subheading?: string
}

export default function Header ({ subheading }: HeaderProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const { registerSetting } = useSettings();

  React.useEffect(() => {
    registerSetting('language', (_notifySettingsUpdated) => 
      <Setting label={t("settings.select_language")}>
        <LanguageSelector darkTheme={true} />
      </Setting>
    );
  }, [language]);

  return (
    <header className="container section">
      <div className="header">
        <hgroup className="headings flex">
          <Link to="/" className="no-hover no-underline">
            <h1 className={`pageTitle lang-${language}`}> {t("our_politics")} </h1>
          </Link>
          <div className="header--secondary-content">
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