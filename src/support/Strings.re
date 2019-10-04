module Text =
  I18n.T({
    type t = I18n.text;
    let to_i18n_text = text => text;
  });

module Language =
  I18n.T({
    type t = I18n.language;

    let to_i18n_text = (lang: t): I18n.text =>
      switch (lang) {
      | EN => Content.Strings.language
      | FR => Content.Strings.language
      };
  });

module Party =
  I18n.T({
    type t = Schema.party;

    let to_i18n_text = (party: t): I18n.text =>
      switch (party) {
      | Liberal => Content.Strings.liberals
      | Conservative => Content.Strings.conservatives
      | NDP => Content.Strings.ndp
      | Green => Content.Strings.greens
      };
  });

module Topic =
  I18n.T({
    type t = Schema.topic;
    let to_i18n_text = Schema.Encode.topic;
  });

module Translations = (L: I18n.LanguageSelection) => {
  module Text = Text.WithLanguage(L);
  module Party = Party.WithLanguage(L);
  module Topic = Topic.WithLanguage(L);
  module Language = Language.WithLanguage(L);
};