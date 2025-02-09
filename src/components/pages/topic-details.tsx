import * as React from 'react'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';
import * as Policy from 'data/policy';
import * as Util from 'support/util';
import PolicyCell from 'components/policy_table/policy-cell';
import PolicyComparisonSummary from 'components/policy-comparison-summary';
import PolicyComparisonTable from 'components/policy_table/policy-comparison-table'

interface TopicDetailsParams {
  year: string;
  topic: string;
}

export default function TopicDetails ({ year, topic }: TopicDetailsParams) {
  const { t } = useTranslation();
  const [policyCells, setPolicyCells] = React.useState<Array<React.JSX.Element>>([]);

  const topicMap = new Map<string, boolean>([[topic, true]]);
  Policy.saveSelectedTopics(year, topicMap); // HACK: This should not be persisted!

  // React.useEffect(() => {
  //   let ignore = false;

  //   async function loadAll() {
  //     const policies = await Policy.all();
  //     if (!ignore) {
  //       const policiesForTopic = policies.filter((policy) => policy.topic === topic);
  //       const parties = Array.from(new Set(policiesForTopic.map((policy) => policy.party)));
  //       const sortedParties = Util.shuffle(parties);

  //       const policyCells = parties.map((party) => {
  //         const partyPolicies = policiesForTopic.filter((policy) => policy.party === party)
  //         return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
  //       });

  //       setPolicyCells(policyCells);
  //     }
  //   }

  //   loadAll();
  //   return () => { ignore = true; };
  // }, [topic]);

  return (
    <Page title={t(`topic.${topic}`)}>
      <section className="section">
        <PolicyComparisonTable year={year} canFilterTopics={false} floatingHeader={false} />
        <article className="text-block text-large pb-3">
          {/* {policyCells} */}
          <PolicyComparisonSummary topic={topic} />
        </article>
      </section>
    </Page>
  )
}