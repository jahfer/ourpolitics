import * as React from 'react'
import PolicyCell from './policy-cell'
import { Party, Policy } from '../../types/schema'

interface PolicyRowProps {
  topic: string
  parties: Array<Party>
  policies: Array<Policy>
}

export default function PolicyRow ({ topic, parties, policies }: PolicyRowProps) {
  const policyCells = parties.map((party) => {
    const partyPolicies = policies.filter((policy) => policy.party === party)
    return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
  });

  return (
    <div className="policyRow divider-t">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        <h3
          aria-labelledby="policyTableColumn--topics"
          id={`policyTableRow--${topic.replace(/[^a-zA-Z]/g, "")}`}
          className="policyTopic--title">
          {topic}
        </h3>
        {/* <a className="policyTopic--info" href="#">Learn more</a> */}
      </div>
      {policyCells}
    </div>
  </div>
  )
}