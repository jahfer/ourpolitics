import * as React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'
import { useLanguage } from 'contexts/language-context'

interface PageProps {
  title?: string,
  children: React.ReactNode,
}

export default function Page ({title, children}: PageProps) {
  const { language } = useLanguage();

  return (
    <div className={`page lang-${language}`}>
      <Header subheading={title} />
      <div className="container content">
        { children }
      </div>
      <Footer />
    </div>
  )
}