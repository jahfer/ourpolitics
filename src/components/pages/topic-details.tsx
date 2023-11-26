import * as React from 'react'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';

interface TopicDetailsParams {
  topic: string;
}

export default function TopicDetails ({ topic }: TopicDetailsParams) {
  const { t } = useTranslation();
  return (
    <Page title={t(`topic.${topic}`)}>
      <section className="section">
        <article className="text-block text-large pb-3">

        </article>
      </section>
    </Page>
  )
}