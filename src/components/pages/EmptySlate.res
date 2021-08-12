module CallToAction = {
  @react.component
  let make = (~url: string, ~text: I18n.text) => {
    let language = React.useContext(LanguageContext.ctx)
    module T = Strings.Translations({
      let language = language
    })

    <div className="hero-cta">
      <a href=url onClick={url->Utils.Router.push(~language)}>{text->T.text_react_string}</a>
    </div>
  }
}

module HeroText = {
  @react.component
  let make = (~title: I18n.text, ~subtitle: I18n.text) => {
    let language = React.useContext(LanguageContext.ctx)
    module T = Strings.Translations({
      let language = language
    })

    <div className="hero-text-group flex flex-col flex-grow">
      <hgroup>
        <h1 className="hero-text">{title->T.text_react_string}</h1>
        <h2 className="hero-subheading">{subtitle->T.text_react_string}</h2>
      </hgroup>
      <CallToAction url="/policies/2019" text=Content.Strings.hero_cta />
    </div>
  }
}

module HeroImage = {
  @react.component
  let make = (~src: string, ~alt: string) => 
    <div className="hero-image flex-fixed">
      <img src alt />
    </div>
}

module Row = {
  @react.component
  let make = (~children: React.element) =>
    <div className="flex align-items-center hero-row">
      children
    </div>
}

@module external hero_image: string = "!file-loader!image-webpack-loader!../../../img/ballot_box.svg"

@react.component
let make = () => {
  <section className="section hero">
    <Row>
      <HeroText title=Content.Strings.hero_election_notice subtitle=Content.Strings.hero_subtitle />
      <HeroImage src=hero_image alt="ballot box" />
    </Row>
  </section>
}
