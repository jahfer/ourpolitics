import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import Page from 'components/page'
import * as Policy from 'data/policy'
import { handleEnterAsClick } from 'support/util'
import '../../styles/guide.css'

interface GuidedPolicyIndexParams {
  year: string,
}

export default function GuidedPolicyIndex (
  { year }: GuidedPolicyIndexParams
) {
  const { t } = useTranslation()
  const [topics, setTopics] = React.useState<Map<string, boolean>>(() => new Map());

  React.useEffect(() => {
    let ignore = false;

    async function fetchPolicies() {
      const policies = await Policy.byYear(year);
      if (!ignore) {
        const dataset = Policy.toDataset(policies);
        const topics = Policy.topicsInDataset(dataset);
        const topicSelections = new Map(topics.map((topic) => [topic, false]));
        setTopics(topicSelections);
      }
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year])

  return (
    <Page title={`${year} Guide`}>
      <section className="section">
        <div className="container guide">
          <h1>What's important to you?</h1>
          <ul className="guide--topic-selector">
            {
              [...topics.entries()].map(([topic, checked]) => (
                <li key={topic} className={`guide--topic-selector-item ${checked ? 'guide--topic-selector-item-checked' : ''}`}>
                  <label>
                    {t(`topic.${topic}`)}
                    <input
                      checked={checked}
                      type="checkbox"
                      onKeyDown={handleEnterAsClick}
                      onChange={() => {
                        setTopics(new Map(topics.set(topic, !checked)));
                      }}
                    />
                  </label>
                </li>
              ))
            }
          </ul>
          <button onClick={() => {
            const selectedTopics = [...topics.entries()].filter(([topic, checked]) => checked).map(([topic, checked]) => topic);
            console.log(selectedTopics);
          }}>
            Submit
          </button>
        </div>
      </section>
    </Page>
  )
}