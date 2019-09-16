let ctx = React.createContext(I18n.EN);

let makeProps = (~language, ~children, ()) => {
  "value": language,
  "children": children,
};

let make = React.Context.provider(ctx);