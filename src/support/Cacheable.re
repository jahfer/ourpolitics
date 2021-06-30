type caches;
type cache;

[@bs.scope "self"] [@bs.val] external caches: caches = "caches";
let cache_available : bool = [%bs.raw {| 'caches' in window |}];

let caches : option(caches) = switch (cache_available) {
| true => Some(caches)
| false => None
};

[@bs.send] external locate : (caches, string) => Js.Promise.t(cache) = "open";
[@bs.send] external put : (cache, string, Fetch.response) => Js.Promise.t(Fetch.response) = "put";
[@bs.send] external match : (cache, string) => Js.Promise.t(Js.Nullable.t(Fetch.response)) = "match";
[@bs.send] external clone : (Fetch.response) => Fetch.response = "clone";

let fetch = (cache_version: string, url: string) => {
  switch (caches) {
  | Some(c) => {
    Js.Promise.(
      locate(c, cache_version)
      |> then_(cache => match(cache, url) |> then_(cached_result => 
          switch (Js.Nullable.toOption(cached_result)) {
          | Some(r) => resolve(r)
          | None => Fetch.fetch(url) |> then_(response => {
              let _ = put(cache, url, clone(response));
              response |> resolve
            })
          })
      )
    )
  }
  | None => Fetch.fetch(url)
  }
}