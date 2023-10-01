import * as React from 'react'

export default function Footer () {
  return (
    <footer className="section bg-light-alt footer pb-1">
      <div className="container">
        <h2 className="subheading"> Archives </h2>
        <ul className="list-plain text-large archive-list">
          {
            [2021, 2019, 2015].map(year => {
              return (
                <li key={year}>
                  <a href={`/policies/${year}`} className="styled">
                    {year}
                  </a>
                </li>
              )
            })
          }
        </ul>
        <p>
          <a href="/about" className="styled">
            About
          </a>
          ·
          <a href="/privacy" className="styled">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  )
}