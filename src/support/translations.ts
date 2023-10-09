import { TranslationString } from '../types/schema';

const translations: Record<string, TranslationString | ((...args: any[]) => TranslationString)> = {
  "our_politics": {
    EN: "Our Politics",
    FR: "Notre politique"
  },
  "topics": {
    EN: "Topics",
    FR: "Sujets"
  },
  "no_policy_listed": {
    EN: "No major policies announced",
    FR: `Aucune politique majeure annoncée`,
  },
  "archives": {
    EN: "Archives",
    FR: `Archives`,
  },
  "about": {
    EN: "About",
    FR: `À propos`,
  },
  "privacy_policy": {
    EN: "Privacy",
    FR: `Confidentialité`,
  },
  "liberal": {
    EN: "Liberals",
    FR: `Libéral`,
  },
  "conservative": {
    EN: "Conservatives",
    FR: "Conservateur",
  },
  "ndp": {
    EN: "NDP",
    FR: "NPD",
  },
  "green": {
    EN: "Green",
    FR: "Vert",
  },
  "topic.foreign_policy": {
    EN: "Foreign Policy",
    FR: `Affaires étrangères`,
  },
  "topic.economy": {
    EN: "Economy & Business",
    FR: `Économie et entreprises`
  },
  "topic.taxes": {
    EN: "Taxes",
    FR: `Taxes et impôts`,
  },
  "topic.international_trade": {
    EN: "International Trade",
    FR: `Commerce international`,
  },
  "topic.environment": {
    EN: "Environment",
    FR: `Environnement`,
  },
  "topic.government": {
    EN: "Government",
    FR: `Gouvernement`,
  },
  "topic.indigenous_relations": {
    EN: "Indigenous Relations",
    FR: `Peuples autochtones`,
  },
  "topic.healthcare": {
    EN: "Health & Safety",
    FR: `Santé et sécurité`,
  },
  "topic.infrastructure": {
    EN: "Infrastructure",
    FR: `Infrastructures`,
  },
  "topic.science": {
    EN: "Science",
    FR: `Science`,
  },
  "topic.child_care": {
    EN: "Child Care",
    FR: `Soin des enfants`,
  },
  "topic.bill_c51": {
    EN: "Bill C-51",
    FR: `Projet de loi C-51`,
  },
  "topic.cannabis": {
    EN: "Cannabis",
    FR: `Cannabis`,
  },
  "topic.social_assistance": {
    EN: "Financial Support",
    FR: `Soutien financier`,
  },
  "topic.youth": {
    EN: "Youth",
    FR: `Jeunesse`,
  },
  "topic.senate": {
    EN: "Senate",
    FR: `Sénat`,
  },
  "topic.electoral_reform": {
    EN: "Electoral Reform",
    FR: `Réforme électorale`,
  },
  "topic.civil_rights": {
    EN: "Civil Rights",
    FR: `Droits civils`,
  },
  "topic.education": {
    EN: "Education",
    FR: `Éducation`,
  },
  "topic.housing": {
    EN: "Housing",
    FR: `Logement`,
  },
  "topic.affordability": {
    EN: "Affordability",
    FR: `Coût de la vie`,
  },
  "topic.arts_and_culture": {
    EN: "Arts & Culture",
    FR: "Arts et culture",
  },
  "topic.immigration": {
    EN: "Immigration",
    FR: "Immigration",
  },
  "policy_comparison_title": (year: number) => ({
    EN: `${year} Policies`,
    FR: `Enjeux ${year}`,
  }),
  "election_notice": {
    EN: "The election is today! Be sure to check your local <a target='_blank' href='https://www.elections.ca/content2.aspx?section=faq&dir=votinghours&document=index&lang=e'>voting&nbsp;hours&nbsp;&rarr;</a>",
    FR: `Les élections ont lieu aujourd'hui&nbsp;! Vérifiez les <a target='_blank' href='https://www.elections.ca/content2.aspx?section=faq&dir=votinghours&document=index&lang=f'>heures de vote de votre localité&nbsp;&rarr;</a>`
  },
  // "hero.election_notice": {
  //   EN: "The election is underway!",
  //   FR: `L'élection est en cours!`
  // },
  // "hero.subtitle": {
  //   EN: "Stay tuned for new policies in the coming weeks.",
  //   FR: `Restez à l'écoute des nouvelles politiques dans les semaines à venir.`
  // },
  // "hero.cta": {
  //   EN: "Read the 2021 policies",
  //   FR: `Lire les politiques de 2021`
  // },
  "modal.references": {
    EN: "References",
    FR: `Références`
  },
  "modal.random_policy": {
    EN: "Read another policy",
    FR: "Lire une autre politique"
  }
};

export default translations;