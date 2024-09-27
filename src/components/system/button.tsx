import * as React from 'react'

interface ButtonProps {
  className?: string,
  onClick: () => void,
  children?: React.ReactNode
}

export function Button({ className = "", children, onClick }: ButtonProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}