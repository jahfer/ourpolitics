[@react.component]
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);

  module T = Strings.I18n({ let language = language });

  <li className="policyPoint">
    <a className="policyPoint--link" onClick={_ => dispatch(ModalOpen(policy))}>
      { T.Text.react_string(policy.title) }
    </a>
  </li>
};