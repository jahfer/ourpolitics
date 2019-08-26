module LanguageSelector = {
  [@react.component]
  let make = (~setLanguage) => {
    let language = React.useContext(LanguageContext.ctx);
    
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


module Redirect = {
  [@react.component]
  let make = (~path) => {
    let language = React.useContext(LanguageContext.ctx);
    Utils.Router.push_route(~language, path);
    React.null
  }
}

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  let (language, setLanguage) = React.useState(() => {
    switch (url.hash) {
    | "fr" => I18n.FR
    | "en" | _ => I18n.EN
    }
  });

  let lang_string = Strings.Language.react_string(language, ~language);

  let url = ReasonReactRouter.useUrl();
  let page_content = switch (url.path) {
  | ["policies", year] => <PolicyComparisonIndex year={ int_of_string(year) } />
  | ["policies"] => <Redirect path="/policies/2019" />
  | [] => <SplashIndex />
  | _ => <PageNotFound />
  };

  <LanguageContext language=language>
    <div className="page">
      <LanguageSelector setLanguage />
      <a href="#" onClick="/"->Utils.Router.push(~language)>
        <h1 className={j|pageTitle lang-$lang_string|j}>"Our Politics"->React.string</h1>
      </a>
      page_content
    </div>
  </LanguageContext>
};