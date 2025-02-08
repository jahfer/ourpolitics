import * as React from 'react'

interface IconProps {
  name: string,
  className?: string,
  inline?: boolean,
}

export function Icon ({name, className, inline = false}: IconProps) {
  return (
    <i className={`fa fa-${name} ${className} ${inline ? 'fa-inline' : ''}`}></i>
  )
}