[@react.component]
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);
  let t = Strings.Text.react_string(~language);

  <li className="policyPoint">
    <a className="policyPoint--link" onClick={_ => dispatch(ModalOpen(policy))}>{ t(policy.summary) }</a>
  </li>
};