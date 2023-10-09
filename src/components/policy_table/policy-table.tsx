import * as React from 'react'
import { useLanguage, useTranslation } from '../context/language-context'
import PolicyRow from './policy-row'
import { Party, Policy } from '../../types/schema'

// https://stackoverflow.com/a/2450976
function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

interface PolicyTableProps {
  dataset: Map<string, Array<Policy>>;
  parties: Set<Party>;
}

export default function PolicyTable ({ dataset, parties }: PolicyTableProps) {
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>();
  const language = useLanguage();
  const { t } = useTranslation();

  const sortedParties = React.useMemo(() => shuffle(Array.from(parties)), [parties]);

  React.useEffect(() => {
    let elTop = 0;

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

  const tableHeader = React.useMemo(() => {
    return (
      <>
        <div id="policyTableColumn--topics" className="policyCell partyTitle backgroundColor--Empty">
          {t("topics")}
        </div>
        {
          sortedParties.map((party) => {
            return (
              <div
                key={`partyTitle--${party}`}
                id={`policyTableColumn--${party}`}
                className={`policyCell partyTitle backgroundColor--${party}`}>
                {t(party.toLowerCase())}
              </div>
            )
          })
        }
      </>
    )
  }, [language, sortedParties]);

  React.useMemo(() => {
    let rows = Array.from(dataset, ([topic, policies]) => {
      return (
        <PolicyRow
          topic={topic}
          parties={sortedParties}
          policies={policies}
          key={topic} />
      )
    });

    setPolicyRows(rows);
  }, [sortedParties, dataset]);

  return (
    <div className="policyTable">
      <div id="tableHeader" className="policyRow container tableHeader">
        <div className="policyCells"> {tableHeader} </div>
      </div>
      <div id="tableFiller" className="policyRow container tableFiller hidden"></div>
      <div>
        { policyRows }
      </div>
    </div>
  )
}