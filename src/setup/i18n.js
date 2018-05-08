import Vue from 'vue';
import VueI18n from 'vue-i18n';

import defaultLangData from '../../lang/en.json';

Vue.use(VueI18n);

const defaultLang = 'en';

export const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages: {
    [defaultLang]: defaultLangData
  }
});

const loadedLanguages = [defaultLang];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `../../lang/${lang}.json`).then((msgs) => {
        i18n.setLocaleMessage(lang, msgs);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

export default i18n;
