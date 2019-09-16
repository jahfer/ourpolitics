/* [@react.component]
let make = (~year = 2019) => {
  let language = React.useContext(LanguageContext.ctx);
  module T = Strings.Translations({ let language = language });

  let (postalCode, setPostalCode) = React.useState(() => "K4A4W3")
  let (content, setContent) = React.useState(() => "");

  React.useEffect1(() => {
    let handler = "someFoo";
    let url = {js|https://represent.opennorth.ca/postcodes/$postalCode/?sets=federal-electoral-districts&format=json&callback=$handler|js};

    let _ = Js.Promise.(
      Fetch.fetch(url)
      |> then_(Fetch.Response.json)
      |> then_(html => setContent(_ => html) |> resolve)
    );
    Some(_ => setContent(_ => ""));
  }, [|postalCode|]);

  <section className="section">
    <h1> Content.Strings.about->T.Text.react_string </h1>
  </section>
} */