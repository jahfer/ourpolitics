@module external content_en: string = "!html-loader!markdown-loader!./page_content/about_index.en.md"
@module external content_fr: string = "!html-loader!markdown-loader!./page_content/about_index.fr.md"

let text : I18n.text = {
  en: content_en,
  fr: content_fr,
}

@react.component
let make = () => {
  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })

  <section className="section">
    <article
      className="text-block text-large pb-3"
      dangerouslySetInnerHTML={text->T.text_to_string->Utils.dangerousHtml}
    />
  </section>
}
