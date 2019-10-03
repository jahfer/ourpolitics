[@bs.module]
external page_content_en: string =
  "!html-loader!markdown-loader!./page_content/splash_index.en.md";

[@bs.module]
external page_content_fr: string =
  "!html-loader!markdown-loader!./page_content/splash_index.fr.md";

let page_content = I18n.{en: page_content_en, fr: page_content_fr};

[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });

  <>
    <section className="section">
      <article
        className="text-block text-large pb-3"
        dangerouslySetInnerHTML={
          T.Text.to_str(page_content)->Utils.dangerousHtml
        }
      />
    </section>
  </>;
};