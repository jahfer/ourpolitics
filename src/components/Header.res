module LanguageSelector = {
  @react.component
  let make = (~setLanguage) => {
    let language = React.useContext(LanguageContext.ctx)

    <div className="langSelection">
      <a
        href="#en"
        onClick={_ => setLanguage(_ => I18n.EN)}
        className={language == I18n.EN ? "active" : ""}>
        {"EN"->React.string}
      </a>
      <span> {" | "->React.string} </span>
      <a
        href="#fr"
        onClick={_ => setLanguage(_ => I18n.FR)}
        className={language == I18n.FR ? "active" : ""}>
        {"FR"->React.string}
      </a>
    </div>
  }
}

@react.component
let make = (~setLanguage, ~subheading=None) => {
  let language = React.useContext(LanguageContext.ctx)
  module T = Strings.Translations({
    let language = language
  })
  let lang_string = T.lang_react_string(language)

  <header className="container section">
    <div className="header">
      <LanguageSelector setLanguage />
      <hgroup className="headings flex">
        <a href="#" className="no-hover" onClick={"/"->Utils.Router.push(~language)}>
          <h1 className=j`pageTitle lang-$lang_string`> {Content.Strings.our_politics->T.text_react_string} </h1>
        </a>
        {
          switch subheading {
          | Some(text) => <h2 className="pageSubTitle">{text->React.string}</h2>
          | None => React.null
          }
        }
      </hgroup>
    </div>
  </header>
}
