[@bs.module] external page_content : string = "!html-loader!markdown-loader!./page_content/splash_index.md";

[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  <section className="section">
    <article
      className="text-normal text-center text-color-dim"
      dangerouslySetInnerHTML={ page_content->Utils.dangerousHtml }>
    </article>
    <PolicyComparisonTable year=2015 />
  </section>
}