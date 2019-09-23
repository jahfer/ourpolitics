[@react.component]
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);

  module T =
    Strings.Translations({
      let language = language;
    });

  let policy_click = () => {
    ModalOpen(policy.handle)->dispatch;
    let url_path = "/policies/" ++ policy.handle;
    let _ = url_path->Utils.Router.push_route(~language);
    ();
  };

  <li className="policyPoint">
    <a className="policyPoint--link" onClick={_ => policy_click()}>
      {T.Text.react_string(policy.title)}
    </a>
  </li>;
};