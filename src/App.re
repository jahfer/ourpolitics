module LanguageSelector = {
  [@react.component]
  let make = () => {
    let (language, setLanguage) = React.useState(() => I18n.EN);

    <div className="langSelection">
      <a href="#en" 
        onClick={_ => setLanguage(_ => I18n.EN)} 
        className={ (language == I18n.EN ? "active" : "") }>{"EN"->React.string}</a>
      <span>{" | "->React.string}</span>
      <a href="#fr"
        onClick={_ => setLanguage(_ => I18n.FR)}
        className={ (language == I18n.FR ? "active" : "") }>{"FR"->React.string}</a>
    </div>
  }
}

[@react.component]
let make = () => {
  let (language, _setLanguage) = React.useState(() => I18n.EN);
  let lang_string = Strings.Language.react_string(language, ~language);
  let url = ReasonReactRouter.useUrl();
  let page_content = switch (url.path) {
  | ["policies", year] => <PolicyComparisonIndex year={ int_of_string(year) } />
  | ["policies"] => <PolicyComparisonIndex />
  | [] => <SplashIndex />
  | _ => <PageNotFound />
  };

  <LanguageContext language=language>
    <div className="page">
  
      <LanguageSelector />

      <a href="#" onClick={ _ => ReasonReactRouter.push("/") }>
        <h1 className={j|pageTitle lang-$lang_string|j}>"Our Politics"->React.string</h1>
      </a>

      page_content

    </div>
  </LanguageContext>
};