import * as React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'
import { SettingsPanel } from 'components/settings'
import { useLanguage } from 'contexts/language-context'

interface PageProps {
  title?: string,
  children: React.ReactNode,
  showHeader?: boolean,
  showFooter?: boolean,
}

export default function Page ({title, children, showHeader = true, showFooter = true}: PageProps) {
  const { language } = useLanguage();

  return (
    <div className={`page lang-${language}`}>
      <SettingsPanel />
      <main className="page-content">
        {
          showHeader ?
            <Header subheading={title} />
            : null
        }
        <div className="container content">
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