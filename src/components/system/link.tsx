import * as React from 'react'
import { useURL } from 'contexts/router-context'

interface LinkProps {
  to: string
  className?: string
  children: React.ReactNode,
  resetScroll?: boolean,
  onClick?: () => void
}

export function Link({ to, children, className = "", resetScroll = true, onClick }: LinkProps) {
  const { setURL } = useURL()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setURL({}, to);

    if (resetScroll) {
      window.scrollTo(0, 0);
    }

    if (onClick) {
      onClick();
    }
  }

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}