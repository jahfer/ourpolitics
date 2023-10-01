import * as React from 'react'
import { useLanguage } from '../context/language-context'
import PolicyModal from './policy-modal'
import PolicyTable from './policy-table'
import { table } from 'console'

enum Party {
  Liberal = "Liberal",
  Conservative = "Conservative",
  NDP = "NDP",
  Green = "Green",
}

type Reference = {
  date?: string,
  publisher: string,
  title: string,
  url: string,
}

type Policy = {
  topic: string,
  party: Party,
  title: {
    en: string,
    fr: string
  },
  references: Array<Reference>,
  handle?: string
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
  const [tableDataset, setTableDataset] = React.useState(new Map());
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
        setIsLoading(false);
        // setTopicFilter(Array.from(dataset.keys()));
      }
    }

    fetchPolicies();
    return () => { ignore = true; };
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