import * as React from 'react'
import PolicyCell from './policy-cell'
import { Party } from 'types/schema'
import { useTranslation } from 'contexts/language-context'
import { useURL } from 'contexts/router-context'
import { T as Policy } from 'data/policy'
import { Icon } from 'components/system/icon'

interface PolicyRowProps {
  topic: string
  year: string
  parties: Array<Party>
  policies: Array<Policy>
  displayTopic?: boolean
}

function topicURL(year: string, topic: string) {
  return `/policies/${year}/topics/${topic}`;
}

export default function PolicyRow ({ topic, year, parties, policies, displayTopic }: PolicyRowProps) {
  const { t } = useTranslation();
  const { setURL } = useURL();

  const policyCells = parties.map((party) => {
    const partyPolicies = policies.filter((policy) => policy.party === party)
    return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
  });

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setURL({}, topicURL(year, topic));
    event.preventDefault();
    return false;
  }, [year, topic]);

  return (
    <div className="policyRow">
    <div className="policyCells">
    {
      displayTopic ?
        <div className="policyCell policyTopic">
          <a href="#" className="no-underline" onClick={handleClick}>
            <h3
              aria-labelledby="policyTableColumn--topics"
              id={`policyTableRow--${topic}`}
              className="policyTopic--title">
              <span className="policyTopic--info"><Icon name="info-circle" inline /> {t(`topic.${topic}`)}</span>
            </h3>
          </a>
        </div>
        : null
      }
      {policyCells}
    </div>
  </div>
  )
}