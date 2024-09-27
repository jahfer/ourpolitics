import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import Page from 'components/page'
import * as Policy from 'data/policy'
import { handleEnterAsClick } from 'support/util'
import { Button } from 'components/system/button'
import { useURL } from 'contexts/router-context'
import { setItem } from 'data/storage'
import '../../styles/guide.css'
import { Link } from 'components/system/link'

interface GuidedPolicyIndexParams {
  year: string,
}

export default function GuidedPolicyIndex (
  { year }: GuidedPolicyIndexParams
) {
  const { t } = useTranslation()
  const { setURL } = useURL()
  const [topics, setTopics] = React.useState<Map<string, boolean>>(() => new Map());

  React.useEffect(() => {
    let ignore = false;

    async function fetchPolicies() {
      const policies = await Policy.byYear(year);
      if (!ignore) {
        const dataset = Policy.toDataset(policies);
        const topicsInDataset = Policy.topicsInDataset(dataset);
        const selectedTopics = Policy.loadSelectedTopics(year);

        const selectionState = selectedTopics.length > 0 ?
          (topic: string) => selectedTopics.includes(topic) :
          () => false;

        const topicSelections = new Map(
          topicsInDataset.map((topic) => [topic, selectionState(topic)])
        );
        setTopics(topicSelections);
      }
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year])

  return (
    <Page title={t("guide.title", year)}>
      <section className="section">
        <div className="container guide">
          <h1>{t("guide.whats_important_to_you")}</h1>
          <ul className="guide--topic-selector">
            {
              [...topics.entries()].map(([topic, checked]) => (
                <li key={topic}>
                  <label className={`guide--topic-selector-item ${checked ? 'guide--topic-selector-item-checked' : ''}`}>
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
          <div className="guide--submit-actions">
            <Button primary onClick={() => {
              const selectedTopics = [...topics.entries()]
                .filter(([_topic, checked]) => checked)
                .map(([topic, _checked]) => topic);
              Policy.saveSelectedTopics(year, selectedTopics);
              setItem("has-visited-guide", true, "local");
              setURL({}, '/policies/2021');
            }}>
              {t("guide.lets_go")}&nbsp;<span style={{fontFamily: "system-ui"}}>&rarr;</span>
            </Button><p> {t("guide.or")} <Link to="/policies/2021"
                                          onClick={() => {
                                            setItem("has-visited-guide", true, "local");
                                            Policy.resetSelectedTopics(year)
                                          }}>{t("guide.see_all_policies")}</Link></p>
          </div>
        </div>
      </section>
    </Page>
  )
}