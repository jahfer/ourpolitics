open I18n

module Strings = {
  let our_politics = {
    en: "Our Politics",
    fr: "Notre Politique"
  }
  let title = {
    en: "Topics",
    fr: "Sujets",
  }
  let no_policy_listed = {
    en: "No major policies announced",
    fr: "Aucune politique majeure annoncée",
  }
  let archives = {
    en: "Archives",
    fr: `Archives`,
  }
  let language = {
    en: "en",
    fr: "fr",
  }
  let about = {
    en: "About",
    fr: `À propos`,
  }
  let privacy_policy = {
    en: "Privacy",
    fr: `Confidentialité`,
  }

  let liberals = {
    en: "Liberals",
    fr: `Libéral`,
  }
  let conservatives = {
    en: "Conservatives",
    fr: "Conservateur",
  }
  let ndp = {
    en: "NDP",
    fr: "NPD",
  }
  let greens = {
    en: "Green",
    fr: "Vert",
  }

  let reach = {
    en: "Reach",
    fr: `Atteindre`,
  }
  let confidence = {
    en: "Confidence",
    fr: `Confiance`,
  }
  let effort = {
    en: "Effort",
    fr: `Effort`,
  }

  let foreign_policy = {
    en: "Foreign Policy",
    fr: `Affaires étrangères`,
  }
  let economy = {
    en: "Economy",
    fr: `Économie`
  }
  let taxes = {
    en: "Taxes",
    fr: `Taxes et impôts`,
  }
  let international_trade = {
    en: "International Trade",
    fr: `Commerce international`,
  }
  let environment = {
    en: "Environment",
    fr: `Environnement`,
  }
  let government = {
    en: "Government",
    fr: `Gouvernement`,
  }
  let indigenous_relations = {
    en: "Indigenous Relations",
    fr: `Peuples autochtones`,
  }
  let healthcare = {
    en: "Healthcare",
    fr: `Soins de santé`,
  }
  let infrastructure = {
    en: "Infrastructure",
    fr: `Infrastructures`,
  }
  let science = {
    en: "Science",
    fr: `Science`,
  }
  let child_care = {
    en: "Child Care",
    fr: `Soin des enfants`,
  }
  let bill_c51 = {
    en: "Bill C-51",
    fr: `Projet de loi C-51`,
  }
  let cannabis = {
    en: "Cannabis",
    fr: `Cannabis`,
  }
  let social_assistance = {
    en: "Financial Support",
    fr: `Soutien financier`,
  }
  let youth = {
    en: "Youth",
    fr: `Jeunesse`,
  }
  let senate = {
    en: "Senate",
    fr: `Sénat`,
  }
  let electoral_reform = {
    en: "Electoral Reform",
    fr: `Réforme électorale`,
  }
  let civil_rights = {
    en: "Civil Rights",
    fr: `Droits civils`,
  }
  let education = {
    en: "Education",
    fr: `Éducation`,
  }
  let housing = {
    en: "Housing",
    fr: `Logement`,
  }
  let affordability = {
    en: "Affordability",
    fr: `Coût de la vie`,
  }
  let arts_and_culture = {
    en: "Arts & Culture",
    fr: "Arts et culture",
  }
  let immigration = {
    en: "Immigration",
    fr: "Immigration",
  }
  let policy_comparison_title = (~year) => {
    en: j`$year Policies`,
    fr: j`Enjeux $year`,
  }
  let election_notice = {
    en: "We're working on making these policies easier to understand. Stay tuned for updates in the coming weeks.",
    fr: `Nous travaillons à rendre ces politiques plus faciles à comprendre. Restez à l'écoute des mises à jour dans les semaines à venir.`
  }
  let hero_election_notice = {
    en: "The election is underway!",
    fr: `L'élection est en cours!`
  }
  let hero_subtitle = {
    en: "Stay tuned for new policies in the coming weeks.",
    fr: `Restez à l'écoute des nouvelles politiques dans les semaines à venir.`
  }
  let hero_cta = {
    en: "Read the 2021 policies",
    fr: `Lire les politiques de 2021`
  }
}

/*
   I know this seems over-the-top, but explicitly writing out the Markdown
   filepaths lets Webpack convert the files to HTML at compile-time, so we
   don't have to parse the Markdown at runtime. It also lets us defer
   loading the content by replacing these paths with [hash].html links.
 */

/* 2021 */
module Y2021 = {
  module NDP = {
    @module external wealth_tax_en: string = "../policies/2021/ndp/wealth_tax.en.md"
    @module external wealth_tax_fr: string = "../policies/2021/ndp/wealth_tax.fr.md"

    @module external corporate_tax_rate_en: string = "../policies/2021/ndp/corporate_tax_rate.en.md"
    @module external corporate_tax_rate_fr: string = "../policies/2021/ndp/corporate_tax_rate.fr.md"

    @module external income_tax_rate_en: string = "../policies/2021/ndp/income_tax_rate.en.md"
    @module external income_tax_rate_fr: string = "../policies/2021/ndp/income_tax_rate.fr.md"

    @module external capital_gains_en: string = "../policies/2021/ndp/capital_gains.en.md"
    @module external capital_gains_fr: string = "../policies/2021/ndp/capital_gains.fr.md"
  }
  module Liberals = {
    @module external x_en: string = "../policies/2021/liberals/x.en.md"
    @module external x_fr: string = "../policies/2021/liberals/x.fr.md"
  }
  module Conservatives = {
    @module external x_en: string = "../policies/2021/conservatives/x.en.md"
    @module external x_fr: string = "../policies/2021/conservatives/x.fr.md"
  }
}

/* 2015 */
@module external cpc_aboriginal_funding_en: string = "../policies/2015/cpc_aboriginal_funding.en.md"
@module external cpc_aboriginal_funding_fr: string = "../policies/2015/cpc_aboriginal_funding.fr.md"
@module external cpc_aboriginal_relations_en: string = "../policies/2015/cpc_aboriginal_relations.en.md"
@module external cpc_aboriginal_relations_fr: string = "../policies/2015/cpc_aboriginal_relations.fr.md"
@module external cpc_c51_en: string = "../policies/2015/cpc_c51.en.md"
@module external cpc_c51_fr: string = "../policies/2015/cpc_c51.fr.md"
@module external cpc_home_renovation_en: string = "../policies/2015/cpc_home_renovation.en.md"
@module external cpc_home_renovation_fr: string = "../policies/2015/cpc_home_renovation.fr.md"
@module external cpc_infrastructure_en: string = "../policies/2015/cpc_infrastructure.en.md"
@module external cpc_infrastructure_fr: string = "../policies/2015/cpc_infrastructure.fr.md"
@module external cpc_isis_en: string = "../policies/2015/cpc_isis.en.md"
@module external cpc_isis_fr: string = "../policies/2015/cpc_isis.fr.md"
@module external cpc_marijuana_en: string = "../policies/2015/cpc_marijuana.en.md"
@module external cpc_marijuana_fr: string = "../policies/2015/cpc_marijuana.fr.md"
@module external cpc_pipeline_en: string = "../policies/2015/cpc_pipeline.en.md"
@module external cpc_pipeline_fr: string = "../policies/2015/cpc_pipeline.fr.md"
@module external cpc_reform_en: string = "../policies/2015/cpc_reform.en.md"
@module external cpc_reform_fr: string = "../policies/2015/cpc_reform.fr.md"
@module external cpc_refugees_en: string = "../policies/2015/cpc_refugees.en.md"
@module external cpc_refugees_fr: string = "../policies/2015/cpc_refugees.fr.md"
@module external cpc_rrsp_en: string = "../policies/2015/cpc_rrsp.en.md"
@module external cpc_rrsp_fr: string = "../policies/2015/cpc_rrsp.fr.md"
@module external cpc_senate_en: string = "../policies/2015/cpc_senate.en.md"
@module external cpc_senate_fr: string = "../policies/2015/cpc_senate.fr.md"
@module external cpc_seniors_en: string = "../policies/2015/cpc_seniors.en.md"
@module external cpc_seniors_fr: string = "../policies/2015/cpc_seniors.fr.md"
@module external cpc_tfsa_en: string = "../policies/2015/cpc_tfsa.en.md"
@module external cpc_tfsa_fr: string = "../policies/2015/cpc_tfsa.fr.md"
@module external cpc_tpp_en: string = "../policies/2015/cpc_tpp.en.md"
@module external cpc_tpp_fr: string = "../policies/2015/cpc_tpp.fr.md"
@module external cpc_uccb_en: string = "../policies/2015/cpc_uccb.en.md"
@module external cpc_uccb_fr: string = "../policies/2015/cpc_uccb.fr.md"
@module external lpc_aboriginal_education_en: string = "../policies/2015/lpc_aboriginal_education.en.md"
@module external lpc_aboriginal_education_fr: string = "../policies/2015/lpc_aboriginal_education.fr.md"
@module external lpc_aboriginal_relations_en: string = "../policies/2015/lpc_aboriginal_relations.en.md"
@module external lpc_aboriginal_relations_fr: string = "../policies/2015/lpc_aboriginal_relations.fr.md"
@module external lpc_c51_en: string = "../policies/2015/lpc_c51.en.md"
@module external lpc_c51_fr: string = "../policies/2015/lpc_c51.fr.md"
@module external lpc_carbon_tax_en: string = "../policies/2015/lpc_carbon_tax.en.md"
@module external lpc_carbon_tax_fr: string = "../policies/2015/lpc_carbon_tax.fr.md"
@module external lpc_ccb_en: string = "../policies/2015/lpc_ccb.en.md"
@module external lpc_ccb_fr: string = "../policies/2015/lpc_ccb.fr.md"
@module external lpc_green_tech_en: string = "../policies/2015/lpc_green_tech.en.md"
@module external lpc_green_tech_fr: string = "../policies/2015/lpc_green_tech.fr.md"
@module external lpc_healthcare_en: string = "../policies/2015/lpc_healthcare.en.md"
@module external lpc_healthcare_fr: string = "../policies/2015/lpc_healthcare.fr.md"
@module external lpc_homecare_en: string = "../policies/2015/lpc_homecare.en.md"
@module external lpc_homecare_fr: string = "../policies/2015/lpc_homecare.fr.md"
@module external lpc_income_splitting_en: string = "../policies/2015/lpc_income_splitting.en.md"
@module external lpc_income_splitting_fr: string = "../policies/2015/lpc_income_splitting.fr.md"
@module external lpc_infrastructure_bank_en: string = "../policies/2015/lpc_infrastructure_bank.en.md"
@module external lpc_infrastructure_bank_fr: string = "../policies/2015/lpc_infrastructure_bank.fr.md"
@module external lpc_infrastructure_investment_en: string =
  "../policies/2015/lpc_infrastructure_investment.en.md"
@module external lpc_infrastructure_investment_fr: string =
  "../policies/2015/lpc_infrastructure_investment.fr.md"
@module external lpc_isis_en: string = "../policies/2015/lpc_isis.en.md"
@module external lpc_isis_fr: string = "../policies/2015/lpc_isis.fr.md"
@module external lpc_marijuana_en: string = "../policies/2015/lpc_marijuana.en.md"
@module external lpc_marijuana_fr: string = "../policies/2015/lpc_marijuana.fr.md"
@module external lpc_mental_healthcare_en: string = "../policies/2015/lpc_mental_healthcare.en.md"
@module external lpc_mental_healthcare_fr: string = "../policies/2015/lpc_mental_healthcare.fr.md"
@module external lpc_middle_class_taxes_en: string = "../policies/2015/lpc_middle_class_taxes.en.md"
@module external lpc_middle_class_taxes_fr: string = "../policies/2015/lpc_middle_class_taxes.fr.md"
@module external lpc_pipeline_en: string = "../policies/2015/lpc_pipeline.en.md"
@module external lpc_pipeline_fr: string = "../policies/2015/lpc_pipeline.fr.md"
@module external lpc_reform_en: string = "../policies/2015/lpc_reform.en.md"
@module external lpc_reform_fr: string = "../policies/2015/lpc_reform.fr.md"
@module external lpc_refugees_en: string = "../policies/2015/lpc_refugees.en.md"
@module external lpc_refugees_fr: string = "../policies/2015/lpc_refugees.fr.md"
@module external lpc_science_officer_en: string = "../policies/2015/lpc_science_officer.en.md"
@module external lpc_science_officer_fr: string = "../policies/2015/lpc_science_officer.fr.md"
@module external lpc_senate_en: string = "../policies/2015/lpc_senate.en.md"
@module external lpc_senate_fr: string = "../policies/2015/lpc_senate.fr.md"
@module external lpc_seniors_income_splitting_en: string =
  "../policies/2015/lpc_seniors_income_splitting.en.md"
@module external lpc_seniors_income_splitting_fr: string =
  "../policies/2015/lpc_seniors_income_splitting.fr.md"
@module external lpc_seniors_en: string = "../policies/2015/lpc_seniors.en.md"
@module external lpc_seniors_fr: string = "../policies/2015/lpc_seniors.fr.md"
@module external lpc_tfsa_en: string = "../policies/2015/lpc_tfsa.en.md"
@module external lpc_tfsa_fr: string = "../policies/2015/lpc_tfsa.fr.md"
@module external lpc_tpp_en: string = "../policies/2015/lpc_tpp.en.md"
@module external lpc_tpp_fr: string = "../policies/2015/lpc_tpp.fr.md"
@module external lpc_transit_en: string = "../policies/2015/lpc_transit.en.md"
@module external lpc_transit_fr: string = "../policies/2015/lpc_transit.fr.md"
@module external lpc_youth_en: string = "../policies/2015/lpc_youth.en.md"
@module external lpc_youth_fr: string = "../policies/2015/lpc_youth.fr.md"
@module external ndp_aboriginal_relations_en: string = "../policies/2015/ndp_aboriginal_relations.en.md"
@module external ndp_aboriginal_relations_fr: string = "../policies/2015/ndp_aboriginal_relations.fr.md"
@module external ndp_alzheimers_en: string = "../policies/2015/ndp_alzheimers.en.md"
@module external ndp_alzheimers_fr: string = "../policies/2015/ndp_alzheimers.fr.md"
@module external ndp_c51_en: string = "../policies/2015/ndp_c51.en.md"
@module external ndp_c51_fr: string = "../policies/2015/ndp_c51.fr.md"
@module external ndp_cap_and_trade_en: string = "../policies/2015/ndp_cap_and_trade.en.md"
@module external ndp_cap_and_trade_fr: string = "../policies/2015/ndp_cap_and_trade.fr.md"
@module external ndp_corporate_taxes_en: string = "../policies/2015/ndp_corporate_taxes.en.md"
@module external ndp_corporate_taxes_fr: string = "../policies/2015/ndp_corporate_taxes.fr.md"
@module external ndp_daycare_en: string = "../policies/2015/ndp_daycare.en.md"
@module external ndp_daycare_fr: string = "../policies/2015/ndp_daycare.fr.md"
@module external ndp_foreign_aid_en: string = "../policies/2015/ndp_foreign_aid.en.md"
@module external ndp_foreign_aid_fr: string = "../policies/2015/ndp_foreign_aid.fr.md"
@module external ndp_green_tech_en: string = "../policies/2015/ndp_green_tech.en.md"
@module external ndp_green_tech_fr: string = "../policies/2015/ndp_green_tech.fr.md"
@module external ndp_healthcare_funding_en: string = "../policies/2015/ndp_healthcare_funding.en.md"
@module external ndp_healthcare_funding_fr: string = "../policies/2015/ndp_healthcare_funding.fr.md"
@module external ndp_healthcare_en: string = "../policies/2015/ndp_healthcare.en.md"
@module external ndp_healthcare_fr: string = "../policies/2015/ndp_healthcare.fr.md"
@module external ndp_income_splitting_en: string = "../policies/2015/ndp_income_splitting.en.md"
@module external ndp_income_splitting_fr: string = "../policies/2015/ndp_income_splitting.fr.md"
@module external ndp_internships_en: string = "../policies/2015/ndp_internships.en.md"
@module external ndp_internships_fr: string = "../policies/2015/ndp_internships.fr.md"
@module external ndp_isis_en: string = "../policies/2015/ndp_isis.en.md"
@module external ndp_isis_fr: string = "../policies/2015/ndp_isis.fr.md"
@module external ndp_marijuana_en: string = "../policies/2015/ndp_marijuana.en.md"
@module external ndp_marijuana_fr: string = "../policies/2015/ndp_marijuana.fr.md"
@module external ndp_mental_healthcare_en: string = "../policies/2015/ndp_mental_healthcare.en.md"
@module external ndp_mental_healthcare_fr: string = "../policies/2015/ndp_mental_healthcare.fr.md"
@module external ndp_pipeline_en: string = "../policies/2015/ndp_pipeline.en.md"
@module external ndp_pipeline_fr: string = "../policies/2015/ndp_pipeline.fr.md"
@module external ndp_reform_en: string = "../policies/2015/ndp_reform.en.md"
@module external ndp_reform_fr: string = "../policies/2015/ndp_reform.fr.md"
@module external ndp_refugees_en: string = "../policies/2015/ndp_refugees.en.md"
@module external ndp_refugees_fr: string = "../policies/2015/ndp_refugees.fr.md"
@module external ndp_science_officer_en: string = "../policies/2015/ndp_science_officer.en.md"
@module external ndp_science_officer_fr: string = "../policies/2015/ndp_science_officer.fr.md"
@module external ndp_senate_en: string = "../policies/2015/ndp_senate.en.md"
@module external ndp_senate_fr: string = "../policies/2015/ndp_senate.fr.md"
@module external ndp_seniors_income_splitting_en: string =
  "../policies/2015/ndp_seniors_income_splitting.en.md"
@module external ndp_seniors_income_splitting_fr: string =
  "../policies/2015/ndp_seniors_income_splitting.fr.md"
@module external ndp_seniors_en: string = "../policies/2015/ndp_seniors.en.md"
@module external ndp_seniors_fr: string = "../policies/2015/ndp_seniors.fr.md"
@module external ndp_small_business_tax_en: string = "../policies/2015/ndp_small_business_tax.en.md"
@module external ndp_small_business_tax_fr: string = "../policies/2015/ndp_small_business_tax.fr.md"
@module external ndp_stock_options_en: string = "../policies/2015/ndp_stock_options.en.md"
@module external ndp_stock_options_fr: string = "../policies/2015/ndp_stock_options.fr.md"
@module external ndp_student_loans_en: string = "../policies/2015/ndp_student_loans.en.md"
@module external ndp_student_loans_fr: string = "../policies/2015/ndp_student_loans.fr.md"
@module external ndp_tfsa_en: string = "../policies/2015/ndp_tfsa.en.md"
@module external ndp_tfsa_fr: string = "../policies/2015/ndp_tfsa.fr.md"
@module external ndp_tpp_en: string = "../policies/2015/ndp_tpp.en.md"
@module external ndp_tpp_fr: string = "../policies/2015/ndp_tpp.fr.md"
@module external ndp_transit_en: string = "../policies/2015/ndp_transit.en.md"
@module external ndp_transit_fr: string = "../policies/2015/ndp_transit.fr.md"
@module external ndp_uccb_en: string = "../policies/2015/ndp_uccb.en.md"
@module external ndp_uccb_fr: string = "../policies/2015/ndp_uccb.fr.md"

let pathToContent = x =>
  switch x {
  | "2021/ndp/wealth_tax" => {
      en: Y2021.NDP.wealth_tax_en,
      fr: Y2021.NDP.wealth_tax_fr,
    }
  | "2021/ndp/corporate_tax_rate" => {
      en: Y2021.NDP.corporate_tax_rate_en,
      fr: Y2021.NDP.corporate_tax_rate_fr,
    }
  | "2021/ndp/income_tax_rate" => {
      en: Y2021.NDP.income_tax_rate_en,
      fr: Y2021.NDP.income_tax_rate_fr,
    }
  | "2021/ndp/capital_gains" => {
      en: Y2021.NDP.capital_gains_en,
      fr: Y2021.NDP.capital_gains_fr,
    }
    
  | "2015/cpc_aboriginal_funding" => {
      en: cpc_aboriginal_funding_en,
      fr: cpc_aboriginal_funding_fr,
    }
  | "2015/cpc_aboriginal_relations" => {
      en: cpc_aboriginal_relations_en,
      fr: cpc_aboriginal_relations_fr,
    }
  | "2015/cpc_c51" => {en: cpc_c51_en, fr: cpc_c51_fr}
  | "2015/cpc_home_renovation" => {
      en: cpc_home_renovation_en,
      fr: cpc_home_renovation_fr,
    }
  | "2015/cpc_infrastructure" => {
      en: cpc_infrastructure_en,
      fr: cpc_infrastructure_fr,
    }
  | "2015/cpc_isis" => {en: cpc_isis_en, fr: cpc_isis_fr}
  | "2015/cpc_marijuana" => {en: cpc_marijuana_en, fr: cpc_marijuana_fr}
  | "2015/cpc_pipeline" => {en: cpc_pipeline_en, fr: cpc_pipeline_fr}
  | "2015/cpc_reform" => {en: cpc_reform_en, fr: cpc_reform_fr}
  | "2015/cpc_refugees" => {en: cpc_refugees_en, fr: cpc_refugees_fr}
  | "2015/cpc_rrsp" => {en: cpc_rrsp_en, fr: cpc_rrsp_fr}
  | "2015/cpc_senate" => {en: cpc_senate_en, fr: cpc_senate_fr}
  | "2015/cpc_seniors" => {en: cpc_seniors_en, fr: cpc_seniors_fr}
  | "2015/cpc_tfsa" => {en: cpc_tfsa_en, fr: cpc_tfsa_fr}
  | "2015/cpc_tpp" => {en: cpc_tpp_en, fr: cpc_tpp_fr}
  | "2015/cpc_uccb" => {en: cpc_uccb_en, fr: cpc_uccb_fr}
  | "2015/lpc_aboriginal_education" => {
      en: lpc_aboriginal_education_en,
      fr: lpc_aboriginal_education_fr,
    }
  | "2015/lpc_aboriginal_relations" => {
      en: lpc_aboriginal_relations_en,
      fr: lpc_aboriginal_relations_fr,
    }
  | "2015/lpc_c51" => {en: lpc_c51_en, fr: lpc_c51_fr}
  | "2015/lpc_carbon_tax" => {en: lpc_carbon_tax_en, fr: lpc_carbon_tax_fr}
  | "2015/lpc_ccb" => {en: lpc_ccb_en, fr: lpc_ccb_fr}
  | "2015/lpc_green_tech" => {en: lpc_green_tech_en, fr: lpc_green_tech_fr}
  | "2015/lpc_healthcare" => {en: lpc_healthcare_en, fr: lpc_healthcare_fr}
  | "2015/lpc_homecare" => {en: lpc_homecare_en, fr: lpc_homecare_fr}
  | "2015/lpc_income_splitting" => {
      en: lpc_income_splitting_en,
      fr: lpc_income_splitting_fr,
    }
  | "2015/lpc_infrastructure_bank" => {
      en: lpc_infrastructure_bank_en,
      fr: lpc_infrastructure_bank_fr,
    }
  | "2015/lpc_infrastructure_investment" => {
      en: lpc_infrastructure_investment_en,
      fr: lpc_infrastructure_investment_fr,
    }
  | "2015/lpc_isis" => {en: lpc_isis_en, fr: lpc_isis_fr}
  | "2015/lpc_marijuana" => {en: lpc_marijuana_en, fr: lpc_marijuana_fr}
  | "2015/lpc_mental_healthcare" => {
      en: lpc_mental_healthcare_en,
      fr: lpc_mental_healthcare_fr,
    }
  | "2015/lpc_middle_class_taxes" => {
      en: lpc_middle_class_taxes_en,
      fr: lpc_middle_class_taxes_fr,
    }
  | "2015/lpc_pipeline" => {en: lpc_pipeline_en, fr: lpc_pipeline_fr}
  | "2015/lpc_reform" => {en: lpc_reform_en, fr: lpc_reform_fr}
  | "2015/lpc_refugees" => {en: lpc_refugees_en, fr: lpc_refugees_fr}
  | "2015/lpc_science_officer" => {
      en: lpc_science_officer_en,
      fr: lpc_science_officer_fr,
    }
  | "2015/lpc_senate" => {en: lpc_senate_en, fr: lpc_senate_fr}
  | "2015/lpc_seniors_income_splitting" => {
      en: lpc_seniors_income_splitting_en,
      fr: lpc_seniors_income_splitting_fr,
    }
  | "2015/lpc_seniors" => {en: lpc_seniors_en, fr: lpc_seniors_fr}
  | "2015/lpc_tfsa" => {en: lpc_tfsa_en, fr: lpc_tfsa_fr}
  | "2015/lpc_tpp" => {en: lpc_tpp_en, fr: lpc_tpp_fr}
  | "2015/lpc_transit" => {en: lpc_transit_en, fr: lpc_transit_fr}
  | "2015/lpc_youth" => {en: lpc_youth_en, fr: lpc_youth_fr}
  | "2015/ndp_aboriginal_relations" => {
      en: ndp_aboriginal_relations_en,
      fr: ndp_aboriginal_relations_fr,
    }
  | "2015/ndp_alzheimers" => {en: ndp_alzheimers_en, fr: ndp_alzheimers_fr}
  | "2015/ndp_c51" => {en: ndp_c51_en, fr: ndp_c51_fr}
  | "2015/ndp_cap_and_trade" => {
      en: ndp_cap_and_trade_en,
      fr: ndp_cap_and_trade_fr,
    }
  | "2015/ndp_corporate_taxes" => {
      en: ndp_corporate_taxes_en,
      fr: ndp_corporate_taxes_fr,
    }
  | "2015/ndp_daycare" => {en: ndp_daycare_en, fr: ndp_daycare_fr}
  | "2015/ndp_foreign_aid" => {en: ndp_foreign_aid_en, fr: ndp_foreign_aid_fr}
  | "2015/ndp_green_tech" => {en: ndp_green_tech_en, fr: ndp_green_tech_fr}
  | "2015/ndp_healthcare_funding" => {
      en: ndp_healthcare_funding_en,
      fr: ndp_healthcare_funding_fr,
    }
  | "2015/ndp_healthcare" => {en: ndp_healthcare_en, fr: ndp_healthcare_fr}
  | "2015/ndp_income_splitting" => {
      en: ndp_income_splitting_en,
      fr: ndp_income_splitting_fr,
    }
  | "2015/ndp_internships" => {en: ndp_internships_en, fr: ndp_internships_fr}
  | "2015/ndp_isis" => {en: ndp_isis_en, fr: ndp_isis_fr}
  | "2015/ndp_marijuana" => {en: ndp_marijuana_en, fr: ndp_marijuana_fr}
  | "2015/ndp_mental_healthcare" => {
      en: ndp_mental_healthcare_en,
      fr: ndp_mental_healthcare_fr,
    }
  | "2015/ndp_pipeline" => {en: ndp_pipeline_en, fr: ndp_pipeline_fr}
  | "2015/ndp_reform" => {en: ndp_reform_en, fr: ndp_reform_fr}
  | "2015/ndp_refugees" => {en: ndp_refugees_en, fr: ndp_refugees_fr}
  | "2015/ndp_science_officer" => {
      en: ndp_science_officer_en,
      fr: ndp_science_officer_fr,
    }
  | "2015/ndp_senate" => {en: ndp_senate_en, fr: ndp_senate_fr}
  | "2015/ndp_seniors_income_splitting" => {
      en: ndp_seniors_income_splitting_en,
      fr: ndp_seniors_income_splitting_fr,
    }
  | "2015/ndp_seniors" => {en: ndp_seniors_en, fr: ndp_seniors_fr}
  | "2015/ndp_small_business_tax" => {
      en: ndp_small_business_tax_en,
      fr: ndp_small_business_tax_fr,
    }
  | "2015/ndp_stock_options" => {
      en: ndp_stock_options_en,
      fr: ndp_stock_options_fr,
    }
  | "2015/ndp_student_loans" => {
      en: ndp_student_loans_en,
      fr: ndp_student_loans_fr,
    }
  | "2015/ndp_tfsa" => {en: ndp_tfsa_en, fr: ndp_tfsa_fr}
  | "2015/ndp_tpp" => {en: ndp_tpp_en, fr: ndp_tpp_fr}
  | "2015/ndp_transit" => {en: ndp_transit_en, fr: ndp_transit_fr}
  | "2015/ndp_uccb" => {en: ndp_uccb_en, fr: ndp_uccb_fr}
  | x => raise(Invalid_argument(`Unknown content: ${x}`))
  }
