[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.I18n({ let language = language });

  <footer className="section bg-light-alt text-large footer">
    <div className="container">
      <h2 className="subheading">{ T.Text.react_string(Strings.archives) }</h2>
      <ul className="list-plain">
        <li>
          <a href="#" onClick={ "/policies/2015"->Utils.Router.push(~language) }>"2015 Policies"->React.string</a>
        </li>
        <li>
          <a href="#" onClick={ "/policies/2019"->Utils.Router.push(~language) }>"2019 Policies"->React.string</a>
        </li>
      </ul>
      <p>"Made by @jahfer"->React.string</p>
    </div>
  </footer>
}