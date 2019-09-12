module Modal = {
  [@bs.module "react-modal"]
  external setAppElement: string => unit = "setAppElement";

  [@bs.deriving abstract]
  type overlay_styles = {
    backgroundColor: string,
  };

  [@bs.deriving abstract]
  type styles = {
    overlay: overlay_styles
  };

  [@bs.module][@react.component]
  external make: (
    ~isOpen: bool,
    ~onRequestClose: unit => unit,
    ~children: React.element,
    ~style: styles,
    ~className: string
  ) => React.element = "react-modal";
};

module Reference = {
  [@react.component]
  let make = (~source: Schema.reference) =>
    <li className="reference">
      <a target="_blank" href={source.url}><h2 className="reference--title">{source.title->React.string}</h2></a>
      <div className="reference--meta">{source.publisher->React.string}</div>
    </li>
};

let getPartyHexColour = (party: Schema.party) => {
  switch (party) {
  | Schema.Liberal => "rgba(215,25,32,0.8)"
  | Schema.Conservative => "rgba(26,71,130,0.8)"
  | Schema.NDP => "rgba(243,112,33,0.8)"
  | Schema.Green => "rgba(61,155,53,0.8)"
  }
};

[@react.component]
let make = (~policy: Schema.policy, ~isOpen: bool) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);

  module T = Strings.I18n({ let language = language });

  let topic_title = T.Topic.to_str(policy.topic) ++ " - " ++ T.Party.to_str(policy.party);

  let style = Modal.styles(
    ~overlay = Modal.overlay_styles(
      ~backgroundColor = getPartyHexColour(policy.party)
    )
  );

  let (content, setContent) = React.useState(() => "");

  React.useEffect2(() => {
    let contentPath = Content.pathToContent(policy.details)->T.Text.to_str;
    let _ = Js.Promise.(
      Fetch.fetch(contentPath)
      |> then_(Fetch.Response.text)
      |> then_(html => setContent(_ => html) |> resolve)
    );
    Some(_ => setContent(_ => ""));
  }, (policy, language));

  <Modal isOpen style className="policyModal--content" onRequestClose={_ => dispatch(ModalClose)}>
    <div className="policyModal">
      <div className="modal--content">
        <div className="modal--headingContainer">
          <div className="modal--headingInfo">
            <div className="modal--topicBox">
              <p>{topic_title->React.string}</p>
            </div>
          </div>
        </div>

        <h1 className="modal--heading modal--heading__primary">
          {T.Text.react_string(policy.title)}
        </h1>

        <div className="modal--details"
          dangerouslySetInnerHTML={ content->Utils.dangerousHtml }>
        </div>
      </div>

      <div className="modal--sidebar">
        <a href="#" className="modal--close" onClick={_ => dispatch(ModalClose)}></a>

        <h2 className="modal--heading modal--heading__secondary">{"References"->React.string}</h2>
        <ul className="reference--list">
          { 
            policy.references |> Array.map ((ref) => <Reference source={ref} />)
          }->React.array
        </ul>
      </div>
    </div>
  </Modal>
};