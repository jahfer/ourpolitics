import * as React from 'react'
import PolicyPoint from './policy-point'
import { Party } from 'types/schema'
import { useLanguage, useTranslation } from 'contexts/language-context'
import * as Policy from 'data/policy'

interface PolicyCellProps {
  party: Party,
  topic: string,
  policies: Array<Policy.T>,
}

export default function PolicyCell ({ party, topic, policies }: PolicyCellProps) {
  let { t } = useTranslation();

  let listItems = policies.map((policy) => {
    return <PolicyPoint policy={policy} key={`${party}/${policy.title.EN}`} />
  });

  let ariaLabels = [
    `policyTableRow--${topic.replace(/[^a-zA-Z]/g, "")}`,
    `policyTableColumn--${party}`
  ]

  return (
    <div className="policyCell" aria-labelledby={ariaLabels.join(" ")}>
      <h4 className={`policyCell--party textColor--${party}`}>
        {t(party.toLowerCase())}
      </h4>
      <ul className="policyCell--points">
      {
        listItems.length > 0
        ? listItems
        : <li className="emptyPolicy" key="0">{t("no_policy_listed")}</li>
      }
      </ul>

    </div>
  )
}