type action =
  | ReferenceModalOpen(Schema.policy)
  | ModalOpen(string)
  | ModalClose

type modal_type =
  | FullContextModal
  | ReferenceModal

type state = {
  modal_type: modal_type,
  visible: bool,
  policy: option<Schema.policy>,
}

let ctx = React.createContext((_: action) => ())

let makeProps = (~dispatch, ~children, ()) =>
  {
    "value": dispatch,
    "children": children,
  }

let make = React.Context.provider(ctx)
