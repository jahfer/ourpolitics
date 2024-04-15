import * as React from 'react'

interface HTMLContainerProps {
  id?: string,
  children: React.ReactNode;
}

export function HTMLContainer ({ id, children }: HTMLContainerProps) {
  return (
    <div id={id} className="html-content">
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