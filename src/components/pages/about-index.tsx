import * as React from 'react'
import { LanguageOption } from '../../types/schema'
import { useLanguage } from '../context/language-context'

import Page from '../page'
import { html as AboutEN } from './content/about_index.en.md'
import { html as AboutFR } from './content/about_index.fr.md'

export default function AboutIndex () {
  const language = useLanguage();
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (language === LanguageOption.EN) {
      setContent(AboutEN);
    } else {
      setContent(AboutFR);
    }
  }, [language]);

  return (
    <Page title="About">
      <section className="section">
        <article className="text-block text-large pb-3">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>
    </Page>
  )
}