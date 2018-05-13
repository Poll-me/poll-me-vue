import store from '@/store';

export default function (to, from, next) {
  if (store.state.user.isLogged) {
    next();
  } else {
    const { path, params, query } = to;
    next({ name: 'login', params: { redirectRoute: { path, params, query } } });
  }
}
