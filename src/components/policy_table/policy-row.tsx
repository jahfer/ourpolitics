import * as React from 'react'
import PolicyCell from './policy-cell'
import { Party } from 'types/schema'
import { useTranslation } from 'contexts/language-context'
import { useURL } from 'contexts/router-context'
import { T as Policy } from 'data/policy'
import { Icon, IconInlinePosition } from 'components/system/icon'
import { Link } from 'components/system/link'
import { Feature } from 'components/system/feature'

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
    const partyPolicies = policies
      .filter((policy) => policy.party === party)
      .sort((a, b) => (a.order || 100) - (b.order || 100))
    return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
  });

  return (
    <div className="policyRow">
      <div className="policyCells">
      {
        displayTopic ?
          <div className="policyCell policyTopic">
            <Feature name="policy_topic_details_page">
              <Link className="no-underline" to={topicURL(year, topic)}>
                <h3
                  aria-labelledby="policyTableColumn--topics"
                  id={`policyTableRow--${topic}`}
                  className="policyTopic--title">
                  <span className="policyTopic--info-link">
                    <Icon name="info-circle" inline={IconInlinePosition.Left} /> {t(`topic.${topic}`)}
                  </span>
                </h3>
              </Link>
            </Feature>
            <Feature name="policy_topic_details_page" disabled>
              <h3
                aria-labelledby="policyTableColumn--topics"
                id={`policyTableRow--${topic}`}
                className="policyTopic--title">
                <span className="policyTopic--info">{t(`topic.${topic}`)}</span>
              </h3>
            </Feature>
          </div>
          : null
        }
        {policyCells}
      </div>
    </div>
  )
}