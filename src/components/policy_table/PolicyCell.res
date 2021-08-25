@react.component
let make = (~party: Schema.party, ~topic: Schema.topic, ~policies: list<Schema.policy>) => {
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

  let aria_labels = [
    "policyTableRow--" ++ Js.String.replaceByRe(%re("/[^a-zA-Z]/g"), "", Strings.Topic.to_str(~language=I18n.EN, topic)),
    "policyTableColumn--" ++ Strings.Party.to_str(~language=I18n.EN, party)
  ]

  <div className="policyCell" ariaLabelledby=Js.Array2.joinWith(aria_labels, " ")>
    <h4 className={"policyCell--party textColor--" ++ EnStr.Party.to_str(party)}>
      {T.party_react_string(party)}
    </h4>
    <ul className="policyCell--points"> {listItems->React.array} </ul>
  </div>
}
