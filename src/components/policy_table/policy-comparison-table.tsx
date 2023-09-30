import * as React from 'react'
import { useLanguage } from '../context/language-context'
import PolicyModal from './policy-modal'
import PolicyTable from './policy-table'

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

interface PolicyComparisonIndexProps {
  year: string,
  policyHandle?: string,
}

let elTop = 0;

export default function PolicyComparisonIndex ({ year, policyHandle }: PolicyComparisonIndexProps) {
  const language = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);
  const [policyIndex, setPolicyIndex] = React.useState({});
  const [tableDataset, setTableDataset] = React.useState({});
  const [parties, setParties] = React.useState([]);
  const [deferUntil, setDeferUntil] = React.useState(null);
  const [topicFilter, setTopicFilter] = React.useState([]);

  React.useEffect(() => {
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    const $tableFiller = document.getElementById("tableFiller") as HTMLElement;
    let initialHeaderTop: number = $tableHeader.getBoundingClientRect().top;
    let initialBodyTop: number = document.body.getBoundingClientRect().top; 

    if (elTop == 0) {
      elTop = initialHeaderTop - initialBodyTop;
    }

    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => {
        let scrollTop: number = document.documentElement.scrollTop;
        if (scrollTop > elTop) {
          $tableHeader.classList.add("fixed");
          $tableFiller.classList.remove("hidden");
        } else {
          $tableHeader.classList.remove("fixed");
          $tableFiller.classList.add("hidden");
        }
      });
    });
  });

  React.useEffect(() => {
    async function fetchPolicies() {
      const response = await fetch(`/policies/${year}/policies.json`);
      const policies: Array<Policy> = await response.json();
      return policies;
    }

    const policies = fetchPolicies();
    setIsLoading(false);
    return () => { setDeferUntil(null) };
  }, [year]);

  return (
    <>
      <PolicyModal></PolicyModal>
      <PolicyTable isLoading={isLoading} dataset={tableDataset} />
      <footer>
        <p className="footerInfo" />
      </footer>
    </>
  )
}