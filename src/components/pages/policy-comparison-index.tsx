import * as React from 'react'
import { useParams } from 'react-router-dom'
import PolicyComparisonTable from '../policy_table/policy-comparison-table'

type PolicyComparisonIndexParams = {
  year?: string,
  policyHandle?: string,
}

export default function PolicyComparisonIndex () {
  const { year = "2019", policyHandle } = useParams<PolicyComparisonIndexParams>();

  return (
    <section>
      { policyHandle ? (
        <PolicyComparisonTable policyHandle={policyHandle} year={year} />
      ) : (
        <PolicyComparisonTable year={year} />
      )}
    </section>
  )
}