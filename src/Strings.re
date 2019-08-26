let title = I18n.{ en: "Topics", fr: "Sujets" };
let no_policy_listed = I18n.{ en: "No policy", fr: "Absence de politique" };
let hello_world = I18n.{ en: "Hello world!", fr: "?" }

module Text = I18n.T({
  type t = I18n.text;
  let to_i18n_text = text => text;
});

module Language = I18n.T({
  type t = I18n.language;

  let to_i18n_text (lang: t) : I18n.text =
    switch (lang) {
    | EN => { en: "en", fr: "fr" }
    | FR => { en: "en", fr: "fr" }
    }
});

module Party = I18n.T({
  type t = Schema.party;

  let to_i18n_text (party: t) : I18n.text =
    switch (party) {
    | Liberal => { en: "Liberals", fr: {js|Libéral|js} }
    | Conservative => { en: "Conservatives", fr: "Conservateur" }
    | NDP => { en: "NDP", fr: "NPD" }
    | Green => { en: "Green", fr: "Vert" }
    }
});

module Topic = I18n.T({
  type t = Schema.topic;  

  let to_i18n_text (topic: t) : I18n.text =
    switch (topic) {
    | Families => { en: "Families", fr: "?" }
    | ForeignPolicy => { en: "Foreign Policy", fr: "?" }
    | Taxes => { en: "Taxes", fr: "?" }
    | InternationalTrade => { en: "International Trade", fr: "?" }
    | Environment => { en: "Environment", fr: "?" }
    | Government => { en: "Government", fr: "?" }
    | IndigenousRelations => { en: "Indigenous Relations", fr: "?" }
    | Healthcare => { en: "Healthcare", fr: "?" }
    | Infrastructure => { en: "Infrastructure", fr: "?" }
    | Science => { en: "Science", fr: "?" }
    }
});

module I18n = (L : I18n.LanguageSelection) => {
  module Text = Text.WithLanguage(L);
  module Party = Party.WithLanguage(L);
  module Topic = Topic.WithLanguage(L);
}