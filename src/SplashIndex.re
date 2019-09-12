[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.I18n({ let language = language });

  <section className="section">
    <a href="#" onClick={ "/policies/2019"->Utils.Router.push(~language) }>
      <p>{ Strings.SplashIndex.policy_comparison_index(~year=2019)->T.Text.react_string }</p>
    </a>
  </section>
}