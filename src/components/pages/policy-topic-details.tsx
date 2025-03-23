import * as React from 'react'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';
import PolicyComparisonSummary from 'components/policy-comparison-summary';
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'
import { SelectedPartiesProvider } from 'contexts/selected-parties-context'

interface TopicDetailsParams {
  year: string;
  topic: string;
}

export default function PolicyTopicDetails ({ year, topic }: TopicDetailsParams) {
  const { t } = useTranslation();
  const [hasDataFor2025, setHasDataFor2025] = React.useState<boolean>(true);
  const [hasDataFor2021, setHasDataFor2021] = React.useState<boolean>(true);
  const [hasDataFor2019, setHasDataFor2019] = React.useState<boolean>(true);
  const [hasDataFor2015, setHasDataFor2015] = React.useState<boolean>(true);

  return (
    <SelectedPartiesProvider>
      <Page title={t(`topic.${topic}`)}>
        <section className="section flex flex-row flex-wrap gap-3">
          <article className="policy-comparison-summary text-block flex-1">
            <h2>{t('policy_comparison.analysis')}</h2>
            <PolicyComparisonSummary topic={topic} year={year} />
          </article>
          
          <aside className="flex-2">
          { 
              hasDataFor2025 &&
              <div>
                <h2>{t('policy_comparison_title', 2025)}</h2>
                <PolicyComparisonTable
                  year={"2025"}
                  canFilterTopics={false}
                  floatingHeader={false}
                  selectedTopics={[topic]}
                  hideHeader={false}
                  renderEmpty={() => null}
                  onEmpty={(() => setHasDataFor2025(false))} />
              </div>
            }

            {/* TODO: Hide other tables under a button that un-collapses them to make them visible */}
            {/* TODO: Visible parties is not dictated by 2025! */}
            {/* TODO: Handle modal close state properly, instead of redirecting to / */}

            { 
              hasDataFor2021 &&
              <div>
                <h2>{t('policy_comparison_title', 2021)}</h2>
                <PolicyComparisonTable
                  year={"2021"}
                  canFilterTopics={false}
                  floatingHeader={false}
                  selectedTopics={[topic]}
                  hideHeader={true}
                  renderEmpty={() => null}
                  onEmpty={(() => setHasDataFor2021(false))} />
              </div>
            }
            { 
              hasDataFor2019 &&
              <div>
                <h2>{t('policy_comparison_title', 2019)}</h2>
                <PolicyComparisonTable
                  year={"2019"}
                  canFilterTopics={false}
                  floatingHeader={false}
                  selectedTopics={[topic]}
                  hideHeader={true}
                  renderEmpty={() => null}
                  onEmpty={(() => setHasDataFor2019(false))} />
              </div>
            }
            { 
              hasDataFor2015 &&
              <div>
                <h2>{t('policy_comparison_title', 2015)}</h2>
                <PolicyComparisonTable
                  year={"2015"}
                  canFilterTopics={false}
                  floatingHeader={false}
                  selectedTopics={[topic]}
                  hideHeader={true}
                  renderEmpty={() => null}
                  onEmpty={(() => setHasDataFor2015(false))} />
              </div>
            }
          </aside>
        </section>
      </Page>
    </SelectedPartiesProvider>
  )
}
