import * as React from 'react'
import Header from './header'
import Footer from './footer'

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