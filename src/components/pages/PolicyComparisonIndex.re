[@react.component]
let make = (~policy_handle=?, ~year) => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });

  <section className="section">
    <h2 className="subheading text-center">
      {Content.Strings.policy_comparison_title(~year)->T.Text.react_string}
    </h2>
    {switch (policy_handle) {
     | Some(policy_handle) => <PolicyComparisonTable policy_handle year />
     | None => <PolicyComparisonTable year />
     }}
  </section>;
};