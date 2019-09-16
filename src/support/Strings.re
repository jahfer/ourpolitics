module Text = I18n.T({
  type t = I18n.text;
  let to_i18n_text = text => text;
});

module Language = I18n.T({
  type t = I18n.language;

  let to_i18n_text (lang: t) : I18n.text =
    switch (lang) {
    | EN => Content.Strings.language
    | FR => Content.Strings.language
    }
});

module Party = I18n.T({
  type t = Schema.party;

  let to_i18n_text (party: t) : I18n.text =
    switch (party) {
    | Liberal => Content.Strings.liberals
    | Conservative => Content.Strings.conservatives
    | NDP => Content.Strings.ndp
    | Green => Content.Strings.greens
    }
});

module Topic = I18n.T({
  type t = Schema.topic;
    
  open Content.Strings;
  let to_i18n_text (topic: t) : I18n.text =
    switch (topic) {
    | ForeignPolicy => foreign_policy
    | Taxes => taxes
    | InternationalTrade => international_trade
    | Environment => environment
    | Government => government
    | IndigenousRelations => indigenous_relations
    | Healthcare => healthcare
    | Infrastructure => infrastructure
    | Science => science
    | ChildCare => child_care
    | C51 => bill_c51
    | Cannabis => cannabis
    | SocialAssistance => social_assistance
    | Youth => youth
    | Senate => senate
    | ElectoralReform => electoral_reform
    }
});

module Translations = (L : I18n.LanguageSelection) => {
  module Text = Text.WithLanguage(L);
  module Party = Party.WithLanguage(L);
  module Topic = Topic.WithLanguage(L);
  module Language = Language.WithLanguage(L);
}