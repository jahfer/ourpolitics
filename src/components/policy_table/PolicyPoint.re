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
    let _ =
      url_path |> Utils.Router.push_route(~language, ~scrollToTop=false);
    ();
  };

  let formattedPolicyTitle =
    policy.title
    |> T.Text.to_str
    |> Js.String.replaceByRe(
         [%bs.re
           "/([$><+]?[0-9.]+,?[0-9-]*(%|k|( ?(years?|days?|billion|million|\/day))*))/g"
         ],
         {|<span class="text-em">$1</span>|},
       );

  <li className="policyPoint">
    <a
      className="policyPoint--link"
      onClick={_ => policy_click()}
      dangerouslySetInnerHTML={formattedPolicyTitle->Utils.dangerousHtml}
    />
  </li>;
};