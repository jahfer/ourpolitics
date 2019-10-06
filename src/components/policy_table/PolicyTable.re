module Dataset = Schema.TopicMap;

let dataset_of_policies = policy_list => {
  let append_policy_to_dataset = (dataset, policy: Schema.policy) => {
    let lst =
      Dataset.mem(policy.topic, dataset)
        ? Dataset.find(policy.topic, dataset) : [];
    dataset |> Dataset.add(policy.topic, [policy, ...lst]);
  };

  List.fold_left(append_policy_to_dataset, Dataset.empty, policy_list);
};

[@react.component]
let make =
    (
      ~isLoading: bool,
      ~parties: list(Schema.party),
      ~dataset: Dataset.t(list(Schema.policy)),
      ~topics=?,
    ) => {
  let (policyRows, setPolicyRows) = React.useState(() => [||]);

  let sortedPartyList =
    React.useMemo1(
      () => {
        let numParties = List.length(parties);
        let partyRandom = numParties mod 2 == 0 ? numParties + 1 : numParties;
        parties
        |> List.sort((_, _) => partyRandom / 2 - Random.int(partyRandom));
      },
      [|parties|],
    );

  React.useMemo2(
    () => {
      let filteredDataset =
        switch (topics) {
        | None => dataset
        | Some(topics) =>
          dataset
          |> Dataset.filter((key, _) => Schema.TopicSet.mem(key, topics))
        };

      let rows =
        filteredDataset
        |> Dataset.bindings
        |> List.map(((topic, policies)) =>
             <PolicyRow
               topic
               parties=sortedPartyList
               policies={PolicyRow.dataset_of_policies(parties, policies)}
               key={Strings.Topic.to_str(topic, ~language=I18n.EN)}
             />
           )
        |> Array.of_list;
      setPolicyRows(_ => rows);
    },
    (dataset, sortedPartyList),
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
            {sortedPartyList
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
      (isLoading, language, sortedPartyList),
    );

  <div className="policyTable">
    <div id="tableHeader" className="policyRow container">
      <div className="policyCells"> table_header </div>
    </div>
    <div id="tableFiller" className="policyRow container filler hidden" />
    <div>
      {if (isLoading) {
         React.null;
       } else {
         policyRows->React.array;
       }}
    </div>
  </div>;
};