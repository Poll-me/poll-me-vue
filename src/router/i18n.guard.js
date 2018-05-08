import store from '@/store';

export default (to, from, next) => {
  let lang = to.query.lang;
  if (typeof lang === 'string') {
    lang = lang.slice(0, 2);
    store.dispatch('changeLanguage', { lang }).then(() => next());
  } else {
    next();
  }
};
