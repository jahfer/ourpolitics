[@react.component]
let make = (~year = 2019) => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  <section className="section">
    <h2 className="subheading text-center">{ Content.Strings.policy_comparison_title(~year)->T.Text.react_string }</h2>
    <PolicyComparisonTable year />
  </section>
};