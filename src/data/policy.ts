import { Party, TranslationString } from "types/schema";
import { setItem, getItem, removeItem } from "./storage";

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
  handle?: string,
  id?: number,
  order?: number,
}

export async function byYear(year: string): Promise<Array<T>> {
  const response = await fetch(`/data/policies/${year}/policies.json`);
  const policies: Array<T> = await response.json();
  return policies;
}

export async function all(): Promise<T[]> {
  const policies = await Promise.all(["2015", "2019", "2021"].map(async year => await byYear(year)));
  const allPolicies = policies.flat();
  return allPolicies;
}

export function toDataset(policies: Array<T>): Map<string, Array<T>> {
  const dataset = new Map<string, Array<T>>();
  policies.forEach((policy) => {
    if (dataset.has(policy.topic)) {
      dataset.get(policy.topic)?.push(policy);
    } else {
      dataset.set(policy.topic, [policy]);
    }
  });
  return dataset;
}

export function topicsInDataset(dataset: Map<string, Array<T>>): Array<string> {
  return Array.from(dataset.keys()).sort((a, b) => a.localeCompare(b));
}

export function saveSelectedTopics(year: string, topics: Array<string>): void {
  setItem(`selectedTopics:${year}`, topics);
}

export function clearSelectedTopics(year: string): void {
  removeItem(`selectedTopics:${year}`);
}

export function loadSelectedTopics(year: string): Array<string> {
  return getItem(`selectedTopics:${year}`, []);
}

export function partyToAcronym(party: Party) {
  switch (party) {
    case Party.Conservative:
      return "CPC";
    case Party.Green:
      return "GPC";
    case Party.Liberal:
      return "LPC";
    case Party.NDP:
      return "NDP";
    case Party.Bloc:
      return "BQ";
    default:
      const _exhaustiveCheck: never = party;
      return _exhaustiveCheck;
  }
}