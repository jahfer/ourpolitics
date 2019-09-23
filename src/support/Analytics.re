[@bs.val] external analytics : option(bool) = "ga";
[@bs.val] external setPage : ([@bs.as "gtag_UA_68374477_1.set"] _, [@bs.as "page"] _, string) => unit = "ga";
[@bs.val] external sendPageview : ([@bs.as "gtag_UA_68374477_1.send"] _, [@bs.as "pageview"] _, unit) => unit = "ga";

let pageLoad = (~path : string) => 
  switch (Js.typeof(analytics)) {
  | "undefined" => ()
  | _ => {
      setPage(path);
      sendPageview();
    };
  }