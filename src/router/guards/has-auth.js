import store from '@/store';

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkAuth')
      .then(() => next())
      .catch(() => next({ name: 'not-found' }));
  } else {
    next();
  }
};
