[@bs.scope "window"] [@bs.val]
external scrollTo: (int, int) => unit = "scrollTo";

[@bs.val] external window: Dom.window = "window";

[@bs.send.pipe: Dom.window]
external addScrollEventListener:
  ([@bs.as "scroll"] _, Dom.uiEvent => unit) => unit =
  "addEventListener";

[@bs.scope "window"] [@bs.val]
external requestAnimationFrame: (unit => unit) => unit =
  "requestAnimationFrame";

[@bs.scope "window"] [@bs.val] external pageYOffset: int = "pageYOffset";

let dangerousHtml: string => Js.t('a) = html => {"__html": html};

let rec partition_predicate = (~f: 'a => 'b, ~init=[], lst: list('a)) => {
  let comparison = f(List.hd(lst));
  let (matched, remaining_items) =
    List.partition(a => f(a) == comparison, lst);
  let acc = [matched, ...init];
  switch (remaining_items) {
  | [] => acc
  | [_] => [remaining_items, ...acc]
  | _ => remaining_items |> partition_predicate(~f, ~init=acc)
  };
};

module Router = {
  let restoreScrollPosition = () => {
    scrollTo(0, 0);
  };

  let replace_route = (~language, path) => {
    ReasonReactRouter.replace(
      path ++ "#" ++ Strings.Language.to_str(~language, language),
    );
    let _ = Analytics.pageLoad(~path);
    restoreScrollPosition();
  };

  let push_route = (~scrollToTop=true, ~language, path) => {
    ReasonReactRouter.push(
      path ++ "#" ++ Strings.Language.to_str(~language, language),
    );
    let _ = Analytics.pageLoad(~path);
    if (scrollToTop) {
      restoreScrollPosition();
    };
  };

  let push = (~language, path, event) => {
    ReactEvent.Synthetic.preventDefault(event);
    push_route(~language, path);
  };
};