import * as React from 'react'
import { useURL } from 'contexts/router-context'

interface LinkProps {
  to: string
  children: React.ReactNode
}

export function Link({ to, children }: LinkProps) {
  const { setURL } = useURL()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setURL({}, to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}