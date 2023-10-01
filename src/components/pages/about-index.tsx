import * as React from 'react'
import { useRemark } from 'react-remark'
import { Language } from '../../types/schema'
import { useLanguage } from '../context/language-context'

import AboutContentEN from './content/about_index.en.md'
import AboutContentFR from './content/about_index.fr.md'

export default function AboutIndex () {
  const language = useLanguage();
  const [reactContent, setMarkdownSource] = useRemark();

  React.useEffect(() => {
    if (language === Language.EN) {
      setMarkdownSource(AboutContentEN);
    } else {
      setMarkdownSource(AboutContentFR);
    }
  }, [language]);

  console.log(reactContent);

  return (
    <section className="section">
      <article className="text-block text-large pb-3">
        {reactContent}
      </article>
    </section>
  )
}