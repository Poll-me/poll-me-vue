import Vue from 'vue';
import Vuex from 'vuex';

import { defaultLang, loadLanguageAsync } from '@/setup/i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    lang: defaultLang
  },
  mutations: {
    setLanguage(state, { lang }) {
      state.lang = lang;
    }
  },
  actions: {
    changeLanguage({ commit }, { lang }) {
      return loadLanguageAsync(lang).then(() => commit('setLanguage', { lang }));
    }
  }
});
