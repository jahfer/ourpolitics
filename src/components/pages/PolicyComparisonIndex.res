@react.component
let make = (~policy_handle=?, ~year) => {
  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })

  <section className="section">
    {switch policy_handle {
    | Some(policy_handle) => <PolicyComparisonTable policy_handle year />
    | None => <PolicyComparisonTable year />
    }}
  </section>
}
