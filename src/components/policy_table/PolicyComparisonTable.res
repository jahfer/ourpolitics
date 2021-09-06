module StringMap = Map.Make(String)

module PartySet = Set.Make({
  type t = Schema.party
  let compare = compare
})

let topics_of_policies = policies =>
  List.fold_right(
    Schema.TopicSet.add,
    policies |> List.map((p: Schema.policy) => p.topic),
    Schema.TopicSet.empty,
  )

let parties_of_policies = policies =>
  policies
  |> List.fold_left((set, policy: Schema.policy) => PartySet.add(policy.party, set), PartySet.empty)
  |> PartySet.elements

let policy_index_of_policies = policies =>
  policies |> List.fold_left((acc, policy: Schema.policy) =>
    switch policy.handle {
    | None => acc
    | Some(path) => acc |> StringMap.add(path, policy)
    }
  , StringMap.empty)

let elTop = ref(0)

@react.component
let make = (~policy_handle=?, ~year=2019) => {
  let language = React.useContext(LanguageContext.ctx)

  let (isLoading, setIsLoading) = React.useState(() => true)
  let (policyIndex, setPolicyIndex) = React.useState(() => StringMap.empty)
  let (tableDataset, setTableDataset) = React.useState(() => PolicyTable.TopicDataset.empty)
  let (parties, setParties) = React.useState(() => list{})
  let (deferUntil, setDeferUntil) = React.useState(() => None)
  let (_topics, setTopics) = React.useState(() => Schema.TopicSet.empty)
  let (topicFilter, setTopicFilter) = React.useState(() => Schema.TopicSet.empty)

  React.useEffect(() => {
    let initialHeaderTop: int = %raw(`document.getElementById("tableHeader").getBoundingClientRect().top`)

    let initialBodyTop: int = %raw(`document.body.getBoundingClientRect().top`)

    if elTop.contents == 0 {
      elTop := initialHeaderTop - initialBodyTop
    }

    Utils.window->Utils.addEventListener("scroll", _ =>
      Utils.requestAnimationFrame(() => {
        let scrollTop: int = %raw(`document.documentElement.scrollTop`)
        if scrollTop > elTop.contents {
          let () = %raw(`document.getElementById("tableHeader").classList.add("fixed")`)
          let () = %raw(`document.getElementById("tableFiller").classList.remove("hidden")`)
        } else {
          let () = %raw(`document.getElementById("tableHeader").classList.remove("fixed")`)
          let () = %raw(`document.getElementById("tableFiller").classList.add("hidden")`)
        }
      })
    )
    None
  })

  React.useEffect1(() => {
    let promise = {
      open Js.Promise
      Cacheable.fetch("policies", CacheVersion._POLICIES_CACHE_VERSION, j`/static/policies/$year/policies.json`)
      |> then_(Fetch.Response.json)
      |> then_(json => {
        let parsed_data = json |> Json.Decode.list(Schema.Decode.policy)

        setTableDataset(_ => PolicyTable.dataset_of_policies(parsed_data))
        let topicSet = topics_of_policies(parsed_data)
        setTopics(_ => topicSet)
        setTopicFilter(_ => topicSet)
        setParties(_ => parties_of_policies(parsed_data))
        setPolicyIndex(_ => policy_index_of_policies(parsed_data))
        setIsLoading(_ => false) |> resolve
      })
    }
    setDeferUntil(_ => Some(promise))
    Some(_ => setDeferUntil(_ => None))
  }, [year])

  let (modalState, dispatch) = React.useReducer((state, action) =>
    switch action {
    | PolicyModalDispatch.ReferenceModalOpen(policy) =>
      open PolicyModalDispatch
      {
        modal_type: ReferenceModal,
        visible: true,
        policy: Some(policy),
      }
    | ModalOpen(policy_handle) =>
      let policy = policyIndex |> StringMap.find(policy_handle)
      open PolicyModalDispatch
      {
        modal_type: FullContextModal,
        visible: true,
        policy: Some(policy),
      }
    | ModalClose => {...state, visible: false}
    | ModalRandomSelection =>
      let n = Random.int (StringMap.cardinal(policyIndex))
      let (_, policy) = List.nth(StringMap.bindings(policyIndex), n)
      let path = Utils.Option.value(~default="", policy.handle)
      Utils.Router.replace_route(~language, `/policies/${path}`)
      open PolicyModalDispatch
      {
        modal_type: FullContextModal,
        visible: true,
        policy: Some(policy),
      }
    }
  , {modal_type: FullContextModal, visible: false, policy: None})

  React.useEffect2(() => {
    switch (policy_handle, deferUntil) {
    | (Some(handle), Some(promise)) =>
      let _ = promise |> {
        open Js.Promise
        then_(_ => dispatch(PolicyModalDispatch.ModalOpen(handle)) |> resolve)
      }
    | (None, _) => dispatch(PolicyModalDispatch.ModalClose)
    | _ => ()
    }

    None
  }, (policy_handle, deferUntil))

  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })

  // let disabledTopics = Schema.TopicSet.inter(topics, topicFilter)
  // |> Schema.TopicSet.elements
  // |> List.map(t => <li className="button--pill iconSuffix iconSuffix--close enabled">{t->T.topic_react_string}</li>) 
  // |> Array.of_list

  PolicyModal.Modal.setAppElement("#page-root")

  <PolicyModalDispatch dispatch>
    {switch modalState.policy {
    | Some(policy) =>
      <PolicyModal modal_type=modalState.modal_type policy year isOpen=modalState.visible />
    | None => React.null
    }}

    {
      if year == 2021 {
        <Banner>
          <Utils.UnsafeHTML html={ Content.Strings.election_notice->T.text_to_string } />
        </Banner>
      } else {
        React.null
      }
    }

    // <ul className="list-plain">
    //   { disabledTopics->React.array }
    // </ul>

    <PolicyTable isLoading parties topicFilter=Some(topicFilter) dataset=tableDataset />
    <footer> <p className="footerInfo" /> </footer>
  </PolicyModalDispatch>
}
