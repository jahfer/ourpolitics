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
  Bloc = "Bloc",
}

export type TranslationString = Record<keyof typeof LanguageOption, string>;