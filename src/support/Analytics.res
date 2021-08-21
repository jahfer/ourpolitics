@val external analytics: option<bool> = "ga"
@val external setPage: (@as("gtag_UA_68374477_1.set") _, @as("page") _, string) => unit = "ga"
@val external sendPageview: (@as("gtag_UA_68374477_1.send") _, @as("pageview") _, unit) => unit = "ga"

let pageLoad = (~path: string) =>
  switch Js.typeof(analytics) {
  | "undefined" => ()
  | _ =>
    setPage(path)
    sendPageview()
  }
