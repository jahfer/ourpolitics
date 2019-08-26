[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);

  module Lang = { let language = language };
  module Text = Strings.Text.WithLanguage(Lang);

  <>
    <ul>
      <li>
        <a href="#" onClick={ "/policies/2019"->Utils.Router.push(~language) }>"Policies (2019)"->React.string</a>
      </li>
      <li>
        <a href="#" onClick={ "/policies/2015"->Utils.Router.push(~language) }>"Policies (2015)"->React.string</a>
      </li>
    </ul>
  </>
}