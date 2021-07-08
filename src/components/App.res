module Redirect = {
  @react.component
  let make = (~path) => {
    let language = React.useContext(LanguageContext.ctx)
    Utils.Router.push_route(~language, path)
    React.null
  }
}

let selectLanguage = x =>
  switch x {
  | "fr" => I18n.FR
  | _ => I18n.EN
  }

@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()

  let (language, setLanguage) = React.useState(() => url.hash |> selectLanguage)

  React.useEffect1(() => {
    setLanguage(_ => selectLanguage(url.hash))
    None
  }, [url])

  let page_content = switch url.path {
  | list{"policies", year} => <PolicyComparisonIndex year={int_of_string(year)} />
  | list{"policies", year, ...policyPath} =>
    let policy = String.concat("/", policyPath)
    <PolicyComparisonIndex year={int_of_string(year)} policy_handle=j`$year/$policy` />
  | list{"policies"} => <Utils.SilentRedirect path="/policies/2019" />
  | list{"about"} => <AboutIndex />
  | list{"privacy"} => <PrivacyIndex />
  | list{} => <Utils.SilentRedirect path="/policies/2019" /> // <SplashIndex />
  | _ => <PageNotFound />
  }

  <LanguageContext language>
    <div className="page">
      <Header setLanguage /> <div className="container"> page_content </div> <Footer />
    </div>
  </LanguageContext>
}
