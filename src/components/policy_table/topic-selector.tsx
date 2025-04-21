import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'contexts/language-context'
import * as Analytics from 'support/analytics'
import { handleEnterAsClick } from 'support/util'
import SelectableList from 'components/system/selectable-list'

interface TopicSelectorProps {
  availableTopics: Array<string>,
  selectedTopics: Array<string>,
  title: string,
  className?: string,
  id?: string,
  onUpdate: (selections: Array<string>) => void,
}

export default function TopicSelector({
  availableTopics,
  onUpdate,
  title,
  id = "",
  className = "",
  selectedTopics
}: TopicSelectorProps) {
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    
    if ((event.target as Element).closest('.policyTable--filterBar')) {
      return; 
    }

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
        items={availableTopics}
        className={`list--light policyTable--filterBar ${topicFilterState ? "policyTable--filterBar--open" : ""}`}
        selections={new Map(availableTopics.map(t => [t, selectedTopics.includes(t)]))}
        onUpdate={(selections) => onUpdate(Array.from(selections.keys()).filter((topic) => selections.get(topic) === true))}
        onRender={(topic) => t(`topic.${topic}`)}
      />
    </div>
  )
}