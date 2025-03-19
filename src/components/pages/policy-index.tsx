import * as React from 'react'
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'
import { useTranslation } from 'contexts/language-context'
import Page from 'components/page'
import * as Policy from 'data/policy'
import { SelectedPartiesProvider } from 'contexts/selected-parties-context'
import {Banner, BannerType} from 'components/banner'

interface PolicyIndexParams {
  year: string,
  party?: string,
  policyHandle?: string,
}

export default function PolicyIndex (
  { year, party, policyHandle }: PolicyIndexParams
) {
  const { t } = useTranslation();

  const usingFilteredTopics = Policy.loadSelectedTopics(year).length > 0;

  return (
    <SelectedPartiesProvider>
      <Page title={year}>
        <section className="section">
          {
            usingFilteredTopics ?
              <span className="topic-change-hint">Click to change your topics</span>
            : null
          }

          <Banner type={BannerType.Warning}>
            {/* <div dangerouslySetInnerHTML={{ __html: t("banner.election_notice") }} /> */}
            <div dangerouslySetInnerHTML={{ __html: t("banner.work-in-progress") }} />
          </Banner>
          <PolicyComparisonTable year={year} selectedHandle={`${party}/${policyHandle}`} />
        </section>
      </Page>
    </SelectedPartiesProvider>
  )
}
