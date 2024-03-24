import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'contexts/language-context'
import * as Analytics from 'support/analytics'

interface TopicSelectorProps {
  topics: Array<string>,
  onUpdate: (selections: Map<string, boolean>) => void,
}

export default function TopicSelector({ topics, onUpdate }: TopicSelectorProps) {
  const { t } = useTranslation();
  const [topicFilterState, setTopicFilterState] = useState(() => false);
  const [topicSelections, setTopicSelections] = React.useState(() => {
    return new Map(topics.map((topic) => [topic, true]))
  });

  React.useEffect(() => {
    const handler = () => {
      Analytics.recordEvent("topic_filter_close");
      setTopicFilterState(false);
    }
    document.body.addEventListener('click', handler);
    return () => document.body.removeEventListener('click', handler);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (topicFilterState) {
      Analytics.recordEvent("topic_filter_close");
    } else {
      Analytics.recordEvent("topic_filter_open");
    }
    setTopicFilterState(!topicFilterState);
  }

  const updateSelections = (selections: Map<string, boolean>) => {
    setTopicSelections(selections);
    onUpdate(selections);
  }

  return (
    <div onClick={handleClick}>
      {t("topics")}<i className={`fa fa-caret-${topicFilterState ? "down" : "left"} policyTableColumn--icon`}></i>
      <ul className={`policyTable--filterBar ${topicFilterState ? "policyTable--filterBar--open" : ""}`} onClick={e => e.stopPropagation()}>
        <li className="policyTable--filterBar--item policyTable--filterBar--toggleAll">
          {
            [...topicSelections.entries()].every(([_topic, checked]) => !checked) ? null : (
              <div className="policyTable--filterBar--toggle">
                <a href="#" onClick={(e) => { e.preventDefault(); updateSelections(new Map(topics.map((topic) => [topic, false]))) }}>{t("select_none")}</a>
              </div>
            )
          }
          {
            [...topicSelections.entries()].every(([_topic, checked]) => checked) ? null : (
              <div className="policyTable--filterBar--toggle">
                <a href="#" onClick={(e) => { e.preventDefault(); updateSelections(new Map(topics.map((topic) => [topic, true]))) }}>{t("select_all")}</a>
              </div>
            )
          }
        </li>
        {
          [...topicSelections.entries()].map(([topic, checked]) => {
            return (
              <li key={`filterBar--${topic}`} className="policyTable--filterBar--item policyTable--filterBar--topic" onClick={(e) => updateSelections(new Map(topicSelections.set(topic, !checked)))}>
                {t(`topic.${topic}`)}
                <input checked={checked} readOnly className="policyTable--filterBar--item--checkbox" type="checkbox" />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}