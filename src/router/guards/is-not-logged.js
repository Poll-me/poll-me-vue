import store from '@/store';

export default function (to, from, next) {
  if (!store.state.user.isLogged) {
    next();
  } else {
    next(from.matched.length > 0 ? false : { name: 'home', replace: true });
  }
}
