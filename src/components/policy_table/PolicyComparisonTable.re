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

    <PolicyTable year />

    <footer>
      <p className="footerInfo"></p>
    </footer>
  </PolicyModalDispatch>
}