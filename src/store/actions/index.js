import { loadLanguageAsync } from '@/setup/i18n';

import user from './user';

export default {
  changeLanguage({ commit }, { lang }) {
    return loadLanguageAsync(lang).then(() => commit('setLanguage', { lang }));
  },
  ...user
};
