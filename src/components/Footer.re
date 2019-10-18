[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });

  <footer className="section bg-light-alt footer pb-1">
    <div className="container">
      <h2 className="subheading">
        {T.Text.react_string(Content.Strings.archives)}
      </h2>
      <ul className="list-plain text-large">
        <li>
          <a
            href="/policies/2019"
            className="styled"
            onClick={"/policies/2019"->Utils.Router.push(~language)}>
            {Content.Strings.policy_comparison_title(~year=2019)
             ->T.Text.react_string}
          </a>
        </li>
        <li>
          <a
            href="/policies/2015"
            className="styled"
            onClick={"/policies/2015"->Utils.Router.push(~language)}>
            {Content.Strings.policy_comparison_title(~year=2015)
             ->T.Text.react_string}
          </a>
        </li>
      </ul>
      <p>
        <a
          href="/about"
          className="styled"
          onClick={"/about"->Utils.Router.push(~language)}>
          Content.Strings.about->T.Text.react_string
        </a>
        {j|·|j}->React.string
        <a
          href="/privacy"
          className="styled"
          onClick={"/privacy"->Utils.Router.push(~language)}>
          Content.Strings.privacy_policy->T.Text.react_string
        </a>
      </p>
    </div>
  </footer>;
};