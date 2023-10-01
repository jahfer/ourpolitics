import * as React from 'react'
import PolicyPoint from './policy-point'
import { Party, Policy } from '../../types/schema'

interface PolicyCellProps {
  party: Party,
  topic: string,
  policies: Array<Policy>,
}

export default function PolicyCell ({ party, topic, policies }: PolicyCellProps) {
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
        {party}
      </h4>
      <ul className="policyCell--points"> {listItems} </ul>
    </div>
  )
}