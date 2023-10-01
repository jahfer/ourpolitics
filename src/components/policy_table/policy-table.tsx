import * as React from 'react'
import { useLanguage } from '../context/language-context'
import PolicyRow from './policy-row'
import { Party, Policy } from '../../types/schema'

interface PolicyTableProps {
  isLoading: boolean;
  dataset: Map<string, Array<Policy>>;
}

export default function PolicyTable ({ dataset, isLoading }: PolicyTableProps) {
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>();
  const language = useLanguage();
  const parties = [Party.Liberal, Party.Conservative, Party.NDP, Party.Green];

  const tableHeader = React.useMemo(() => {
    if (isLoading) {
      return <div className="policyCell partyTitle backgroundColor--Skeleton">
        "..."
      </div>
    } else {
      return (
        <>
          <div id="policyTableColumn--topics" className="policyCell partyTitle backgroundColor--Empty">
            Title!
          </div>
          {
            parties.map((party) => {
              return (
                <div
                  key={`partyTitle--${party}`}
                  id={`policyTableColumn--${party}`}
                  className={`policyCell partyTitle backgroundColor--${party}`}>
                  {party}
                </div>
              )
            })
          }
        </>
      )
    }
  }, [isLoading, language, parties]);

  React.useMemo(() => {
    let rows = Array.from(dataset, ([topic, policies]) => {
      return (
        <PolicyRow
          topic={topic}
          parties={parties}
          policies={policies}
          key={topic} />
      )
    });

    setPolicyRows(rows);
  }, [dataset]);

  return (
    <div className="policyTable">
      <div id="tableHeader" className="policyRow container tableHeader">
        <div className="policyCells"> {tableHeader} </div>
      </div>
      <div id="tableFiller" className="policyRow container tableFiller hidden"></div>
      <div>
        { isLoading ? null : policyRows }
      </div>
    </div>
  )
}