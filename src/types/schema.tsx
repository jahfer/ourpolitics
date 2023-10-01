export const Language = {
  EN: "EN",
  FR: "FR",
} as const;

export enum Party {
  Liberal = "Liberal",
  Conservative = "Conservative",
  NDP = "NDP",
  Green = "Green",
}

export type Reference = {
  date?: string,
  publisher: string,
  title: string,
  url: string,
}

export type TString = Record<keyof typeof Language, string>;

export type Policy = {
  topic: string,
  party: Party,
  title: TString,
  references: Array<Reference>,
  handle?: string
}