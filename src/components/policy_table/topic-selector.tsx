import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'contexts/language-context'
import * as Analytics from 'support/analytics'
import { handleEnterAsClick } from 'support/util'

interface TopicOptionProps {
  name: string,
  checked: boolean,
  className: string,
  onToggle: () => void,
}

function TopicOption({name, checked, className, onToggle}: TopicOptionProps) {
  const { t } = useTranslation();

  return (
    <li key={`filterBar--${name}`}>
      <label className={className} onKeyDown={handleEnterAsClick}>
        {t(`topic.${name}`)}
        <input checked={checked} onChange={onToggle} type="checkbox" />
      </label>
    </li>
  )
}

interface TopicSelectorProps {
  topics: Array<string>,
  title: string,
  className?: string,
  id?: string,
  onUpdate: (selections: Map<string, boolean>) => void,
  selections: Map<string, boolean>,
}

export default function TopicSelector({ topics, onUpdate, title, id = "", className = "", selections }: TopicSelectorProps) {
  const { t } = useTranslation();
  const [topicFilterState, setTopicFilterState] = useState(() => false);
  const [topicSelections, setTopicSelections] = React.useState(selections);

  React.useEffect(() => {
    const handler = () => {
      if (topicFilterState) {
        Analytics.recordEvent("topic_filter_close");
      }
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
    <div
      role="navigation"
      aria-label="Filter topics"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleEnterAsClick}
      id={id}
      className={`${className} ${(topicFilterState ? "topicSelector--open" : "topicSelector--closed")}`}>
      {title}<i className={`fa fa-caret-${topicFilterState ? "down" : "left"} policyTableColumn--icon`}></i>
      <ul className={`policyTable--filterBar ${topicFilterState ? "policyTable--filterBar--open" : ""}`} onClick={e => e.stopPropagation()}>
        <li className="policyTable--filterBar--item policyTable--filterBar--toggleAll">
          {
            [...topicSelections.entries()].every(([_topic, checked]) => checked) ? null : (
              <div className="policyTable--filterBar--toggle">
                <a href="#" onKeyDown={handleEnterAsClick} onClick={(e) => { e.preventDefault(); updateSelections(new Map(topics.map((topic) => [topic, true]))) }}>{t("select_all")}</a>
              </div>
            )
          }
          {
            [...topicSelections.entries()].every(([_topic, checked]) => !checked) ? null : (
              <div className="policyTable--filterBar--toggle">
                <a href="#" onKeyDown={handleEnterAsClick} onClick={(e) => { e.preventDefault(); updateSelections(new Map(topics.map((topic) => [topic, false]))) }}>{t("select_none")}</a>
              </div>
            )
          }
        </li>
        {
          [...topicSelections.entries()].map(([topic, checked]) => {
            return (
              <TopicOption
                name={topic}
                key={topic}
                className="policyTable--filterBar--item policyTable--filterBar--topic"
                checked={checked}
                onToggle={() => updateSelections(new Map(topicSelections.set(topic, !checked)))} />
            )
          })
        }
      </ul>
    </div>
  )
}