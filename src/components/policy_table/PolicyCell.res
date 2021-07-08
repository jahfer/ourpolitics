@react.component
let make = (~party: Schema.party, ~policies: list<Schema.policy>) => {
  let language = React.useContext(LanguageContext.ctx)

  module T = Strings.Translations({
    let language = language
  })

  let policies =
    policies |> List.filter((policy: Schema.policy) => T.Text.to_str(policy.title) != "")
  let listItems = switch policies {
  | list{} => [
      <li className="emptyPolicy" key="0">
        {T.Text.react_string(Content.Strings.no_policy_listed)}
      </li>,
    ]
  | _ =>
    policies
    |> List.map(policy =>
      <PolicyPoint policy key={T.Party.to_str(policy.party) ++ policy.title.en} />
    )
    |> Array.of_list
  }

  <div className="policyCell">
    <h4 className={"policyCell--party textColor--" ++ T.Party.to_str(party)}>
      {T.Party.react_string(party)}
    </h4>
    <ul className="policyCell--points"> {listItems->React.array} </ul>
  </div>
}
