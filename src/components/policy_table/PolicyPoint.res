@react.component
let make = (~policy: Schema.policy) => {
  let language = React.useContext(LanguageContext.ctx)
  let dispatch = React.useContext(PolicyModalDispatch.ctx)

  module T = Strings.Translations({
    let language = language
  })

  let url_path = switch policy.handle {
  | None => "#"
  | Some(path) => `/policies/${path}`
  }

  let policy_click = (event) => {
    ReactEvent.Synthetic.preventDefault(event)
    switch policy.handle {
    | None => ReferenceModalOpen(policy)->dispatch
    | Some(path) =>
      ModalOpen(path)->dispatch
      let _ = url_path |> Utils.Router.push_route(~language, ~scrollToTop=false)
    }
  }

  let formattedPolicyTitle =
    policy.title
    |> T.Text.to_str
    |> Js.String.replaceByRe(
      %re(
        "/([$><+]*?[0-9]+\\.?,?(&nbsp;)?[0-9-–]*\\/?(%|\\$|k|( ?(years?|days?|weeks?|hours?|billions?|millions?|milliards|tons?|dollars?|heure?))*))/g"
      ),
      `<span class="text-em">$1</span>`,
    )
    |> Js.String.replaceByRe(
      %re("/[^\w](all)[^\w]/"),
      ` <span class="text-em">$1</span> `
    )

  // let className = switch policy.handle {
  //   | Some (_) => "policyPoint customBullet customBullet--foo"
  //   | None => "policyPoint"
  // }

  <li className="policyPoint">
    <a
      className="policyPoint--link"
      href=url_path
      onClick={event => policy_click(event)}
      dangerouslySetInnerHTML={formattedPolicyTitle->Utils.dangerousHtml}
    />
  </li>
}
