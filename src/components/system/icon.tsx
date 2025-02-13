import * as React from 'react'

interface IconProps {
  name: string,
  className?: string,
  inline?: boolean,
  large?: boolean,
}

export function Icon ({name, className = '', inline = false, large = false}: IconProps) {
  return (
    <i className={`fa fa-${name} ${className} ${inline && 'fa-inline'} ${large && 'fa-large'}`}></i>
  )
}