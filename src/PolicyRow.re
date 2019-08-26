module PartyMap = Map.Make({
  type t = Schema.party;
  let compare = compare;
});

[@react.component]
let make = (~topic, ~parties, ~policies) => {
  let (table, _setTable) = React.useState(() => {
    Array.fold_left ((policy_map: PartyMap.t(array(Schema.policy)), policy: Schema.policy) => {
      let policy_list = try(PartyMap.find(policy.party, policy_map)) {
      | Not_found => [||]
      };
      PartyMap.add(policy.party, Array.append(policy_list, [| policy |]), policy_map);
    }, PartyMap.empty, policies);
  });

  let language = React.useContext(LanguageContext.ctx);

  module Language = { let language = language };
  module Topic = Strings.Topic.WithLanguage(Language);

  let find_or_default = (key, map) => switch (PartyMap.find(key, map)) {
  | policies => Some(policies)
  | exception Not_found => None
  };

  <div className="policyRow">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        <h3 className="policyTopic--title">{ Topic.react_string(topic) }</h3>
      </div>
      {
        parties
        |> Schema.PartySet.elements
        |> List.map(party =>
          <PolicyCell
            party=party
            key={Strings.Party.to_str(party, ~language=I18n.EN) ++ " " ++ Strings.Topic.to_str(topic, ~language=I18n.EN)}
            policies=find_or_default(party, table) />
          )
        |> Array.of_list
        |> React.array
      }
    </div>
  </div>
};