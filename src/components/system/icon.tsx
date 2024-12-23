import * as React from 'react'

interface IconProps {
  name: string,
  className?: string,
}

export function Icon ({name, className}: IconProps) {
  return (
    <i className={`fa fa-${name} ${className}`}></i>
  )
}