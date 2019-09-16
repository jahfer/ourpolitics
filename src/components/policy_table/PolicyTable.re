[@react.component]
let make = (~year: int) => {
  let (isLoading, setIsLoading) = React.useState(() => true);
  let (policies, setPolicies) = React.useState(() => Schema.TopicMap.empty);
  let (parties, setParties) = React.useState(() => Schema.PartySet.empty);

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
    /* On unmount, clear data */
    Some(_ => {
      setPolicies(_ => Schema.TopicMap.empty);
      setParties(_ => Schema.PartySet.empty);
    });
  }, [|year|]);

  let (policyRows, setPolicyRows) = React.useState(() => [||])

  React.useMemo2(() => {
    let rows = Schema.TopicMap.fold((topic, policies, lst) => {
      [<PolicyRow topic parties
        policies=Array.of_list(policies)
        key={Strings.Topic.to_str(topic, ~language=I18n.EN)} />, ...lst]
    }, policies, [])-> Array.of_list;
    setPolicyRows(_ => rows);
  }, (policies, parties));

  let language = React.useContext(LanguageContext.ctx);

  module T = Strings.Translations({ let language = language });

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
          { T.Text.react_string(Content.Strings.title) }
        </div>
        {
          parties
          |> Schema.PartySet.elements
          |> List.map((party) => 
            <div
              key={ "partyTitle--" ++ Strings.Party.to_str(~language=I18n.EN, party) }
              className={ "policyCell partyTitle backgroundColor--" ++ Strings.Party.to_str(~language=I18n.EN, party) }>
              { T.Party.react_string(party) }
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
    <div>
      { policyRows->React.array }
    </div>
  </div>
};