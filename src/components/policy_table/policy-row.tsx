import * as React from 'react'
import PolicyCell from './policy-cell'
import { Party } from 'types/schema'
import { useTranslation } from 'contexts/language-context'
import { useURL } from 'contexts/router-context'
import { T as Policy } from 'data/policy'

interface PolicyRowProps {
  topic: string
  parties: Array<Party>
  policies: Array<Policy>
}

function topicURL(topic: string) {
  return `/topics/${topic}`;
}

export default function PolicyRow ({ topic, parties, policies }: PolicyRowProps) {
  const { t } = useTranslation();
  const { setURL } = useURL();

  const policyCells = parties.map((party) => {
    const partyPolicies = policies.filter((policy) => policy.party === party)
    return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
  });

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setURL({}, topicURL(topic));
    event.preventDefault();
    return false;
  }

  return (
    <div className="policyRow divider-t">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        {/* <a href="#" className="no-underline" onClick={handleClick}> */}
          <h3
            aria-labelledby="policyTableColumn--topics"
            id={`policyTableRow--${topic}`}
            className="policyTopic--title">
            {t(`topic.${topic}`)}
            {/* <span className="policyTopic--info"><i className="fa fa-info-circle"></i> {t(`topic.${topic}`)}</span> */}
          </h3>
        {/* </a> */}
      </div>
      {policyCells}
    </div>
  </div>
  )
}