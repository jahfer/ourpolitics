import * as React from 'react'
import { useTranslation } from 'contexts/language-context';
import { Link } from './system/link';

export default function Footer () {
  const { t } = useTranslation();

  return (
    <footer className="section bg-dark-alt footer pb-1">
      <div className="container">
        <h2 className="subheading"> {t("archives")} </h2>
        <ul className="list-plain text-large archive-list">
          {
            [2021, 2019, 2015].map(year => {
              const path = `/policies/${year}`;
              return (
                <li key={year}>
                  <Link to={path} className="styled">
                    {t("policy_comparison_title", year)}
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <p>
          <Link to="/about" className="styled">
            {t("about")}
          </Link>
          ·
          <Link to="/privacy" className="styled">
            {t("privacy_policy")}
          </Link>
        </p>
      </div>
    </footer>
  )
}