[@react.component]
let make = (~party: Schema.party, ~policies: option(array(Schema.policy))) => {
  let language = React.useContext(LanguageContext.ctx);
  
  module T = Strings.I18n({ let language = language });

  let listItems = switch(policies) {
  | Some(list) => list |> Array.map (policy => <PolicyPoint policy key={T.Party.to_str(policy.party) ++ policy.title.en} />)
  | None => [| <li className="emptyPolicy" key="0">{T.Text.react_string(Strings.no_policy_listed)}</li> |]
  };

  <div className="policyCell">
    <h4 className={"policyCell--party textColor--NDP"}>{ T.Party.react_string(party) }</h4>
    <ul className="policyCell--points">
      {listItems->React.array}
    </ul>
  </div>
};