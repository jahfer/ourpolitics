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
  "topic.foreign-policy": {
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
  "topic.international-trade": {
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
  "topic.indigenous-relations": {
    EN: "Indigenous Relations",
    FR: `Peuples autochtones`,
  },
  "topic.health-and-safety": {
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
  "topic.social-assistance": {
    EN: "Financial Support",
    FR: `Soutien financier`,
  },
  "topic.youth_child-care": {
    EN: "Youth & Child Care",
    FR: `Jeunesse et soin des enfants`,
  },
  "topic.senate": {
    EN: "Senate",
    FR: `Sénat`,
  },
  "topic.civil-rights": {
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
  "topic.arts-and-culture": {
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
  },
  "select_all": {
    EN: "Select all",
    FR: `Tout sélectionner`
  },
  "select_none": {
    EN: "Select none",
    FR: "Sélectionner aucun"
  },
  "no_topics_selected": {
    EN: `No topics selected. Try selecting a few by clicking on "Topics" above.`,
    FR: `Aucun sujet n'a été sélectionné. Essayez d'en sélectionner quelques-uns en cliquant sur "Sujets" ci-dessus.`
  },
};

export default translations;