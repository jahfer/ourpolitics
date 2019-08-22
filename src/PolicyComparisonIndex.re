let map = Schema.TopicMap.empty
  |> Schema.TopicMap.add(Schema.Families, [|
    Schema.{ 
      topic: Schema.Families,
      party: Schema.NDP,
      title: { en: "Foo", fr: "?" },
      summary: { en: "NDP policy", fr: "?" },
      references: [||],
      details: Content.test
    },
    { 
      topic: Schema.Families,
      party: Schema.NDP,
      title: { en: "Bar", fr: "Barey" },
      summary: { en: "NDP policy", fr: "?" },
      references: [||],
      details: Content.test
    },
    { 
      topic: Schema.Families,
      party: Schema.Conservative,
      title: { en: "Foo", fr: "?" },
      summary: { en: "Conservative policy", fr: "?" },
      references: [||],
      details: Content.test 
    },
    {
      topic: Schema.Families,
      party: Schema.Liberal,
      title: { en: "Foo", fr: "?" },
      summary: { en: "Liberal policy", fr: "?" },
      references: [||],
      details: Content.test 
    },
    |])
  |> Schema.TopicMap.add(Schema.ForeignPolicy, [|
    Schema.{ 
      topic: Schema.ForeignPolicy,
      party: Schema.NDP,
      title: { en: "Foo", fr: "?" },
      summary: { en: "NDP policy", fr: "?" },
      references: [||],
      details: Content.test 
    },
    { 
      topic: Schema.ForeignPolicy,
      party: Schema.Liberal,
      title: { en: "Foo", fr: "?" },
      summary: { en: "Liberal policy", fr: "?" },
      references: [||],
      details: Content.test 
    },
  |]);

[@react.component]
let make = (~year = 2019) => {
  let (modalState, dispatch) = React.useReducer(
    (state, action) =>
      switch (action) {
      | PolicyModalDispatch.ModalOpen(policy) => PolicyModalDispatch.{ visible: true, policy: Some(policy) }
      | PolicyModalDispatch.ModalClose => { ...state, visible: false }
      },
    { visible: false, policy: None }
  )

  PolicyModal.Modal.setAppElement("#page-root");

  <PolicyModalDispatch dispatch>
    {
      switch (modalState.policy) {
      | Some(policy) => <PolicyModal policy isOpen=modalState.visible />
      | None => React.null
      }
    }

    <PolicyTable data=map />

    <footer>
      <p className="footerInfo"></p>
    </footer>
  </PolicyModalDispatch>
}