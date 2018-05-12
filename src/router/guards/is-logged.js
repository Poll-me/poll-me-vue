import store from '@/store';

export default function (to, from, next) {
  if (store.state.user.isLogged) {
    next();
  } else {
    const { path } = to;
    next({ name: 'login', query: { signInSuccessUrl: path } });
  }
}
