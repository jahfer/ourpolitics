@val external analytics: option<bool> = "ga"
@val external setPage: (@as("set") _, @as("page") _, string) => unit = "ga"
@val external sendPageview: (@as("send") _, @as("pageview") _, unit) => unit = "ga"

let pageLoad = (~path: string) =>
  switch Js.typeof(analytics) {
  | "undefined" => ()
  | _ =>
    setPage(path)
    sendPageview()
  }
