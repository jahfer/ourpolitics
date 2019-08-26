let dangerousHtml: string => Js.t('a) = html => {"__html": html};

module Router = {
  let push_route = (~language, path) => {
    ReasonReactRouter.push(path ++ "#" ++ Strings.Language.to_str(~language, language));
  }

  let push = (~language, path) => {
    (event) => {
      ReactEvent.Synthetic.preventDefault(event);
      push_route(~language, path)
    }
  }
}