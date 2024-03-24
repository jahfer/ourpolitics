import * as React from 'react'
import { LanguageOption } from 'types/schema'
import { useLanguage, useTranslation } from 'contexts/language-context'

import Page from 'components/page'
// @ts-ignore
import { html as AboutEN } from './content/about_index.en.md'
// @ts-ignore
import { html as AboutFR } from './content/about_index.fr.md'

export default function AboutIndex () {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (language === LanguageOption.EN) {
      setContent(AboutEN);
    } else {
      setContent(AboutFR);
    }
  }, [language]);

  return (
    <Page title={t("about")}>
      <section className="section">
        <article className="text-block text-large pb-3">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>
    </Page>
  )
}