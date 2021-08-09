type caches
type cache

@scope("self") @val external caches: caches = "caches"
let cache_available: bool = %raw(` 'caches' in window `)

let caches: option<caches> = cache_available ? Some(caches) : None

@send external locate: (caches, string) => Js.Promise.t<cache> = "open"
@send external keys: (caches) => Js.Promise.t<Js.Array.t<string>> = "keys"
@send external delete: (caches, string) => Js.Promise.t<bool> = "delete"
@send external put: (cache, string, Fetch.response) => Js.Promise.t<Fetch.response> = "put"
@send external match_: (cache, string) => Js.Promise.t<Js.Nullable.t<Fetch.response>> = "match"
@send external clone: Fetch.response => Fetch.response = "clone"

let fetch = (category: string, cache_version: int, url: string) =>
  switch caches {
  | Some(c) =>
    open Js.Promise

    let re = Js.Re.fromString(`${category}/(?!${string_of_int(cache_version)})`)
    let _ = keys(c) |> then_(ks => {
      Js.Array.forEach(k => {
        if Js.Re.test_(re, k) {
          let _ = delete(c, k)
        }
      }, ks);
    
      resolve ()
    })

    locate(c, `${category}/${string_of_int(cache_version)}`) |> then_(cache =>
      match_(cache, url) |> then_(cached_result =>
        switch Js.Nullable.toOption(cached_result) {
        | Some(r) => resolve(r)
        | None =>
          Fetch.fetch(url) |> then_(response => {
            let _ = put(cache, url, clone(response))
            response |> resolve
          })
        }
      )
    )
  | None => Fetch.fetch(url)
  }
