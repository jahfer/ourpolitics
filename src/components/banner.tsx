import * as React from 'react'

interface BannerProps {
  children: React.ReactNode
}

export default function Banner ({ children }: BannerProps) {
  return (
    <aside className="banner">
    <div className="banner--content">
      {children}
    </div>
  </aside>
  )
}