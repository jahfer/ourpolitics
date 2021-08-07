@react.component
let make = (~party: Schema.party, ~policies: list<Schema.policy>) => {
  let language = React.useContext(LanguageContext.ctx)

  module T = Strings.Translations({
    let language = language
  })

  module EnStr = Strings.Translations({
    let language = I18n.EN
  })

  let policies =
    policies |> List.filter((policy: Schema.policy) => T.Text.to_str(policy.title) != "")
  let listItems = switch policies {
  | list{} => [
      <li className="emptyPolicy" key="0">
        {T.text_react_string(Content.Strings.no_policy_listed)}
      </li>,
    ]
  | _ =>
    policies
    |> List.map(policy =>
      <PolicyPoint policy key={T.party_to_string(policy.party) ++ policy.title.en} />
    )
    |> Array.of_list
  }

  <div className="policyCell">
    <h4 className={"policyCell--party textColor--" ++ EnStr.Party.to_str(party)}>
      {T.party_react_string(party)}
    </h4>
    <ul className="policyCell--points"> {listItems->React.array} </ul>
  </div>
}
