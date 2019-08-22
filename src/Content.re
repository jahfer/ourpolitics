/* Test */
[@bs.module] external test_en : string = "../content/test.en.md";
[@bs.module] external test_fr : string = "../content/test.fr.md";
let test : I18n.text = { en: test_en, fr: test_fr };