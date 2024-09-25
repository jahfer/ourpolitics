import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/language-context'
import * as Policy from 'data/policy'
import { Link } from 'components/system/link'

interface PolicyComparisonSummaryParams {
  topic: string
}

export default function PolicyComparisonSummary ({ topic }: PolicyComparisonSummaryParams) {
  const { t } = useTranslation()
  const [summaries, setSummaries] = useState<Record<number, string>>({})

  useEffect(() => {
    async function fetchPolicies() {
      const policies = await Policy.all()
      const yearSummaries: Record<number, string> = {}

      policies
        .filter(policy => policy.topic === topic)
        .forEach(policy => {
          if (!yearSummaries[policy.year]) {
            yearSummaries[policy.year] = ''
          }
          yearSummaries[policy.year] += `${policy.party}: ${policy.title.EN}. `
        })

      setSummaries(yearSummaries)
    }

    fetchPolicies()
  }, [topic])

  const static_summary =
    <div>
      <p>The Conservative Party proposes two key education and training initiatives. First, they aim to offer low-interest loans of up to $10,000 for individuals seeking additional training in skilled trades. Second, they plan to allow new parents to qualify for parental leave income when starting a home-based business, potentially easing the transition into entrepreneurship for new families.</p>
      <p>The Liberal Party has put forward several proposals focused on student debt relief and education affordability. They plan to remove interest on Canada Student Loans and Canada Apprentice Loans, and increase the threshold for repayment assistance on federal student loans to $40,000 for borrowers living alone. To improve access to education, they propose allowing individuals to use their current year's income for Canada Student Grant eligibility and increasing the student wage subsidy to $7,500 per student. Additionally, they aim to increase the Eligible Educator School Supply tax credit to support teachers.</p>
      <p>The New Democratic Party (NDP) presents the most far-reaching proposals for education reform. Their long-term goal is to work towards making post-secondary education public, effectively free for students. In the shorter term, they propose stopping the issuance of federal student loans and doubling Canada Student Grants. To support workers pursuing education, the NDP suggests changing Employment Insurance (EI) rules to allow workers who quit their jobs to go to school to qualify for EI benefits. Lastly, they propose requiring large employers to invest at least 1% of their payroll annually in training for their employees, aiming to boost workforce development.</p>
    </div>

  return (
    <div className="policy-comparison-summary">
      <h2>{t('policy_comparison_summary')}</h2>
      {Object.entries(summaries)
        .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
        .map(([year, _summary]) => (
        <div key={year} className="year-summary">
          <h3>{year}</h3>
          <p>{static_summary}</p>
          <Link to={`/policies/${year}`}>{t('view_full_comparison')} →</Link>
        </div>
      ))}
    </div>
  )
}