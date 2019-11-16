module LinkedCardRow = {
  [@react.component]
  let make = (~children) => {
    <ul className="card-row list-plain text-large">
      children
    </ul>
  }
}

module LinkedCard = {
  [@react.component]
  let make = (~path, ~children) => {
  let language = React.useContext(LanguageContext.ctx);
    <a className="card shadow-on-hover text-center no-border" href=path onClick={Utils.Router.push(~language, path)}> 
      <li>children</li>
    </a>
  }
}

[@react.component]
let make = () => {
  let language = React.useContext(LanguageContext.ctx);
  module T =
    Strings.Translations({
      let language = language;
    });

  <>
    <nav className="section">
      <LinkedCardRow>
        <LinkedCard path="/policies">
          Content.Strings.elections->T.Text.react_string
        </LinkedCard>
        <LinkedCard path="/climate">
          Content.Strings.climate->T.Text.react_string
        </LinkedCard>
      </LinkedCardRow>
    </nav>
  </>;
};