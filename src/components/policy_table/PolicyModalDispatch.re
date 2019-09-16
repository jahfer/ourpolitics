type action =
  | ModalOpen(Schema.policy)
  | ModalClose
  ;

type state = {
  visible: bool,
  policy: option(Schema.policy)
};

let ctx = React.createContext((_ : action) => ());

let makeProps = (~dispatch, ~children, ()) => {
  "value": dispatch,
  "children": children,
};

let make = React.Context.provider(ctx);