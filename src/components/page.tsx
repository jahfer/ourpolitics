import * as React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'
import { SettingsPanel } from 'components/settings'
import { useLanguage, useTranslation } from 'contexts/language-context'

interface PageProps {
  title?: string | React.ReactNode,
  children: React.ReactNode,
  className?: string,
  showHeader?: boolean,
  showFooter?: boolean,
}

export default function Page ({title, children, className = "", showHeader = true, showFooter = true}: PageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={`page lang-${language}`}>
      <title>{`${title} — ${t('our_politics')}`}</title>
      <SettingsPanel />
      <main className="page-content flex flex-col">
        {
          showHeader ?
            <Header subheading={title} />
            : null
        }
        <div className={`container content ${className}`}>
          { children }
        </div>
        {
          showFooter ?
            <Footer />
            : null
        }
      </main>
    </div>
  )
}