module StringMap = Map.Make(String);

module PartySet =
  Set.Make({
    type t = Schema.party;
    let compare = compare;
  });

[@react.component]
let make = (~policy_handle=?, ~year=2019) => {
  let (isLoading, setIsLoading) = React.useState(() => true);
  let (policyIndex, setPolicyIndex) = React.useState(() => StringMap.empty);
  let (tableDataset, setTableDataset) =
    React.useState(() => PolicyTable.Dataset.empty);
  let (parties, setParties) = React.useState(() => []);
  let (deferUntil, setDeferUntil) = React.useState(() => None);

  React.useEffect1(
    () => {
      let promise =
        Js.Promise.(
          Fetch.fetch({j|/static/policies/$year/policies.json|j})
          |> then_(Fetch.Response.json)
          |> then_(json => {
               let parsed_data =
                 json |> Json.Decode.list(Schema.Decode.policy);

               setTableDataset(_ =>
                 parsed_data
                 |> List.fold_left(
                      (acc, policy: Schema.policy) => {
                        let lst =
                          PolicyTable.Dataset.mem(policy.topic, acc)
                            ? PolicyTable.Dataset.find(policy.topic, acc) : [];
                        acc
                        |> PolicyTable.Dataset.add(
                             policy.topic,
                             [policy, ...lst],
                           );
                      },
                      PolicyTable.Dataset.empty,
                    )
               );

               setParties(_ =>
                 parsed_data
                 |> List.fold_left(
                      (set, policy: Schema.policy) =>
                        PartySet.add(policy.party, set),
                      PartySet.empty,
                    )
                 |> PartySet.elements
               );

               setPolicyIndex(_ =>
                 parsed_data
                 |> List.fold_left(
                      (acc, policy: Schema.policy) =>
                        acc |> StringMap.add(policy.handle, policy),
                      StringMap.empty,
                    )
               );
               setIsLoading(_ => false) |> resolve;
             })
        );
      setDeferUntil(_ => Some(promise));
      Some(_ => setDeferUntil(_ => None));
    },
    [|year|],
  );

  let (modalState, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | PolicyModalDispatch.ModalOpen(policy_handle) =>
          let policy = policyIndex |> StringMap.find(policy_handle);
          PolicyModalDispatch.{visible: true, policy: Some(policy)};
        | PolicyModalDispatch.ModalClose => {...state, visible: false}
        },
      {visible: false, policy: None},
    );

  React.useEffect2(
    () => {
      switch (policy_handle, deferUntil) {
      | (Some(handle), Some(promise)) =>
        let _ =
          promise
          |> Js.Promise.(
               then_(_ =>
                 dispatch(PolicyModalDispatch.ModalOpen(handle)) |> resolve
               )
             );
        ();
      | (None, _) => dispatch(PolicyModalDispatch.ModalClose)
      | _ => ()
      };

      None;
    },
    (policy_handle, deferUntil),
  );

  PolicyModal.Modal.setAppElement("#page-root");

  <PolicyModalDispatch dispatch>
    {switch (modalState.policy) {
     | Some(policy) => <PolicyModal policy isOpen={modalState.visible} />
     | None => React.null
     }}
    <PolicyTable isLoading parties dataset=tableDataset />
    <footer> <p className="footerInfo" /> </footer>
  </PolicyModalDispatch>;
};