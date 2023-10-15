import * as React from 'react'
import { useParams } from 'react-router-dom'
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'

import Page from 'components/page'

type PolicyComparisonIndexParams = {
  year?: string
}

export default function PolicyComparisonIndex () {
  console.log("PolicyComparisonIndex");
  const { year = "2019" } = useParams<PolicyComparisonIndexParams>();

  return (
    <Page title={year}>
      <section className="section">
        <PolicyComparisonTable year={year} />
      </section>
    </Page>
  )
}