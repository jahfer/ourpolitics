import * as React from 'react'

interface HTMLContainerProps {
  id?: string,
  children: React.ReactNode,
  className?: string
}

export function HTMLContainer ({ id, children, className = "" }: HTMLContainerProps) {
  return (
    <div id={id} className={`html-content ${className}`}>
      {children}
    </div>
  )
}

interface RawHTMLProps {
  html: string;
}

export function RawHTML ({ html }: RawHTMLProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}