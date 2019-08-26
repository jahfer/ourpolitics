type party =
  | Liberal
  | Conservative
  | NDP
  | Green
  ;

type topic = 
  | Families
  | ForeignPolicy
  | Taxes
  | InternationalTrade
  | Environment
  | Government
  | IndigenousRelations
  | Healthcare
  | Infrastructure
  | Science
  ;

type reference = {
  date: string,
  publisher: string,
  title: string,
  url: string,
};

type policy = {
  topic: topic,
  title: I18n.text,
  summary: I18n.text,
  party: party,
  references: array(reference),
  details: I18n.text
};

module TopicMap = Map.Make({
  type t = topic;
  let compare = compare;
});

module PartySet = Set.Make({
  type t = party;
  let compare = compare;
});

module Decode = {
  open Json.Decode;

  let party = json => 
    string(json) |> fun
    | "Liberal" => Liberal 
    | "Conservative" => Conservative 
    | "NDP" => NDP
    | "Green" => Green
    | _ as unknown_party => raise(Invalid_argument(unknown_party))
    ; 

  let topic = json =>
    string(json) |> fun
    | "Families" => Families
    | "Foreign Policy" => ForeignPolicy
    | "Taxes" => Taxes
    | "International Trade" => InternationalTrade
    | "Environment" => Environment
    | "Government" => Government
    | "Indigenous Relations" => IndigenousRelations
    | "Healthcare" => Healthcare
    | "Infrastructure" => Infrastructure
    | "Science" => Science
    | _ as unknown_topic => raise(Invalid_argument(unknown_topic))
    ;

  let i18n_text = json =>
    I18n.{
      en: json |> field("en", string),
      fr: json |> field("fr", string),
    }

  let reference = json =>
    {
      date: json |> field("date", string),
      publisher: json |> field("publisher", string),
      title: json |> field("title", string),
      url: json |> field("url", string),
    }

  let policy = json =>
    {
      topic: json |> field("topic", topic),
      title: json |> field("title", i18n_text),
      summary: json |> field("summary", i18n_text),
      party: json |> field("party", party),
      references: json |> field("references", array(reference)),
      details: json |> field("details", i18n_text)
    };
};