type party =
  | Liberal
  | Conservative
  | NDP
  | Green

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
  | PublicSafety
  | Youth
  | Education
  | Housing
  | Affordability

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
    | ChildCare => 1
    | C51 => 2
    | Taxes => 3
    | InternationalTrade => 4
    | Environment => 5
    | Senate => 6
    | Government => 7
    | Affordability => 8
    | Healthcare => 9
    | Infrastructure => 10
    | ForeignPolicy => 11
    | Cannabis => 12
    | SocialAssistance => 13
    | Youth => 14
    | ElectoralReform => 15
    | PublicSafety => 16
    | Education => 17
    | Housing => 18
    | Science => 19
    | IndigenousRelations => 20
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
    | PublicSafety => Content.Strings.public_safety
    | Education => Content.Strings.education
    | Housing => Content.Strings.housing
    | Affordability => Content.Strings.affordability
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
    | "Public Safety" => PublicSafety
    | "Education" => Education
    | "Housing" => Housing
    | "Affordability" => Affordability
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
