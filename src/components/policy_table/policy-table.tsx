import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import PolicyRow from './policy-row'
import TopicSelector from './topic-selector'
import { Party } from 'types/schema'
import * as Policy from 'data/policy'
import * as Util from 'support/util'

interface PolicyTableProps {
  dataset: Map<string, Array<Policy.T>>;
  parties: Set<Party>;
  year: string;
}

export default function PolicyTable ({ dataset, parties, year }: PolicyTableProps) {
  const { t } = useTranslation();
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>([]);

  const sortedParties = React.useMemo(() => Util.shuffle(Array.from(parties)), [parties]);
  const topics = React.useMemo(() => Policy.topicsInDataset(dataset), [dataset]);
  const [topicSelections, setTopicSelections] = React.useState<Map<string, boolean>>(new Map());

  const setAndPersistTopicSelections = (selections: Map<string, boolean>) => {
    setTopicSelections(selections);
    if (Array.from(selections.values()).every(value => value === true)) {
      Policy.resetSelectedTopics(year);
    } else {
      Policy.saveSelectedTopics(year, selections);
    }
  }

  React.useMemo(() => {
    const selectedTopics = Policy.loadSelectedTopics(year);
    if (selectedTopics.length > 0) {
      setTopicSelections(new Map(topics.map((topic) => [topic, selectedTopics.includes(topic)])));
    } else {
      setTopicSelections(new Map(topics.map((topic) => [topic, true])));
    }
  }, [topics, year]);

  let elTop = 0;

  React.useEffect(() => {
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    let initialHeaderTop = $tableHeader.getBoundingClientRect().top;
    let initialBodyTop = document.body.getBoundingClientRect().top;
    elTop = initialHeaderTop - initialBodyTop;
  }, []);

  React.useEffect(() => {
    let ignore = false;
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    const handler = () => {
      if (ignore) return;
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
    };

    window.addEventListener('scroll', handler);
    return () => {
      ignore = true;
      document.body.removeEventListener('scroll', handler);
    }
  }, [elTop]);

  React.useMemo(() => {
    let rows = Array.from(dataset.entries())
      .sort(([topicA], [topicB]) => topicA.localeCompare(topicB))
      .map(([topic, policies]) => {
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


  const topicTitle = t("topics") + (Array.from(topicSelections.values()).find(x => !x) === false ? "*" : "")

  return (
    <div className="policyTable">
      <div id="tableHeader" className="policyRow container tableHeader">
        <div className="policyCells">
          <TopicSelector
            key={`topicSelector--${topics}`}
            id="policyTableColumn--topics"
            className="policyCell partyTitle backgroundColor--Empty"
            title={topicTitle}
            topics={topics}
            selections={topicSelections}
            onUpdate={(selections) => setAndPersistTopicSelections(selections)} />
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
      <TopicSelector
        key={`topicSelector--${topics}`}
        title={topicTitle}
        topics={topics}
        selections={topicSelections}
        className="policyTable--mobileFilter"
        onUpdate={(selections) => setAndPersistTopicSelections(selections)} />
      <div className="policyRows">
        {
          (policyRows.length == 0)
          ? <div className="policyTable--empty">{t("no_topics_selected")}</div>
          : policyRows
        }
      </div>
    </div>
  )
}