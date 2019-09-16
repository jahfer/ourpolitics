[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  <section className="section">
    <PolicyComparisonTable year=2019 />
  </section>
}