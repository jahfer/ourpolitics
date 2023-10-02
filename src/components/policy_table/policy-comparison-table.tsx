import * as React from 'react'
import { useLanguage } from '../context/language-context'
import PolicyModal from './policy-modal'
import PolicyTable from './policy-table'
import { table } from 'console'
import { Party, Policy } from '../../types/schema'

import { PolicyModalProvider } from '../context/policy-modal-context'
import Banner from '../banner'

interface PolicyComparisonIndexProps {
  year: string,
  policyHandle?: string,
}

export default function PolicyComparisonIndex ({ year, policyHandle }: PolicyComparisonIndexProps) {
  const language = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);
  const [policyIndex, setPolicyIndex] = React.useState({});
  const [tableDataset, setTableDataset] = React.useState<Map<string, Array<Policy>>>();
  const [parties, setParties] = React.useState<Set<Party>>();
  const [deferUntil, setDeferUntil] = React.useState(null);
  const [topicFilter, setTopicFilter] = React.useState([]);

  React.useEffect(() => {
    let ignore = false
    async function fetchPolicies() {
      const response = await fetch(`/policies/${year}/policies.json`);
      const policies: Array<Policy> = await response.json();

      if (!ignore) {
        let dataset = new Map<string, Array<Policy>>();
        let parties = new Set<Party>();
        policies.forEach((policy) => {
          parties.add(policy.party);
          if (dataset.has(policy.topic)) {
            dataset.get(policy.topic)?.push(policy);
          } else {
            dataset.set(policy.topic, [policy]);
          }
        });
        setTableDataset(dataset);
        setParties(parties);
        setIsLoading(false);
        // setTopicFilter(Array.from(dataset.keys()));
      }
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year]);

  return (
    <PolicyModalProvider visible={false}>
      {/* <Banner>
        <div dangerouslySetInnerHTML={{ __html: "The election is today! Be sure to check your local <a target='_blank' href='https://www.elections.ca/content2.aspx?section=faq&dir=votinghours&document=index&lang=e'>voting&nbsp;hours&nbsp;&rarr;</a>" }} />
      </Banner> */}
      {
        (isLoading || !tableDataset || !parties) ?
        (
          <div className="policyCell partyTitle backgroundColor--Skeleton">
            ...
          </div>
        ) : <PolicyTable dataset={tableDataset} parties={parties} />
      }
      <footer>
        <p className="footerInfo" />
      </footer>
    </PolicyModalProvider>
  )
}