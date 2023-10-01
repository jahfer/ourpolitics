import * as React from 'react'

interface HeaderProps {
  subheading?: string
}

export default function Header ({ subheading }: HeaderProps) {
  return (
    <header className="container section">
      <div className="header">
        <hgroup className="headings flex">
          <a href="/" className="no-hover">
            <h1 className={`pageTitle lang-en`}> Our Politics </h1>
          </a>
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