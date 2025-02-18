import * as React from 'react'

export enum IconInlinePosition { Left, Right }

interface IconProps {
  name: string,
  className?: string,
  inline?: IconInlinePosition,
  large?: boolean,
}

export function Icon ({name, className = '', inline, large = false}: IconProps) {
  return (
    <i className={`fa fa-${name}
      ${inline  ? 'fa-inline' : ''}
      ${inline == IconInlinePosition.Left ? 'fa-inline-left' : ''}
      ${inline == IconInlinePosition.Right ? 'fa-inline-right' : ''}
      ${large ? 'fa-large' : ''}
      ${className}`}></i>
  )
}