import * as React from 'react'
import { useRemark } from 'react-remark'
import { LanguageOption } from '../../types/schema'
import { useLanguage } from '../context/language-context'

import Page from '../page'

import PrivacyPolicyContentEN from './content/privacy_index.en.md'
import PrivacyPolicyContentFR from './content/privacy_index.fr.md'

export default function PrivacyPolicyIndex () {
  const language = useLanguage();
  const [reactContent, setMarkdownSource] = useRemark();

  React.useEffect(() => {
    if (language === LanguageOption.EN) {
      setMarkdownSource(PrivacyPolicyContentEN);
    } else {
      setMarkdownSource(PrivacyPolicyContentFR);
    }
  }, [language]);

  return (
    <Page title="Privacy">
      <section className="section">
        <article className="text-block text-large pb-3">
          {reactContent}
        </article>
      </section>
    </Page>
  )
}