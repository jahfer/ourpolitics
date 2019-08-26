[@react.component]
let make = (~party: Schema.party, ~policies: option(array(Schema.policy))) => {
  let language = React.useContext(LanguageContext.ctx);

  module Lang = { let language = language };
  module Text = Strings.Text.WithLanguage(Lang);
  module Party = Strings.Party.WithLanguage(Lang);
  let t_party = Strings.Party.react_string(~language);

  let listItems = switch(policies) {
  | Some(list) => list |> Array.map (policy => <PolicyPoint policy key={Party.to_str(policy.party) ++ policy.title.en} />)
  | None => [| <li className="emptyPolicy" key="0">{Text.react_string(Strings.no_policy_listed)}</li> |]
  };

  <div className="policyCell">
    <h4 className={"policyCell--party textColor--NDP"}>{ t_party(party) }</h4>
    <ul className="policyCell--points">
      {listItems->React.array}
    </ul>
  </div>
};