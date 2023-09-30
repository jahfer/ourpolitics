import * as React from 'react'
import { useLanguage } from '../context/language-context'

type Policy = {
  "topic": string,
  "party": string,
  "title": {
    "en": string,
    "fr": string
  },
  "references": [
    {
      "date": string,
      "title": string,
      "publisher": string,
      "url": string
    }
  ],
  "handle": string
}

interface PolicyTableProps {
  isLoading: boolean;
  dataset: Array<Policy>;
}

export default function PolicyTable ({ isLoading }: PolicyTableProps) {
  const [policyRows, setPolicyRows] = React.useState([]);
  const language = useLanguage();

  const tableHeader = React.useMemo(() => {
    if (isLoading) {
      return <div className="policyCell partyTitle backgroundColor--Skeleton">
        "..."
      </div>
    } else {
      <>
        <div id="policyTableColumn--topics" className="policyCell partyTitle backgroundColor--Empty">
          Title!
        </div>
        {
          ["NDP", "Liberal", "Conservative"].map((party) => {
            <div 
              key={`partyTitle--${party}`}
              id={`policyTableColumn--${party}`}
              className={`policyCell partyTitle backgroundColor--${party}`}>
              {party}
            </div>
          })
        }
      </>
    }
  }, [isLoading, language]);

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