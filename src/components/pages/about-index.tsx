import * as React from 'react'
import { useRemark } from 'react-remark'
import { LanguageOption } from '../../types/schema'
import { useLanguage } from '../context/language-context'

import Page from '../page'
import AboutContentEN from './content/about_index.en.md'
import AboutContentFR from './content/about_index.fr.md'

export default function AboutIndex () {
  const language = useLanguage();
  const [reactContent, setMarkdownSource] = useRemark();

  React.useEffect(() => {
    if (language === LanguageOption.EN) {
      setMarkdownSource(AboutContentEN);
    } else {
      setMarkdownSource(AboutContentFR);
    }
  }, [language]);

  console.log(reactContent);

  return (
    <Page title="About">
      <section className="section">
        <article className="text-block text-large pb-3">
          {reactContent}
        </article>
      </section>
    </Page>
  )
}