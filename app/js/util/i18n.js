import {LIBERAL, CONSERVATIVE, NDP, NO_POLICY_LISTED, TOPICS, MADE_BY, SUGGEST_EDIT} from './constants';

let translations = new Map();
translations.set(NDP, {en: 'NDP', fr: 'NPD'});
translations.set(CONSERVATIVE, {en: 'Conservatives', fr: 'Conservateur'});
translations.set(LIBERAL, {en: 'Liberals', fr: 'Libéral'});
translations.set(NO_POLICY_LISTED, {en: 'No policy', fr: 'Absence de politique'});
translations.set(TOPICS, {en: 'Topics', fr: 'Sujets'});
translations.set(MADE_BY, {en: 'Made by', fr: 'Fait par'});
translations.set(SUGGEST_EDIT, {en: 'Suggest edit', fr: 'Suggérer modifier'});

const i18n = {
  init(locale = 'en') {
    this.locale = locale;
  },

  get(sym, lang = null) {
    const lookup = translations.get(sym);
    return lang ? lookup[lang] : lookup[this.locale];
  },

  get locale() {
    return this._locale;
  },

  set locale(lang) {
    if (lang === 'en' || lang === 'fr') {
      this._locale = lang;
    }
  }
};

export default i18n;
