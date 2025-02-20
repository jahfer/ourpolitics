import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import PolicyRow from './policy-row'
import TopicSelector from './topic-selector'
import { Party } from 'types/schema'
import * as Policy from 'data/policy'

interface PolicyTableProps {
  dataset: Map<string, Array<Policy.T>>;
  year: string;
  selectedParties: Set<Party>;
  availableTopics: Array<string>;
  selectedTopics: Array<string>;
  onTopicSelectionsUpdate: (selections: Array<string>) => void;
  enableTopicFilter: boolean;
  enableFloatingHeader: boolean;
  hideHeader?: boolean;
}

export default function PolicyTable ({
  dataset,
  year,
  selectedParties,
  availableTopics,
  selectedTopics,
  onTopicSelectionsUpdate,
  enableTopicFilter,
  enableFloatingHeader,
  hideHeader = false
}: PolicyTableProps) {
  const { t } = useTranslation();
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>([]);

  let elTop = 0;

  React.useEffect(() => {
    if (!enableFloatingHeader) return;

    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    let initialHeaderTop = $tableHeader.getBoundingClientRect().top;
    let initialBodyTop = document.body.getBoundingClientRect().top;
    elTop = initialHeaderTop - initialBodyTop;
  }, []);

  React.useEffect(() => {
    if (!enableFloatingHeader) return;

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
    let rows = Array.from(dataset).map(([topic, policies]) => {
      if (selectedTopics.indexOf(topic) == -1) {
        return null;
      } else {
        return (
          <PolicyRow
            topic={topic}
            year={year}
            parties={Array.from(selectedParties)}
            policies={policies}
            key={topic} 
            displayTopic={enableTopicFilter}/>
        )
      }
    });

    setPolicyRows(rows.filter(x => x) as Array<React.JSX.Element>);
  }, [selectedParties, dataset, selectedTopics]);

  const topicTitle = t("topics") + ((availableTopics.length > selectedTopics.length) ? "*" : "");

  return (
    <div className="policyTable">
      {
        !hideHeader && (
          <>
            <div id="tableHeader" className="policyRow container tableHeader flex flex-grow-0">
              <div className="policyCells">
                {
                  enableTopicFilter ?
                    (
                      <TopicSelector
                        key={`topicSelector--${availableTopics}`}
                        id="policyTableColumn--topics" 
                        className="policyCell partyTitle backgroundColor--Empty"
                        title={topicTitle}
                        availableTopics={availableTopics}
                        selectedTopics={selectedTopics}
                        onUpdate={onTopicSelectionsUpdate} />
                    ) : null
                }
                {
                  Array.from(selectedParties).map((party) => {
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
          </>
        )
      }
      {
        enableTopicFilter ?
          <TopicSelector
            key={`topicSelector--${availableTopics}`}
            title={t("guide.whats_important_to_you")}
            availableTopics={availableTopics}
            selectedTopics={selectedTopics}
            className="policyTable--mobileFilter"
            onUpdate={onTopicSelectionsUpdate} />
          : null
      }
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