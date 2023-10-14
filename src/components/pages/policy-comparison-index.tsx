import * as React from 'react'
import { useParams } from 'react-router-dom'
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'

import Page from 'components/page'

type PolicyComparisonIndexParams = {
  year?: string,
  policyHandle?: string,
}

export default function PolicyComparisonIndex () {
  const { year = "2019", policyHandle } = useParams<PolicyComparisonIndexParams>();

  return (
    <Page title={year}>
      <section className="section">
        { policyHandle ? (
          <PolicyComparisonTable policyHandle={policyHandle} year={year} />
        ) : (
          <PolicyComparisonTable year={year} />
        )}
      </section>
    </Page>
  )
}