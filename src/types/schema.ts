export const LanguageOption = {
  EN: "EN",
  FR: "FR",
} as const;

export type Language = typeof LanguageOption[keyof typeof LanguageOption];

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

export type TranslationString = Record<keyof typeof LanguageOption, string>;

export type Policy = {
  topic: string,
  party: Party,
  title: TranslationString,
  references: Array<Reference>,
  handle?: string
}