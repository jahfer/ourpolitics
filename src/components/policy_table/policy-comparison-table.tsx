import * as React from 'react'
import PolicyTable from './policy-table'
import { Party } from 'types/schema'
import { useURL } from 'contexts/router-context'
import * as Policy from 'data/policy'

import { PolicyModalProvider } from 'contexts/policy-modal-context'
import Banner from '../banner'

interface PolicyComparisonTableProps {
  year: string,
  selectedHandle?: string,
  canFilterTopics?: boolean,
  floatingHeader?: boolean,
  selectedTopics?: Map<string, boolean>,
  hideHeader?: boolean,
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

export default function PolicyComparisonTable ({ year, selectedHandle, canFilterTopics = true, floatingHeader = true, selectedTopics, hideHeader = false }: PolicyComparisonTableProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [tableDataset, setTableDataset] = React.useState<Map<string, Array<Policy.T>>>();
  const [parties, setParties] = React.useState<Set<Party>>();
  const [policiesByHandle, setPoliciesByHandle] = React.useState<Map<string, Policy.T>>();
  const { updateURLState, history } = useURL();

  React.useEffect(() => {
    if (selectedHandle && policiesByHandle) {
      const policy = policiesByHandle.get(selectedHandle);
      if (policy) {
        updateURLState({ policy });
      }
    }
  }, [selectedHandle, policiesByHandle]);

  React.useEffect(() => {
    let ignore = false;

    async function fetchPolicies() {
      const policies = await Policy.byYear(year);

      if (ignore) return;

      let parties = new Set<Party>();
      let policiesByHandle = new Map<string, Policy.T>();

      policies.forEach((policy) => {
        if (policy.handle) {
          policiesByHandle.set(`${partyToAcronym(policy.party)}/${policy.handle}`, policy);
        }

        parties.add(policy.party);
      });

      setTableDataset(Policy.toDataset(policies));
      setParties(parties);
      setPoliciesByHandle(policiesByHandle);
      setIsLoading(false);
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year]);

  return (
    <PolicyModalProvider>
      {
        (isLoading || !tableDataset || !parties) ?
        (
          <div className="policyCell partyTitle backgroundColor--Skeleton">
            ...
          </div>
        ) : <PolicyTable 
              dataset={tableDataset}
              parties={parties}
              year={year}
              enableTopicFilter={canFilterTopics}
              enableFloatingHeader={floatingHeader}
              initialSelectedTopics={selectedTopics}
              hideHeader={hideHeader}
            />
      }
    </PolicyModalProvider>
  )
}