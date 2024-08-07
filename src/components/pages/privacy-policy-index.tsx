import * as React from 'react'
import { LanguageOption } from 'types/schema'
import { useLanguage, useTranslation } from 'contexts/language-context'

import Page from 'components/page'

// @ts-ignore
import { html as PrivacyEN} from './content/privacy_index.en.md'
// @ts-ignore
import { html as PrivacyFR } from './content/privacy_index.fr.md'

export default function PrivacyPolicyIndex () {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (language === LanguageOption.EN) {
      setContent(PrivacyEN);
    } else {
      setContent(PrivacyFR);
    }
  }, [language]);

  return (
    <Page title={t("privacy_policy")}>
      <section className="section">
        <article className="text-block text-large pb-3">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>
    </Page>
  )
}