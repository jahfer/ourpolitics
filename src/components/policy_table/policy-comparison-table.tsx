import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import PolicyTable from './policy-table'
import { Party, Policy } from 'types/schema'
import { usePolicyModal } from 'contexts/policy-modal-context'
import { useURL } from 'contexts/router-context'

import { PolicyModalProvider } from 'contexts/policy-modal-context'
import Banner from '../banner'

interface PolicyComparisonTableProps {
  year: string,
  selectedHandle?: string,
}

function partyToAcronym(party: Party) {
  switch (party) {
    case Party.Conservative:
      return "CPC";
    case Party.Green:
      return "GPC";
    case Party.Liberal:
      return "LPC";
    case Party.NDP:
      return "NDP";
    default:
      const _exhaustiveCheck: never = party;
      return _exhaustiveCheck;
  }
}

export default function PolicyComparisonTable ({ year, selectedHandle }: PolicyComparisonTableProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [tableDataset, setTableDataset] = React.useState<Map<string, Array<Policy>>>();
  const [parties, setParties] = React.useState<Set<Party>>();
  const [policiesByHandle, setPoliciesByHandle] = React.useState<Map<string, Policy>>();
  const { updateURLState, history } = useURL();

  React.useEffect(() => {
    if (selectedHandle && policiesByHandle) {
      const policy = policiesByHandle.get(selectedHandle);
      if (policy) {
        console.log("Setting URL state from selected handle", policy);
        updateURLState({ policy });
      }
    }
  }, [selectedHandle, policiesByHandle]);

  React.useEffect(() => {
    let ignore = false;

    async function fetchPolicies() {
      const response = await fetch(`/policies/${year}/policies.json`);
      const policies: Array<Policy> = await response.json();

      if (!ignore) {
        let dataset = new Map<string, Array<Policy>>();
        let parties = new Set<Party>();
        let policiesByHandle = new Map<string, Policy>();

        policies.forEach((policy) => {
          if (policy.handle) {
            policiesByHandle.set(`${partyToAcronym(policy.party)}/${policy.handle}`, policy);
          }

          parties.add(policy.party);
          if (dataset.has(policy.topic)) {
            dataset.get(policy.topic)?.push(policy);
          } else {
            dataset.set(policy.topic, [policy]);
          }
        });
        setTableDataset(dataset);
        setParties(parties);
        setPoliciesByHandle(policiesByHandle);
        setIsLoading(false);
      }
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year]);

  return (
    <PolicyModalProvider>
      {/* <Banner>
        <div dangerouslySetInnerHTML={{ __html: t("election_notice") }} />
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