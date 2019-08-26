[@react.component]
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);

  module Lang = { let language = language };
  module Text = Strings.Text.WithLanguage(Lang);

  <li className="policyPoint">
    <a className="policyPoint--link" onClick={_ => dispatch(ModalOpen(policy))}>
      { Text.react_string(policy.summary) }
    </a>
  </li>
};