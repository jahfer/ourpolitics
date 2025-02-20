import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import { Link } from 'components/system/link'
import { Icon, IconInlinePosition } from 'components/system/icon'

interface PolicyComparisonSummaryParams {
  topic: string,
  year: string,
}

export default function PolicyComparisonSummary ({ topic, year }: PolicyComparisonSummaryParams) {
  const { t } = useTranslation()

  const static_summary =
    <div>
      <p>The affordability proposals from the three major parties reflect distinct approaches to addressing cost-of-living challenges. The NDP’s policies are the most comprehensive, focusing on systemic reforms to essential services like telecommunications and fuel, with an emphasis on regulation and consumer protection. In contrast, the Liberal Party’s measures are more targeted, offering temporary relief to specific groups, such as young families and remote workers, through debt deferrals and tax deductions. The Conservative Party’s lack of specific affordability policies stands out, potentially signaling a reliance on broader economic strategies or a focus on other priorities.</p>
      <p>The NDP’s approach appeals to voters seeking immediate and tangible reductions in monthly expenses, while the Liberals’ policies cater to families and homeowners facing unique financial pressures. The Conservatives’ silence on affordability may alienate voters looking for direct solutions to rising costs. Ultimately, the proposals highlight a philosophical divide: the NDP advocates for aggressive state intervention, the Liberals prioritize targeted support, and the Conservatives remain ambiguous, leaving their stance on affordability open to interpretation.</p>
    </div>

  return (
    <div className="policy-comparison-summary--content">
      {static_summary}
      <Link className='btn btn-primary flex flex-justify-between flex-baseline' to={`/policies/${year}`}>{t('view_full_comparison')} <Icon name="arrow-right" inline={IconInlinePosition.Right} /></Link>
    </div>
  )
}