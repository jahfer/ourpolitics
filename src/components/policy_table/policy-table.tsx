import * as React from 'react'
import { useState } from 'react'
import { useLanguage, useTranslation } from 'contexts/language-context'
import PolicyRow from './policy-row'
import { Party, Policy } from 'types/schema'

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
  const { t } = useTranslation();
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>([]);
  const [topicFilterState, setTopicFilterState] = useState(() => false);

  const sortedParties = React.useMemo(() => shuffle(Array.from(parties)), [parties]);
  const topics = React.useMemo(() => Array.from(dataset.keys()), [dataset]);
  const [topicSelections, setTopicSelections] = React.useState(() => {
    return new Map(topics.map((topic) => [topic, true]))
  });

  let elTop = 0;

  React.useEffect(() => {
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    let initialHeaderTop = $tableHeader.getBoundingClientRect().top;
    let initialBodyTop = document.body.getBoundingClientRect().top;
    elTop = initialHeaderTop - initialBodyTop;
  }, []);

  React.useEffect(() => {
    const handler = () => setTopicFilterState(false);
    document.body.addEventListener('click', handler);
    return () => document.body.removeEventListener('click', handler);
  }, []);

  React.useEffect(() => {
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    window.addEventListener("scroll", () => {
      const $tableFiller = document.getElementById("tableFiller") as HTMLElement;
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
  }, [elTop]);

  React.useMemo(() => {
    let rows = Array.from(dataset, ([topic, policies]) => {
      if (!topicSelections.get(topic)) {
        return null;
      } else {
        return (
          <PolicyRow
            topic={topic}
            parties={sortedParties}
            policies={policies}
            key={topic} />
        )
      }
    });

    setPolicyRows(rows.filter(x => x) as Array<React.JSX.Element>);
  }, [sortedParties, dataset, topicSelections]);

  return (
    <div className="policyTable">
      <div id="tableHeader" className="policyRow container tableHeader">
        <div className="policyCells">
          <div id="policyTableColumn--topics" className="policyCell partyTitle backgroundColor--Empty" onClick={(e) => { e.stopPropagation(); setTopicFilterState(!topicFilterState) }}>
            {t("topics")}<i className={`fa fa-caret-${topicFilterState ? "down" : "left"} policyTableColumn--icon`}></i>
            <ul className={`policyTable--filterBar ${topicFilterState ? "policyTable--filterBar--open" : ""}`} onClick={e => e.stopPropagation()}>
              <li className="policyTable--filterBar--item policyTable--filterBar--toggleAll">
                {
                  [...topicSelections.entries()].every(([_topic, checked]) => !checked) ? null : (
                    <div className="policyTable--filterBar--toggle">
                      <a href="#" onClick={(e) => { e.preventDefault(); setTopicSelections(new Map(topics.map((topic) => [topic, false]))) }}>{t("select_none")}</a>
                    </div>
                  )
                }
                {
                  [...topicSelections.entries()].every(([_topic, checked]) => checked) ? null : (
                    <div className="policyTable--filterBar--toggle">
                      <a href="#" onClick={(e) => { e.preventDefault(); setTopicSelections(new Map(topics.map((topic) => [topic, true]))) }}>{t("select_all")}</a>
                    </div>
                  )
                }
              </li>
              {
                [...topicSelections.entries()].map(([topic, checked]) => {
                  return (
                    <li key={`filterBar--${topic}`} className="policyTable--filterBar--item policyTable--filterBar--topic" onClick={(e) => setTopicSelections(new Map(topicSelections.set(topic, !checked)))}>
                      {t(`topic.${topic}`)}
                      <input checked={checked} readOnly className="policyTable--filterBar--item--checkbox" type="checkbox" />
                    </li>
                  )
                })
              }
            </ul>
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
        </div>
      </div>
      <div id="tableFiller" className="policyRow container tableFiller hidden"></div>
      <div>
        {
          (policyRows.length == 0)
          ? <div className="policyTable--empty">{t("no_topics_selected")}</div>
          : policyRows
        }
      </div>
    </div>
  )
}