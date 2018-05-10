import user from './user';

export default {
  setLanguage(state, { lang }) {
    state.lang = lang;
  },
  ...user
};
