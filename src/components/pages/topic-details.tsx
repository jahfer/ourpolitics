import * as React from 'react'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';
import * as Policy from 'data/policy';
import * as Util from 'support/util';
import PolicyCell from 'components/policy_table/policy-cell';
import {
  Card,
  CardPrimaryContent,
  CardAside,
  CardBreadcrumb,
  CardHeading,
  HeadingLevel,
  CardLinkList
} from 'components/system/card';

interface TopicDetailsParams {
  topic: string;
}

export default function TopicDetails ({ topic }: TopicDetailsParams) {
  const { t } = useTranslation();
  const [policyCells, setPolicyCells] = React.useState<Array<React.JSX.Element>>([]);

  React.useEffect(() => {
    let ignore = false;

    async function loadAll() {
      const policies = await Policy.all();
      if (!ignore) {
        const policiesForTopic = policies.filter((policy) => policy.topic === topic);
        const parties = Array.from(new Set(policiesForTopic.map((policy) => policy.party)));
        const sortedParties = Util.shuffle(parties);

        const policyCells = parties.map((party) => {
          const partyPolicies = policiesForTopic.filter((policy) => policy.party === party)
          return <PolicyCell party={party} topic={topic} policies={partyPolicies} key={`${party}/${topic}`} />
        });

        setPolicyCells(policyCells);
      }
    }

    loadAll();
    return () => { ignore = true; };
  }, [topic]);

  return (
    <Page title={t(`topic.${topic}`)}>
      <section className="section">
        <article className="text-block text-large pb-3">
          {policyCells}
          {/* <Card direction='column'>
            <CardPrimaryContent compact={true}>
              <CardBreadcrumb text="Breadcrumb" />
              <CardHeading level={HeadingLevel.H1} text="Hello world!" />
            </CardPrimaryContent>
            <CardAside title="Sidebar title">
              Wheeeee
            </CardAside>
          </Card> */}
        </article>
      </section>
    </Page>
  )
}