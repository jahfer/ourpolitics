[@react.component]
let make = (~party: Schema.party, ~policies: option(array(Schema.policy))) => {
  let language = React.useContext(LanguageContext.ctx);
  let t = Strings.Text.react_string(~language);
  let t_party = Strings.Party.react_string(~language);

  let listItems = switch(policies) {
  | Some(list) => list |> Array.map (policy => <PolicyPoint policy key={Strings.Party.to_str(policy.party, ~language=I18n.EN) ++ policy.title.en} />)
  | None => [| <li className="emptyPolicy" key="0">{t(Strings.no_policy_listed)}</li> |]
  };

  <div className="policyCell">
    <h4 className={"policyCell--party textColor--NDP"}>{ t_party(party) }</h4>
    <ul className="policyCell--points">
      {listItems->React.array}
    </ul>
  </div>
};