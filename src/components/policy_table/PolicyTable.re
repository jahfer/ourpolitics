module TopicSet =
  Set.Make({
    type t = Schema.topic;
    let compare = compare;
  });

module Dataset =
  Map.Make({
    type t = Schema.topic;
    let compare = compare;
  });

[@react.component]
let make =
    (
      ~isLoading: bool,
      ~parties: list(Schema.party),
      ~dataset: Dataset.t(list(Schema.policy)),
    ) => {
  let (policyRows, setPolicyRows) = React.useState(() => [||]);

  React.useMemo2(
    () => {
      let rows =
        dataset
        |> Dataset.bindings
        |> List.map(((topic, policies)) => {
             let initDataset =
               parties
               |> List.fold_left(
                    (acc, party) => PolicyRow.Dataset.add(party, [], acc),
                    PolicyRow.Dataset.empty,
                  );

             let row_dataset =
               policies
               |> Utils.partition_predicate(~f=(p: Schema.policy) => p.party)
               |> List.fold_left(
                    (acc, policies: list(Schema.policy)) => {
                      let party = List.hd(policies).party;
                      PolicyRow.Dataset.add(party, policies, acc);
                    },
                    initDataset,
                  );

             <PolicyRow
               topic
               parties
               policies=row_dataset
               key={Strings.Topic.to_str(topic, ~language=I18n.EN)}
             />;
           })
        |> Array.of_list;
      setPolicyRows(_ => rows);
    },
    (dataset, parties),
  );

  let language = React.useContext(LanguageContext.ctx);

  module T =
    Strings.Translations({
      let language = language;
    });

  let table_header =
    React.useMemo3(
      () =>
        if (isLoading) {
          <>
            <div className="policyCell partyTitle backgroundColor--Skeleton">
              "..."->React.string
            </div>
          </>;
        } else {
          <>
            <div className="policyCell partyTitle backgroundColor--Empty">
              {T.Text.react_string(Content.Strings.title)}
            </div>
            {parties
             |> List.map(party =>
                  <div
                    key={
                      "partyTitle--"
                      ++ Strings.Party.to_str(~language=I18n.EN, party)
                    }
                    className={
                      "policyCell partyTitle backgroundColor--"
                      ++ Strings.Party.to_str(~language=I18n.EN, party)
                    }>
                    {T.Party.react_string(party)}
                  </div>
                )
             |> Array.of_list
             |> React.array}
          </>;
        },
      (isLoading, language, parties),
    );

  <div className="policyTable">
    <div className="policyRow tableHeader">
      <div className="policyCells"> table_header </div>
    </div>
    <div> policyRows->React.array </div>
  </div>;
};