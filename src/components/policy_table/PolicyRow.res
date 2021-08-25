module PolicyDataset = Map.Make({
  type t = Schema.party
  let compare = compare
})

let dataset_of_policies = (parties, policies) => {
  let init =
    parties |> List.fold_left((acc, party) => PolicyDataset.add(party, list{}, acc), PolicyDataset.empty)

  policies
  |> Utils.partition_predicate(~init=list{}, ~f=(p: Schema.policy) => p.party)
  |> List.fold_left((acc, policies: list<Schema.policy>) => {
    let party = List.hd(policies).party
    PolicyDataset.add(party, policies, acc)
  }, init)
}

@react.component
let make = (~topic, ~parties, ~policies: PolicyDataset.t<list<Schema.policy>>) => {
  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })

  let policy_cells =
    parties
    |> List.map(party =>
      <PolicyCell
        party
        topic
        policies={PolicyDataset.find(party, policies)}
        key={Strings.Party.to_str(party, ~language=I18n.EN) ++
        (" " ++
        Strings.Topic.to_str(topic, ~language=I18n.EN))}
      />
    )
    |> Array.of_list

  <div className="policyRow divider-t">
    <div className="policyCells">
      <div className="policyCell policyTopic">
        <h3 
          ariaLabelledby="policyTableColumn--topics"
          id={"policyTableRow--" ++ Js.String.replaceByRe(%re("/[^a-zA-Z]/g"), "", Strings.Topic.to_str(~language=I18n.EN, topic))}
          className="policyTopic--title">
          {T.topic_react_string(topic)} 
        </h3>
        //<a className="policyTopic--info" href="#"> { "Learn more"->React.string }</a>
      </div>
      {policy_cells->React.array}
    </div>
  </div>
}
