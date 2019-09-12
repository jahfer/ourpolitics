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

  let url = ReasonReactRouter.useUrl();
  let page_content = switch (url.path) {
  | ["policies", year] => <PolicyComparisonIndex year={ int_of_string(year) } />
  | ["policies"] => <Redirect path="/policies/2019" />
  | [] => <SplashIndex />
  | _ => <PageNotFound />
  };

  <LanguageContext language=language>
    <div className="page">
      <Header setLanguage />
      <div className="container section">
        page_content
      </div>
      <Footer />
    </div>
  </LanguageContext>
};