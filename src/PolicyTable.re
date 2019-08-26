[@react.component]
let make = (~year: int) => {
  let (isLoading, setIsLoading) = React.useState(() => true);
  let (policies, setPolicies) = React.useState(() => Schema.TopicMap.empty);
  let (parties, setParties) = React.useState(() => Schema.PartySet.empty);

  /* TODO store results in Context for memoization between mount/unmount? */
  React.useEffect1(() => {
    let _ = Js.Promise.(
      Fetch.fetch({j|/static/policies/$year/policies.json|j})
      |> then_(Fetch.Response.json)
      |> then_(json => {
        let data = json |> Json.Decode.(list(Schema.Decode.policy));
        setPolicies(map => {
          data |> ListLabels.fold_left(
            ~init = map,
            ~f = (acc, { topic, party } as policy : Schema.policy) => {
              setParties(set => Schema.PartySet.add(party, set));
              if (Schema.TopicMap.mem(topic, acc)) {
                let policies = Schema.TopicMap.find(topic, acc);
                let p' = [policy, ...policies];
                acc |> Schema.TopicMap.add(topic, p');
              } else {
                acc |> Schema.TopicMap.add(topic, [policy]);
              }
          })
        });
        setIsLoading(_ => false);
        data |> resolve;
      })
    );
    None;
  }, [|year|]);

  let (policyRows, setPolicyRows) = React.useState(() => [||])

  React.useMemo2(() => {
    let rows = Schema.TopicMap.fold((topic, policies, lst) => {
      [<PolicyRow topic parties policies=Array.of_list(policies) key={Strings.Topic.to_str(topic, ~language=I18n.EN)} />, ...lst]
    }, policies, [])-> Array.of_list;
    setPolicyRows(_ => rows);
  }, (policies, parties));

  let language = React.useContext(LanguageContext.ctx);

  module Language = { let language = language };
  module Text = Strings.Text.WithLanguage(Language);
  module Party = Strings.Party.WithLanguage(Language);

  let table_header = React.useMemo3(() => {
    if (isLoading) {
      <>
        <div className="policyCell partyTitle backgroundColor--Skeleton">
          { "..."->React.string }
        </div>
      </>
    } else {
      <>
        <div className="policyCell partyTitle backgroundColor--Empty">
          { Text.react_string(Strings.title) }
        </div>
        {
          parties
          |> Schema.PartySet.elements
          |> List.map((party) => 
            <div className={ "policyCell partyTitle backgroundColor--" ++ Strings.Party.to_str(~language=I18n.EN, party) }>
              { Party.react_string(party) }
            </div>
          )
          |> Array.of_list
          |> React.array
        }
      </>
    }
  }, (isLoading, parties, language));

  <div className="policyTable">
    <div className="policyRow tableHeader">
      <div className="policyCells">
        table_header
      </div>
    </div>
    <ul>
      { policyRows->React.array }
    </ul>
  </div>
};