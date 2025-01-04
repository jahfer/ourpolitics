import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'contexts/language-context'
import * as Analytics from 'support/analytics'
import { handleEnterAsClick } from 'support/util'
import SelectableList from 'components/system/selectable-list'

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
      <SelectableList<string>
        items={topics}
        className={`policyTable--filterBar ${topicFilterState ? "policyTable--filterBar--open" : ""}`}
        selections={selections}
        onUpdate={onUpdate}
        onRender={(topic) => t(`topic.${topic}`)}
      />
    </div>
  )
}