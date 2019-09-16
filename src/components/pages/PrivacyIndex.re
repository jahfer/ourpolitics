[@bs.module] external page_content : string = "!html-loader!markdown-loader!./page_content/privacy_index.md";

[@react.component]
let make = (~year = 2019) => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  <section className="section">
    <h1>Content.Strings.privacy_policy->T.Text.react_string</h1>
    <article
      className="text-block text-large pb-3"
      dangerouslySetInnerHTML={ page_content->Utils.dangerousHtml }>
    </article>
  </section>
}