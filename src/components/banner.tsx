import * as React from 'react'

export enum BannerType {
  Info,
  Warning,
  Error,
}

interface BannerProps {
  children: React.ReactNode,
  type: BannerType
}

export function Banner ({ children, type }: BannerProps) {
  const className = "banner--" + BannerType[type].toLowerCase()

  return (
    <aside className={`banner ${className}`}>
      <div className="banner--content">
        {children}
      </div>
    </aside>
  )
}