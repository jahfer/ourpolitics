import * as React from 'react'

interface ButtonProps {
  className?: string,
  onClick: () => void,
  children?: React.ReactNode,
  primary?: boolean
}

export function Button({ className = "", children, onClick, primary = false }: ButtonProps) {
  return (
    <button className={`btn ${className} ${primary ? "btn-primary" : ""}`} onClick={onClick}>
      {children}
    </button>
  )
}