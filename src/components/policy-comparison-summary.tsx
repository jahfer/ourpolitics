import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import { Link } from 'components/system/link'

interface PolicyComparisonSummaryParams {
  topic: string,
  year: string,
}

export default function PolicyComparisonSummary ({ topic, year }: PolicyComparisonSummaryParams) {
  const { t } = useTranslation()

  const static_summary =
    <div>
      <p>The Conservative Party proposes two key education and training initiatives. First, they aim to offer low-interest loans of up to $10,000 for individuals seeking additional training in skilled trades. Second, they plan to allow new parents to qualify for parental leave income when starting a home-based business, potentially easing the transition into entrepreneurship for new families.</p>
      <p>The Liberal Party has put forward several proposals focused on student debt relief and education affordability. They plan to remove interest on Canada Student Loans and Canada Apprentice Loans, and increase the threshold for repayment assistance on federal student loans to $40,000 for borrowers living alone. </p>
      <p>The New Democratic Party (NDP) presents the most far-reaching proposals for education reform. Their long-term goal is to work towards making post-secondary education public, effectively free for students. In the shorter term, they propose stopping the issuance of federal student loans and doubling Canada Student Grants.</p>
    </div>

  return (
    <div className="policy-comparison-summary">
      {static_summary}
      <Link className='btn btn-primary' to={`/policies/${year}`}>{t('view_full_comparison')} →</Link>
    </div>
  )
}