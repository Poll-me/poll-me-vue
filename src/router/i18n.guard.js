import { loadLanguageAsync } from '@/setup/i18n';

export default (to, from, next) => {
  let lang = to.query.lang;
  if (typeof lang === 'string') {
    lang = lang.slice(0, 2);
    loadLanguageAsync(lang).then(() => next());
  } else {
    next();
  }
};
