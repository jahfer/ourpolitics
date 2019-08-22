module PartyMap = Map.Make({
  type t = Schema.party;
  let compare = compare;
});

[@react.component]
let make = (~topic, ~policies) => {
  let (table, _setTable) = React.useState(() => {
    Array.fold_left ((policy_map: PartyMap.t(array(Schema.policy)), policy: Schema.policy) => {
      let policy_list = try(PartyMap.find(policy.party, policy_map)) {
      | Not_found => [||]
      };
      PartyMap.add(policy.party, Array.append(policy_list, [| policy |]), policy_map);
    }, PartyMap.empty, policies);
  });

  let language = React.useContext(LanguageContext.ctx);
  let t_topic = Strings.Topic.react_string(~language);

  let find_or_default = (key, map) => switch (PartyMap.find(key, map)) {
  | policies => Some(policies)
  | exception Not_found => None
  };

  <div className="policyRow">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        <h3 className="policyTopic--title">{ t_topic(topic) }</h3>
      </div>
      <PolicyCell
        party=NDP
        key={"NDP " ++ Strings.Topic.to_str(topic, ~language=I18n.EN)}
        policies=find_or_default(NDP, table) />
       <PolicyCell
        party=Conservative
        key={"Conservative " ++ Strings.Topic.to_str(topic, ~language=I18n.EN)}
        policies=find_or_default(Conservative, table) />
      <PolicyCell
        party=Liberal
        key={"Liberal " ++ Strings.Topic.to_str(topic, ~language=I18n.EN)}
        policies=find_or_default(Liberal, table) />
    </div>
  </div>
};