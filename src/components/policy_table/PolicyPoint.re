[@react.component]
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx);
  let dispatch = React.useContext(PolicyModalDispatch.ctx);

  module T = Strings.Translations({ let language = language });

  let policy_click = () => {
    /* let url_path = "/policies/2019/" ++ T.Text.to_str(policy.title); */
    /* let _ = url_path->Utils.Router.push_route(~language); */
    ModalOpen(policy)->dispatch;
    ();
  };

  <li className="policyPoint">
    <a className="policyPoint--link" onClick={ _ => policy_click() }>
      { T.Text.react_string(policy.title) }
    </a>
  </li>
};