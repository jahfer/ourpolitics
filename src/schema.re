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