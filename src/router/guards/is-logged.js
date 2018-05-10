import store from '@/store';

export default function (to, from, next) {
  if (store.state.user.isLogged) {
    next();
  } else {
    next({ name: 'not-found' });
  }
}
