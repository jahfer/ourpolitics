import { Party, TranslationString } from "types/schema";

export type ReferenceType = {
  date?: string,
  publisher: string,
  title: string,
  url: string,
}

export type T = {
  topic: string,
  year: number,
  party: Party,
  title: TranslationString,
  references: Array<ReferenceType>,
  handle?: string
}

export async function byYear(year: number) {
  const response = await fetch(`/policies/${year}/policies.json`);
  const policies: Array<T> = await response.json();
  return policies;
}

export async function all(): Promise<T[]> {
  const policies = await Promise.all([2015, 2019, 2021].map(async year => await byYear(year)));
  const allPolicies = policies.flat();
  return allPolicies;
}