import * as React from 'react'
import { useTranslation } from 'contexts/language-context';
import { useURL } from 'contexts/router-context';

export default function Footer () {
  const { t } = useTranslation();
  const { setURL } = useURL();

  return (
    <footer className="section bg-light-alt footer pb-1">
      <div className="container">
        <h2 className="subheading"> {t("archives")} </h2>
        <ul className="list-plain text-large archive-list">
          {
            [2021, 2019, 2015].map(year => {
              const path = `/policies/${year}`;
              return (
                <li key={year}>
                  <a href={path} className="styled" onClick={(event) => {
                    setURL({}, path, {event_name: `${path} (redirect)`});
                    event.preventDefault();
                  }}>
                    {t("policy_comparison_title", year)}
                  </a>
                </li>
              )
            })
          }
        </ul>
        <p>
          <a href="/about" className="styled">
            {t("about")}
          </a>
          ·
          <a href="/privacy" className="styled">
            {t("privacy_policy")}
          </a>
        </p>
      </div>
    </footer>
  )
}