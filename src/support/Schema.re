type party =
  | Liberal
  | Conservative
  | NDP
  | Green;

type topic =
  | ForeignPolicy
  | Taxes
  | InternationalTrade
  | Environment
  | Government
  | IndigenousRelations
  | Healthcare
  | Infrastructure
  | Science
  | ChildCare
  | C51
  | Cannabis
  | SocialAssistance
  | Senate
  | ElectoralReform
  | Youth;

type reference = {
  date: option(string),
  publisher: string,
  title: string,
  url: string,
};

type rce = {
  reach: int,
  confidence: int,
  effort: int,
};

type policy = {
  topic,
  title: I18n.text,
  party,
  references: array(reference),
  handle: string,
  rce: option(rce),
};

module TopicMap =
  Map.Make({
    type t = topic;
    let compare = (a, b) => {
      switch (a, b) {
      | (x, y) when x == y => 0
      /* Sort order */
      | (ChildCare, _)
      | (C51, _)
      | (Taxes, _)
      | (InternationalTrade, _)
      | (Environment, _)
      | (Senate, _)
      | (Government, _)
      | (IndigenousRelations, _)
      | (Healthcare, _)
      | (Infrastructure, _)
      | (ForeignPolicy, _)
      | (Cannabis, _)
      | (SocialAssistance, _)
      | (Youth, _)
      | (ElectoralReform, _)
      | (Science, _) => (-1)
      };
    };
  });

module PartySet =
  Set.Make({
    type t = party;
    let compare = compare;
  });

module Decode = {
  open Json.Decode;

  let party = json =>
    string(json)
    |> (
      fun
      | "Liberal" => Liberal
      | "Conservative" => Conservative
      | "NDP" => NDP
      | "Green" => Green
      | _ as unknown_party => raise(Invalid_argument(unknown_party))
    );

  let str_to_topic =
    fun
    | "Foreign Policy" => ForeignPolicy
    | "Taxes" => Taxes
    | "International Trade" => InternationalTrade
    | "Environment" => Environment
    | "Government" => Government
    | "Senate" => Senate
    | "Electoral Reform" => ElectoralReform
    | "Indigenous Relations" => IndigenousRelations
    | "Healthcare" => Healthcare
    | "Infrastructure" => Infrastructure
    | "Science" => Science
    | "Child Care" => ChildCare
    | "C-51" => C51
    | "Cannabis" => Cannabis
    | "Social Assistance" => SocialAssistance
    | "Youth" => Youth
    | _ as unknown_topic => raise(Invalid_argument(unknown_topic));

  let topic = json => string(json) |> str_to_topic;

  let i18n_text = json =>
    I18n.{en: json |> field("en", string), fr: json |> field("fr", string)};

  let reference = json => {
    date: json |> optional(field("date", string)),
    publisher: json |> field("publisher", string),
    title: json |> field("title", string),
    url: json |> field("url", string),
  };

  let rce = json => {
    reach: json |> field("reach", int),
    confidence: json |> field("confidence", int),
    effort: json |> field("effort", int),
  };

  let policy = json => {
    topic: json |> field("topic", topic),
    title: json |> field("title", i18n_text),
    party: json |> field("party", party),
    references: json |> field("references", array(reference)),
    handle: json |> field("handle", string),
    rce: json |> optional(field("rce", rce)),
  };
};