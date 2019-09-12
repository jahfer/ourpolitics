type language = EN | FR;

type text = {
  en: string,
  fr: string,
};

module type Translatable = {
  type t;
  let to_i18n_text : t => text;
};

module Translate = (M : Translatable) => {
  include M;
  
  let to_str (~language: language, item: M.t) : string = {
    switch (language) {
    | EN => M.to_i18n_text(item).en
    | FR => M.to_i18n_text(item).fr
    }
  };

  let react_string (~language: language, item: M.t) = {
    to_str(item, ~language=language)->React.string;
  };
};

module type LanguageSelection = {
  let language : language;
};

module T = (M : Translatable) => {
  include Translate(M);
  module WithLanguage = (LS : LanguageSelection) => {
    module T = Translate(M);

    let to_str (item) = {
      T.to_str(~language=LS.language, item)
    }

    let react_string (item: M.t) = {
      T.to_str(item, ~language=LS.language)->React.string;
    };
  }
};