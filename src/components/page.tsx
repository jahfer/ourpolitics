import * as React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

interface PageProps {
  title?: string,
  children: React.ReactNode,
}

export default function Page ({title, children}: PageProps) {
  return (
    <div className="page">
      <Header subheading={title} />
      <div className="container">
        { children }
      </div>
      <Footer />
    </div>
  )
}