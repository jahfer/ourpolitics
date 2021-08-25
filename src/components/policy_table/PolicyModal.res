module Modal = {
  @module("react-modal")
  external setAppElement: string => unit = "setAppElement"

  @deriving(abstract)
  type overlay_styles = {backgroundColor: string}

  @deriving(abstract)
  type styles = {overlay: overlay_styles}

  @module @react.component
  external make: (
    ~isOpen: bool,
    ~onRequestClose: unit => unit,
    ~children: React.element,
    ~style: styles,
    ~className: string,
  ) => React.element = "react-modal"
}

module Reference = {
  @react.component
  let make = (~source: Schema.reference) =>
    <li className="reference">
      <a target="_blank" href=source.url>
        <h2 className="reference--title"> {source.title->React.string} </h2>
      </a>
      <div className="reference--meta"> {source.publisher->React.string} </div>
    </li>
}

module ReferenceModal = {
  @react.component
  let make = (~policy: Schema.policy, ~onModalClose) => {
    let language = React.useContext(LanguageContext.ctx)

    module T = Strings.Translations({
      let language = language
    })

    let topic_title = T.topic_to_string(policy.topic) ++ (" - " ++ T.party_to_string(policy.party))

    <div className="policyModal">
      <div className="modal--content reference-modal--content">
        <a href="#" className="reference-modal--close modal--close" ariaLabel="Close" alt="Close" onClick=onModalClose />
        <div className="modal--headingContainer">
          <div className="modal--headingInfo">
            <div className="modal--topicBox"> <p> {topic_title->React.string} </p> </div>
          </div>
        </div>
        <h1
          className="modal--heading modal--heading__primary"
          dangerouslySetInnerHTML={policy.title->T.Text.to_str->Utils.dangerousHtml}
        />
          <ul className="reference--list list-plain">
            {(policy.references |> Array.map((ref: Schema.reference) =>
              <li>
                <a target="_blank" href=ref.url> {ref.title->React.string} </a>
                <div className="reference--meta"> {ref.publisher->React.string} </div>
              </li>
            ))->React.array}
          </ul>
      </div>
    </div>
  }
}

module FullContextModal = {
  @react.component
  let make = (~policy: Schema.policy, ~onModalClose) => {
    let language = React.useContext(LanguageContext.ctx)

    module T = Strings.Translations({
      let language = language
    })

    let topic_title = T.topic_to_string(policy.topic) ++ (" - " ++ T.party_to_string(policy.party))

    let (content, setContent) = React.useState(() => "")

    React.useEffect2(() =>
      switch policy.handle {
      | None => None
      | Some(path) =>
        let contentPath = Content.pathToContent(path)->T.Text.to_str
        let _ = {
          open Js.Promise
          Cacheable.fetch("details", CacheVersion._DETAILS_CACHE_VERSION, contentPath)
          |> then_(Fetch.Response.text)
          |> then_(html => setContent(_ => html) |> resolve)
        }
        Some(_ => setContent(_ => ""))
      }
    , (policy, language))

    <div className="policyModal">
      <div className="modal--content">
        <a href="#" className="modal--close" ariaLabel="Close" alt="Close" onClick=onModalClose />
        <div className="modal--headingContainer">
          <div className="modal--headingInfo">
            <div className="modal--topicBox"> <p> {topic_title->React.string} </p> </div>
          </div>
        </div>
        <h1
          className="modal--heading modal--heading__primary"
          dangerouslySetInnerHTML={policy.title->T.Text.to_str->Utils.dangerousHtml}
        />
        <div className="modal--details" dangerouslySetInnerHTML={content->Utils.dangerousHtml} />
      </div>
      <aside className="modal--sidebar">
        <h2 className="modal--heading modal--heading__secondary"> {Content.Strings.references->T.text_react_string} </h2>
        <ul className="reference--list">
          {(policy.references |> Array.map(ref => <Reference key=ref.url source=ref />))
            ->React.array}
        </ul>
      </aside>
    </div>
  }
}

let getPartyHexColour = (party: Schema.party) =>
  switch party {
  | Schema.Liberal => "rgba(215,25,32,0.8)"
  | Schema.Conservative => "rgba(26,71,130,0.8)"
  | Schema.NDP => "rgba(243,112,33,0.8)"
  | Schema.Green => "rgba(61,155,53,0.8)"
  }

@react.component
let make = (~policy: Schema.policy, ~year: int, ~isOpen: bool, ~modal_type: PolicyModalDispatch.modal_type) => {
  let dispatch = React.useContext(PolicyModalDispatch.ctx)
  let language = React.useContext(LanguageContext.ctx)

  module T = Strings.Translations({
    let language = language
  })

  let style = Modal.styles(
    ~overlay=Modal.overlay_styles(~backgroundColor=getPartyHexColour(policy.party)),
  )

  let back = () => {
    open PolicyModalDispatch
    switch modal_type {
    | ReferenceModal => ModalClose->dispatch
    | FullContextModal =>
      switch Utils.Router.back() {
        | Some (_) => () // Redirected to path w/o modal
        | None => {
          ModalClose->dispatch
          Utils.Router.push_route(~language, `/policies/${string_of_int(year)}`)
        }
      }
    }
  }

  let close_modal = event => {
    ReactEvent.Synthetic.preventDefault(event)
    let _ = back()
  }

  let modalClasses = switch modal_type {
  | FullContextModal => "policyModal--content"
  | ReferenceModal => "policyModal--content policyReferenceModal--content"
  }

  <Modal isOpen style className=modalClasses onRequestClose=back>
    {switch modal_type {
    | FullContextModal => <FullContextModal policy onModalClose=close_modal />
    | ReferenceModal => <ReferenceModal policy onModalClose=close_modal />
    }}
  </Modal>
}
