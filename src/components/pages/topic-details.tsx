import * as React from 'react'
import { useParams } from 'react-router-dom'
import Page from 'components/page'
import { useTranslation } from 'contexts/language-context';

type TopicDetailsParams = {
  topic: string;
}

export default function TopicDetails () {
  const { topic } = useParams<TopicDetailsParams>() as TopicDetailsParams;
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