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

export type ReferenceType = {
  date?: string,
  publisher: string,
  title: string,
  url: string,
}

export type TranslationString = Record<keyof typeof LanguageOption, string>;

export type Policy = {
  topic: string,
  year: number,
  party: Party,
  title: TranslationString,
  references: Array<ReferenceType>,
  handle?: string
}