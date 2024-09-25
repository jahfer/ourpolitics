import * as React from 'react'
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'
// import PolicyComparisonSummary from 'components/policy-comparison-summary'
import Banner from 'components/banner'
import { useTranslation } from 'contexts/language-context'
import Page from 'components/page'

interface PolicyComparisonIndexParams {
  year?: string,
  party?: string,
  policyHandle?: string,
}

export default function PolicyComparisonIndex (
  { year = "2019", party, policyHandle }: PolicyComparisonIndexParams
) {
  const { t } = useTranslation()

  return (
    <Page title={year}>
      <section className="section">
        {/* <Banner>
          <div dangerouslySetInnerHTML={{ __html: t("election_notice") }} />
        </Banner> */}
        <PolicyComparisonTable year={year} selectedHandle={`${party}/${policyHandle}`} />
      </section>
    </Page>
  )
}