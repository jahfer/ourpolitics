import * as React from 'react'
import { useParams } from 'react-router-dom'

export default function PolicyComparisonIndex () {
  const { year } = useParams<{ year: string }>();

  return (
    <h1>{ year }</h1>
  )
}