[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  <footer className="section bg-light-alt footer pb-1">
    <div className="container">
      <h2 className="subheading">{ T.Text.react_string(Content.Strings.archives) }</h2>
      <ul className="list-plain text-large">
        <li>
          <a href="#" onClick={ "/policies/2015"->Utils.Router.push(~language) }>{ Content.Strings.policy_comparison_title(~year=2015)->T.Text.react_string }</a>
        </li>
      </ul>
      <p>
        <a href="#" onClick={"/about"->Utils.Router.push(~language)}>Content.Strings.about->T.Text.react_string</a>
        {j|·|j}->React.string
        <a href="#" onClick={"/privacy"->Utils.Router.push(~language)}>Content.Strings.privacy_policy->T.Text.react_string</a>
      </p>
    </div>
  </footer>
}