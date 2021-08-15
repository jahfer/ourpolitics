@react.component
let make = (~policy_handle=?, ~year) => 
  <section className="section">
    {switch policy_handle {
    | Some(policy_handle) => <PolicyComparisonTable policy_handle year />
    | None => <PolicyComparisonTable year />
    }}
  </section>
