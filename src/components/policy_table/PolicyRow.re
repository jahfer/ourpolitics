module Dataset =
  Map.Make({
    type t = Schema.party;
    let compare = compare;
  });

let dataset_of_policies = (parties, policies) => {
  let init =
    parties
    |> List.fold_left(
         (acc, party) => Dataset.add(party, [], acc),
         Dataset.empty,
       );

  policies
  |> Utils.partition_predicate(~f=(p: Schema.policy) => p.party)
  |> List.fold_left(
       (acc, policies: list(Schema.policy)) => {
         let party = List.hd(policies).party;
         Dataset.add(party, policies, acc);
       },
       init,
     );
};

[@react.component]
let make = (~topic, ~parties, ~policies: Dataset.t(list(Schema.policy))) => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });

  let policy_cells =
    parties
    |> List.map(party =>
         <PolicyCell
           party
           policies={Dataset.find(party, policies)}
           key={
             Strings.Party.to_str(party, ~language=I18n.EN)
             ++ " "
             ++ Strings.Topic.to_str(topic, ~language=I18n.EN)
           }
         />
       )
    |> Array.of_list;

  <div className="policyRow divider-t">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        <h3 className="policyTopic--title">
          {T.Topic.react_string(topic)}
        </h3>
      </div>
      policy_cells->React.array
    </div>
  </div>;
};