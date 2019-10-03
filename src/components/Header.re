module LanguageSelector = {
  [@react.component]
  let make = (~setLanguage) => {
    let language = React.useContext(LanguageContext.ctx);

    <div className="container">
      <div className="langSelection">
        <a
          href="#en"
          onClick={_ => setLanguage(_ => I18n.EN)}
          className={language == I18n.EN ? "active" : ""}>
          "EN"->React.string
        </a>
        <span> " | "->React.string </span>
        <a
          href="#fr"
          onClick={_ => setLanguage(_ => I18n.FR)}
          className={language == I18n.FR ? "active" : ""}>
          "FR"->React.string
        </a>
      </div>
    </div>;
  };
};

[@react.component]
let make = (~setLanguage) => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });
  let lang_string = T.Language.react_string(language);

  <header className="container section header">
    // <LanguageSelector setLanguage />

      <a
        href="#"
        className="no-hover"
        onClick={"/"->Utils.Router.push(~language)}>
        <h1 className={j|pageTitle lang-$lang_string|j}>
          "Our Politics"->React.string
        </h1>
      </a>
    </header>;
};