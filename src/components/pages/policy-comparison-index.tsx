import * as React from 'react'
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'

import Page from 'components/page'

interface PolicyComparisonIndexParams {
  year?: string,
  party?: string,
  policyHandle?: string,
}

export default function PolicyComparisonIndex (
  { year = "2019", party, policyHandle }: PolicyComparisonIndexParams
) {
  return (
    <Page title={year}>
      <section className="section">
        <PolicyComparisonTable year={year} selectedHandle={`${party}/${policyHandle}`} />
      </section>
    </Page>
  )
}