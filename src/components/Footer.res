@react.component
let make = () => {
  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })

  <footer className="section bg-light-alt footer pb-1">
    <div className="container">
      <h2 className="subheading"> {T.Text.react_string(Content.Strings.archives)} </h2>
      <ul className="list-plain text-large">
        {[2019, 2015]
        |> Array.map(year =>
          <li>
            <a
              href=j`/policies/$year`
              className="styled"
              onClick={j`/policies/$year`->Utils.Router.push(~language)}>
              {Content.Strings.policy_comparison_title(~year)->T.Text.react_string}
            </a>
          </li>
        )
        |> React.array}
      </ul>
      <p>
        <a href="/about" className="styled" onClick={"/about"->Utils.Router.push(~language)}>
          {Content.Strings.about->T.Text.react_string}
        </a>
        {j`·`->React.string}
        <a href="/privacy" className="styled" onClick={"/privacy"->Utils.Router.push(~language)}>
          {Content.Strings.privacy_policy->T.Text.react_string}
        </a>
      </p>
    </div>
  </footer>
}
