import * as React from 'react'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';
import PolicyComparisonSummary from 'components/policy-comparison-summary';
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'

interface TopicDetailsParams {
  year: string;
  topic: string;
}

export default function TopicDetails ({ year, topic }: TopicDetailsParams) {
  const { t } = useTranslation();

  // TODO: Track history of this page to make back/forwards work properly (also Guide history is janky too)

  const topicMap = new Map<string, boolean>([[topic, true]]);

  return (
    <Page title={t(`topic.${topic}`)}>
      <section className="section flex flex-row flex-wrap gap-3">
        <article className="text-block flex-1">
          <h2>{t('policy_comparison.analysis')}</h2>
          <PolicyComparisonSummary topic={topic} year={year} />
        </article>

        {/* TODO: Settings no longer work when multiple components sharing the same setting are rendered... */}
        {/* ALSO TODO: Hide other tables under a button that un-collapses them to make them visible */}
        <aside className="flex-2">
          <div>
            <h2>{t('policy_comparison_title', 2021)}</h2>
            <PolicyComparisonTable year={"2021"} canFilterTopics={false} floatingHeader={false} selectedTopics={topicMap} hideHeader={false} />
          </div>
          <div>
            <h2>{t('policy_comparison_title', 2019)}</h2>
            <PolicyComparisonTable year={"2019"} canFilterTopics={false} floatingHeader={false} selectedTopics={topicMap} hideHeader={true} />
          </div>
          <div>
            <h2>{t('policy_comparison_title', 2015)}</h2>
            <PolicyComparisonTable year={"2015"} canFilterTopics={false} floatingHeader={false} selectedTopics={topicMap} hideHeader={true} />
          </div>
        </aside>
      </section>
    </Page>
  )
}