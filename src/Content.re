[@bs.module] external test_en : string = "./policies/2019/test.en.md";
[@bs.module] external test_fr : string = "./policies/2019/test.fr.md";

let test : I18n.text = { en: test_en, fr: test_fr };

let pathToContent = fun
| "2019/test" => test
| _ => raise (Invalid_argument("Unknown content!"))
;