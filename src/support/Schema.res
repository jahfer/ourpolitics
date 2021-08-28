type party =
  | Liberal
  | Conservative
  | NDP
  | Green

type topic =
  | ForeignPolicy
  | Economy
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
  | CivilRights
  | Youth
  | Education
  | Housing
  | Affordability
  | ArtsCulture
  | Immigration

type reference = {
  date: option<string>,
  publisher: string,
  title: string,
  url: string,
}

type rce = {
  reach: int,
  confidence: int,
  effort: int,
}

type policy = {
  topic: topic,
  title: I18n.text,
  party: party,
  references: array<reference>,
  handle: option<string>,
  rce: option<rce>,
}

module TopicMap = Map.Make({
  type t = topic

  let compare_topics = x =>
    switch x {
    | Housing => 0
    | ChildCare => 1
    | Taxes => 2
    | Environment => 3
    | IndigenousRelations => 4
    | Economy => 5
    | Senate => 6
    | Healthcare => 7
    | Infrastructure => 8
    | ForeignPolicy => 9
    | Cannabis => 10
    | SocialAssistance => 11
    | Government => 12
    | Affordability => 13
    | Youth => 14
    | ElectoralReform => 15
    | CivilRights => 16
    | Education => 17
    | C51 => 18
    | Science => 19
    | InternationalTrade => 20
    | Immigration => 21
    | ArtsCulture => 22
    }

  let compare = (a, b) => compare_topics(a) - compare_topics(b)
})

module PartySet = Set.Make({
  type t = party
  let compare = compare
})

module TopicSet = Set.Make({
  type t = topic
  let compare = compare
})

module Encode = {
  let party = x =>
    switch x {
    | Liberal => Content.Strings.liberals
    | Conservative => Content.Strings.conservatives
    | NDP => Content.Strings.ndp
    | Green => Content.Strings.greens
    }

  let topic = x =>
    switch x {
    | ForeignPolicy => Content.Strings.foreign_policy
    | Economy => Content.Strings.economy
    | Taxes => Content.Strings.taxes
    | InternationalTrade => Content.Strings.international_trade
    | Environment => Content.Strings.environment
    | Government => Content.Strings.government
    | IndigenousRelations => Content.Strings.indigenous_relations
    | Healthcare => Content.Strings.healthcare
    | Infrastructure => Content.Strings.infrastructure
    | Science => Content.Strings.science
    | ChildCare => Content.Strings.child_care
    | C51 => Content.Strings.bill_c51
    | Cannabis => Content.Strings.cannabis
    | SocialAssistance => Content.Strings.social_assistance
    | Youth => Content.Strings.youth
    | Senate => Content.Strings.senate
    | ElectoralReform => Content.Strings.electoral_reform
    | CivilRights => Content.Strings.civil_rights
    | Education => Content.Strings.education
    | Housing => Content.Strings.housing
    | Affordability => Content.Strings.affordability
    | ArtsCulture => Content.Strings.arts_and_culture
    | Immigration => Content.Strings.immigration
    }
}

module Decode = {
  open Json.Decode

  let party = json =>
    string(json) |> (
      x =>
        switch x {
        | "Liberal" => Liberal
        | "Conservative" => Conservative
        | "NDP" => NDP
        | "Green" => Green
        | _ as unknown_party => raise(Invalid_argument(unknown_party))
        }
    )

  let str_to_topic = x =>
    switch x {
    | "Foreign Policy" => ForeignPolicy
    | "Economy" => Economy
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
    | "Social Assistance" => SocialAssistance // TODO: Remove
    | "Financial Support" => SocialAssistance
    | "Youth" => Youth
    | "Public Safety" => CivilRights // TODO: Remove
    | "Civil Rights" => CivilRights
    | "Education" => Education
    | "Housing" => Housing
    | "Affordability" => Affordability
    | "Arts and Culture" => ArtsCulture
    | "Immigration" => Immigration
    | _ as unknown_topic => raise(Invalid_argument(unknown_topic))
    }

  let topic = json => string(json) |> str_to_topic

  let i18n_text = json => {
    open I18n
    {en: json |> field("en", string), fr: json |> field("fr", string)}
  }

  let reference = json => {
    date: json |> optional(field("date", string)),
    publisher: json |> field("publisher", string),
    title: json |> field("title", string),
    url: json |> field("url", string),
  }

  let rce = json => {
    reach: json |> field("reach", int),
    confidence: json |> field("confidence", int),
    effort: json |> field("effort", int),
  }

  let policy = json => {
    topic: json |> field("topic", topic),
    title: json |> field("title", i18n_text),
    party: json |> field("party", party),
    references: json |> field("references", array(reference)),
    handle: json |> optional(field("handle", string)),
    rce: json |> optional(field("rce", rce)),
  }
}
